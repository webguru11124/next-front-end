import useFileUpload from "@/api/upload";
import useUploadAPI from "@/api/upload";
import { useEffect, useRef } from "react";
import { Controller, useController, useForm, useFormContext } from "react-hook-form";
import { BsCloudArrowUp } from "react-icons/bs";
import Spinner from "../Spinner";

export default function FileUpload({ name }: { name: string }) {
    const { register, control, } = useFormContext();
    let inputRef: HTMLInputElement | null;
    const label = "Registration Documents";
    const placeholder = "Click to upload"
    const righticon = < BsCloudArrowUp />;

    const {
        field: { ref, onChange, value }
    } = useController({
        control,
        name,
    });

    // const [loading, setLoading] = useState(false);
    //   const onSubmit = async (data: any) => {
    //     // Handle submit logic here
    //   };

    const { mutate, isLoading, data } = useFileUpload();

    useEffect(() => {
        if (data) {
            console.log(JSON.stringify(data.result).length);
            onChange(JSON.stringify(data.result));
        }

    }, [data, onChange])

    const onChangeFile = async (e: any) => {
        const file = e.target.files[0];
        mutate(file);
    };


    return (<div>
        <div>
            {<label>{label}</label>}
            <div className="relative mt-2" onClick={() => inputRef?.click()}>
                <div
                    className="w-full rounded-md border border-gray-border px-[1em] outline-none py-2 text-lg"
                >
                    {!value ? <span className="text-gray-placeholder">{placeholder}</span> :
                        <span>{JSON.parse(value).originalname}</span>}
                </div>
                {/* {error && <div className="text-red">{error.message}</div>} */}
                {righticon && <div className="absolute  inset-y-0 right-3  py-3 text-blue-primary">{righticon}</div>}
            </div>
        </div>
        <input
            type="file"
            ref={(e) => {
                inputRef = e;
            }}
            onChange={(e) => {
                onChangeFile(e);
            }}
            className="hidden"
        />
        {isLoading && <Spinner />}
    </div >)
}