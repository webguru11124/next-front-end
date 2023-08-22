import { Tables } from "@/constants/forms";
import { Extra } from "./extra";

export interface ExtraValueForm {
  table: string;
  field: string;
  values: Array<Value>;
}
export interface ExtraValue {
  id: string | null;
  place: number;
  values: Array<Value>;
  name: string;
}
export interface Value {
  value: string;
  id: string | null;
}

export const formExtraValueToForm = ({
  extra_field,
  values,
}: {
  extra_field: Extra | null;
  values: Array<Value> | null;
}): ExtraValueForm => {
  const data: ExtraValueForm = { table: "", field: "", values: [] };
  if (extra_field) {
    data.field = extra_field.name;
    data.table = Tables[extra_field.place - 1];
  }
  if (values) {
    for (const value of values) {
      data.values?.push({ ...value });
    }
  }
  return data;
};
