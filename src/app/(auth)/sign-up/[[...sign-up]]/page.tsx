import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1011", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Cleaned up property types */}
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
}