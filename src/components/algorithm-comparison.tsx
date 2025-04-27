"use client";

import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

const data = [
  {
    name: '00:00',
    DQN: 4000,
    PPO: 2400,
    MARL: 2400,
  },
  {
    name: '03:00',
    DQN: 3000,
    PPO: 1398,
    MARL: 2210,
  },
  {
    name: '06:00',
    DQN: 2000,
    PPO: 9800,
    MARL: 2290,
  },
  {
    name: '09:00',
    DQN: 2780,
    PPO: 3908,
    MARL: 2000,
  },
  {
    name: '12:00',
    DQN: 1890,
    PPO: 4800,
    MARL: 2181,
  },
  {
    name: '15:00',
    DQN: 2390,
    PPO: 3800,
    MARL: 2500,
  },
  {
    name: '18:00',
    DQN: 3490,
    PPO: 4300,
    MARL: 2100,
  },
  {
    name: '21:00',
    DQN: 3490,
    PPO: 4300,
    MARL: 2100,
  },
  {
    name: '24:00',
    DQN: 3490,
    PPO: 4300,
    MARL: 2100,
  },
];

export function AlgorithmComparison() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Algorithm Comparison</CardTitle>
        <CardDescription>
          Performance metrics of DQN, PPO, and MARL algorithms over a 24 hour
          period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComposedChart width={800} height={400} data={data}>
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
