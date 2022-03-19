import React, { useState, useEffect } from 'react'

function Timer(props) {
    const [timeRemaining, setTimeRemaining] = useState(180);
// console.log(props)
    useEffect(() => {
        if (timeRemaining > 0 && props.status=="false" && props.response == '5') {
            setTimeout(() => {
                setTimeRemaining((timeRemaining) => timeRemaining - 1);
            }, 1000);
        }
        else if (timeRemaining < 0) {
            alert("Times Up");
            setTimeRemaining(0);
        }
    });
    return (
        <>

            <div style={{ width: '100px', height: "100px", backgroundColour: 'black', position: 'fixed', right: '2rem', top: '2rem', border: '3px solid white' }}>

                <h2 style={{ color: 'white', textAlign: 'center' }}>{timeRemaining} Seconds</h2>

            </div>
        </>
    )
}

export default Timer