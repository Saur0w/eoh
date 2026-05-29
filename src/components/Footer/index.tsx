"use client";

import styles from "./style.module.scss";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import RoundedButton from "@/ui/RoundedButton";
import MagneticWrapper from "@/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.heading}>
                <h1>Let&#39;s craft an experience together.</h1>
                <div className={styles.sub}>
                    <div className={styles.imageContainer}>
                        <Image src="/images/logo.png" alt="logo" height={70} width={70} />
                    </div>
                    <h3>Deepika singh, <br />Founder of Essene of Hope</h3>
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
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/founder">Founder</Link></li>
                        <li><Link href="/contact">Book a Consultation</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}