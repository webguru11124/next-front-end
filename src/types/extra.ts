import { z } from "zod";


export const ExtraSchema = z.object({
    name: z.string().min(1),
    table: z.string().optional(),
    show_in_table: z.boolean().optional(),
    required: z.boolean().optional(),
    drop_down: z.boolean().optional(),
});

export type ExtraForm = z.infer<typeof ExtraSchema>;


export interface Extra extends ExtraForm {
    id: string | null;
}
