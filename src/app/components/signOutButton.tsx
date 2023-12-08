import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";

export default function SignOutButton() {
  return (
    <ClerkSignOutButton>
      <button className="btn btn-primary">sign out</button>
    </ClerkSignOutButton>
  );
}
