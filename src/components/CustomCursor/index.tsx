"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./style.module.scss";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Check if it's a touch device
        const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
        if (isTouchDevice) {
            dot.style.display = "none";
            ring.style.display = "none";
            return;
        }

        const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });
        const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
        const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xRing(e.clientX);
            yRing(e.clientY);
        };

        const handleMouseEnterInteractive = () => {
            gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
            gsap.to(dot, { scale: 0, duration: 0.3, ease: "power2.out" });
        };

        const handleMouseLeaveInteractive = () => {
            gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Observe DOM for interactive elements
        const attachListeners = () => {
            const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
            interactives.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnterInteractive);
                el.addEventListener("mouseleave", handleMouseLeaveInteractive);
            });
            return interactives;
        };

        // Initial attach + MutationObserver for dynamic elements
        let interactives = attachListeners();

        const observer = new MutationObserver(() => {
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnterInteractive);
                el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
            });
            interactives = attachListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnterInteractive);
                el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className={styles.cursorDot} />
            <div ref={ringRef} className={styles.cursorRing} />
        </>
    );
}
