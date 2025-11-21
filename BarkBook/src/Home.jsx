import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export default function Home(){
  const [dogUrl, setDogUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  const [wtaComment, setWtaComment] = useState(false);
  const [Liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(0); // Add this state
  const [commentLikes, setCommentLikes] = useState(0);
  const navigate = useNavigate();
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  function addComment(commentText){
    if(!commentText || commentText.trim() === "") return;
    
    let comments = JSON.parse(localStorage.getItem("AllComments") || "[]");
    const newComment = {
        text: commentText,
        dogUrl: dogUrl,
    };
    comments.push(newComment);
    setAllComments(comments);
    localStorage.setItem('AllComments', JSON.stringify(comments));
    
    // Increment numComments
    const currentStoredComments = parseInt(localStorage.getItem('numComments') || '0');
    const newNumComments = currentStoredComments + 1;
    setNumComments(newNumComments);
    localStorage.setItem('numComments', newNumComments.toString());
    
    setWtaComment(false);
    alert("Comment Added!")
  }


  const fetchDog = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();

      setDogUrl(data.message);
      
      const likedPosts = JSON.parse(localStorage.getItem("LikedPosts") || "[]");
      setLiked(likedPosts.includes(data.message));
      
    } catch (err) {
      console.error("Failed to fetch dog image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDog();
    
    const storedNumLikes = localStorage.getItem('numLikes');
    if (storedNumLikes) {  
        setNumLikes(parseInt(storedNumLikes));
    }

    const storedNumComments = localStorage.getItem('numComments');
    if (storedNumComments) {  
        setNumComments(parseInt(storedNumComments));
    }

  }, []);

  function toggleDropDown(){
    setDropDown(!dropDown);
  }

  function toggleComment(){
    setWtaComment(!wtaComment);
  }

  function addLike(){
    if(!Liked){
        let likedPosts = JSON.parse(localStorage.getItem("LikedPosts") || "[]");
        likedPosts.push(dogUrl);
        localStorage.setItem('LikedPosts', JSON.stringify(likedPosts));
        
        // Get current stored value or default to 0 if cleared
        const currentStoredLikes = parseInt(localStorage.getItem('numLikes') || '0');
        const newNumLikes = currentStoredLikes + 1;
        setNumLikes(newNumLikes);
        localStorage.setItem('numLikes', newNumLikes.toString());
        
        setLiked(true);
    }
    else{
        let likedPosts = JSON.parse(localStorage.getItem("LikedPosts") || "[]");
        likedPosts = likedPosts.filter(url => url !== dogUrl);
        localStorage.setItem('LikedPosts', JSON.stringify(likedPosts));
        
        // Get current stored value or default to 0 if cleared
        const currentStoredLikes = parseInt(localStorage.getItem('numLikes') || '0');
        const newNumLikes = Math.max(0, currentStoredLikes - 1); // Prevent negative numbers
        setNumLikes(newNumLikes);
        localStorage.setItem('numLikes', newNumLikes.toString());
        
        setLiked(false);
    }
  }

  function goToLiked(){
    navigate("/Liked");
  }

    function goToComments(){
        navigate("/Comments")
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
                <h1 className="text-white text-3xl font-bold font-mono">BarkBook</h1>
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
                    className="w-full aspect-square bg-black max-w-[521px] min-w-96 max-h-[521px] bg-cover bg-center"
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
                    className={`flex items-center justify-center w-12 h-12 rounded-full border border-black hover:bg-gray-100 transition-colors ${
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
                  className={`flex items-center justify-center w-12 h-12 rounded-full border border-black ${
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
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-black hover:bg-gray-100 transition-colors disabled:opacity-50"
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
        setUserComment(""); // Clear input after submit
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

