import { LoginForm } from "@/components/LoginForm";

export default function SignInPage() {
  return (
    <div className="flex h-screen flex-grow ">
      <div className="flex-1 bg-background justify-center items-center">
        <LoginForm />
      </div>
      <div className="flex-1 bg-primary"></div>
    </div>
  );
}
