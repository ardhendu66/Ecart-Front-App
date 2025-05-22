import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { withSwal } from "react-sweetalert2";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

const capitalizeWords = (str: string) => {
    if(!str) return;
    const words = str.trim().split(/\s+/)[0];
    return words[0].toUpperCase() + words.slice(1, words.length).toLowerCase();
}

const ChangePasswordComponent = ({swal, username}: {swal: any, username: string}) => {
    const [oldpassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [cnfPassword, setCnfPassword] = useState<string>("");
    const [wantsToChange, setWantsToChange] = useState<boolean>(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;
    const router = useRouter();

    const handleOnChangePassword = () => {        
        if(!oldpassword || ! newPassword || !cnfPassword) {
            toast.error("password fields cannot be empty");
            return;
        }

        if(newPassword !== cnfPassword) {
            toast.error("New password didn't match with confirm password");
            return;
        }

        if(oldpassword === newPassword || oldpassword === cnfPassword) {
            toast.error("Old password and new password cannot be same");
            return;
        }

        if(userDetails._id === undefined || userDetails._id === null) {
            toast.error("something went wrong");
            return;
        }

        axios.post('/api/auth/check-password', {
            userId: userDetails._id,
            password: oldpassword
        })
            .then(res => {
                if(res.status === 200) {
                    // toast.success(res.data.message);
                    axios.put('/api/user/change-password', {
                        userId: userDetails?._id,
                        password: newPassword
                    })
                        .then(response => {
                            if(response.status === 202) {
                                setTimeout(() => {
                                    toast.success('Account password changed successfully ☘️');
                                }, 800);
                                setTimeout(() => {
                                    router.reload();
                                }, 1200);

                            }
                        })
                        .catch((err: AxiosError) => 
                            //@ts-ignore
                            toast.error(err.message || err.response?.data)
                        ); 
                }
                else {
                    toast.error("Old Password didn't match. Enter correct password.");
                }
            })
            .catch((err: AxiosError) => {
                toast.error("Old Password didn't match. Enter correct password.");
            });
    }

    return (
        <div className="shadow-sm border-gray-100 border rounded-sm px-10 py-7 tracking-wider">
            <h1 className="text-xl font-bold">
                Change your password
            </h1>
            <div className="border border-sky-600 py-4 px-6 mt-5 bg-gray-100">
                <div className="flex items-center max-sm:flex-col max-sm:items-start gap-x-4 max-sm:gap-y-3">
                    Click the Change button to change your account password.
                    {
                        wantsToChange ?
                        <button
                            className="bg-gray-500 py-2 px-6 rounded text-white uppercase"
                            onClick={() => setWantsToChange(false)}
                        >
                            Cancel
                        </button> :
                        <button
                            className="bg-green-500 py-2 px-6 rounded text-white uppercase"
                            onClick={() => setWantsToChange(true)}
                        >
                            Change
                        </button>
                    }
                </div>
                <div className="mt-6">
                {
                    wantsToChange &&
                    <div className="flex flex-col items-start gap-2">
                        <label className="text-sm">
                            Enter your Old password
                        </label>
                        <div className="flex gap-x-4 w-full">
                            <input 
                                type="password"
                                className="border border-gray-400 py-2 px-4 rounded-sm w-3/5"
                                placeholder="Old Password"
                                onChange={e => setOldPassword(String(e.target.value))}
                            />
                        </div>
                        <label className="text-sm">
                            Enter your New password
                        </label>
                        <div className="flex gap-x-4 w-full">
                            <input 
                                type="password"
                                className="border border-gray-400 py-2 px-4 rounded-sm w-3/5"
                                placeholder="New Password"
                                onChange={e => setNewPassword(String(e.target.value))}
                            />
                        </div>
                        <label className="text-sm">
                            Confirm your New password
                        </label>
                        <div className="flex gap-x-4 w-full">
                            <input 
                                type="password"
                                className="border border-gray-400 py-2 px-4 rounded-sm w-3/5"
                                placeholder="Confirm Password"
                                onChange={e => setCnfPassword(String(e.target.value))}
                            />
                        </div>
                        <button
                            type="button"
                            className="mt-3 bg-green-500 py-2 px-4 rounded-sm text-white uppercase"
                            onClick={handleOnChangePassword}
                        >
                            Change
                        </button>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

const ChangePassword = withSwal(
    (
        {swal, username}: {swal: any, username: string}, 
        ref: any
    ) => (
        <ChangePasswordComponent 
            swal={swal} 
            username={username} 
        />
    )
);

export default ChangePassword;