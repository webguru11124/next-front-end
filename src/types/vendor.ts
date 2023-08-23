import { Tables } from "@/constants";
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
export type VendorFormWithServer = Omit<VendorForm, "extra"> & {
    imgUrl: string;
    [key: string]: string | number;

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
    currency: "",
    organization: "",
    reg_document: "",
    reg_number: "",
    billing_address: "",
    shipping_address: "",
    extra: [],
})

export const fromExtraToForm = (data: VendorFormWithServer): VendorForm => {
    const mutateData: VendorForm = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        currency: data.currency,
        organization: data.organization,
        reg_document: data.reg_document,
        reg_number: data.reg_number,
        billing_address: data.billing_address,
        shipping_address: data.shipping_address,
        extra: []
    };

    return mutateData;
};
export const convertVendorToServer = (data: VendorForm) => {
    const mutateData: VendorFormWithServer = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        currency: data.currency,
        organization: data.organization,
        reg_document: data.reg_document,
        reg_number: data.reg_number,
        billing_address: data.billing_address,
        shipping_address: data.shipping_address,
        imgUrl: "",
    };
    data.extra.forEach((extra) => {
        mutateData[extra.name] = extra.value;
    });
    return mutateData;
};
