import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-white">Admin</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in with Google to continue.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
