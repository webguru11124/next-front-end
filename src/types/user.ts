import { z } from "zod";
import { optionalSchema } from "./extra";
import { Countries, Genders, Languages, Timezones, findValue } from "@/constants";

export const UserSchema = z.object({
  email: z.string().email(),
  f_name: z.string().min(1),
  l_name: z.string().optional(),
  number: z.string().optional(),
  gender: optionalSchema,
  country: optionalSchema,
  language: optionalSchema,
  timezone: optionalSchema,
});

export type UserForm = z.infer<typeof UserSchema>;

export type UserAPIType = {
  f_name: string;
  l_name?: string;
  email: string;
  number?: string;
  third_party_id?: string;
  password?: string;
  status?: string;
  gender?: string;
  language?: string;
  timezone?: string;
  country?: number;
  img_url?: string;
  id: string;
}

export interface User extends UserForm {
  id: string;
  img_url?: string;
  role?: number;
}

export const getUserFromSource = (data: UserAPIType | null): User | null => {
  if (data === null || typeof data === "undefined") return null;
  const form: User = { f_name: data.f_name, email: data.email, id: data.id };
  form.number = data.number;
  form.l_name = data.l_name;
  form.img_url = data.img_url;
  form.gender = findValue(Genders, data.gender)
  form.language = findValue(Languages, data.language)
  form.timezone = findValue(Timezones, data.timezone);
  form.country = findValue(Countries, data.country);
  return form;
};

export const userTOAPIFormat = (form: User): UserAPIType => {
  const data: UserAPIType = { id: form.id, f_name: form.f_name, email: form.email };
  data.number = form.number;
  data.l_name = form.l_name;
  data.img_url = form.img_url;
  data.gender = form.gender?.label;
  data.language = form.language?.label;
  data.timezone = form.timezone?.label;
  data.country = form.country?.value as number;
  return data;
}