import { Tables, findValue } from "@/constants";
import { z } from "zod";
import { ExtraFormWithServer, optionalSchema } from "./extra";
import { Organization } from "./organization";
import { OptionValue } from "@/components/SelectBox";

export const VendorSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    website: z.string().url(),
    currency: optionalSchema,
    organization: optionalSchema,
    reg_document: z.string(),
    reg_number: z.string(),
    billing_address: z.string(),
    imgUrl: z.string().optional(),
    shipping_address: z.string(),
    extra: z.array(z.union([optionalSchema, z.string(), z.null(), z.undefined()]))

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
    imgUrl: string;
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
    imgUrl: string;
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
        reg_document: data.reg_document,
        reg_number: data.reg_number,
        billing_address: data.billing_address,
        shipping_address: data.shipping_address,
        extra: data.atr ? data.atr.map((extra) => {

            if (extra.drop_name) return {
                value: extra.value,
                label: extra.drop_name as string
            }
            else return extra.value as string;
        }) : []
    };

    if (organizations) mutateData.organization = findValue(organizations, data.orginaztion_id);
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
        imgUrl: form.imgUrl ?? "",
    };
    if (extra_fields)
        form.extra.forEach((extra, index) => {
            data[extra_fields[index].name] = typeof extra === "string" ? extra : extra?.label as string;
        });
    return data;
};
