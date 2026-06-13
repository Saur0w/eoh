"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Label reveal
        if (labelRef.current) {
            gsap.from(labelRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });
        }

        // SplitText word-by-word reveal
        if (textRef.current) {
            const split = SplitText.create(textRef.current, {
                type: "lines,words",
                linesClass: styles.splitLine,
            });

            gsap.from(split.words, {
                opacity: 0.1,
                stagger: 0.04,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 75%",
                    end: "bottom 40%",
                    scrub: 1,
                },
            });
        }

        // Image clip-path reveal
        if (imageWrapRef.current) {
            gsap.from(imageWrapRef.current, {
                clipPath: "inset(30% 30% 30% 30%)",
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: imageWrapRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                },
            });

            // Parallax on image inside
            gsap.to(imageWrapRef.current.querySelector("img"), {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: imageWrapRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });
        }
    }, { scope: sectionRef });

    return (
        <section className={styles.about} ref={sectionRef}>
            <span className={styles.bgIndex} aria-hidden="true">02</span>
            <div className={styles.content}>
                <span className={styles.label} ref={labelRef}>02 — Our Philosophy</span>
                <p className={styles.text} ref={textRef}>
                    We believe in the quiet power of nature — in the way a single bloom can 
                    shift energy, how stillness invites clarity, and the way thoughtful spaces 
                    nurture the soul. Every creation is an offering of peace, crafted with 
                    intention, rooted in reverence for the earth and its rhythms.
                </p>
            </div>
            <div className={styles.imageWrap} ref={imageWrapRef}>
                <Image
                    src="/images/landing.webp"
                    alt="Philosophy — nature and wellness"
                    width={800}
                    height={1000}
                />
            </div>
        </section>
    );
}
