import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import { ExtraWithServer } from "@/types/extra";
import { useFormContext } from "react-hook-form";

export default function ExtraItem({ extra, index }: { extra: ExtraWithServer, index: number }) {

    const { register, control } = useFormContext();
    return (extra && extra.type === 0 ?
        <Input
            register={register}
            name={`extra.${index}.value`}
            label={extra.name}
            placeholder={`Enter ${extra.name} here`}
        /> : <SelectBox
            control={control}
            name={`extra.${index}`}
            label={extra.name}
            placeholder={`Select ${extra.name} here`}
            options={extra.dropdowns.map((value, index) => ({ value: value, label: value }))}
        />)
}