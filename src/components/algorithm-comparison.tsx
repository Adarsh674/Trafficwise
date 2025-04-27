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
} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

interface SystemData {
  name: string;
  DQN: number;
  PPO: number;
  MARL: number;
}

// Data for Small System
const smallSystemData: SystemData[] = [
  {name: '00:00', DQN: 4000, PPO: 1000, MARL: 1000},
  {name: '03:00', DQN: 3000, PPO: 1100, MARL: 1100},
  {name: '06:00', DQN: 2000, PPO: 1200, MARL: 1200},
  {name: '09:00', DQN: 2780, PPO: 1300, MARL: 1300},
  {name: '12:00', DQN: 1890, PPO: 1400, MARL: 1400},
  {name: '15:00', DQN: 2390, PPO: 1500, MARL: 1500},
  {name: '18:00', DQN: 3490, PPO: 1600, MARL: 1600},
  {name: '21:00', DQN: 3490, PPO: 1700, MARL: 1700},
  {name: '24:00', DQN: 3490, PPO: 1800, MARL: 1800},
];

// Data for Medium System
const mediumSystemData: SystemData[] = [
  {name: '00:00', DQN: 1000, PPO: 4000, MARL: 1000},
  {name: '03:00', DQN: 1100, PPO: 3000, MARL: 1100},
  {name: '06:00', DQN: 1200, PPO: 2000, MARL: 1200},
  {name: '09:00', DQN: 1300, PPO: 2780, MARL: 1300},
  {name: '12:00', DQN: 1400, PPO: 1890, MARL: 1400},
  {name: '15:00', DQN: 1500, PPO: 2390, MARL: 1500},
  {name: '18:00', DQN: 1600, PPO: 3490, MARL: 1600},
  {name: '21:00', DQN: 1700, PPO: 3490, MARL: 1700},
  {name: '24:00', DQN: 1800, PPO: 3490, MARL: 1800},
];

// Data for Large System
const largeSystemData: SystemData[] = [
  {name: '00:00', DQN: 1000, PPO: 1000, MARL: 4000},
  {name: '03:00', DQN: 1100, PPO: 1100, MARL: 3000},
  {name: '06:00', DQN: 1200, PPO: 1200, MARL: 2000},
  {name: '09:00', DQN: 1300, PPO: 1300, MARL: 2780},
  {name: '12:00', DQN: 1400, PPO: 1400, MARL: 1890},
  {name: '15:00', DQN: 1500, PPO: 1500, MARL: 2390},
  {name: '18:00', DQN: 1600, PPO: 1600, MARL: 3490},
  {name: '21:00', DQN: 1700, PPO: 1700, MARL: 3490},
  {name: '24:00', DQN: 1800, PPO: 1800, MARL: 3490},
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
        <ComposedChart width={800} height={400} data={data} clipPathId={generateClipPathId(seed)}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="DQN" fill="#8884d8" stroke="#8884d8" />
          <Area type="monotone" dataKey="PPO" fill="#82ca9d" stroke="#82ca9d" />
          <Area type="monotone" dataKey="MARL" fill="#ffc658" stroke="#ffc658" />
        </ComposedChart>
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
    <div className="flex flex-col gap-4">
      <AlgorithmComparisonChart
        data={smallSystemData}
        title="Single Intersection - DQN"
        description="Best for: Single isolated intersection control."
      />
      <AlgorithmComparisonChart
        data={mediumSystemData}
        title="Larger Network - PPO"
        description="Best for: Larger networks of intersections, better adaptability to dynamic traffic."
      />
      <AlgorithmComparisonChart
        data={largeSystemData}
        title="City-Wide Grid - MARL"
        description="Best for: City-wide traffic control with many intersections working together."
      />
    </div>
  );
}
