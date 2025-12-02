import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function Home(){
  const [dogUrl, setDogUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  const [wtaComment, setWtaComment] = useState(false);
  const [Liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [commentLikes, setCommentLikes] = useState(0);
  const navigate = useNavigate();
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
const [pDropDown, setPDropDown] = useState(false); 
  
  

  
  useEffect(() => {


    
    const userId = localStorage.getItem("currentUserId");
    if (!userId) {
      
      navigate("/Login");
      return;
    }
    setCurrentUserId(userId);

    
  }, []);

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      const userId = localStorage.getItem("currentUserId");
      if (userId) {
        fetchDog();
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [currentUserId]);


  
  const getUserKey = (key) => `${key}_user_${currentUserId}`;

  function addComment(commentText){
    if(!commentText || commentText.trim() === "" || !currentUserId) return;
    
    let comments = JSON.parse(localStorage.getItem(getUserKey("AllComments")) || "[]");
    const newComment = {
        text: commentText,
        dogUrl: dogUrl,
        userId: currentUserId
    };
    comments.push(newComment);
    setAllComments(comments);
    localStorage.setItem(getUserKey("AllComments"), JSON.stringify(comments));
    

    const currentStoredComments = parseInt(localStorage.getItem(getUserKey("numComments")) || '0');
    const newNumComments = currentStoredComments + 1;
    setNumComments(newNumComments);
    localStorage.setItem(getUserKey("numComments"), newNumComments.toString());
    
    setWtaComment(false);
    alert("Comment Added!")
  }

  const fetchDog = async () => {
    if (!currentUserId) return;
    
    try {
      setLoading(true);

      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();

      setDogUrl(data.message);
  
      const likedPosts = JSON.parse(localStorage.getItem(getUserKey("LikedPosts")) || "[]");
      setLiked(likedPosts.includes(data.message));
      
    } catch (err) {
      console.error("Failed to fetch dog image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchDog();
      
    
      const storedNumLikes = localStorage.getItem(getUserKey('numLikes'));
      if (storedNumLikes) {  
          setNumLikes(parseInt(storedNumLikes));
      }

      const storedNumComments = localStorage.getItem(getUserKey('numComments'));
      if (storedNumComments) {  
          setNumComments(parseInt(storedNumComments));
      }

      const storedComments = JSON.parse(localStorage.getItem(getUserKey("AllComments")) || "[]");
      setAllComments(storedComments);
    }
  }, [currentUserId]);

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

  function toggleComment(){
    setWtaComment(!wtaComment);
  }

  function addLike(){
    if (!currentUserId) return;
    
    if(!Liked){
        let likedPosts = JSON.parse(localStorage.getItem(getUserKey("LikedPosts")) || "[]");
        likedPosts.push(dogUrl);
        localStorage.setItem(getUserKey("LikedPosts"), JSON.stringify(likedPosts));
        
        const currentStoredLikes = parseInt(localStorage.getItem(getUserKey('numLikes')) || '0');
        const newNumLikes = currentStoredLikes + 1;
        setNumLikes(newNumLikes);
        localStorage.setItem(getUserKey('numLikes'), newNumLikes.toString());
        
        setLiked(true);
    }
    else{
        let likedPosts = JSON.parse(localStorage.getItem(getUserKey("LikedPosts")) || "[]");
        likedPosts = likedPosts.filter(url => url !== dogUrl);
        localStorage.setItem(getUserKey("LikedPosts"), JSON.stringify(likedPosts));
        
        const currentStoredLikes = parseInt(localStorage.getItem(getUserKey('numLikes')) || '0');
        const newNumLikes = Math.max(0, currentStoredLikes - 1);
        setNumLikes(newNumLikes);
        localStorage.setItem(getUserKey('numLikes'), newNumLikes.toString());
        
        setLiked(false);
    }
  }

  function goToLiked(){
    navigate("/Liked");
  }

  function goToComments(){
    navigate("/Comments")
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
                <h1 className="font text-black text-3xl font-bold">BarkBook</h1>
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
                            <div id="dropDownMenu1" className="w-50 h-10 bg-white border border-black mt-1 flex items-center gap-2 px-2">
                                <div onClick={goToLiked} id="div1" className="flex items-center gap-2">
                                    <svg onClick={goToLiked} className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <h1 className="text-black text-lg font-bold whitespace-nowrap" onClick={goToLiked}>Liked Posts</h1>
                                </div>
                            </div>
                            <div id="dropDownMenu2" className="w-50 h-10 bg-white border border-black flex items-center gap-2 px-2">
                                <div id="div2" onClick={goToComments} className="flex items-center gap-2">
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

            <div className="flex justify-center mt-16">
    <div 
        className="w-full rounded-3xl border-4 border-black aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center"
        style={{
            backgroundImage: dogUrl ? `url(${dogUrl})` : 'none'
        }}
    >
    
    </div>
</div>

            {/* Buttons section */}
            <div className="flex justify-center items-center mt-4 gap-8">
                {/* Comment Button */}
                <button 
                    onClick={toggleComment} 
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-black hover:bg-gray-100 transition-colors ${
                        wtaComment ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>

                {/* Like Button */}
                <button 
                  onClick={addLike}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-black ${
                    Liked ? 'bg-red-500 text-white' : 'bg-white text-black'
                  }`}
                >
                  <svg className="w-6 h-6" fill={Liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Next Button */}
                <button 
                    onClick={fetchDog}
                    disabled={loading}
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-black hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div id="commentHolder">
                {wtaComment && (
            <div className="flex flex-col items-center mt-4 w-[80%] mx-auto max-w-[500px]">
    <form className="w-full" onSubmit={(e) => {
        e.preventDefault();
        addComment(userComment);
        setUserComment(""); 
    }}>
        <input 
            type="text" 
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Comment Here..." 
            className="w-full px-4 bg-white py-3 border-2 border-black rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-amber-600"
        />
    </form>
    <button 
        onClick={() => {
            addComment(userComment);
            setUserComment("");
        }}
        className="mb-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full border border-black transition-colors mt-3"
    >
        Submit Comment
    </button>
</div>
                )}
        </div>
            
        </div>
    </div>
  )
}

