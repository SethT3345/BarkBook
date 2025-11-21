import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function Comments(){
  const [dropDown, setDropDown] = useState(true);
  const [likedComments, setLikedComments] = useState([]);
  const [numComments, setNumComments] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("AllComments") || "[]");
    setLikedComments(storedComments);
    const storedNumComments = JSON.parse(localStorage.getItem("numComments"))
    setNumComments(storedNumComments)
  }, []);

  function toggleDropDown(){
    setDropDown(!dropDown);
  }


  
function goToHome(){
        navigate("/Home");
    }

  function goToLiked(){
    navigate("/Liked");
  }

  return(
    <div className="bg-amber-600 min-h-screen flex items-center justify-center">
        <div className="bg-amber-500 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black">
            <div className="absolute top-4 right-4 w-15 h-15 bg-white rounded-full border border-black overflow-hidden flex items-center justify-center">
                <img 
                    src="/golden-retriever-tongue-out.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex justify-center pt-8">
                <h1 className="text-white text-xl font-bold font-mono">Commented Posts</h1>
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
                        <div className="flex flex-col">
                            <div id="dropDownMenu1" className="w-50 h-10 bg-white border border-black mt-1 flex items-center gap-2 px-2">
                                <div id="div1" className="flex items-center gap-2">
                                    <svg onClick={goToLiked} className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <h1 className="text-black text-lg font-bold whitespace-nowrap" onClick={goToLiked}>Liked Posts</h1>
                                </div>
                            </div>
                            <div id="dropDownMenu2" className="w-50 h-10 bg-white border border-black mt-1 flex items-center gap-2 px-2">
                                <div id="div2" className="flex items-center gap-2">
                                    <svg onClick={goToHome} className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1-1m-6 0h6" />
                                    </svg>
                                    <h1 className="text-black text-lg font-bold whitespace-nowrap" onClick={goToHome}>Back to Home</h1>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-16">
                <div 
                    className="w-full aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center"
                >
                
                </div>

                <div className="w-full max-w-[521px] min-w-96 px-4 bg-white py-3 border-2 border-black h-auto text-black placeholder-gray-500 focus:outline-none focus:border-amber-600 flex items-center justify-center">
                    *Place Comment Here*
                </div>

                <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full border border-black transition-colors mt-4 text-sm"
                     >
                        Remove Comment
                </button>
            </div>
            
        </div>
    </div>
  )
}

/*
style={{
                        backgroundImage: dogUrl ? `url(${dogUrl})` : 'none'
                    }}
*/