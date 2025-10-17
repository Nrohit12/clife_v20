interface CreateForm {
  form_name: string;
}

interface CreateSection {
  form_id: string;
  section_name: string;
  position: number;
}

interface CreateFormField {
  field_id: string;
  section_id: string;
  type: string;
  label: string;
  initial_value?: string;
  required: boolean;
  position: number;
  specific_props: null;
}

interface CreateMultiOption {
  field_id: string;
  label: string;
  value: string;
  position: number;
}
export type { CreateForm, CreateSection, CreateFormField, CreateMultiOption };
