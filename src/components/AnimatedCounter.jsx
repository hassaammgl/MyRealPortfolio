import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedCounter = ({ className, value, duration = 2, delay = 0, suffix = '', prefix = '', decimals = 0 }) => {
    const counterRef = useRef(null);

    const formatNumber = (num) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    useEffect(() => {
        const element = counterRef.current;
        const obj = { num: 1 };

        gsap.to(obj, {
            num: value,
            duration,
            delay,
            ease: "power1.out",
            onUpdate: () => {
                element.innerText = prefix + formatNumber(obj.num) + suffix;
            }
        });

        return () => gsap.killTweensOf(obj);
    }, [value, duration, delay, prefix, suffix, decimals]);

    return (
        <span ref={counterRef} className={`animated-counter ${className}`}>
            {prefix}{formatNumber(0)}{suffix}
        </span>
    );
};

export default AnimatedCounter;