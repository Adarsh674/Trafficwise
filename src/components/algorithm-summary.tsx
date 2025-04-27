"use client";

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {generateAlgorithmSummary} from '@/ai/flows/generate-algorithm-summary';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
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

const algorithmDescriptions = {
  DQN: `DQN (Deep Q-Network) Single-agent RL approach. Works well in discrete action spaces. Best for single isolated intersection control.`,
  PPO: `PPO (Proximal Policy Optimization) Policy-gradient method. Works for continuous or discrete action spaces. Best for larger networks with dynamic traffic.`,
  MARL: `MARL (Multi-Agent Reinforcement Learning) Deals with multiple agents. Best for city-wide traffic control with many intersections working together.`,
};

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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {algorithm1 && <Bar dataKey={algorithm1} fill="#8884d8" name={algorithm1} />}
                  {algorithm2 && <Bar dataKey={algorithm2} fill="#82ca9d" name={algorithm2} />}
                  {algorithm3 && <Bar dataKey={algorithm3} fill="#ffc658" name={algorithm3} />}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No chart data available.</p>
            )}
             <div className="flex justify-around mt-4">
              <Badge variant="secondary">{algorithm1}</Badge>
              <Badge variant="secondary">{algorithm2}</Badge>
              <Badge variant="secondary">{algorithm3}</Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
