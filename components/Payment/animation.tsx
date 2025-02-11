import Lottie from 'react-lottie-player';
import animationData from "@/assets/animation.json";

export default function Animation() {
    return (
        <Lottie 
            loop 
            animationData={animationData} 
            play
            speed={1}
        />        
    )
}