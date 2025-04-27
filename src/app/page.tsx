"use client";

import React from 'react';
import {AlgorithmComparison} from '@/components/algorithm-comparison';
import {AlgorithmSummary} from '@/components/algorithm-summary';
import {Button} from '@/components/ui/button';
import {Download} from 'lucide-react';

export default function Home() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">
            AI-Powered Traffic Signal Control System
          </h1>
          <p className="text-muted-foreground">
            Comparison of DQN, PPO, and MARL Algorithms
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <AlgorithmComparison />
      </div>
      <AlgorithmSummary />
    </div>
  );
}
