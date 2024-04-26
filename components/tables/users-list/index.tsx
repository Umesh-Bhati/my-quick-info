"use client";
import { User, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function UsersTable() {
  const data: User[] = [
    {
      id: "1",
      firstName: "rest",
      lastName: "restsirname",
      email: "random@gmail.com",
      active: false,
      editBtn: () => <button>hiii</button>,
    },
    {
      id: "2",
      firstName: "rest",
      lastName: "restsirname",
      email: "random@gmail.com",
      active: false,
      editBtn: () => <button>hiii</button>,
    },
    {
      id: "3",
      firstName: "rest",
      lastName: "restsirname",
      email: "random@gmail.com",
      active: false,
      editBtn: () => <button>hiii</button>,
    },
    {
      id: "4",
      firstName: "rest",
      lastName: "restsirname",
      email: "random@gmail.com",
      active: false,
      editBtn: () => <button>hiii</button>,
    },
    {
      id: "5",
      firstName: "rest",
      lastName: "restsirname",
      email: "random@gmail.com",
      active: false,
      editBtn: () => <button>hiii</button>,
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
