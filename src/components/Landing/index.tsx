"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

interface LandingProps {
    isRevealing: boolean;
}

export default function Landing({ isRevealing }: LandingProps) {
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {
        gsap.set(sectionRef.current, {
            scale: 0.92,
            transformOrigin: "center center",
            willChange: "transform",
        });
    }, { scope: sectionRef });

    useGSAP(() => {
        if (!isRevealing) return;

        gsap.to(sectionRef.current, {
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut",    
            clearProps: "willChange,transform",
        });
    }, { dependencies: [isRevealing], scope: sectionRef });

    return (
        <section className={styles.landing} ref={sectionRef}>
            <div className={styles.tag}>
                <h5>-WELLNESS ROOTED IN NATURE</h5>
            </div>
            <div className={styles.heading}>
                <h1>Cultivating<br /> stillness.<br />Curating nature.</h1>
            </div>
            <div className={styles.imageContainer}>
                <Image src="/images/landing.webp" alt="landing" height={800} width={600} />
            </div>
            <div className={styles.line} />
            <div className={styles.para}>
                <p>A soulful expression of beauty.<br />
                    Thoughtfully created to bring peace, grace, and<br /> meaning into everyday.</p>
            </div>
            <div className={styles.button}>
                <Link href="/contact">Book a consultation</Link>
            </div>
        </section>
    );
}