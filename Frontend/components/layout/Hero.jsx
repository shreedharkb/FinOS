"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@frontend/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: y1, opacity }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass bg-white/5 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              FinOS v2.0 is now live
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Manage your wealth with <br />
            <span className="gradient-text">machine precision</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The intelligent financial operating system that automates your budgeting, categorizes transactions, and provides AI-driven insights to grow your net worth.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="gradient-btn w-full sm:w-auto h-12 px-8 rounded-xl text-base">
                Get Started Free
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-xl border-white/10 glass hover:bg-white/5 text-base">
                Explore Features
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl glass border border-white/10 p-2 shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-white/5 aspect-[16/9] flex items-center justify-center">
              {/* Replace with actual dashboard screenshot later */}
              <div className="absolute inset-0 grid-bg opacity-50" />
              <p className="text-muted-foreground z-20 font-mono text-sm">Dashboard Interface Rendering...</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
