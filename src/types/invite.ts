import { OptionValue } from "@/components/SelectBox";
import { Roles, Tables } from "@/constants";
import { GiftTopIcon } from "@heroicons/react/24/outline";
import { access } from "fs";
import { z } from "zod";

export const InviteUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  role: z.string().optional(),
  access: z.array(
    z.object({
      table: z.string(),
      access: z.number(),
    }),
  ),
});

export type InviteUserForm = z.infer<typeof InviteUserSchema>;
export type InviteUser = InviteUserServer & {
  id: string | null;
};

export type InviteUserServer = Omit<InviteUserForm, "role" | "name"> & {
  role?: number;
  name?: string;
};
export type UserAccess = {
  email: string;
  f_name: string;
  role: number;
  l_name: string;
  access: Array<{
    table: number | null;
    access: number | null;
  }>;
};
export const initalInviteUser = () => ({
  email: "",
  access: Tables.map((table) => ({
    table: table.label,
    access: 1,
  })),
});
export const convertInviteUserToServer = (
  data: InviteUserForm,
): InviteUserServer => {
  const gift: InviteUserServer = { email: data.email, access: data.access };
  if (data.role) gift.role = Roles.map((e: OptionValue): string => e.label).indexOf(data.role);
  if (data.name) gift.name = data.name;
  return gift;
};
export const convFromAPIToForm = (data: UserAccess): InviteUserForm => {
  const gift: InviteUserForm = initalInviteUser();
  gift.email = data.email;
  gift.name = data.f_name;
  gift.role = Roles[data.role].label;
  for (const { access, table } of data.access) {
    if (table !== null && access !== null) {
      const matchedTable = Tables[table - 1].label;
      const existingTable = gift.access.find(
        (item) => item.table === matchedTable,
      );
      if (existingTable) {
        existingTable.access = access;
      }
    }
  }

  return gift;
};
