import { useMemo } from "react";
import { Button } from "@tesseract/ui/components/button";
import DataTable from "@tesseract/ui/components/custom/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

// Example tenant type
export type Tenant = {
  id: string;
  name: string;
  createdAt: string;
  plan: "Freemium" | "Bronze" | "Silver" | "Gold";
  status: "Active" | "Draft";
};

type TenantListTableProps = {
  tenants: Tenant[];
  onDelete?: (tenant: Tenant) => void;
  onEdit?: (tenant: Tenant) => void;
  onView?: (tenant: Tenant) => void;
};

export function TenantListTable({ tenants, onDelete, onEdit, onView }: TenantListTableProps) {
  const columns = useMemo<ColumnDef<Tenant>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <Button
            variant="link"
            className="text-primary-40 hover:underline font-inter-tight font-semibold text-base leading-5 tracking-normal cursor-pointer"
            onClick={() => onView && onView(row.original)}
          >
            {row.original.name}
          </Button>
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
        cell: ({ row }) => (    
          <div className="flex items-center gap-2">
            <Button
            variant="link"
            onClick={() => onEdit && onEdit(row.original)}
            className="text-primary-40 hover:underline font-inter-tight font-semibold text-base leading-5 tracking-normal cursor-pointer"
          >
            EDIT
          </Button>

          <Button
            variant="link"
            onClick={() => onDelete && onDelete(row.original)}
            className="text-error-40 hover:underline font-inter-tight font-semibold text-base leading-5 tracking-normal cursor-pointer"
          >
            <TrashIcon className="size-4" />
          </Button>
          
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onView, onDelete]
  );

  return (
    <DataTable columns={columns} data={tenants} />
  );
}
