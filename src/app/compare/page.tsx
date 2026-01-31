"use client";

import { Suspense } from "react";
import CompareView from "@/designs/compare";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <CompareView />
    </Suspense>
  );
}
