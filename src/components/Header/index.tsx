"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticWrapper from "@/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const header = headerRef.current;
        if (!header) return;

        // Initial state: hidden, will reveal after preloader
        gsap.set(header, { yPercent: -100 });

        // Reveal after a delay (preloader finishes ~4s)
        gsap.to(header, {
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            delay: 5.2,
        });

        // Hide on scroll down, show on scroll up
        const showAnim = gsap.from(header, {
            yPercent: -100,
            paused: true,
            duration: 0.3,
            ease: "power2.out",
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                if (self.direction === -1) {
                    showAnim.play();
                } else {
                    showAnim.reverse();
                }
            },
        });
    }, { scope: headerRef });

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.title}>
                <div className={styles.text}>
                    <h1>ESSENCE OF HOPE<br />Deepika Singh</h1>
                </div>
            </div>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <MagneticWrapper>
                            <Link href="/">Home</Link>
                        </MagneticWrapper>
                    </li>
                    <li>
                        <MagneticWrapper>
                            <Link href="/about">About</Link>
                        </MagneticWrapper>
                    </li>
                </ul>
            </nav>

            <div className={styles.btn}>
                <MagneticWrapper>
                    <Link href="/contact">Book a Consultation</Link>
                </MagneticWrapper>
            </div>
        </header>
    );
}