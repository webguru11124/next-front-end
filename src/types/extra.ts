import { Tables } from "@/constants/forms";
import { z } from "zod";


export const ExtraSchema = z.object({
    name: z.string().min(1),
    table: z.string().optional(),
    show_in_table: z.string().optional(),
    required: z.string().optional(),
    drop_down: z.string().optional(),
});

export type ExtraFormWithServer = {
    name: string;
    place: number;
    show_in_table?: boolean;
    required?: boolean;
    type?: boolean;
};
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
        show_in_table: data.show_in_table ? "true" : "false",
        required: data.required ? "true" : "false",
        drop_down: data.type ? "true" : "false",
        table: Tables[data.place - 1],
    };
    return formData;
}
export const convertToExtraToServer = (data: ExtraForm) => {
    const mutateData: ExtraFormWithServer = { name: data.name, place: 0 };
    if (data.required) mutateData.required = data.required === "true";
    if (data.table) mutateData.place = Tables.indexOf(data.table) + 1;
    if (data.show_in_table) mutateData.show_in_table = data.show_in_table === "true";
    mutateData.type = data.drop_down ? data.drop_down === "true" : false;
    return mutateData;

}