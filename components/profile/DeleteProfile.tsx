import { useState, useContext } from "react";
import { TiTick } from "react-icons/ti";
import toast from "react-hot-toast";
import { withSwal } from "react-sweetalert2";
import { UserDetailsContext, UserDetailsContextType } from "@/Context/UserDetails";
import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";

const capitalizeWords = (str: string) => {
    if(!str) return;
    const words = str.trim().split(/\s+/)[0];
    return words[0].toUpperCase() + words.slice(1, words.length).toLowerCase();
}

const DeleteProfile = ({swal, username}: {swal: any, username: string}) => {
    const [password, setPassword] = useState<string>("");
    const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
    const { userDetails } = useContext(UserDetailsContext) as UserDetailsContextType;

    const handleOnDelete = () => {        
        if(password === "" || password === null || password === undefined) {
            toast.error("password cannot be empty");
            return;
        }

        if(userDetails._id === undefined || userDetails._id === null) {
            toast.error("something went wrong");
            return;
        }

        axios.post(`/api/auth/check-password`, {
            userId: userDetails._id,
            password
        })
            .then(res => {
                if(res.status === 200) {
                    toast.success(res.data.message);
                    swal.fire({
                        title: `Hey ${capitalizeWords(username)},`,
                        text: 'Do you want to delete your account permanently ?',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        confirmButtonText: 'Delete Permanently',
                        confirmButtonColor: "#ef4444",
                        reverseButtons: true,
                    })
                        .then((resp: any) => {
                            if(resp.isConfirmed) {
                                axios.delete(
                                    `/api/user/delete-account?userId=${userDetails._id}`
                                )
                                    .then(response => {
                                        if(response.status === 202) {
                                            setTimeout(() => {
                                                swal.fire(
                                                    'Account deleted successfully ☘️', '', 'ok'
                                                ).
                                                    then((sres: any) => {
                                                        setTimeout(() => {
                                                            signOut({
                                                                callbackUrl: "/profile"
                                                            });
                                                            return;
                                                        }, 2000);
                                                    })
                                            }, 2000);
                                        }
                                        else {
                                            swal.fire(
                                                'Account not deleted', '', 'error'
                                            );
                                        }
                                    })
                                    .catch((err: AxiosError) => 
                                        swal.fire(err.message || err.response, '', 'error')
                                    );
                            }
                        })
                        .catch((err: any) => swal.fire(err.message, '', 'error'));
                }
            })
            .catch((err: AxiosError) => {
                swal.fire('Password mismatch. Enter correct password.', '', 'error');
            });
    }

    return (
        <div className="shadow-sm border-gray-100 border rounded-sm px-10 py-7 tracking-wider">
            <h1 className="text-xl font-bold">Delete your Account</h1>
            <div className="border border-red-600 py-4 px-6 mt-5 bg-red-100">
                <div className="flex items-center max-sm:flex-col max-sm:items-start gap-x-4 max-sm:gap-y-3">
                    Click the Delete button to delete your Account.
                    {
                        wantsToDelete ?
                        <button
                            className="bg-gray-500 py-2 px-6 rounded text-white uppercase"
                            onClick={() => setWantsToDelete(false)}
                        >
                            Cancel
                        </button> :
                        <button
                            className="bg-red-600 py-2 px-6 rounded text-white uppercase"
                            onClick={() => setWantsToDelete(true)}
                        >
                            Delete
                        </button>
                    }
                </div>
                <div className="mt-6">
                {
                    wantsToDelete &&
                    <div className="flex flex-col items-start gap-2">
                        <label className="text-sm">
                            Enter password
                        </label>
                        <div className="flex gap-x-4 w-full">
                            <input 
                                type="password"
                                className="border border-gray-400 py-2 px-4 rounded-sm w-3/5"
                                placeholder="Password"
                                onChange={e => setPassword(String(e.target.value))}
                            />
                            <div 
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:cursor-pointer"
                                onClick={handleOnDelete}
                            >
                                <TiTick className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

const DeleteAccount = withSwal(
    (
        {swal, username}: {swal: any, username: string}, 
        ref: any
    ) => (
        <DeleteProfile 
            swal={swal} 
            username={username} 
        />
    )
);

export default DeleteAccount;