import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function Liked(){
    const [dropDown, setDropDown] = useState(true);


  function toggleDropDown(){
    setDropDown(!dropDown);
  }

  

    return(
        <div className="bg-amber-500 min-h-screen flex items-center justify-center">
        <div className="min-h-screen w-[50vw] min-w-96 relative">
            <div className="absolute top-4 right-4 w-15 h-15 bg-white rounded-full border border-black overflow-hidden flex items-center justify-center">
                <img 
                    src="/golden-retriever-tongue-out.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex justify-center pt-8">
                <h1 className="text-white text-3xl font-bold font-mono">Liked Posts</h1>
            </div>
            <div className="absolute top-4 left-4 cursor-pointer" onClick={toggleDropDown}>
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
                        d="M4 6h16M4 12h16M4 18h16" 
                    />
                </svg>
                <div id="MenuHolder">
                    {!dropDown && (
                        <div id="dropDownMenu" className="w-50 h-10 bg-white border border-black mt-1 flex items-center gap-2 px-2">
                            <svg className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h1 className="text-black text-lg font-bold whitespace-nowrap">Liked Posts</h1>
                        </div>
                    )}
                </div>
            </div>

            <div id="postsHolder" className="flex justify-center mt-16">
                <div className="w-full aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center">
                
                </div>
            </div>
            
        </div>
    </div>
    )
}

/*<div className="w-full aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center">
                
                </div>*/