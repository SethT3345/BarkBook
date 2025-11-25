import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function AccountInfo(){
    const navigate = useNavigate(); // Fix: Call useNavigate() as a function and move inside component

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
            navigate("/Login");
            return;
        }
    }, [navigate]); // Fix: Add dependency array

    function goBack(){
        navigate("/Account")
    }

    return(
        <div className="bg-amber-600 min-h-screen flex items-center justify-center">
            <div className="bg-amber-500 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black">
                
                <div onClick={goBack} className="absolute top-4 left-4 cursor-pointer">
                    <svg 
                        className="w-10 h-10 text-white" 
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
                    <h1 className="text-white text-3xl font-bold font-mono">Account Info</h1>
                </div>

            </div>
        </div>
    )
}