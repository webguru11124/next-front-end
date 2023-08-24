import {
  Countries,
  Currencies,
  Languages,
  OrgTypes,
  Province,
  Roles,
  Timezones,
  findValue,
} from "@/constants";
import { z } from "zod";
import { Value } from "./extra_value";
import { OptionValue } from "@/components/SelectBox";
import { optionalSchema } from "./extra";

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
  email: z.string().email().optional(),
  country: optionalSchema,
  language: optionalSchema,
  time_zone: optionalSchema,
  province: optionalSchema,
  type: optionalSchema,
  invite_role: optionalSchema,
  currency: optionalSchema,
});

export type OrgForm = z.infer<typeof OrgSchema>;

export const initalOrg = () => ({
  invite_email: null,
  invite_name: null,
  name: "",
});
export interface Organization extends OrgForm {
  id: string | null;
  role?: OptionValue;
}

export interface OrganizationFormServer {
  invite_email?: string;
  invite_name?: string;
  invite_role?: number;
  name: string;
  email?: string;
  country?: number;
  role?: number;
  type?: number;
  province?: string;
  currency?: number;
  language?: number;
  time_zone?: string;
}
export interface OrganizationServer extends OrganizationFormServer {
  id: string | null;
}
export const fromAPIToOrgForm = (data: OrganizationServer | null): Organization | null => {
  if (data === null || typeof data === "undefined") return null;
  const form: Organization = { name: data.name, email: data.email, id: data.id };
  form.country = findValue(Countries, data.country);
  form.type = findValue(OrgTypes, data.type);
  form.province = findValue(Province, data.province);
  form.currency = findValue(Currencies, data.currency);
  form.language = findValue(Languages, data.language);
  form.time_zone = findValue(Timezones, data.time_zone);
  form.role = findValue(Roles, data.role);

  return form;
}

export const convertOrgToServerFormat = (form: OrgForm): OrganizationFormServer => {
  const data: OrganizationFormServer = { name: form.name, email: form.email };
  if (form.country)
    data.country = form.country.value as number;
  if (form.currency)
    data.currency = form.currency.value as number;
  if (form.language)
    data.language = form.language.value as number;
  if (form.type) data.type = form.type.value as number;
  if (form.province) data.province = form.province.label;
  if (form.time_zone) data.time_zone = form.time_zone.label;
  if (form.invite_email) data.invite_email = form.invite_email;
  if (form.invite_role)
    data.invite_role = form.invite_role.value as number;

  return data;
};
