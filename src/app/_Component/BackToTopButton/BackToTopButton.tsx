'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full fixed bottom-6 right-6 bg-pink-700 text-white p-3 shadow-lg hover:bg-pink-900 transition-all duration-300"
          aria-label="Back to Top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
      )}
    </>
  );
}