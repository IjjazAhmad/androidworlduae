import React, { useEffect, useState } from 'react'

export default function Time() {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const deadline = "December, 31, 2022";
    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
        setDays(new Date().getDay());
        setHours(new Date().getHours());
        setMinutes(new Date().getMinutes());
        setSeconds(new Date().getSeconds());
    };
    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        
            <div className="d-flex text-black">
                <div className="time-card mx-1">
                    <div className="bg-white shadow-lg p-2 text-center rounded-3">
                        <span>{days}</span> <br />
                        <span>Days</span>
                    </div>
                </div>
                <div className="time-card mx-1">
                    <div className="bg-white shadow-lg p-2 text-center rounded-3">
                        <span>{hours}</span> <br />
                        <span>Hour</span>
                    </div>
                </div>
                <div className="time-card mx-1">
                    <div className="bg-white shadow-lg p-2 text-center rounded-3">
                        <span>{minutes}</span> <br />
                        <span>Min</span>
                    </div>
                </div>
                <div className="time-card mx-1">
                    <div className="bg-white shadow-lg p-2 text-center rounded-3">
                        <span>{seconds}</span> <br />
                        <span>Sec</span>
                    </div>
                </div>
            </div>
        
    )
}
