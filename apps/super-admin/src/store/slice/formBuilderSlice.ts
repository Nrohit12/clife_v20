import {
  formBuilderInitialState,
  InputType,
  MultiSelectTypes,
} from "@/types/formBuilder.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: formBuilderInitialState = {
  title: "",
  description: "",
  sections: [
    {
      section_id: "1",
      section_name: "",
      form_fields: [
        {
          type: "text" as InputType,
          id: "1",
          specificProps: {
            input_type: "radio" as MultiSelectTypes,
            multi_options: [],
          },
          label: "",
          placeholder: "",
          value: "",
          required: false,
        },
      ],
    },
  ],
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {},
});

// export const { setQuestions, setSelected, setStats, setError, setStatus } =
//   formBuilderSlice.actions;
export const formBuilderReducer = formBuilderSlice.reducer;
