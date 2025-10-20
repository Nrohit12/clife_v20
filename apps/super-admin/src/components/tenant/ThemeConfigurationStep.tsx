import { Check, Plus } from "lucide-react";
import { Input } from "@tesseract/ui/components/input";
import { TenantFormData } from "./types";
// Accept any ref-like object with a current field to avoid strict variance issues
type InputLikeRef = any;

type Props = {
  formData: TenantFormData;
  setFormData: (data: TenantFormData) => void;
  favIconRef: InputLikeRef;
  logoRef: InputLikeRef;
  handleFileChange: (type: "favIcon" | "horizontalLogo", file: File | null) => void;
  colorPalettes: Record<string, { name: string; colors: string[] }>; 
};

export function ThemeConfigurationStep({
  formData,
  setFormData,
  favIconRef,
  logoRef,
  handleFileChange,
  colorPalettes,
}: Props) {
  return (
    <div className="p-6 pb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-teal-700 mb-1">Theme configuration</h3>
        <p className="text-sm text-gray-600">Add theme</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div>
          <label className="block text-sm font-medium mb-2">
            Fav Icon <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Accepted file format: PNG (transparent background)<br />
            Recommended dimensions: 160px × 160px<br />
            Maximum file upload size: 1 MB
          </p>
          <input
            ref={favIconRef}
            type="file"
            accept=".png"
            className="hidden"
            onChange={(e) => handleFileChange("favIcon", e.target.files?.[0] || null)}
          />
          <button
            onClick={() => favIconRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          >
            {formData.favIcon ? (
              <div className="flex items-center justify-center gap-2 text-sm text-teal-700">
                <Check className="size-4" />
                {formData.favIcon.name}
              </div>
            ) : (
              <>
                <Plus className="size-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drop image here</p>
              </>
            )}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Horizontal Logo <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Accepted file format: PNG (transparent background)<br />
            Recommended dimensions: 400px × 100px<br />
            Maximum file upload size: 1 MB
          </p>
          <input
            ref={logoRef}
            type="file"
            accept=".png"
            className="hidden"
            onChange={(e) => handleFileChange("horizontalLogo", e.target.files?.[0] || null)}
          />
          <button
            onClick={() => logoRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          >
            {formData.horizontalLogo ? (
              <div className="flex items-center justify-center gap-2 text-sm text-teal-700">
                <Check className="size-4" />
                {formData.horizontalLogo.name}
              </div>
            ) : (
              <>
                <Plus className="size-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drop image here</p>
              </>
            )}
          </button>
        </div>

        <div>
          <button
            onClick={() => setFormData({ ...formData, colorMode: "quick-start" })}
            className="flex items-center gap-3 mb-4"
          >
            <div className={`size-5 rounded-full border-2 flex items-center justify-center ${formData.colorMode === "quick-start" ? "border-teal-600" : "border-gray-300"
              }`}>
              {formData.colorMode === "quick-start" && (
                <div className="size-2.5 rounded-full bg-teal-600" />
              )}
            </div>
            <span className={`text-sm font-medium ${formData.colorMode === "quick-start" ? "text-teal-700" : "text-gray-600"
              }`}>
              Quick Start Palettes
            </span>
          </button>
          <p className="text-xs text-gray-600 mb-4">Choose a pre-designed colour palette to get started</p>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(colorPalettes).map(([key, palette]) => (
              <button
                key={key}
                onClick={() => {
                  setFormData({
                    ...formData,
                    selectedPalette: key,
                    colorMode: "quick-start"
                  });
                }}
                className={`relative border-2 rounded-lg p-4 transition-all text-left ${formData.selectedPalette === key && formData.colorMode === "quick-start"
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                {formData.selectedPalette === key && formData.colorMode === "quick-start" && (
                  <div className="absolute -top-2 -right-2 bg-teal-600 rounded-full p-1">
                    <Check className="size-3 text-white" />
                  </div>
                )}
                <div className="text-sm font-medium mb-2">{palette.name}</div>
                <div className="flex gap-1.5">
                  {palette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="h-8 flex-1 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setFormData({ ...formData, colorMode: "custom" })}
            className="flex items-center gap-3 mb-4"
          >
            <div className={`size-5 rounded-full border-2 flex items-center justify-center ${formData.colorMode === "custom" ? "border-teal-600" : "border-gray-300"
              }`}>
              {formData.colorMode === "custom" && (
                <div className="size-2.5 rounded-full bg-teal-600" />
              )}
            </div>
            <span className={`text-sm font-medium ${formData.colorMode === "custom" ? "text-teal-700" : "text-gray-600"
              }`}>
              Custom colour Palette
            </span>
          </button>
          <p className="text-xs text-gray-600 mb-4">Select your own colour palette to get started</p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { key: "primary", label: "Primary colour" },
              { key: "secondary", label: "Secondary colour" },
              { key: "tertiary", label: "Tertiary colour" },
              { key: "text", label: "Text colour" },
              { key: "background", label: "Background colour" },
            ].map((item) => (
              <div key={item.key}>
                <label className="block text-xs font-medium mb-2">{item.label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.customColors[item.key as keyof typeof formData.customColors]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customColors: {
                          ...formData.customColors,
                          [item.key]: e.target.value,
                        },
                        colorMode: "custom",
                      })
                    }
                    className="size-10 rounded border-2 border-gray-300 cursor-pointer"
                  />
                  <Input
                    value={formData.customColors[item.key as keyof typeof formData.customColors]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customColors: {
                          ...formData.customColors,
                          [item.key]: e.target.value,
                        },
                        colorMode: "custom",
                      })
                    }
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeConfigurationStep;


