"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticProps {
    children: React.ReactNode;
}

export default function MagneticWrapper({ children }: MagneticProps) {
    const magneticRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!magneticRef.current) return;
        const element = magneticRef.current;
        const xTo = gsap.quickTo(element, 'x', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)'
        });
        const yTo = gsap.quickTo(element, 'y', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)'
        });


    })
}