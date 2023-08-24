import { OptionValue } from "@/components/SelectBox";
import { Tables } from "@/constants";
import { z } from "zod";

export const optionalSchema = z.object({
  value: z.union([z.number(), z.string()]),
  label: z.string()
}).optional();

export type OptionType = z.infer<typeof optionalSchema>;

export const ExtraSchema = z.object({
  name: z.string().min(1),
  table: optionalSchema,
  show_in_table: optionalSchema,
  required: optionalSchema,
  drop_down: optionalSchema,
});

export type ExtraFormWithServer = {
  name: string;
  place: number;
  show_in_table: number;
  required: number;
  type: number;
};
export const initialExtraField = (): ExtraForm => ({
  name: "",
})

export type ExtraForm = z.infer<typeof ExtraSchema>;

export interface Extra extends ExtraFormWithServer {
  id: string | null;
}
export interface ExtraWithServer extends ExtraFormWithServer {
  id: string | null;
  dropdowns: Array<string>;
}
export const formExtraToForm = (data: Extra): ExtraForm => {
  const formData: ExtraForm = {
    name: data.name,
    show_in_table: { value: data.show_in_table, label: data.show_in_table ? "true" : "false" },
    required: { value: data.required, label: data.required ? "true" : "false" },
    drop_down: { value: data.type, label: data.type ? "true" : "false" },
    table: Tables[data.place - 1],
  };
  return formData;
};
export const convertToExtraToServer = (form: ExtraForm): ExtraFormWithServer => {
  const data: ExtraFormWithServer = { name: form.name, place: 0, show_in_table: 0, required: 0, type: 0 };
  if (form.required) data.required = form.required.value as number;
  if (form.table) data.place = Tables.map((e: OptionValue): string => e.label).indexOf(form.table.value as string) + 1;
  if (form.show_in_table)
    data.show_in_table = form.show_in_table.value as number;
  data.type = form.drop_down?.value ? form.drop_down.value as number : 0;
  return data;
};
