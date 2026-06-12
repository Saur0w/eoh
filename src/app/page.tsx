"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { useState } from 'react';


export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  return (
    <div className={styles.page}>
        <Preloader />
        <Landing />
        <Footer />
    </div>
  );
}
