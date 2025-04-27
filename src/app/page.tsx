"use client";

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {AlgorithmComparison} from '@/components/algorithm-comparison';
import {AlgorithmSummary} from '@/components/algorithm-summary';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Download, Plus} from 'lucide-react';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="font-semibold text-lg">TrafficAI Insights</h2>
          <p className="text-sm text-muted-foreground">
            AI-Powered Traffic Signal Control
          </p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                Algorithm Comparison
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <div className="p-2">
            <Button variant="secondary" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add Dashboard
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="md:hidden p-4">
          <SidebarTrigger />
        </div>
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
      </SidebarInset>
    </SidebarProvider>
  );
}

