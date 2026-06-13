import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0f1011] flex items-center justify-center p-4">
      <SignUp basePath="/sign-up" routing="path" />
    </div>
  );
}