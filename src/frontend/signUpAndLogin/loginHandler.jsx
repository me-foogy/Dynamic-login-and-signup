import InteractiveBoxesFromSpline from './spline'
import LoginPage from './loginPage';
import { useState} from 'react';
import SignUpPage from './signUpPage';

export default function LoginHandler(){
    const [isLoginPage, setIsLoginPage] = useState(true);
    function togglePage(){
        setIsLoginPage(!isLoginPage);
    }

    return(
        <div className="bg-linear-to-r from-black to-black w-full h-screen relative">
        <InteractiveBoxesFromSpline/>
        {isLoginPage?<LoginPage toggleFunc={togglePage}/>:<SignUpPage toggleFunc={togglePage}/>}
        </div>
    )
}