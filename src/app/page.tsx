"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <div className={styles.page}>
        <Preloader />
        <Landing />
        <Footer />
    </div>
  );
}
