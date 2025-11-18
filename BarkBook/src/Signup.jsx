import './tailwind.css'
import { useState } from 'react'

export default function Signup(){

    const [newUserEmail, setnewUserEmail] = useState("")
    const [newUserPassword, setnewUserPassword] = useState("")
    const [numUsers, setnumUsers] = useState(0)

    function handleNewUser(){
        

        setnumUsers += 1;
        setnewUserEmail()
    }
    
    return(
       <>
        <div className="bg-amber-500 min-h-screen flex items-center justify-center">
            <div className="w-96 h-auto bg-white bg-opacity-90 flex flex-col items-center justify-center p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Now!</h2>
                
                <form className="w-full max-w-sm">
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
                        Sign Up
                    </button>
                </form>
                
            </div>
        </div>
       </>
    )}