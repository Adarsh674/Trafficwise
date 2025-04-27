"use client";

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {generateAlgorithmSummary} from '@/ai/flows/generate-algorithm-summary';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {Badge} from '@/components/ui/badge';

interface AlgorithmSummaryProps {
  algorithm1?: string;
  algorithm2?: string;
  algorithm3?: string;
}

interface SystemData {
  name: string;
  [key: string]: number | string;
}

export function AlgorithmSummary({
  algorithm1 = 'DQN',
  algorithm2 = 'PPO',
  algorithm3 = 'MARL',
}: AlgorithmSummaryProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [chartData, setChartData] = React.useState<SystemData[]>([]);

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

        // Mock chart data based on algorithms - replace with real data if available
        const mockChartData: SystemData[] = [
          {name: 'Average Wait Time', [algorithm1]: 30, [algorithm2]: 25, [algorithm3]: 20},
          {name: 'Throughput', [algorithm1]: 1200, [algorithm2]: 1300, [algorithm3]: 1400},
          {name: 'Congestion Level', [algorithm1]: 5, [algorithm2]: 4, [algorithm3]: 3}, // Scale congestion for chart
        ];
        setChartData(mockChartData);
      } catch (error) {
        console.error('Failed to generate summary:', error);
        setSummary('Failed to generate summary. Please try again.');
        setChartData([]);
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
        ) : (
          <>
            {summary ? (
              <p className="mb-4">{summary}</p>
            ) : (
              <p className="mb-4">No summary available.</p>
            )}

            {chartData.length > 0 ? (
              <ComposedChart width={800} height={300} data={chartData}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {algorithm1 && <Area type="monotone" dataKey={algorithm1} fill="#8884d8" stroke="#8884d8" />}
                {algorithm2 && <Area type="monotone" dataKey={algorithm2} fill="#82ca9d" stroke="#82ca9d" />}
                {algorithm3 && <Area type="monotone" dataKey={algorithm3} fill="#ffc658" stroke="#ffc658" />}
              </ComposedChart>
            ) : (
              <p>No chart data available.</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
