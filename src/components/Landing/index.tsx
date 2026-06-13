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
                <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.7288 8.07106C24.1194 7.68054 24.1194 7.04737 23.7288 6.65685L17.3649 0.292885C16.9743 -0.0976396 16.3412 -0.0976396 15.9507 0.292885C15.5601 0.683409 15.5601 1.31657 15.9507 1.7071L21.6075 7.36395L15.9507 13.0208C15.5601 13.4113 15.5601 14.0445 15.9507 14.435C16.3412 14.8255 16.9743 14.8255 17.3649 14.435L23.7288 8.07106ZM0 7.36395V8.36395H23.0217V7.36395V6.36395H0V7.36395Z" fill="white"/>
                </svg>

            </div>
        </section>
    );
}