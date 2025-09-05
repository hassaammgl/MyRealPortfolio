import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ReactLenis, useLenis } from "lenis/react";
import { ThemeProvider } from "@/components/theme-provider";

const Wrapper = ({ children, className }) => {
  const lenisRef = useRef();
  useLenis();
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className={className}>{children}</div>
      </ThemeProvider>
    </ReactLenis>
  );
};

export default Wrapper;
