"use client";

import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  docsUrl: string;
  knowledgeBaseUrl: string;
};

export default function MobileMenu({
  docsUrl,
  knowledgeBaseUrl,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Toggle menu"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/20 bg-white/80 text-emerald-900 transition hover:bg-emerald-900 hover:text-emerald-50"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-6 top-16 z-20 w-56 rounded-2xl border border-emerald-900/10 bg-white p-4 text-sm shadow-soft">
          <div className="flex flex-col gap-3 text-emerald-900/80">
            <Link
              href="#features"
              className="hover:text-emerald-900"
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#fork"
              className="hover:text-emerald-900"
              onClick={() => setOpen(false)}
            >
              Fork
            </Link>
            <Link
              href="#workflow"
              className="hover:text-emerald-900"
              onClick={() => setOpen(false)}
            >
              Workflow
            </Link>
            <Link
              href="#faq"
              className="hover:text-emerald-900"
              onClick={() => setOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href={knowledgeBaseUrl}
              className="hover:text-emerald-900"
              onClick={() => setOpen(false)}
            >
              Knowledge Base
            </Link>
            <Link
              href="https://github.com/nulldoubt/Pepperminto"
              className="hover:text-emerald-900"
              onClick={() => setOpen(false)}
            >
              GitHub
            </Link>
            <Link
              href={docsUrl}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-emerald-50 shadow-soft"
              onClick={() => setOpen(false)}
            >
              Read the docs
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
