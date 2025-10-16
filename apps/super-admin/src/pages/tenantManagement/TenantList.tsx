import { Button } from "@clife/ui/components/button";
import PageHeader from "@clife/ui/components/custom/page-header";

function TenantList() {
  return (
    <div className="p-4 ">
      <div className="flex justify-between w-full mb-4">
        <div>
          <PageHeader title="Tenants" />
        </div>

        <div>
          {/* Future Action Buttons can be placed here */}
          <Button variant="default">Add new Tenant</Button>
        </div>
      </div>

      <div id="tenant-table-container">
        <div>Tenant table container</div>
        {/* <DataTable data={[]} columns={[]} > */}
      </div>
    </div>
  );
}

export default TenantList;
