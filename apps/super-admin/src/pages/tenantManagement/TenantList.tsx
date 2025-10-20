import { useMemo, useState } from "react";
import { Button } from "@tesseract/ui/components/button";
import { Input } from "@tesseract/ui/components/input";
import PageHeader from "@tesseract/ui/components/custom/page-header";
import { Plus } from "lucide-react";
import { AddTenantDialog } from "../../components/tenant/AddTenantDialog";
import { DeleteTenantDialog } from "../../components/tenant/DeleteTenantDialog";
import { TenantListTable } from "@/components/tenant/TenantListTable";

type Tenant = {
  id: string;
  name: string;
  createdAt: string;
  plan: "Freemium" | "Bronze" | "Silver" | "Gold";
  status: "Active" | "Draft";
};

function TenantList() {
  const [query, setQuery] = useState("");
  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  console.log("addTenantOpen", addTenantOpen);
  const data: Tenant[] = useMemo(
    () => [
      { id: "1", name: "Manulife", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "2", name: "Entity 2", createdAt: "10 Mar 2022, 4:20 pm", plan: "Bronze", status: "Draft" },
      { id: "3", name: "Entity 3", createdAt: "10 Mar 2022, 4:20 pm", plan: "Bronze", status: "Draft" },
      { id: "4", name: "Entity 4", createdAt: "10 Mar 2022, 4:20 pm", plan: "Silver", status: "Active" },
      { id: "5", name: "Entity 5", createdAt: "10 Mar 2022, 4:20 pm", plan: "Gold", status: "Active" },
      { id: "6", name: "Entity 6", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "7", name: "Entity 7", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "8", name: "Entity 8", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "9", name: "Entity 9", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "10", name: "Entity 10", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "11", name: "Entity 11", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "12", name: "Entity 12", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "13", name: "Entity 13", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "14", name: "Entity 14", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "15", name: "Entity 15", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "16", name: "Entity 16", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "17", name: "Entity 17", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "18", name: "Entity 18", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "19", name: "Entity 19", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "20", name: "Entity 20", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" }, 
      { id: "21", name: "Entity 21", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "22", name: "Entity 22", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "23", name: "Entity 23", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "24", name: "Entity 24", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "25", name: "Entity 25", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "26", name: "Entity 26", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "27", name: "Entity 27", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
      { id: "28", name: "Entity 28", createdAt: "10 Mar 2022, 4:20 pm", plan: "Freemium", status: "Active" },
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

  const handleDeleteConfirm = () => {
    if (selectedTenant) {
      console.log("Deleting tenant:", selectedTenant);
      // Add your delete logic here
    }
  };

  const handleDelete = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setDeleteDialogOpen(true);
  };
  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setAddTenantOpen(true);
  };
  const handleView = (tenant: Tenant) => {
    console.log("Viewing tenant:", tenant);
  };
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
          <Button 
            onClick={() => {
              console.log("Button clicked, setting addTenantOpen to true");
              setAddTenantOpen(true);
            }}
            className="bg-primary-40 p-4 text-white rounded-xl"
          >
            <Plus className="size-4" /> Add a new tenant
          </Button>
          <Button variant="outline" size="icon" className="p-2 rounded-md">↻</Button>

        </div>

      </div>

      <TenantListTable tenants={filtered} onDelete={handleDelete} onEdit={handleEdit} onView={handleView} />

      <AddTenantDialog open={addTenantOpen} onOpenChange={setAddTenantOpen} />
      
      <DeleteTenantDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        tenantName={selectedTenant?.name || ""}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default TenantList;