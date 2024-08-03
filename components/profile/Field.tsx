import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { BasicDetailsDisabledOrNot, ProfileBasicDetails } from "@/config/Props";
import { toast } from "react-toastify";

interface Props {
    label: string,
    inputValues: ProfileBasicDetails,
    setInputValues: Dispatch<SetStateAction<ProfileBasicDetails>>,
    disabled: BasicDetailsDisabledOrNot,
    setDisabled: Dispatch<SetStateAction<BasicDetailsDisabledOrNot>>,
    field: "name" | "email" | "phoneNo",
}

export default function Field({
    label, inputValues, setInputValues, disabled, setDisabled, field
}: Props) 
{
    const { data: session } = useSession();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(disabled[field]) {
            setInputValues(prev => {
                return {
                    ...prev,
                    [field]: event.target.value
                }
            })
        }
    }

    const updateDetails = (
        field: "name" | "email" | "phoneNo", 
        inputValues: ProfileBasicDetails,
    ) => {
        axios.put('/api/user/update-details', {
            id: session?.user._id, [field]: inputValues[field], field
        })
        .then(res => {
            if(res.status === 202) {
                toast.success(res.data.message, { position: "top-center" });
                setDisabled(prev => ({
                    ...prev,
                    [field]: false,
                }))
            }
            else
                toast.error(res.data.message, { position: "top-center" });
        })
        .catch((err: AxiosError) => 
            //@ts-ignore
            toast.error(err.response?.data.message || err.message, { position: "top-center" })
        );
    }

    return (
        <>
            <label className="w-full text-xl mb-2">
                {label}
                <button type="button"
                    className="w-20 ml-4 bg-blue-600 text-white px-2 py-1 rounded-sm text-sm"
                    onClick={() => setDisabled(prev => {
                        return { ...prev, [field]: !prev[field] };
                    })}
                >
                    { disabled[field] ? "Cancel" : "Edit" }
                </button>
            </label>
            <div className={`flex gap-x-4 mb-3 ${field === "phoneNo" && "mb-0"}`}>
                <input 
                    type="text"
                    value={inputValues[field]}
                    className={`w-full px-4 py-2 rounded text-sm ${disabled[field] ? "bg-white border-black border-[1.5px]" : "border-gray-300 border"} outline-none`}
                    disabled={!disabled[field]}
                    onChange={e => handleOnChange(e)}
                />
                <button type="button"
                    className={`${!disabled[field] && "hidden"} bg-blue-600 px-6 py-2 rounded text-white font-semibold`}
                    onClick={() => updateDetails(field, inputValues)}
                > 
                    SAVE
                </button>
            </div>
        </>
    )
}