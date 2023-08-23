import { Tables } from "@/constants/forms";
import { z } from "zod";

export const VendorSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    website: z.string().url(),
    currency: z.string(),
    organization: z.string(),
    reg_document: z.string(),
    reg_number: z.string(),
    billing_address: z.string(),
    shipping_address: z.string(),
    extra: z.array(z.object({
        name: z.string().min(1),
        value: z.union([z.string(), z.number()])
    }))

});

export type VendorForm = z.infer<typeof VendorSchema>;
export type ExtraFormWithServer = {
    name: string;
    place: number;
    show_in_table?: boolean;
    required?: boolean;
    type?: boolean;
};

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
};
export const convertToExtraToServer = (data: ExtraForm) => {
    const mutateData: ExtraFormWithServer = { name: data.name, place: 0 };
    if (data.required) mutateData.required = data.required === "true";
    if (data.table) mutateData.place = Tables.indexOf(data.table) + 1;
    if (data.show_in_table)
        mutateData.show_in_table = data.show_in_table === "true";
    mutateData.type = data.drop_down ? data.drop_down === "true" : false;
    return mutateData;
};
