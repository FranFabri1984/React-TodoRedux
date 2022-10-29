import React, {useState, useEffect, useRef} from 'react';
import NET from 'vanta/dist/vanta.globe.min'
import * as THREE from "three"

const Vanta = () => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0x001b140b,
		        points: 15.0,
		        maxDistance: 10.0,
		        color: 0xff8900,
		        spacing: 30.0
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect]);
    return <div ref={myRef} className="vanta">

    </div>
};

export default Vanta;