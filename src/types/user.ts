import { z } from "zod";


export const UserSchema = z.object({
    email: z.string().email(),
    f_name: z.string().min(1),
    l_name: z.string().optional(),
    number: z.string().optional(),
    gender: z.string().optional(),
    country: z.string().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
});

export type UserForm = z.infer<typeof UserSchema>;


export interface User extends UserForm {
    id: string | null;
    img_url?: string
}


export const getUserFromSource = (data: User): User => (
    {
        id: data.id ?? null,
        email: data.email ?? "jack@test.com",
        f_name: data.f_name ?? "jack",
        l_name: data.l_name ?? "smith",
        number: data.number ?? "123-4567",
        gender: data.gender ?? "male",
        country: data.country ?? "US",
        language: data.language ?? "english",
        timezone: data.timezone ?? "EST",
    })