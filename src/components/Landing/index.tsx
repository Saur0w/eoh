"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface LandingProps {
    isRevealing: boolean;
}

export default function Landing({ isRevealing }: LandingProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const tagRef = useRef<HTMLDivElement | null>(null);
    const paraRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);

    // Initial scale set
    useGSAP(() => {
        gsap.set(sectionRef.current, {
            scale: 0.92,
            transformOrigin: "center center",
            willChange: "transform",
        });
    }, { scope: sectionRef });

    // Reveal animation triggered by preloader
    useGSAP(() => {
        if (!isRevealing) return;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Scale up the section
        tl.to(sectionRef.current, {
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut",
            clearProps: "willChange,transform",
        });

        // SplitText reveal on heading
        if (headingRef.current) {
            const split = SplitText.create(headingRef.current, {
                type: "lines,chars",
                linesClass: styles.splitLine,
            });
            tl.from(split.chars, {
                yPercent: 120,
                opacity: 0,
                rotateX: -40,
                duration: 1.2,
                stagger: 0.02,
                ease: "power4.out",
            }, "-=1");
        }

        // Tag line fade in
        tl.from(tagRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
        }, "-=0.8");

        // Image reveal with clip-path
        tl.from(imageRef.current, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.inOut",
        }, "-=1.2");

        // Line grow
        tl.from(lineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power3.inOut",
        }, "-=0.8");

        // Paragraph reveal
        tl.from(paraRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
        }, "-=0.4");

        // Button slide up
        tl.from(buttonRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
        }, "-=0.6");

    }, { dependencies: [isRevealing], scope: sectionRef });

    // Parallax on scroll
    useGSAP(() => {
        if (!imageRef.current) return;

        gsap.to(imageRef.current?.querySelector("img"), {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
            },
        });

        // Fade out heading on scroll
        gsap.to(headingRef.current, {
            yPercent: -30,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "20% top",
                end: "60% top",
                scrub: 0.3,
            },
        });
    }, { scope: sectionRef });

    return (
        <section className={styles.landing} ref={sectionRef}>
            <div className={styles.tag} ref={tagRef}>
                <h5>-WELLNESS ROOTED IN NATURE</h5>
            </div>
            <div className={styles.heading}>
                <h1 ref={headingRef}>Cultivating<br />stillness.<br />Curating nature.</h1>
            </div>
            <div className={styles.imageContainer} ref={imageRef}>
                <Image src="/images/landing.webp" alt="Essence of Hope — serene nature" height={800} width={600} priority />
            </div>
            <div className={styles.line} ref={lineRef} />
            <div className={styles.para}>
                <p ref={paraRef}>A soulful expression of beauty.<br />
                    Thoughtfully created to bring peace, grace, and<br /> meaning into everyday.</p>
            </div>
            <div className={styles.button} ref={buttonRef}>
                <Link href="/contact">Book a consultation</Link>
                <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.7288 8.07106C24.1194 7.68054 24.1194 7.04737 23.7288 6.65685L17.3649 0.292885C16.9743 -0.0976396 16.3412 -0.0976396 15.9507 0.292885C15.5601 0.683409 15.5601 1.31657 15.9507 1.7071L21.6075 7.36395L15.9507 13.0208C15.5601 13.4113 15.5601 14.0445 15.9507 14.435C16.3412 14.8255 16.9743 14.8255 17.3649 14.435L23.7288 8.07106ZM0 7.36395V8.36395H23.0217V7.36395V6.36395H0V7.36395Z" fill="white"/>
                </svg>

            </div>
        </section>
    );
}