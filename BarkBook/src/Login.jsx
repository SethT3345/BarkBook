import './tailwind.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate(); 
    const [numUsers, setNumUsers] = useState(0);
    const [userAccounts, setUserAccounts] = useState([]);

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

    return(
       <>
       <div className="bg-amber-500 min-h-screen flex items-center justify-center">
            <div className="w-96 h-auto bg-white bg-opacity-90 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
                
                <form className="w-full max-w-sm" onSubmit={HandleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button 
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        type="submit"
                    >
                        Sign In
                    </button>

                    
                </form>

            </div>
        </div>
       </>
    )
}