import { getServerSession } from "next-auth";
import { ClientSessionProvider } from "./ClientSessionProvider";

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = async ({ children }: Props) => {
  const session = await getServerSession();

  return (
    <ClientSessionProvider session={session}>{children}</ClientSessionProvider>
  );
};

export default AuthProvider;
