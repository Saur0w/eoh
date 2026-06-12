"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { useState } from 'react';


export default function Home() {
  const [isRevealing, setIsRevealing] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <div className={styles.page}>
        {showPreloader && (
          <Preloader
            onReveal={() => setIsRevealing(true)}
            onComplete={() => setShowPreloader(false)}
          />
        )}
        <Landing isRevealing={isRevealing} />
        <Footer />
    </div>
  );
}
