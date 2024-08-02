import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    label: string,
    inputValues: {
        name: string;
        email: string;
        phoneNo: string;
    },
    setInputValues: Dispatch<SetStateAction<{
        name: string;
        email: string;
        phoneNo: string;
    }>> ,
    disabled: {
        name: boolean,
        email: boolean,
        phoneNo: boolean;
    },
    setDisabled: Dispatch<SetStateAction<{
        name: boolean;
        email: boolean;
        phoneNo: boolean;
    }>>,
    field: "name" | "email" | "phoneNo",
}

export default function Field({
    label, inputValues, setInputValues, disabled, setDisabled, field
}: Props) 
{
    
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
                > 
                    SAVE
                </button>
            </div>
        </>
    )
}