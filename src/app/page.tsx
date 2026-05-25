"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
        <Landing />
        <Footer />
    </div>
  );
}
