import { Button } from "@tesseract/ui/components/button";
import { Input } from "@tesseract/ui/components/input";
import { Check, ChevronDown, Info, Plus, X } from "lucide-react";
import { GetPlanColor, GetPlanIcon, Plan, TenantFormData } from "./types";

type Props = {
  formData: TenantFormData;
  setFormData: (data: TenantFormData) => void;
  newEmailDomain: string;
  setNewEmailDomain: (value: string) => void;
  addEmailDomain: () => void;
  getPlanIcon: GetPlanIcon;
  getPlanColor: GetPlanColor;
};

export function TenantDetailsStep({
  formData,
  setFormData,
  newEmailDomain,
  setNewEmailDomain,
  addEmailDomain,
  getPlanIcon,
  getPlanColor,
}: Props) {
  return (
    <div className="p-6 pb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-1">Tenant details</h3>
        <p className="text-sm text-gray-600">Enter tenant info</p>
      </div>

      <div className="space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-2">
            Tenant name <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.tenantName}
            onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
            placeholder="Manulife"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Host domain <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.hostDomain}
            onChange={(e) => setFormData({ ...formData, hostDomain: e.target.value })}
            placeholder="manulife.connectedlife.io"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email domain <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                value={newEmailDomain}
                onChange={(e) => setNewEmailDomain(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addEmailDomain()}
                placeholder="support@manulife.io"
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                className="shrink-0"
                onClick={addEmailDomain}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            {formData.emailDomains.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.emailDomains.map((domain, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded text-xs"
                  >
                    {domain}
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          emailDomains: formData.emailDomains.filter((_, i) => i !== idx),
                        });
                      }}
                      className="hover:text-teal-900"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred tier <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {(["Freemium", "Bronze", "Silver", "Gold"] as Plan[]).map((plan) => (
              <button
                key={plan}
                onClick={() => setFormData({ ...formData, preferredTier: plan })}
                className={`relative border-2 rounded-lg p-4 text-center transition-all ${formData.preferredTier === plan
                    ? getPlanColor(plan) + " border-2"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                {formData.preferredTier === plan && (
                  <div className="absolute -top-2 -right-2 bg-teal-600 rounded-full p-1">
                    <Check className="size-3 text-white" />
                  </div>
                )}
                <div className="text-2xl mb-1">{getPlanIcon(plan)}</div>
                <div className="text-sm font-medium">{plan}</div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-gray-600">
            <Info className="size-4 shrink-0 mt-0.5" />
            <span>Included scores in the plan</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
              General Health Score
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
              Longevity Score
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Supported languages <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              value="English, Mandarin, Chinese"
              disabled
              className="bg-gray-50 pr-10"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Default language <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              value="English"
              disabled
              className="bg-gray-50 pr-10"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Time zone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              value="(UTC+04:00) Abu Dhabi, Muscat"
              disabled
              className="bg-gray-50 pr-10"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantDetailsStep;


