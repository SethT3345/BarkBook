import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Liked(){
    const [dropDown, setDropDown] = useState(true);
    const [likedPosts, setLikedPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();
    const [pDropDown, setPDropDown] = useState(false); 

    
    const getUserKey = (key) => `${key}_user_${currentUserId}`;

    useEffect(() => {
       
        const userId = localStorage.getItem("currentUserId");
        if (!userId) {
      
            navigate("/Login");
            return;
        }
        setCurrentUserId(userId);
        

        const storedPosts = JSON.parse(localStorage.getItem(`LikedPosts_user_${userId}`) || "[]");
        setLikedPosts(storedPosts);
    }, []);

    function logOut(){
    localStorage.removeItem("currentUserId");

    navigate("/Login")
  }

  function goToAandS(){
    navigate("/Account")
  }

  function togglePDropDown(){
    setPDropDown(!pDropDown);
  }


    function toggleDropDown(){
        setDropDown(!dropDown);
    }

    function goToHome(){
        navigate("/Home");
    }

    function goToComments(){
        navigate("/Comments")
    }

    function removeLikedPost(imageUrl){
        if (!currentUserId) return;

        
        const updatedPosts = likedPosts.filter(url => url !== imageUrl);
        setLikedPosts(updatedPosts);
        
       
        localStorage.setItem(getUserKey('LikedPosts'), JSON.stringify(updatedPosts));
        
      
        const currentLikes = parseInt(localStorage.getItem(getUserKey('numLikes')) || '0');
        const newLikes = Math.max(0, currentLikes - 1);
        localStorage.setItem(getUserKey('numLikes'), newLikes.toString());
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
                <div onClick={togglePDropDown} className="absolute top-4 right-4 w-15 h-15 bg-white rounded-full border-2 border-black overflow-hidden flex items-center justify-center">
                    <img 
                        src="/DogPFP.png" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {pDropDown && (
                <div className="flex flex-col absolute top-20 right-4">
                    <div onClick={goToAandS} className="bg-white border border-black w-50 h-10 flex items-center gap-2 px-2">
                        <h1 className="text-black text-lg font-bold whitespace-nowrap">Account & Settings</h1>
                    </div>
                    <div onClick={logOut} className="bg-white border border-black w-50 h-10 flex items-center gap-2 px-2">
                        <h1 className="text-red-500 text-lg font-bold whitespace-nowrap">Log Out</h1>
                    </div>
                </div>
            )}


                <div className="flex justify-center pt-8">
                    <h1 className="font text-black text-3xl font-bold">Liked Posts</h1>
                </div>
                <div className="absolute top-4 left-4 cursor-pointer" onClick={toggleDropDown}>
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
                            d="M4 6h16M4 12h16M4 18h16" 
                        />
                    </svg>
                    <div id="MenuHolder">
                        {!dropDown && (
                            <div className="flex flex-col">
                            <div id="dropDownMenu1" className="w-50 h-10 bg-white border border-black flex items-center gap-2 px-2">
                                <div onClick={goToHome} id="div1" className="flex items-center gap-2">
                                    <svg onClick={goToHome} className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1-1m-6 0h6" />
                                    </svg>
                                    <h1 className="text-black text-lg font-bold whitespace-nowrap" onClick={goToHome}>Back to Home</h1>
                                </div>
                            </div>
                            <div id="dropDownMenu2" className="w-50 h-10 bg-white border border-black flex items-center gap-2 px-2">
                                <div onClick={goToComments} id="div2" className="flex items-center gap-2">
                                    <svg onClick={goToComments} className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <h1 className="text-black text-lg font-bold whitespace-nowrap" onClick={goToComments}>Comments</h1>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center mt-16 gap-8 pb-8">
                    {likedPosts.length === 0 ? (
                        <p className="text-black text-xl">No liked posts yet!</p>
                    ) : (
                        likedPosts.map((imageUrl, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div 
                                    className="w-full aspect-square border-2 border-black rounded-3xl bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center"
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