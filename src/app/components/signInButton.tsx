import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

export default function SignInButton() {
  return (
    <ClerkSignInButton mode="modal">
      <button className="btn btn-primary">sign in</button>
    </ClerkSignInButton>
  );
}
