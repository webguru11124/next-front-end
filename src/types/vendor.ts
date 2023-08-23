import { Tables } from "@/constants";
import { z } from "zod";
import { ExtraFormWithServer, OptionZodSchema } from "./extra";
import { Organization } from "./organization";
import { OptionValue } from "@/components/SelectBox";

export const VendorSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    website: z.string().url(),
    currency: OptionZodSchema,
    organization: OptionZodSchema,
    reg_document: z.string(),
    reg_number: z.string(),
    billing_address: z.string(),
    shipping_address: z.string(),
    extra: z.array(z.union([OptionZodSchema, z.string(), z.null(), z.undefined()]))

});

export type VendorForm = z.infer<typeof VendorSchema>;
export type VendorAtr = {
    name: string;
    shown: number;
    value: number | string;
    field_id: number;
    drop_name: string | null;
}
export type VendorFromServer = {
    id: string;
    name: string;
    email: string,
    phone: string,
    website: string,
    orginaztion_id: number,
    reg_document: string,
    reg_number: string,
    billing_address: string,
    shipping_address: string,
    atr: Array<VendorAtr>
}
export type VendorFormWithServer = {
    name: string;
    email: string,
    phone: string,
    website: string,
    organization_id: number,
    reg_document: string,
    reg_number: string,
    billing_address: string,
    shipping_address: string,
    [key: string]: string | number;
};

export type VendorServer = VendorFormWithServer & {
    id: string;
};
export interface Vendor extends VendorForm {
    id: string | null;
}
// export interface VendorWithServer extends VendorFormWithServer {
//     id: string | null;
//     dropdowns: Array<string>;
// }


export const initialVendorForm = () => ({
    name: "",
    email: "",
    phone: "",
    website: "",
    reg_document: "",
    reg_number: "",
    billing_address: "",
    shipping_address: "",
    extra: [],
})

export const fromExtraToForm = (data: VendorFromServer, organizations: Array<OptionValue> | null): VendorForm => {
    const mutateData: VendorForm = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        organization: {
            value: data.orginaztion_id,
            label: organizations?.find((org: OptionValue) => org.value == data.orginaztion_id)?.label ?? ""
        },
        reg_document: data.reg_document,
        reg_number: data.reg_number,
        billing_address: data.billing_address,
        shipping_address: data.shipping_address,
        extra: data.atr ? data.atr.map((extra) => ({
            value: extra.drop_name ? extra.name : extra.value,
            label: extra.drop_name ?? extra.value as string
        })) : []
    };
    return mutateData;
};
export const convertVendorToServer = (form: VendorForm, extra_fields: Array<ExtraFormWithServer> | null) => {
    const data: VendorFormWithServer = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        website: form.website,
        organization_id: form.organization?.value as number,
        reg_document: form.reg_document,
        reg_number: form.reg_number,
        billing_address: form.billing_address,
        shipping_address: form.shipping_address,
        imgUrl: "",
    };
    if (extra_fields)
        form.extra.forEach((extra, index) => {
            data[extra_fields[index].name] = typeof extra === "string" ? extra : extra?.value as string;
        });
    return data;
};
