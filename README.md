# ericbrandmusic.com

Marketing site for Eric Brand — drummer and singer for [Wheel](https://www.facebook.com/wheel404/) and [The Charley Ramsay Trio](https://charleyramsay.bandzoogle.com/home).

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4
- **Auth:** Stytch (Google OAuth)
- **Hosting:** Railway
- **DNS/CDN:** Cloudflare

## Architecture

### Public Site

The public-facing site is a single-page layout at `/` with sections for upcoming shows, bands, gear, and contact info. All components are server-rendered.

### Data Layer

Site content (shows, bands, gear) lives in JSON files under `/data/`. These are read at request time with `fs.readFileSync` via helpers in `lib/data.ts` — not imported as modules — so admin edits take effect immediately without a server restart.

- `data/shows.json` — upcoming show dates, venues, bands
- `data/bands.json` — band info and bios
- `data/gear.json` — live and studio gear categories
- `data/types.ts` — shared TypeScript interfaces

**Note:** Railway's filesystem is ephemeral. Admin edits persist until the next deploy. For permanent persistence, mount a Railway volume to `/data`.

### Admin Dashboard

Authenticated admin UI at `/admin` for managing shows, bands, and gear. Protected by Stytch Google OAuth.

- **Middleware** (`middleware.ts`) guards all `/admin/*` routes by checking for a `stytch_session_jwt` cookie, redirecting to `/admin/login` if absent.
- **API routes** (`app/api/admin/*`) validate the session JWT server-side before any read/write operation.
- **UI** is a tabbed dashboard with CRUD forms for each content type.

### Auth Flow

1. User visits `/admin` → middleware redirects to `/admin/login`
2. Login page renders Stytch's Google OAuth button
3. Google authenticates → redirects to Stytch → redirects to `/admin/authenticate`
4. Client-side Stytch SDK exchanges the token for a session (cookie set automatically)
5. User lands on `/admin` dashboard

## Environment Variables

| Variable | Description |
|----------|-------------|
| `STYTCH_PROJECT_ID` | Stytch project ID (server-side) |
| `STYTCH_SECRET` | Stytch secret key (server-side) |
| `NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN` | Stytch public token (client-side) |
| `STYTCH_PROJECT_ENV` | `test` or `live` — selects Stytch API endpoint |

## Development

```bash
npm install
npm run dev
```

Requires a `.env.local` file with the Stytch variables listed above.

## Project Structure

```
app/
  page.tsx                    # Public single-page site
  admin/
    page.tsx                  # Admin dashboard (server component)
    login/page.tsx            # Login page
    authenticate/page.tsx     # OAuth callback handler
  api/admin/
    shows/route.ts            # Shows CRUD API
    bands/route.ts            # Bands CRUD API
    gear/route.ts             # Gear CRUD API
components/
  Shows.tsx, Bands.tsx, ...   # Public site components
  admin/
    AdminDashboard.tsx        # Tabbed admin UI
    ShowsManager.tsx          # Shows CRUD forms
    BandsManager.tsx          # Bands CRUD forms
    GearManager.tsx           # Gear CRUD forms
    StytchProvider.tsx        # Stytch context wrapper
    LoginForm.tsx             # Google OAuth login button
data/
  shows.json, bands.json, gear.json, types.ts
lib/
  data.ts                     # JSON read/write helpers
  stytch.ts                   # Stytch client singleton
  auth.ts                     # Session validation
middleware.ts                  # Route guard for /admin
```
