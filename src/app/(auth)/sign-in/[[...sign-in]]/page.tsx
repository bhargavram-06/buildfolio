import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0f1011] flex items-center justify-center p-4">
      <SignIn basePath="/sign-in" routing="path" />
    </div>
  );
}