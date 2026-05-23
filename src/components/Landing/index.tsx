"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
    return (
        <section className={styles.landing}>
            <div className={styles.tag}>
                <h5>-WELLNESS ROOTED IN NATURE</h5>
            </div>
            <div className={styles.heading}>
                <h1>Cultivating<br /> stillness.<br />
                    Curating nature.</h1>
            </div>
            <div className={styles.imageContainer}>
                <Image src="/images/landing.webp" alt="landing" height={800} width={600} />
            </div>        
            <div className={styles.line}/>
            <div className={styles.para}>
                <p>A soulful expression of beauty.<br />
                    Thoughtfully created to bring peace, grace, and<br /> meaning into everyday.</p>
            </div>
            <div className={styles.button}>
                <Link href="/contact">Book a consultation</Link>
            </div>
        </section>
    );
}
