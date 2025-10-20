import { useState, useRef } from "react";
import { Button } from "@tesseract/ui/components/button";
import { Dialog, DialogContent } from "@tesseract/ui/components/dialog";
import { X } from "lucide-react";
import { TenantDetailsStep } from "./TenantDetailsStep";
import { ThemeConfigurationStep } from "./ThemeConfigurationStep";
import { UnitPreferencesStep } from "./UnitPreferencesStep";
import { GetPlanColor, GetPlanIcon, Plan, Step, TenantFormData } from "./types";

// types moved to ./types

const colorPalettes = {
  connectedlife: {
    name: "Connectedlife palette",
    colors: ["#0D7E55", "#E8724E", "#8CC8A8"],
  },
  palette1: {
    name: "Palette 1",
    colors: ["#0066CC", "#66AADD", "#AACCEE", "#2C3E50"],
  },
  palette2: {
    name: "Palette 2",
    colors: ["#1A1A1A", "#8B7355", "#6C7A89"],
  },
  palette3: {
    name: "Palette 3",
    colors: ["#333333", "#FF8800", "#FFCC00", "#FFFFAA"],
  },
};

interface AddTenantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTenantDialog({ open, onOpenChange }: AddTenantDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>("tenant-details");
  const [newEmailDomain, setNewEmailDomain] = useState("");
  const favIconRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<TenantFormData>({
    tenantName: "",
    hostDomain: "",
    emailDomains: [],
    preferredTier: "Freemium",
    supportedLanguages: ["English", "Mandarin", "Chinese"],
    defaultLanguage: "English",
    timeZone: "(UTC+04:00) Abu Dhabi, Muscat",
    favIcon: null,
    horizontalLogo: null,
    colorMode: "quick-start",
    selectedPalette: "connectedlife",
    customColors: {
      primary: "#0D7E55",
      secondary: "#E8724E",
      tertiary: "#8CC8AB",
      text: "#424848",
      background: "#FAF7F0",
    },
    measurementSystem: "Metrics",
    measurementExpanded: true,
    medicalExpanded: false,
    units: {
      height: "m/cm",
      weight: "kg",
      temperature: "°C",
      distance: "km/m",
      waterIntake: "mL",
      waistCircumference: "cm",
      bmi: "kg/m2",
      bloodPressure: "kPa",
      bloodGlucose: "mg/dL",
      hba1c: "mmol/mol",
      lipids: "mg/dL",
    },
  });

  const steps = [
    { id: "tenant-details" as Step, label: "Tenant details" },
    { id: "theme-configuration" as Step, label: "Theme configuration" },
    { id: "unit-preferences" as Step, label: "Unit preferences" },
  ];

  const handleNext = () => {
    if (currentStep === "tenant-details") {
      setCurrentStep("theme-configuration");
    } else if (currentStep === "theme-configuration") {
      setCurrentStep("unit-preferences");
    } else {
      // Save
      onOpenChange(false);
      setCurrentStep("tenant-details");
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setCurrentStep("tenant-details");
  };

  const addEmailDomain = () => {
    if (newEmailDomain.trim()) {
      setFormData({
        ...formData,
        emailDomains: [...formData.emailDomains, newEmailDomain.trim()],
      });
      setNewEmailDomain("");
    }
  };

  const getPlanIcon: GetPlanIcon = (plan: Plan) => {
    switch (plan) {
      case "Freemium": return "⭐";
      case "Bronze": return "🥉";
      case "Silver": return "🥈";
      case "Gold": return "🥇";
    }
  };

  const getPlanColor: GetPlanColor = (plan: Plan) => {
    switch (plan) {
      case "Freemium": return "border-sky-600 bg-sky-50 text-sky-700";
      case "Bronze": return "border-amber-600 bg-amber-50 text-amber-700";
      case "Silver": return "border-gray-400 bg-gray-50 text-gray-700";
      case "Gold": return "border-yellow-500 bg-yellow-50 text-yellow-700";
    }
  };

  const handleFileChange = (type: "favIcon" | "horizontalLogo", file: File | null) => {
    setFormData({ ...formData, [type]: file });
  };

  const handleUnitChange = (key: keyof typeof formData.units, value: string) => {
    setFormData({
      ...formData,
      units: { ...formData.units, [key]: value },
    });
  };

  //   if (showSuccess) {
  //     return (
  //       <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
  //         <DialogContent className="sm:max-w-md" showCloseButton={true}>
  //           <div className="flex flex-col items-center justify-center py-8">
  //             <h2 className="text-lg font-semibold mb-6">Tenant added successfully!</h2>
  //             <Button 
  //               onClick={() => setShowSuccess(false)} 
  //               className="bg-teal-600 hover:bg-teal-700 text-white px-8"
  //             >
  //               Dismiss
  //             </Button>
  //           </div>
  //         </DialogContent>
  //       </Dialog>
  //     );
  //   }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent
        className="w-[90vw] h-[80vh] max-w-[750px] max-h-[750px]"
        style={{
            maxWidth: "750px",
            maxHeight: "750px",
            width: "90vw",
            height: "80vh",
            overflowY: "auto",
        }}
        showCloseButton={false}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-teal-700">Add a new tenant</h2>
                <p className="text-sm text-gray-600 mt-1">Follow the steps to add a new tenant</p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-60 bg-gray-50 p-6 border-r flex-shrink-0">
              <nav className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-md text-sm transition-colors ${currentStep === step.id
                        ? "bg-teal-50 text-teal-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {step.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {currentStep === "tenant-details" && (
                <TenantDetailsStep
                  formData={formData}
                  setFormData={setFormData}
                  newEmailDomain={newEmailDomain}
                  setNewEmailDomain={setNewEmailDomain}
                  addEmailDomain={addEmailDomain}
                  getPlanIcon={getPlanIcon}
                  getPlanColor={getPlanColor}
                />
              )}

              {currentStep === "theme-configuration" && (
                <ThemeConfigurationStep
                  formData={formData}
                  setFormData={setFormData}
                  favIconRef={favIconRef as any}
                  logoRef={logoRef as any}
                  handleFileChange={handleFileChange}
                  colorPalettes={colorPalettes}
                />
              )}

              {currentStep === "unit-preferences" && (
                <UnitPreferencesStep
                  formData={formData}
                  setFormData={setFormData}
                  handleUnitChange={handleUnitChange}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel} className="px-8">
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            >
              {currentStep === "unit-preferences" ? "Save" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
