import { useState,useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";


export default function SignUpPage(props){

    const url = import.meta.env.VITE_SERVER_URL;
    const[userDetails, setUserDetails] = useState({
        userName: "",
        password: "",
        passwordCheck: ""
    });
    const[passwordMatch, setPasswordMatch] = useState('true');
    const[userNameAvailability, setUserNameAvailability] = useState(true);
    const [typingTimeout, setTypingTimeout] = useState(NaN); //state variable for the debouncing function
    const [passwordCharacterChecker, setPasswordCharacterChecker] = useState(true) //true contains uppercase, numbers and special character

    useEffect(()=>{
        if(userDetails.password === userDetails.passwordCheck) setPasswordMatch(true);
        else setPasswordMatch(false);
        console.log(userDetails);
    },[userDetails])

    function handleChange(e){
        const {name, value} = e.target;
        setUserDetails(prev=>({
                ...prev,
                [name]: value
            })
        )

        if(name==='userName'){
            if(typingTimeout) clearTimeout(typingTimeout);
            const timeout = setTimeout(()=>{
                checkUsernameAvailability(value);
            },1000) //1 sec debouncing
            setTypingTimeout(timeout);
        }

        if(name === 'password'){
            //check password strength
            const hasCapital = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            if((hasCapital && hasNumber)||value ==='') setPasswordCharacterChecker(true);
            else setPasswordCharacterChecker(false);
        }
    }

    async function checkUsernameAvailability(userName){
        try{
            const userNameCheck=await axios.post(`${url}/auth/usernamecheck`,{userName});
            //user name check returns the check status and the username availability
            setUserNameAvailability(userNameCheck.data.availability); 
        }catch(e){
            console.log('there is an error',e)
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await axios.post(`${url}/auth/signup`, userDetails);
            console.log("User sucessfully added");
            toast.success("User added Successfully");
        }
        catch(e){
            console.log("Error adding user", e)
            toast.error("Error adding the user");
        }
    }

    return(
        <>
            <div className="
                bg-black/20 backdrop-blur-md 
                w-[90%] max-w-[500px] 
                h-auto 
                absolute top-10 left-1/2 -translate-x-1/2
                md:left-10 md:translate-x-0
                border-2 rounded-3xl border-white/40 
                p-6 md:p-10 
                flex flex-col justify-between
            ">
                <div>
                    <h1 className="text-2xl md:text-4xl mb-2 text-white">Create New Account</h1>
                    <p className="text-white text-sm md:text-base">
                        Sign in today for an amazing experience
                    </p>

                    <form className="flex flex-col mt-5">
                        <div className="flex flex-col">

                            <label className="text-white">Username</label>
                            <input
                                type="text"
                                name="userName"
                                value={userDetails.userName}
                                onChange={handleChange}
                                className="p-2 mt-2 border-2 rounded-md text-white"
                                required
                            />
                            {!userNameAvailability && (
                                <p className="text-red-500 mt-1 font-bold text-sm">
                                    Username already taken
                                </p>
                            )}

                            <label className="mt-3 text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={userDetails.password}
                                onChange={handleChange}
                                className="p-2 border-2 rounded-md mt-2 text-white"
                                required
                            />

                            <label className="mt-3 text-white">Confirm Password</label>
                            <input
                                type="password"
                                name="passwordCheck"
                                value={userDetails.passwordCheck}
                                onChange={handleChange}
                                className="p-2 border-2 rounded-md mt-2 text-white"
                                required
                            />

                            {!passwordCharacterChecker && (
                                <p className="text-red-500 mt-1 font-bold text-sm">
                                    Password must have a number and capital letter
                                </p>
                            )}

                            {!passwordMatch && (
                                <p className="text-red-500 mt-1 font-bold text-sm">
                                    *Passwords do not match
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!passwordMatch || userNameAvailability}
                            onClick={handleSubmit}
                            className={`
                                mt-4 py-3 rounded-3xl font-bold
                                ${passwordMatch && userNameAvailability
                                    ? "bg-white text-black cursor-pointer"
                                    : "bg-white/50 text-white"
                                }
                            `}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                <div className="mx-auto mt-5 text-center flex flex-col md:flex-row items-center gap-3">
                    <p className="text-white">Already have an account?</p>
                    <button
                        onClick={props.toggleFunc}
                        className="border-2 rounded-3xl px-5 py-2 cursor-pointer text-white"
                    >
                        Log In
                    </button>
                </div>
            </div>
</>

    )

}