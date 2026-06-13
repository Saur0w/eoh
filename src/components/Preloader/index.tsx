"use client";

import styles from "./styles.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
    onReveal?: () => void;
    onComplete?: () => void;
}

export default function Preloader({ onReveal, onComplete }: PreloaderProps) {
    const preloaderRef = useRef<HTMLDivElement | null>(null);
    const percentageRef = useRef<HTMLHeadingElement | null>(null);
    const labelRef = useRef<HTMLParagraphElement | null>(null);
    const panelLeftRef = useRef<HTMLDivElement | null>(null);
    const panelRightRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const countObj = { value: 0 };
        const tl = gsap.timeline();

        tl.from(labelRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        tl.to(countObj, {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                if (percentageRef.current) {
                    percentageRef.current.textContent = `${Math.floor(countObj.value).toString().padStart(2, "0")}`;
                }
            },
        }, "-=0.4");

        tl.from(logoRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        }, "-=1.6");

        tl.to([percentageRef.current, labelRef.current], {
            yPercent: -120,
            opacity: 0,
            duration: 0.7,
            ease: "power3.inOut",
            stagger: 0.05,
        }, "+=0.3");

        tl.to(logoRef.current, {
            scale: 1.8,
            opacity: 0,
            duration: 0.9,
            ease: "power3.inOut",
        }, "-=0.5");

        tl.to(panelLeftRef.current, {
            xPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
        }, "-=0.3");

        tl.to(panelRightRef.current, {
            xPercent: 100,
            duration: 1.2,
            ease: "power4.inOut",
            onStart: () => onReveal?.(),
        }, "<");

        tl.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.3,
            pointerEvents: "none",
        });

        tl.call(() => onComplete?.());

    }, {
        scope: preloaderRef,
    });

    return (
        <section className={styles.preloader} ref={preloaderRef}>
            <div className={styles.panelLeft} ref={panelLeftRef} />
            <div className={styles.panelRight} ref={panelRightRef} />

            <div className={styles.content}>
                <p className={styles.label} ref={labelRef}>Essence of Hope</p>
                <div className={styles.counter}>
                    <h1 ref={percentageRef}>00</h1>
                    <span className={styles.percentSign}>%</span>
                </div>
                <div className={styles.logo} ref={logoRef}>
                    <Image src="/images/logo.png" alt="" width={120} height={120} priority />
                </div>
            </div>
        </section>
    );
}
