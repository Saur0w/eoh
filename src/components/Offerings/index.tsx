"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const SERVICES = [
    {
        num: "01",
        title: "Botanical Styling",
        description: "Curating living arrangements that transform spaces into sanctuaries of peace and natural beauty.",
        image: "/images/landing.webp",
    },
    {
        num: "02",
        title: "Wellness Rituals",
        description: "Crafting personalized wellness routines rooted in ancient practices and modern mindfulness.",
        image: "/images/landing.webp",
    },
    {
        num: "03",
        title: "Space Curation",
        description: "Designing environments that nurture the soul — from intimate corners to expansive living spaces.",
        image: "/images/landing.webp",
    },
    {
        num: "04",
        title: "Nature Retreats",
        description: "Immersive experiences that reconnect you with the earth, silence, and your truest self.",
        image: "/images/landing.webp",
    },
];

export default function Offerings() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Heading split text reveal
        if (headingRef.current) {
            const split = SplitText.create(headingRef.current, {
                type: "chars",
            });

            gsap.from(split.chars, {
                yPercent: 100,
                opacity: 0,
                stagger: 0.03,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                },
            });
        }

        // Horizontal scroll
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
            x: -totalScroll,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalScroll}`,
                scrub: 0.8,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (progressRef.current) {
                        const current = Math.min(
                            SERVICES.length,
                            Math.max(1, Math.ceil(self.progress * SERVICES.length))
                        );
                        progressRef.current.textContent = `${current.toString().padStart(2, "0")} / ${SERVICES.length.toString().padStart(2, "0")}`;
                    }
                },
            },
        });

        // Staggered card reveals
        const cards = track.querySelectorAll(`.${styles.card}`);
        cards.forEach((card) => {
            gsap.from(card, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "left 80%",
                    containerAnimation: gsap.getById?.("horizontalScroll") || undefined,
                    toggleActions: "play none none none",
                },
            });
        });
    }, { scope: sectionRef });

    return (
        <section className={styles.offerings} ref={sectionRef}>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <span className={styles.label}>03 — What We Offer</span>
                    <span className={styles.progress} ref={progressRef}>01 / 04</span>
                </div>
                <h2 className={styles.heading} ref={headingRef}>Ways to work together</h2>
            </div>
            <div className={styles.track} ref={trackRef}>
                {SERVICES.map((service, i) => (
                    <div className={styles.card} key={i} data-cursor-hover>
                        <div className={styles.cardImage}>
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={500}
                                height={600}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <span className={styles.cardNum}>{service.num}</span>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                        <div className={styles.cardLine} />
                    </div>
                ))}
            </div>
        </section>
    );
}