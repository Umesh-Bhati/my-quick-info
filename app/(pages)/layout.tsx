import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Header from "@/components/Header";
import AuthProvider from "@/contexts/AuthProvider";
import Footer from "@/components/Footer";
import { prisma } from "../api/db";
import { getServerSession } from "next-auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }) {
  const data = await getServerSession();
  const email = data?.user?.email || "";
  const { is_admin = false } =
    (await prisma.users.findUnique({ where: { email } })) || {};
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          `min-h-screen flex flex-col font-sans antialiased  bg-cover`,
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header isAdmin={!!is_admin} />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
