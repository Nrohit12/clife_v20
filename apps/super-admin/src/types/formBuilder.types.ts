export type ValidationType = {
  isRequired: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
  allowAlphabets?: boolean;
  allowNumbers?: boolean;
  allowSpecialCharacters?: boolean;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialCharacters?: boolean;
  specialChractersSet?: string;
};

export type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "radio"
  | "checkbox";

export type MultiSelectTypes = "select" | "radio" | "checkbox";

export enum InputTypeEnum {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
}

export enum MultiSelectTypesEnum {
  SELECT = "select",
  RADIO = "radio",
  CHECKBOX = "checkbox",
}

export type MultiOption = {
  label: string;
  value: string;
  child?: FormFieldType[];
};

export type FormFieldType = {
  type: InputType;
  id: string;
  specificProps?: {
    input_type?: MultiSelectTypes;
    multi_options?: MultiOption[];
  };
  label: string;
  isActive?: boolean;
  placeholder: string;
  initialValue?: string | boolean | number;
  value: string | boolean;
  required: boolean;
  active?: boolean;
  validation?: ValidationType;
};

export type SectionType = {
  section_id: string;
  section_name: string;
  form_fields: FormFieldType[];
};

export type FormPayloadType = {
  form_id: string;
  form_name: string;
  sections: SectionType[];
  current_section?: number;
};

export interface formBuilderInitialState {
  title: string;
  description: string;
  sections: SectionType[];
}
