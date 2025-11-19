import { useState, useEffect } from "react"

export default function Home(){
  const [dogUrl, setDogUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(true); // Changed to true so menu is hidden by default

  const fetchDog = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();

      setDogUrl(data.message);
    } catch (err) {
      console.error("Failed to fetch dog image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

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
                        <div id="dropDownMenu" className="w-50 h-10 bg-white border border-black mt-1 flex items-center gap-2 px-2">
                            <svg className="w-6 h-6 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h1 className="text-black text-lg font-bold whitespace-nowrap">Liked Posts</h1>
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
                <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-black hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>

                {/* Like Button */}
                <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-black hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
        </div>
    </div>
  )
}