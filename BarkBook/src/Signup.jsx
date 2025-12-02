import './tailwind.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
    const navigate = useNavigate(); 

    const [userAccounts, setUserAccounts] = useState([]);
    const [numUsers, setNumUsers] = useState(0);

    useEffect(() => {
        
        const storedNumUsers = parseInt(localStorage.getItem("numUsers") || "0");
        setNumUsers(storedNumUsers);
        
        const storedAccounts = JSON.parse(localStorage.getItem("userAccounts") || "[]");
        setUserAccounts(storedAccounts);
    }, []);

    function handleNewUser(e){
        e.preventDefault();
        
        const UserEmail = document.getElementById("email").value;
        const UserPassword = document.getElementById("password").value;

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(UserEmail)){
            alert("Email Address Is Not Valid, Please Enter A Valid Email");
            return;
        } else if (UserPassword.length < 6) {
            alert("Password Must Be 6 or more characters, Please Enter A Valid Password");
            return;
        } else {
            const newNumUsers = numUsers + 1;
            
            const newUserAccount = {
                userId: newNumUsers,
                userEmail: UserEmail,
                userPassword: UserPassword
            };
            
            const updatedAccounts = [...userAccounts, newUserAccount];
            
           
            setNumUsers(newNumUsers);
            setUserAccounts(updatedAccounts);

           
            localStorage.setItem("numUsers", newNumUsers.toString());
            localStorage.setItem("userAccounts", JSON.stringify(updatedAccounts));

            alert("Account Created! Please now login!");
            navigate("/Login");
        }
    }
    
const currentTheme = localStorage.getItem("selectedTheme") || "German Shepard";

    return(
       <>
        <div className={
            currentTheme === "German Shepard" ? "bg-stone-800 min-h-screen flex items-center justify-center" :
            currentTheme === "Husky" ? "bg-blue-200 min-h-screen flex items-center justify-center" :
            currentTheme === "Irish Setter" ? "bg-green-800 min-h-screen flex items-center justify-center" :
            currentTheme === "Shih Tzu" ? "bg-purple-900 min-h-screen flex items-center justify-center" :
            "bg-stone-800 min-h-screen flex items-center justify-center"
        }>
            <div className="w-96 h-auto bg-white bg-opacity-90 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Now!</h2>
                
                <form className="w-full max-w-sm" onSubmit={handleNewUser}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            
className={
                        currentTheme === "German Shepard" ? "focus:ring-stone-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        currentTheme === "Husky" ? "focus:ring-blue-200 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        currentTheme === "Irish Setter" ? "focus:ring-green-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        currentTheme === "Shih Tzu" ? "focus:ring-purple-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        "focus:ring-stone-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
        }

                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            
className={
                        currentTheme === "German Shepard" ? "focus:ring-stone-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        currentTheme === "Husky" ? "focus:ring-blue-200 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        currentTheme === "Irish Setter" ? "focus:ring-green-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        currentTheme === "Shih Tzu" ? "focus:ring-purple-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2" :
                        "focus:ring-stone-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
        }

                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button 
                        
className={
                        currentTheme === "German Shepard" ? "bg-stone-800 w-full text-white font-bold py-2 px-4 rounded-md transition duration-300" :
                        currentTheme === "Husky" ? "bg-blue-200 hover:bg-blue-300 w-full text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300" :
                        currentTheme === "Irish Setter" ? "bg-green-800 w-full text-white font-bold py-2 px-4 rounded-md transition duration-300" :
                        currentTheme === "Shih Tzu" ? "bg-purple-900 w-full text-white font-bold py-2 px-4 rounded-md transition duration-300" :
                        "bg-stone-800 w-full text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300"
        }

                        type="submit"
                    >
                        Sign Up
                    </button>

                     <div className="mt-4 text-center">
                        <span className="text-gray-600">Already have an account? </span>
                        <button 
                            onClick={() => navigate("/Login")}
                            
className={
                        currentTheme === "German Shepard" ? "text-stone-800 font-bold underline" :
                        currentTheme === "Husky" ? "text-blue-200 font-bold underline" :
                        currentTheme === "Irish Setter" ? "text-green-800 font-bold underline" :
                        currentTheme === "Shih Tzu" ? "text-purple-900 font-bold underline" :
                        "text-stone-800 font-bold underline"
        }

                            type="button"
                        >
                            Log in here!
                        </button>
                    </div>

                </form>
                
            </div>
        </div>
       </>
    )
}