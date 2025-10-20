export type Plan = "Freemium" | "Bronze" | "Silver" | "Gold";

export type Step = "tenant-details" | "theme-configuration" | "unit-preferences";

export type TenantFormData = {
  tenantName: string;
  hostDomain: string;
  emailDomains: string[];
  preferredTier: Plan;
  supportedLanguages: string[];
  defaultLanguage: string;
  timeZone: string;
  favIcon: File | null;
  horizontalLogo: File | null;
  colorMode: "quick-start" | "custom";
  selectedPalette: string;
  customColors: {
    primary: string;
    secondary: string;
    tertiary: string;
    text: string;
    background: string;
  };
  measurementSystem: "Metrics" | "Imperial";
  measurementExpanded: boolean;
  medicalExpanded: boolean;
  units: {
    height: "m/cm" | "ft/in";
    weight: "kg" | "lbs";
    temperature: "°C" | "°F";
    distance: "km/m" | "mi";
    waterIntake: "mL" | "Fluid ounces (fl oz)";
    waistCircumference: "cm" | "in";
    bmi: "kg/m2" | "lb/in2";
    bloodPressure: "mmHg" | "kPa";
    bloodGlucose: "mmol/L" | "mg/dL";
    hba1c: "%" | "mmol/mol";
    lipids: "mmol/L" | "mg/dL";
  };
};

export type GetPlanIcon = (plan: Plan) => string;
export type GetPlanColor = (plan: Plan) => string;


