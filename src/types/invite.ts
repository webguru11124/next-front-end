import { Roles, Tables } from "@/constants/forms";
import { access } from "fs";
import { z } from "zod";


export const InviteUserSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    role: z.string().optional(),
    access: z.array(z.object({
        table: z.string(),
        access: z.boolean()
    }))
});

export type InviteUserForm = z.infer<typeof InviteUserSchema>;

export type InviteUserServer = Omit<InviteUserForm, "role" | "name"> & {
    role?: number;
    name?: string;
}
export const initalInviteUser = () => ({
    email: "",
    access: Tables.map((table) => ({
        table, access: false,
    }))
})
export const convertInviteUserToServer = (data: InviteUserForm): InviteUserServer => {
    const gift: InviteUserServer = { email: data.email, access: data.access };
    if (data.role) gift.role = Roles.indexOf(data.role);
    if (data.name) gift.name = data.name;
    return gift;
}