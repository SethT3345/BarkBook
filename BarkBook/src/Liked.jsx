import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Liked(){
    const [dropDown, setDropDown] = useState(true);
    const [likedPosts, setLikedPosts] = useState([]);
    const navigate = useNavigate();

    function toggleDropDown(){
        setDropDown(!dropDown);
    }

    function goToHome(){
        navigate("/Home");
    }

    function removeLikedPost(imageUrl){

        const updatedPosts = likedPosts.filter(url => url !== imageUrl);
        setLikedPosts(updatedPosts);
        

        localStorage.setItem('LikedPosts', JSON.stringify(updatedPosts));
        
  
        const currentLikes = parseInt(localStorage.getItem('numLikes') || '0');
        const newLikes = Math.max(0, currentLikes - 1);
        localStorage.setItem('numLikes', newLikes.toString());
    }

    useEffect(() => {

        const storedPosts = JSON.parse(localStorage.getItem("LikedPosts") || "[]");
        setLikedPosts(storedPosts);
    }, []);

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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1-1m-6 0h6" />
                                </svg>
                                <h1 className="text-black text-lg font-bold whitespace-nowrap" onClick={goToHome}>Back to Home</h1>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center mt-16 gap-8 pb-8">
                    {likedPosts.length === 0 ? (
                        <p className="text-white text-xl">No liked posts yet!</p>
                    ) : (
                        likedPosts.map((imageUrl, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div 
                                    className="w-full aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${imageUrl})`
                                    }}
                                >
                                </div>
                                <button 
                                    onClick={() => removeLikedPost(imageUrl)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full border border-black transition-colors mt-4 text-sm"
                                >
                                    Remove Liked Photo
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

/*<div className="w-full aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center">
                
                </div>*/