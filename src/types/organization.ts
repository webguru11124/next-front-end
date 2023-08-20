
import { z } from "zod";


export const OrgSchema = z.object({
    invite_email: z.string().email().nullable(),
    name: z.string().min(1),
    country: z.string().optional().nullable(),
    language: z.string().optional().nullable(),
    timezone: z.string().optional().nullable(),
    province: z.string().optional().nullable(),
    type: z.string().optional().nullable(),
    invite_role: z.string().optional().nullable(),
    currency: z.string().optional().nullable(),
});

export type OrgForm = z.infer<typeof OrgSchema>;



export interface Organization extends OrgForm {
    id: string | null;
}