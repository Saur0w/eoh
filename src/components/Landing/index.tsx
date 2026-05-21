"use client";

import styles from "./style.module.scss";
import Image from "next/image";

export default function Landing() {
    return (
        <section className={styles.landing}>
            <div className={styles.heading}>
                <h1>Cultivating Stillness.<br />
                    Curating Nature</h1>
            </div>
            <div className={styles.imageContainer}>
                <Image src="/images/landing.webp" alt="landing" height={400} width={300} />
            </div>        
            </section>
    );
}
