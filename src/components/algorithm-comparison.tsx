"use client";

import React from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

interface SystemData {
  name: string;
  DQN: number;
  PPO: number;
  MARL: number;
}

// Consolidated Data for All Systems
const allSystemData: SystemData[] = [
  {name: '00:00', DQN: 4000, PPO: 1000, MARL: 1000},
  {name: '03:00', DQN: 3000, PPO: 1100, MARL: 1100},
  {name: '06:00', DQN: 2000, PPO: 1200, MARL: 1200},
  {name: '09:00', DQN: 2780, PPO: 1300, MARL: 2780},
  {name: '12:00', DQN: 1890, PPO: 1400, MARL: 1890},
  {name: '15:00', DQN: 2390, PPO: 1500, MARL: 2390},
  {name: '18:00', DQN: 3490, PPO: 4000, MARL: 3490},
  {name: '21:00', DQN: 3490, PPO: 3000, MARL: 3490},
  {name: '24:00', DQN: 3490, PPO: 3490, MARL: 4000},
];

// Function to generate a consistent clipPathId
const generateClipPathId = (seed: number) => `recharts${seed}-clip`;

interface AlgorithmComparisonChartProps {
  data: SystemData[];
  title: string;
  description: string;
}

function AlgorithmComparisonChart({data, title, description}: AlgorithmComparisonChartProps) {
  // Use a fixed seed for Math.random to ensure consistent clipPathId
  const seed = 2;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}} clipPathId={generateClipPathId(seed)}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="DQN" fill="#8884d8" stroke="#8884d8" name="DQN"/>
            <Area type="monotone" dataKey="PPO" fill="#82ca9d" stroke="#82ca9d" name="PPO"/>
            <Area type="monotone" dataKey="MARL" fill="#ffc658" stroke="#ffc658" name="MARL"/>
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-4">
          <Badge variant="secondary">DQN</Badge>
          <Badge variant="secondary">PPO</Badge>
          <Badge variant="secondary">MARL</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function AlgorithmComparison() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <AlgorithmComparisonChart
        data={allSystemData}
        title="All Systems Comparison"
        description="Comparison of DQN, PPO, and MARL algorithms across different times."
      />
    </div>
  );
}
