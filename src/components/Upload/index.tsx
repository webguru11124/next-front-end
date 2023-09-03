import useFileUpload from "@/api/upload";
import useUploadAPI from "@/api/upload";
import { ReactNode, useEffect, useRef } from "react";
import { Controller, useController, useForm, useFormContext } from "react-hook-form";
import { BsCloudArrowUp } from "react-icons/bs";
import Spinner from "../Spinner";

const path = require('path')
const FileType = {
    image: "image/*",
    all: "*/*",
};

type FileUploadProps = {
    name: string;
    label?: string;
    type?: keyof typeof FileType;
    placeholder: string;
    children: ({ value, placeholder }: { value: any, placeholder: string }) => ReactNode;
}

export default function FileUpload(props: FileUploadProps) {
    const { register, control, } = useFormContext();
    let inputRef: HTMLInputElement | null;

    const {
        field: { ref, onChange, value }
    } = useController({
        control,
        name: props.name,
    });
    const { label, placeholder } = props;

    const type: keyof typeof FileType = props.type ?? "all";

    // const [loading, setLoading] = useState(false);
    //   const onSubmit = async (data: any) => {
    //     // Handle submit logic here
    //   };

    const { mutate, isLoading, data } = useFileUpload();

    useEffect(() => {
        if (data) {
            onChange(type === "image" ? data.result.filename : JSON.stringify(data.result));
        }

    }, [data, onChange])

    const onChangeFile = async (e: any) => {
        const file = e.target.files[0];
        mutate(file);
    };


    return (<div>
        {label && <label>{label}</label>}
        <div className="cursor-pointer" onClick={() => inputRef?.click()}>
            {
                props.children({ value: value ? (type === "image" ? value : JSON.parse(value)) : null, placeholder })
            }
            {/* {error && <div className="text-red">{error.message}</div>} */}
        </div>
        <input
            type="file"
            ref={(e) => {
                inputRef = e;
            }}
            onChange={(e) => {
                onChangeFile(e);
            }}
            accept={FileType[type]}
            className="hidden"
        />
        {isLoading && <Spinner />}
    </div >)
}