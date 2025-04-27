"use client";

import React from 'react';
import {
  Area,
  AreaChart,
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

const smallSystemData: SystemData[] = [
  {name: '00:00', DQN: 4000, PPO: 2400, MARL: 2400},
  {name: '03:00', DQN: 3000, PPO: 1398, MARL: 2210},
  {name: '06:00', DQN: 2000, PPO: 9800, MARL: 2290},
  {name: '09:00', DQN: 2780, PPO: 3908, MARL: 2000},
  {name: '12:00', DQN: 1890, PPO: 4800, MARL: 2181},
  {name: '15:00', DQN: 2390, PPO: 3800, MARL: 2500},
  {name: '18:00', DQN: 3490, PPO: 4300, MARL: 2100},
  {name: '21:00', DQN: 3490, PPO: 4300, MARL: 2100},
  {name: '24:00', DQN: 3490, PPO: 4300, MARL: 2100},
];

const mediumSystemData: SystemData[] = [
  {name: '00:00', DQN: 2400, PPO: 4000, MARL: 2400},
  {name: '03:00', DQN: 1398, PPO: 3000, MARL: 2210},
  {name: '06:00', DQN: 9800, PPO: 2000, MARL: 2290},
  {name: '09:00', DQN: 3908, PPO: 2780, MARL: 2000},
  {name: '12:00', DQN: 4800, PPO: 1890, MARL: 2181},
  {name: '15:00', DQN: 3800, PPO: 2390, MARL: 2500},
  {name: '18:00', DQN: 4300, PPO: 3490, MARL: 2100},
  {name: '21:00', DQN: 4300, PPO: 3490, MARL: 2100},
  {name: '24:00', DQN: 4300, PPO: 3490, MARL: 2100},
];

const largeSystemData: SystemData[] = [
  {name: '00:00', DQN: 2400, PPO: 2400, MARL: 4000},
  {name: '03:00', DQN: 2210, PPO: 1398, MARL: 3000},
  {name: '06:00', DQN: 2290, PPO: 9800, MARL: 2000},
  {name: '09:00', DQN: 2000, PPO: 3908, MARL: 2780},
  {name: '12:00', DQN: 2181, PPO: 4800, MARL: 1890},
  {name: '15:00', DQN: 2500, PPO: 3800, MARL: 2390},
  {name: '18:00', DQN: 2100, PPO: 4300, MARL: 3490},
  {name: '21:00', DQN: 2100, PPO: 4300, MARL: 3490},
  {name: '24:00', DQN: 2100, PPO: 4300, MARL: 3490},
];

// Function to generate a consistent clipPathId
const generateClipPathId = (seed: number) => `recharts${seed}-clip`;

interface AlgorithmComparisonProps {
  systemSize: 'small' | 'medium' | 'large';
  data: SystemData[];
  title: string;
  description: string;
}

function AlgorithmComparisonChart({systemSize, data, title, description}: AlgorithmComparisonProps) {
  // Use a fixed seed for Math.random to ensure consistent clipPathId
  const seed = 2;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title} System</CardTitle>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AlgorithmComparisonChart
        systemSize="small"
        data={smallSystemData}
        title="Small"
        description="Single isolated intersection control."
      />
      <AlgorithmComparisonChart
        systemSize="medium"
        data={mediumSystemData}
        title="Medium"
        description="Larger networks of intersections, better adaptability to dynamic traffic."
      />
      <AlgorithmComparisonChart
        systemSize="large"
        data={largeSystemData}
        title="Large"
        description="City-wide traffic control with many intersections working together."
      />
    </div>
  );
}
