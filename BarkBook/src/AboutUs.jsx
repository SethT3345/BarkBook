import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function AboutUs(){
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
            navigate("/Login");
            return;
        }
    }, [navigate]);

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
                    <h1 className="text-black text-3xl font-bold font-mono">About Us</h1>
                </div>

                <br></br><br></br>

                <div className="flex flex-col items-center gap-4 mt-8">
                    <div 
                        className="w-70 h-80 bg-cover bg-center border-2 border-black"
                        style={{ backgroundImage: "url('/Bark Zucc.png')" }}
                    ></div>
                    
                    <h1 className="text-black text-xl font-bold text-center">Owner/Founder: Bark Zuckerberg</h1>
                </div>

                <div className="px-8 mt-8 pb-8">
                    <div className="bg-white/90 rounded-lg p-6 border-2 border-black shadow-lg">
                        <p className="text-black text-base leading-relaxed">
                            <span className="font-bold text-lg">Woof woof!</span> I'm Bark Zuckerberg, proud founder, Chief Tail-Wagger, and Head Sniffer at BarkBook — the first social network made just for dogs. That's right, no humans allowed (except maybe the ones holding the leash).
                        </p>
                        
                        <p className="text-black text-base leading-relaxed mt-4">
                            BarkBook was born out of a very serious observation: dogs are amazing at connecting with other dogs, but the internet is full of boring human stuff. So I decided to create a space where dogs could truly be dogs online — a place where the most important interactions are simple, honest, and tail-waggingly fun.
                        </p>

                        <p className="text-black text-base leading-relaxed mt-4">
                            Here's the deal: on BarkBook, you can do two things — <span className="font-semibold">like and comment</span>. That's it. But don't let the simplicity fool you. Likes are the digital equivalent of a wagging tail or a high-five with a paw.
                        </p>

                        <div className="mt-6 mb-4">
                            <h3 className="text-black font-bold text-lg mb-3">BarkBook is a space where dogs can:</h3>
                            <ul className="space-y-2">
                                <li className="text-black flex items-center">
                                    <span className="mr-2">🐾</span>
                                    Show appreciation for each other with a simple like
                                </li>
                                <li className="text-black flex items-center">
                                    <span className="mr-2">💬</span>
                                    Bark, woof, or leave paw-sitive comments
                                </li>
                                <li className="text-black flex items-center">
                                    <span className="mr-2">🌎</span>
                                    Connect with their packmates near and far
                                </li>
                                <li className="text-black flex items-center">
                                    <span className="mr-2">🎉</span>
                                    Celebrate the simple joys: treats, walks, naps, and squeaky toys
                                </li>
                            </ul>
                        </div>

                        <p className="text-black text-base leading-relaxed mt-4">
                            Every feature was designed with a dog's brain in mind. Short attention spans? Check. Love of snacks? Check. Obsessive sniffing of every corner of the internet? Double check.
                        </p>

                        <div className="mt-6 text-center">
                            <p className="text-black font-bold text-lg italic">
                                "BarkBook: where simplicity meets tail-wagging connection."
                            </p>
                            <p className="text-black mt-2">
                                Paws and love,<br/>
                                <span className="font-bold">Bark Zuckerberg</span><br/>
                                <span className="text-sm">Founder & Chief Tail-Wagger, BarkBook</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}