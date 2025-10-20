import { Check, ChevronDown } from "lucide-react";
import { TenantFormData } from "./types";

type Props = {
  formData: TenantFormData;
  setFormData: (data: TenantFormData) => void;
  handleUnitChange: (key: keyof TenantFormData["units"], value: string) => void;
};

export function UnitPreferencesStep({ formData, setFormData, handleUnitChange }: Props) {
  return (
    <div className="p-6 pb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-1">Unit preferences</h3>
        <p className="text-sm text-gray-600">Configure your preferred units</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {/* Measurement System */}
        <div className="border rounded-lg">
          <button
            onClick={() => setFormData({ ...formData, measurementExpanded: !formData.measurementExpanded })}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium">Measurement System</h4>
            <ChevronDown
              className={`size-5 transition-transform ${formData.measurementExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {formData.measurementExpanded && (
            <div className="px-4 pb-4 border-t">
              <p className="text-sm text-gray-600 my-4">
                Choose your primary measurement system. This will update related units automatically.
              </p>
              <div className="flex gap-3 mb-6">
                {["Metrics", "Imperial"].map((system) => (
                  <button
                    key={system}
                    onClick={() => setFormData({ ...formData, measurementSystem: system as TenantFormData["measurementSystem"] })}
                    className={`px-8 py-2 rounded-md text-sm font-medium transition-colors ${formData.measurementSystem === system
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {system}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { key: "height", label: "Height", options: ["m/cm", "ft/in"] },
                  { key: "weight", label: "Weight", options: ["kg", "lbs"] },
                  { key: "temperature", label: "Temperature", options: ["°C", "°F"] },
                  { key: "distance", label: "Distance", options: ["km/m", "mi"] },
                  { key: "waterIntake", label: "Water intake", options: ["mL", "Fluid ounces (fl oz)"] },
                  { key: "waistCircumference", label: "Waist circumference", options: ["cm", "in"] },
                  { key: "bmi", label: "Body Mass Index (BMI)", options: ["kg/m2", "lb/in2"] },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">
                      {item.label} <span className="text-red-500">*</span>
                    </span>
                    <div className="flex gap-4">
                      {item.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleUnitChange(item.key as keyof TenantFormData["units"], option)}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className={`size-4 rounded-full border-2 flex items-center justify-center ${formData.units[item.key as keyof TenantFormData["units"]] === option
                              ? "border-teal-600"
                              : "border-gray-300"
                            }`}>
                            {formData.units[item.key as keyof TenantFormData["units"]] === option && (
                              <Check className="size-3 text-teal-600" />
                            )}
                          </div>
                          <span className={formData.units[item.key as keyof TenantFormData["units"]] === option ? "text-teal-700" : "text-gray-600"}>
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Medical & Health Units */}
        <div className="border rounded-lg">
          <button
            onClick={() => setFormData({ ...formData, medicalExpanded: !formData.medicalExpanded })}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium">Medical & Health Units</h4>
            <ChevronDown
              className={`size-5 transition-transform ${formData.medicalExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {formData.medicalExpanded && (
            <div className="px-4 pb-4 border-t">
              <p className="text-sm text-gray-600 my-4">Customize units for specific health parameters</p>

              <div className="space-y-3">
                {[
                  { key: "bloodPressure", label: "Blood pressure", options: ["mmHg", "kPa"] },
                  { key: "bloodGlucose", label: "Blood glucose", options: ["mmol/L", "mg/dL"] },
                  { key: "hba1c", label: "HbA1c", options: ["%", "mmol/mol"] },
                  { key: "lipids", label: "Lipids", options: ["mmol/L", "mg/dL"] },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium">
                      {item.label} <span className="text-red-500">*</span>
                    </span>
                    <div className="flex gap-4">
                      {item.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleUnitChange(item.key as keyof TenantFormData["units"], option)}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className={`size-4 rounded-full border-2 flex items-center justify-center ${formData.units[item.key as keyof TenantFormData["units"]] === option
                              ? "border-teal-600"
                              : "border-gray-300"
                            }`}>
                            {formData.units[item.key as keyof TenantFormData["units"]] === option && (
                              <div className="size-2 rounded-full bg-teal-600" />
                            )}
                          </div>
                          <span className={formData.units[item.key as keyof TenantFormData["units"]] === option ? "text-teal-700" : "text-gray-600"}>
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnitPreferencesStep;


