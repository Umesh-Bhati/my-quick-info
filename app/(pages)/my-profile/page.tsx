import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { prisma } from "@/app/api/db";

export default async function MyProfilePage(props) {
  const data = await getSession();
  const user = await prisma.users.findUnique({
    where: { email: data?.user?.email || "" },
  });
  return (
    <section>
      <Card className="w-full m-auto max-w-3xl">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value="Jared Palmer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value="jared@acme.inc"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost">Cancel</Button>
          <Button className="ml-auto">
            Savasdfasdfsdfasdfasdfasdfasdfsadfsadf asdfasdf asdf asd fasdfe
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
