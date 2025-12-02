import './tailwind.css'
import { useState, useEffect, use } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate(); 
    const [numUsers, setNumUsers] = useState(0);
    const [userAccounts, setUserAccounts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState();

    useEffect(() => {
        const storedNumUsers = localStorage.getItem("numUsers") || 0;
        setNumUsers(parseInt(storedNumUsers));
        
        const storedAccounts = JSON.parse(localStorage.getItem("userAccounts") || "[]");
        setUserAccounts(storedAccounts);
    }, []);

    function HandleLogin(e){
        e.preventDefault();
        
        const enteredEmail = document.getElementById("email").value;
        const enteredPassword = document.getElementById("password").value;
        let loginSuccessful = false; 
        
        
        for (const account of userAccounts) {
            if (enteredEmail === account.userEmail && enteredPassword === account.userPassword) {
                loginSuccessful = true;
                
                localStorage.setItem("currentUserId", account.userId);
                setCurrentUserId(account.userId); 
                break;
            }
        }
        
        if (loginSuccessful) {
            alert("Login successful!");
            navigate("/Home");
        } else {
            alert("Invalid email or password. Please try again.");
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
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
                
                <form className="w-full max-w-sm" onSubmit={HandleLogin}>
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
                            
                    
                            id="email"
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
                        Sign In
                    </button>

                    <div className="mt-4 text-center">
                        <span className="text-gray-600">Don't have an account? </span>
                        <button 
                            onClick={() => navigate("/Signup")}

                            className={
                        currentTheme === "German Shepard" ? "text-stone-800 font-bold underline" :
                        currentTheme === "Husky" ? "text-blue-200 font-bold underline" :
                        currentTheme === "Irish Setter" ? "text-green-800 font-bold underline" :
                        currentTheme === "Shih Tzu" ? "text-purple-900 font-bold underline" :
                        "text-stone-800 font-bold underline"
        }

                        
                            type="button"
                        >
                            Sign up here!
                        </button>
                    </div>
                    
                </form>

            </div>
        </div>
       </>
    )
}