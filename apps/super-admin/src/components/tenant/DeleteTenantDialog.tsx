import { Button } from "@tesseract/ui/components/button";
import { Dialog, DialogContent } from "@tesseract/ui/components/dialog";
import { X } from "lucide-react";

interface DeleteTenantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  onConfirm: () => void;
}

export function DeleteTenantDialog({ 
  open, 
  onOpenChange, 
  tenantName,
  onConfirm 
}: DeleteTenantDialogProps) {
  const handleDelete = () => {
    onConfirm();
    onOpenChange(false);
  };


  console.log("open", open);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
          
          <div className="text-center pt-4 pb-6">
            <h2 className="text-lg font-semibold mb-4">Delete</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the draft of <span className="font-semibold">{tenantName}</span>? 
              This action will permanently delete all your saved data.
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="px-8"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDelete}
                className="px-8 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

