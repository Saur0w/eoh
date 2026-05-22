"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <div className={styles.logo}>
                    
                </div>
                <div className={styles.text}>
                    <h1>ESSENCE OF HOPE<br />Deepkia Singh</h1>
                </div>
            </div>

            <nav className={styles.nav}>
                <ul></ul>
            </nav>
        </header>
    )
}