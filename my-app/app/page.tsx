"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <Image
          src="/logo.webp"
          alt="BakeWise Logo"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  outerWrapper: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#1a1a1a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    width: "100%",
    maxWidth: "393px",
    height: "100vh",
    maxHeight: "852px",
    backgroundColor: "#000",
  },
};