"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import MagneticWrapper from "@/ui/Magnetic";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const copyrightRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // SplitText heading reveal
        if (headingRef.current) {
            const split = SplitText.create(headingRef.current, {
                type: "lines,words",
                linesClass: styles.splitLine,
            });

            gsap.from(split.words, {
                yPercent: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                },
            });
        }

        // Staggered link reveals
        if (linksRef.current) {
            const links = linksRef.current.querySelectorAll("li");
            gsap.from(links, {
                x: -30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: linksRef.current,
                    start: "top 85%",
                },
            });
        }

        // Copyright fade
        if (copyrightRef.current) {
            gsap.from(copyrightRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                scrollTrigger: {
                    trigger: copyrightRef.current,
                    start: "top 95%",
                },
            });
        }

        // Line grow animation
        const line = footerRef.current?.querySelector(`.${styles.line}`);
        if (line) {
            gsap.from(line, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.2,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: line,
                    start: "top 85%",
                },
            });
        }
    }, { scope: footerRef });

    return (
        <footer className={styles.footer} ref={footerRef}>
            <span className={styles.watermark} aria-hidden="true">Essence</span>
            <div className={styles.top}>
                <div className={styles.heading}>
                    <h1 ref={headingRef}>Let&#39;s craft an experience together.</h1>
                    <div className={styles.sub}>
                        <div className={styles.imageContainer}>
                            <Image src="/images/logo.png" alt="Deepika Singh — Founder" height={70} width={70} />
                        </div>
                        <h3>Deepika Singh, <br />Founder of Essence of Hope</h3>
                    </div>
                    <div className={styles.lb}>
                        <div className={styles.line} />
                        <div className={styles.button}>
                            <MagneticWrapper>
                                <p>Connect</p>
                            </MagneticWrapper>
                        </div>
                    </div>
                </div>
                <div className={styles.navigation}>
                    <h4>Navigation</h4>
                    <div className={styles.links}>
                        <ul ref={linksRef}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/founder">Founder</Link></li>
                            <li><Link href="/contact">Book a Consultation</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.copyright} ref={copyrightRef}>
                <p>© {new Date().getFullYear()} Essence of Hope. All rights reserved.</p>
                <p>Designed with intention.</p>
            </div>
        </footer>
    );
}