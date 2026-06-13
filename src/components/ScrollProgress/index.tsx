"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        const trigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                gsap.set(bar, { scaleX: self.progress });
            },
        });

        return () => trigger.kill();
    }, []);

    return (
        <div className={styles.progress} aria-hidden="true">
            <div className={styles.bar} ref={barRef} />
        </div>
    );
}
