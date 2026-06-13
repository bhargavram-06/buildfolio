import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1011", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Changed basePath to path to align perfectly with Clerk v6 specifications */}
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}