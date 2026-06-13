"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import MagneticWrapper from "@/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface LandingProps {
    isRevealing: boolean;
}

export default function Landing({ isRevealing }: LandingProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const tagRef = useRef<HTMLDivElement | null>(null);
    const indexRef = useRef<HTMLSpanElement | null>(null);
    const paraRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        gsap.set(sectionRef.current, {
            scale: 0.94,
            transformOrigin: "center center",
            willChange: "transform",
        });
        gsap.set(overlayRef.current, { opacity: 1 });
    }, { scope: sectionRef });

    useGSAP(() => {
        if (!isRevealing) return;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(sectionRef.current, {
            scale: 1,
            duration: 1.8,
            ease: "power4.inOut",
            clearProps: "willChange,transform",
        });

        if (indexRef.current) {
            tl.from(indexRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }, "-=1.4");
        }

        if (headingRef.current) {
            const split = SplitText.create(headingRef.current, {
                type: "lines,chars",
                linesClass: styles.splitLine,
            });
            tl.from(split.chars, {
                yPercent: 140,
                opacity: 0,
                rotateX: -50,
                duration: 1.4,
                stagger: 0.018,
                ease: "power4.out",
            }, "-=1.2");
        }

        tl.from(tagRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
        }, "-=1");

        tl.from(imageRef.current, {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.15,
            duration: 1.6,
            ease: "power3.inOut",
        }, "-=1.4");

        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        }, "-=1.2");

        tl.from(lineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power3.inOut",
        }, "-=0.8");

        tl.from(paraRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.9,
        }, "-=0.5");

        tl.from(buttonRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.9,
        }, "-=0.7");

        tl.from(scrollRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.8,
        }, "-=0.4");

    }, { dependencies: [isRevealing], scope: sectionRef });

    useGSAP(() => {
        if (!imageRef.current) return;

        gsap.to(imageRef.current.querySelector("img"), {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
            },
        });

        gsap.to(headingRef.current, {
            yPercent: -40,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "15% top",
                end: "55% top",
                scrub: 0.4,
            },
        });

        gsap.to(scrollRef.current, {
            opacity: 0,
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "5% top",
                end: "25% top",
                scrub: 0.3,
            },
        });
    }, { scope: sectionRef });

    return (
        <section className={styles.landing} ref={sectionRef}>
            <div className={styles.topRow}>
                <span className={styles.index} ref={indexRef}>01</span>
                <div className={styles.tag} ref={tagRef}>
                    <h5>Wellness rooted in nature</h5>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.heading}>
                        <h1 ref={headingRef}>
                            Cultivating<br />
                            <em>stillness.</em><br />
                            Curating nature.
                        </h1>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.line} ref={lineRef} />
                        <div className={styles.para}>
                            <p ref={paraRef}>
                                A soulful expression of beauty — thoughtfully created to bring peace, grace, and meaning into everyday life.
                            </p>
                        </div>
                        <div className={styles.button} ref={buttonRef} data-cursor-hover>
                            <MagneticWrapper>
                                <Link href="/contact">
                                    <span>Book a consultation</span>
                                    <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M23.7288 8.07106C24.1194 7.68054 24.1194 7.04737 23.7288 6.65685L17.3649 0.292885C16.9743 -0.0976396 16.3412 -0.0976396 15.9507 0.292885C15.5601 0.683409 15.5601 1.31657 15.9507 1.7071L21.6075 7.36395L15.9507 13.0208C15.5601 13.4113 15.5601 14.0445 15.9507 14.435C16.3412 14.8255 16.9743 14.8255 17.3649 14.435L23.7288 8.07106ZM0 7.36395V8.36395H23.0217V7.36395V6.36395H0V7.36395Z" fill="currentColor"/>
                                    </svg>
                                </Link>
                            </MagneticWrapper>
                        </div>
                    </div>
                </div>

                <div className={styles.imageContainer} ref={imageRef}>
                    <div className={styles.imageOverlay} ref={overlayRef} />
                    <Image src="/images/landing.webp" alt="Essence of Hope — serene nature" height={800} width={600} priority />
                    <div className={styles.imageFrame} aria-hidden="true" />
                </div>
            </div>

            <div className={styles.scrollIndicator} ref={scrollRef}>
                <span>Scroll</span>
                <div className={styles.scrollLine}>
                    <div className={styles.scrollDot} />
                </div>
            </div>
        </section>
    );
}
