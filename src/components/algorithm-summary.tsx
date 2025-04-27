"use client";

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {generateAlgorithmSummary} from '@/ai/flows/generate-algorithm-summary';

interface AlgorithmSummaryProps {
  algorithm1?: string;
  algorithm2?: string;
  algorithm3?: string;
}

export function AlgorithmSummary({
  algorithm1 = 'DQN',
  algorithm2 = 'PPO',
  algorithm3 = 'MARL',
}: AlgorithmSummaryProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getSummary = async () => {
      setIsLoading(true);
      try {
        const result = await generateAlgorithmSummary({
          algorithm1: algorithm1,
          algorithm2: algorithm2,
          algorithm3: algorithm3,
        });
        setSummary(result.summary);
      } catch (error) {
        console.error('Failed to generate summary:', error);
        setSummary('Failed to generate summary. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    getSummary();
  }, [algorithm1, algorithm2, algorithm3]);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Algorithm Summary</CardTitle>
        <CardDescription>
          Summary report comparing DQN, PPO, and MARL algorithms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Generating summary...</p>
        ) : summary ? (
          <p>{summary}</p>
        ) : (
          <p>No summary available.</p>
        )}
      </CardContent>
    </Card>
  );
}
