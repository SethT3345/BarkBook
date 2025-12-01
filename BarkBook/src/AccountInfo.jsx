import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function AccountInfo(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
            navigate("/Login");
            return;
        }

        // Get the user accounts array and find the current user
        const userAccounts = JSON.parse(localStorage.getItem("userAccounts") || "[]");
        const user = userAccounts.find(account => account.userId === parseInt(userId));
        
        if (user) {
            setCurrentUser(user);
        }
    }, [navigate]);

    function togglePassword(){
        setShowPassword(!showPassword)
    }

    function goBack(){
        navigate("/Account")
    }

const currentTheme = localStorage.getItem("selectedTheme") || "German Shepard";

    return(
        <div className={
            currentTheme === "German Shepard" ? "bg-stone-800 min-h-screen flex items-center justify-center" :
            currentTheme === "Husky" ? "bg-blue-200 min-h-screen flex items-center justify-center" :
            currentTheme === "Irish Setter" ? "bg-green-800 min-h-screen flex items-center justify-center" :
            currentTheme === "Shih Tzu" ? "bg-purple-900 min-h-screen flex items-center justify-center" :
            "bg-stone-800 min-h-screen flex items-center justify-center"
        }>
            <div className={
                currentTheme === "German Shepard" ? "bg-amber-500 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black" :
                currentTheme === "Husky" ? "bg-white min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black" :
                currentTheme === "Irish Setter" ? "bg-green-100 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black" :
                currentTheme === "Shih Tzu" ? "bg-purple-300 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black" :
                "bg-amber-500 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black"
            }>  
                <div onClick={goBack} className="absolute top-4 left-4 cursor-pointer">
                    <svg 
                        className="w-10 h-10 text-black" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 19l-7-7 7-7" 
                        />
                    </svg>
                </div>
                
                <div className="flex justify-center pt-8">
                    <h1 className="text-black text-3xl font-bold font-mono">Account Info</h1>
                </div>

                <div className="flex flex-col items-center mt-16 gap-4">
                    {currentUser ? (
                        <>
                            
                                <h2 className="text-black text-xl font-bold">Account Email:</h2>
                                <p className="text-gray-700">{currentUser.userEmail}</p>
                           
                           
                                <h2 className="text-black text-xl font-bold">User ID:</h2>
                                <p className="text-gray-700">{currentUser.userId}</p>

                                <h2 className="text-black text-xl font-bold">Account Password:</h2>

                                {showPassword ? (
                                <p className="text-gray-700">{currentUser.userPassword}</p>
                                ) : (
                                     <p className="text-gray-700">*******</p>
                                )}

                                {showPassword ? 
                                (
                                    <button onClick={togglePassword} className="bg-white border border-black">Hide Password</button>
                                ) : (
                                <button onClick={togglePassword} className="bg-white border border-black">Show Password</button>
                                )}

                
                        </>
                    ) : (
                        <p className="text-white">Loading user information...</p>
                    )}
                </div>

            </div>
        </div>
    )
}