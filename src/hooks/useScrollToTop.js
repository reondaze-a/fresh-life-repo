import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const { pathname } = useLocation();
  const containerSelector = ".scroll__container"; // div for page content

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    container.scrollTo(0, 0);
  }, [pathname, containerSelector]);
}