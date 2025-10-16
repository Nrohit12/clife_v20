import { useMemo, useState } from "react";
import { Button } from "@clife/ui/components/button";
import { Input } from "@clife/ui/components/input";
import PageHeader from "@clife/ui/components/custom/page-header";
import DataTable from "@clife/ui/components/custom/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

type Tenant = {
  id: string;
  name: string;
  createdAt: string;
  plan: "Freemium" | "Bronze" | "Silver" | "Gold";
  status: "Active" | "Draft";
};

function TenantList() {
  const [query, setQuery] = useState("");

  const data: Tenant[] = useMemo(
    () => [
      { id: "1", name: "Manulife", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "2", name: "Entity 2", createdAt: "10 Mar 2022, 4:20 pm", plan: "Bronze", status: "Draft" },
      { id: "3", name: "Entity 3", createdAt: "10 Mar 2022, 4:20 pm", plan: "Bronze", status: "Draft" },
      { id: "4", name: "Entity 4", createdAt: "10 Mar 2022, 4:20 pm", plan: "Silver", status: "Active" },
      { id: "5", name: "Entity 5", createdAt: "10 Mar 2022, 4:20 pm", plan: "Gold", status: "Active" },
      { id: "6", name: "Entity 6", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "7", name: "Entity 7", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((t) =>
      [t.name, t.plan, t.status].some((v) => v.toLowerCase().includes(q))
    );
  }, [data, query]);

  const columns: ColumnDef<Tenant>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <button className="text-primary hover:underline" type="button">
            {row.original.name}
          </button>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created date",
      },
      {
        accessorKey: "plan",
        header: "Selected plan",
        cell: ({ row }) => {
          const plan = row.original.plan;
          const color =
            plan === "Gold"
              ? "border-yellow-500 text-yellow-700"
              : plan === "Silver"
                ? "border-gray-400 text-gray-700"
                : plan === "Bronze"
                  ? "border-amber-600 text-amber-700"
                  : "border-sky-600 text-sky-700";
          return (
            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${color}`}>
              {plan}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${row.original.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
            <span>{row.original.status}</span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        cell: () => (
          <button type="button" className="text-primary hover:underline">
            EDIT
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-4">

      <div className="flex w-full items-center mb-4 flex-row">
        <PageHeader title="Tenants" />

        <div className="flex items-center gap-3 flex-row justify-end w-full">
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xs p-2 rounded-md"
          />
          <Button className="bg-primary-40 p-4 text-white rounded-xl  "><Plus className="size-4" /> Add a new tenant</Button>
          <Button variant="outline" size="icon" className="p-2 rounded-md">↻</Button>

        </div>

      </div>



      <DataTable columns={columns} data={filtered} />
    </div>
  );
}

export default TenantList;