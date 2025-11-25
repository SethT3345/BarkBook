import { useState, useEffect } from "react"

export default function CreateTimeLimit(){

const [time, setTime] = useState(0);
const [timeLeft, setTimeLeft] = useState(0);
const [isActive, setIsActive] = useState(false);
const [inputTime, setInputTime] = useState('');

// Load timer state from localStorage on component mount
useEffect(() => {
    const savedTimeLeft = localStorage.getItem('timerTimeLeft');
    const savedIsActive = localStorage.getItem('timerIsActive');
    const savedStartTime = localStorage.getItem('timerStartTime');

    if (savedTimeLeft && savedIsActive === 'true' && savedStartTime) {
        const now = Date.now();
        const elapsed = Math.floor((now - parseInt(savedStartTime)) / 1000);
        const remainingTime = parseInt(savedTimeLeft) - elapsed;

        if (remainingTime > 0) {
            setTimeLeft(remainingTime);
            setIsActive(true);
        } else {
            localStorage.removeItem('timerTimeLeft');
            localStorage.removeItem('timerIsActive');
            localStorage.removeItem('timerStartTime');
        }
    }
}, []);

function handleTimeLimit(e){
    e.preventDefault();
    const minutes = parseInt(inputTime);
    if (minutes && minutes > 0) {
        const seconds = minutes * 60;
        setTime(seconds);
        setTimeLeft(seconds);
        setIsActive(true);
        
        localStorage.setItem('timerTimeLeft', seconds.toString());
        localStorage.setItem('timerIsActive', 'true');
        localStorage.setItem('timerStartTime', Date.now().toString());
    }
}

// Timer countdown effect
useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft(timeLeft => {
                const newTimeLeft = timeLeft - 1;
                // Update localStorage with current time
                localStorage.setItem('timerTimeLeft', newTimeLeft.toString());
                return newTimeLeft;
            });
        }, 1000);
    } else if (timeLeft === 0 && isActive) {
        setIsActive(false);
        // Clear localStorage when timer ends
        localStorage.removeItem('timerTimeLeft');
        localStorage.removeItem('timerIsActive');
        localStorage.removeItem('timerStartTime');
    }
    return () => clearInterval(interval);
}, [isActive, timeLeft]);

const stopTimer = () => {
    setIsActive(false);
    localStorage.removeItem('timerTimeLeft');
    localStorage.removeItem('timerIsActive');
    localStorage.removeItem('timerStartTime');
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

    return(
        <div className="bg-amber-600 min-h-screen flex items-center justify-center">
            <div className="bg-amber-500 min-h-screen w-[50vw] min-w-96 relative shadow-2xl border-l border-r border-black">
                
                <div className="absolute top-4 left-4 cursor-pointer">
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
                    <h1 className="text-white text-3xl font-bold font-mono">Create Time Limit</h1>
                </div>

                <div className="flex flex-col items-center mt-16 gap-6">
                    <form onSubmit={handleTimeLimit} className="flex flex-col items-center gap-4 w-full max-w-md">
                        <input 
                            type="number" 
                            value={inputTime}
                            onChange={(e) => setInputTime(e.target.value)}
                            placeholder="Enter time in minutes"
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-amber-600"
                        />
                        <input 
                            type="text" 
                            placeholder="Enter Access Code"
                            className="w-full px-4 py-3 border-2 border-black rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-amber-600"
                        />
                        <button 
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full border border-black transition-colors"
                        >
                            Create Time Limit
                        </button>
                    </form>

                </div>

            </div>
        </div>
    )
}