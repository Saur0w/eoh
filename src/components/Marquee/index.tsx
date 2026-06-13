"use client";

import styles from "./style.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WORDS = [
    "Stillness",
    "•",
    "Nature",
    "•",
    "Wellness",
    "•",
    "Ritual",
    "•",
    "Grace",
    "•",
    "Bloom",
    "•",
    "Essence",
    "•",
    "Hope",
    "•",
];

export default function Marquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const speedRef = useRef(1);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        // Get width of one set of items
        const items = track.querySelectorAll(`.${styles.item}`);
        let totalWidth = 0;
        items.forEach((item, i) => {
            if (i < WORDS.length) {
                totalWidth += (item as HTMLElement).offsetWidth;
            }
        });

        // Infinite scroll animation
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(track, {
            x: -totalWidth,
            duration: 20,
            ease: "none",
        });

        // Scroll velocity modifier
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const velocity = Math.abs(self.getVelocity());
                const clampedSpeed = gsap.utils.clamp(1, 5, velocity / 500);
                speedRef.current = clampedSpeed;
                tl.timeScale(clampedSpeed);
            },
        });

        // Skew effect based on scroll direction
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const skew = self.getVelocity() / -300;
                gsap.to(track, {
                    skewX: gsap.utils.clamp(-5, 5, skew),
                    duration: 0.3,
                    ease: "power2.out",
                });
            },
        });
    }, { scope: containerRef });

    // Duplicate items for seamless loop
    const allWords = [...WORDS, ...WORDS];

    return (
        <section className={styles.marquee} ref={containerRef}>
            <div className={styles.track} ref={trackRef}>
                {allWords.map((word, i) => (
                    <span
                        key={i}
                        className={`${styles.item} ${word === "•" ? styles.dot : ""}`}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </section>
    );
}
