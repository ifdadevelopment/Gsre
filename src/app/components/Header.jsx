"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setScrolled(scrollY > 40);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header
      className={`fixed left-0 w-full bg-white z-40 transition-all duration-300
       h-[70px] md:h-[100px]  shadow-md
        ${scrolled ? "top-0" : "top-[40px] md:top-[35px]"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/flogo.png"
            alt="GSRE Logo"
            width={72} height={72} priority />

          <span className="hidden md:flex font-bold text-md global-color">GS Refrigeration Enterprises</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-md font-semibold global-secondary-color">
          <Link href="/">Home</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <button
          className="md:hidden text-lg"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div
          ref={menuRef}
          className="md:hidden bg-white border-t global-secondary-color"
        >
          <nav className="flex flex-col p-4 gap-3">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about-us" onClick={() => setOpen(false)}>About Us</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/projects" onClick={() => setOpen(false)}>Projects</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
