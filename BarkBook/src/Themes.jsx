import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Themes(){
    const navigate = useNavigate();
    const [theme, setTheme] = useState("German Shepard")

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
            navigate("/Login");
            return;
        }

        // Load saved theme
        const savedTheme = localStorage.getItem("selectedTheme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [navigate]);

    function goBack(){
        navigate("/Account")
    }

    function setGermanShepardTheme(){
        setTheme("German Shepard");
        localStorage.setItem("selectedTheme", "German Shepard");
    }

    function setHuskyTheme(){
        setTheme("Husky");
        localStorage.setItem("selectedTheme", "Husky");
    }

    function setIrishSetterTheme(){
        setTheme("Irish Setter");
        localStorage.setItem("selectedTheme", "Irish Setter");
    }

    function setShihTzuTheme(){
        setTheme("Shih Tzu");
        localStorage.setItem("selectedTheme", "Shih Tzu");
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
                    <h1 className="text-black text-3xl font-bold font-mono">Themes</h1>
                </div>

                <div className="flex flex-col items-center justify-center mt-16">
                    <div className="mb-4">
                    </div>
                    
                    <div className="flex flex-col gap-6 w-full max-w-sm">
                        
                        <div onClick={setGermanShepardTheme} className="bg-amber-400 p-6 rounded-xl shadow-lg border-2 border-white cursor-pointer hover:bg-amber-300 transition-all duration-300 transform hover:scale-[1.02]">
                            <h3 className="text-black font-bold text-xl text-center">German Shepard</h3>
                            <p className="text-black/70 text-center mt-2">Warm & Classic</p>
                        </div>
                        
                        <div onClick={setHuskyTheme} className="bg-blue-400 p-6 rounded-xl shadow-lg border-2 border-white cursor-pointer hover:bg-blue-300 transition-all duration-300 transform hover:scale-[1.02]">
                            <h3 className="text-white font-bold text-xl text-center">Husky</h3>
                            <p className="text-white/80 text-center mt-2">Cool & Calm</p>
                        </div>
                        
                        <div onClick={setIrishSetterTheme} className="bg-green-400 p-6 rounded-xl shadow-lg border-2 border-white cursor-pointer hover:bg-green-300 transition-all duration-300 transform hover:scale-[1.02]">
                            <h3 className="text-white font-bold text-xl text-center">Irish Setter</h3>
                            <p className="text-white/80 text-center mt-2">Fresh & Natural</p>
                        </div>
                        
                        <div onClick={setShihTzuTheme} className="bg-purple-400 p-6 rounded-xl shadow-lg border-2 border-white cursor-pointer hover:bg-purple-300 transition-all duration-300 transform hover:scale-[1.02]">
                            <h3 className="text-white font-bold text-xl text-center">Shih Tzu</h3>
                            <p className="text-white/80 text-center mt-2">Elegant & Bold</p>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}