import axios from "axios"
import { toast } from "react-toastify"
import { useEffect, useState } from "react";

export default function LoginPage(props){

    const url=import.meta.env.VITE_SERVER_URL;
    const [logInDetails, setLogInDetails] = useState({
        userName: "",
        password:""
    });

    const [storeUser, setStoreUser] = useState(false);

    useEffect(()=>{
        const storedUsername = JSON.parse(localStorage.getItem('userName'));
        if(storedUsername) setStoreUser(true);
        if(storedUsername) setLogInDetails(prev=>({
            ...prev,
            userName: storedUsername
        }))
    }, [])

    async function handleSubmit (e){
        e.preventDefault();
        handleLocalStorage();
        try{
            const response = await axios.post(`${url}/auth/login`, logInDetails);
            if(response) toast.success('Login Successful');
        }
        catch(e){
            toast.error("Login Failed");
        }
    }

    function handleChange(e){
        const {name, value} = e.target;
        setLogInDetails(prev=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    function handleLocalStorage(){
        if(storeUser) {
            localStorage.setItem('userName', JSON.stringify(logInDetails.userName));
        }
        else{
            localStorage.removeItem('userName');
        }
    }


    return(
        <>
        <div className=" bg-black/20 backdrop-blur-md 
                w-[90%] max-w-[500px] 
                h-auto 
                absolute top-10 left-1/2 -translate-x-1/2
                md:left-10 md:translate-x-0
                border-2 rounded-3xl border-white/40 
                p-6 md:p-10 
                flex flex-col justify-between">

            <div>
                <h1 className="text-3xl md:text-5xl mb-2 text-white">WELCOME BACK!</h1>
                <p className="text-white text-sm md:text-base">
                    Login to create something amazing
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                    <label className="text-white">Username</label>
                    <input
                    type="text"
                    name="userName"
                    value={logInDetails.userName}
                    onChange={handleChange}
                    className="p-2 mt-2 border-2 border-white text-white rounded-md bg-transparent"
                    required
                    />

                    <label className="mt-5 text-white">Password</label>
                    <input
                    type="password"
                    name="password"
                    value={logInDetails.password}
                    onChange={handleChange}
                    className="p-2 mt-2 border-2 rounded-md text-white border-white bg-transparent"
                    required
                    />

                    <div className="mt-5 flex items-center">
                    <input
                        className="h-5 w-5"
                        type="checkbox"
                        checked={storeUser}
                        onChange={() => setStoreUser(!storeUser)}
                    />
                    <label className="pl-3 text-white">Remember Me</label>
                    </div>

                    <button
                    type="submit"
                    className="bg-white text-black rounded-3xl mt-8 py-3 cursor-pointer hover:bg-gray-200"
                    >
                    Login
                    </button>
                </form>
            </div>

            <div className="mx-auto text-center flex flex-col md:flex-row items-center gap-4 mt-6">
            <p className="text-white">Don't have an account?</p>
            <button
                onClick={props.toggleFunc}
                className="border-2 rounded-3xl text-white px-5 py-2 hover:bg-white/20"
            >
                Sign Up
            </button>
            </div>
        </div>
</>

    )

}