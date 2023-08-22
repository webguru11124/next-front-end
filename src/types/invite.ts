import { Roles, Tables } from "@/constants/forms";
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
      access: z.boolean(),
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
    table,
    access: false,
  })),
});
export const convertInviteUserToServer = (
  data: InviteUserForm,
): InviteUserServer => {
  const gift: InviteUserServer = { email: data.email, access: data.access };
  if (data.role) gift.role = Roles.indexOf(data.role);
  if (data.name) gift.name = data.name;
  return gift;
};
export const convFromAPIToForm = (data: UserAccess): InviteUserForm => {
  const gift: InviteUserForm = initalInviteUser();
  gift.email = data.email;
  gift.name = data.f_name;
  gift.role = Roles[data.role];
  for (const { access, table } of data.access) {
    if (table !== null && access !== null) {
      const matchedTable = Tables[table - 1].toLowerCase();
      const existingTable = gift.access.find(
        (item) => item.table === matchedTable,
      );
      if (existingTable) {
        existingTable.access = access === 2;
      }
    }
  }

  return gift;
};
