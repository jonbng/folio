"use client";

import { useEffect } from "react";

export default function FaviconLoader() {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafari = ua.includes("safari") && !ua.includes("chrome");

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = isSafari ? "image/png" : "image/svg+xml";
    link.href = isSafari ? "/favicon.png" : "/favicon.svg";

    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
    document.head.appendChild(link);
  }, []);

  return null;
}
