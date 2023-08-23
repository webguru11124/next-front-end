import {
  Countries,
  Currencies,
  Languages,
  OrgTypes,
  Roles,
} from "@/constants";
import { z } from "zod";
import { Value } from "./extra_value";
import { OptionValue } from "@/components/SelectBox";

function nullableEmail() {
  return z
    .string()
    .nullable()
    .refine(
      (value) => value === null || value === "" || /^\S+@\S+\.\S+$/.test(value),
      {
        message: "Invalid email format or must be null",
      },
    );
}

export const OrgSchema = z.object({
  invite_email: nullableEmail().optional(),
  name: z.string().min(1),
  country: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  time_zone: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  invite_role: z.string().optional().nullable(),
  currency: z.string().optional().nullable(),
});

export type OrgForm = z.infer<typeof OrgSchema>;

export const initalOrg = () => ({
  invite_email: null,
  invite_name: null,
  country: "",
  time_zone: "",
  language: "",
  province: "",
  type: "",
  invite_role: "",
  currency: "",
  name: "",
});
export interface Organization extends OrgForm {
  id: number | null;
}
export const convertOrgToServerFormat = (data: OrgForm): OrgForm => {
  const mutateData: OrgForm = { name: data.name };
  if (data.country)
    mutateData.country = Countries.map((e: OptionValue): string => e.label).indexOf(data.country).toString();
  if (data.currency)
    mutateData.currency = Currencies.map((e: OptionValue): string => e.label).indexOf(data.currency).toString();
  if (data.language)
    mutateData.language = Languages.map((e: OptionValue): string => e.label).indexOf(data.language).toString();
  if (data.type) mutateData.type = OrgTypes.map((e: OptionValue): string => e.label).indexOf(data.type).toString();
  if (data.province) mutateData.province = data.province;
  if (data.time_zone) mutateData.time_zone = data.time_zone;
  if (data.invite_email) mutateData.invite_email = data.invite_email;
  if (data.invite_role)
    mutateData.invite_role = Roles.map((e: OptionValue): string => e.label).indexOf(data.invite_role).toString();

  return mutateData;
};
