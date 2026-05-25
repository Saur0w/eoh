"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.heading}>
                <h1>Let&#39;s craft an experience together.</h1>
            </div>
            <div className={styles.navigation}>
                <h4>Navigation</h4>
                <div className={styles.links}>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}