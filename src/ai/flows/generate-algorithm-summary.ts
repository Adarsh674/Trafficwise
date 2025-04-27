'use server';
/**
 * @fileOverview Generates a summary report comparing traffic control algorithms.
 *
 * - generateAlgorithmSummary - A function that generates the algorithm summary.
 * - AlgorithmSummaryInput - The input type for the generateAlgorithmSummary function.
 * - AlgorithmSummaryOutput - The return type for the generateAlgorithmSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {getTrafficData, TrafficData} from '@/services/traffic-data';
import {z} from 'genkit';

const AlgorithmSummaryInputSchema = z.object({
  algorithm1: z.string().describe('The first algorithm to compare.'),
  algorithm2: z.string().describe('The second algorithm to compare.'),
  algorithm3: z.string().describe('The third algorithm to compare.'),
});
export type AlgorithmSummaryInput = z.infer<typeof AlgorithmSummaryInputSchema>;

const AlgorithmSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary comparing the three algorithms.'),
});
export type AlgorithmSummaryOutput = z.infer<typeof AlgorithmSummaryOutputSchema>;

export async function generateAlgorithmSummary(input: AlgorithmSummaryInput): Promise<AlgorithmSummaryOutput> {
  return generateAlgorithmSummaryFlow(input);
}

const algorithmDescriptions = {
  DQN: `DQN (Deep Q-Network) Single-agent RL approach. Works well in discrete action spaces (e.g., selecting red, green, or yellow for signals).
  Pros: Simple, relatively easier to implement, good for single intersections.
  Cons: Doesn't scale well to multiple intersections (multi-agent scenarios).
  Best for: Single isolated intersection control.`,
  PPO: `PPO (Proximal Policy Optimization) Policy-gradient method (instead of value-based like DQN). Works for continuous or discrete action spaces.
  Pros: More stable, better sample efficiency, handles bigger and more complex environments.
  Cons: Slightly more complex to tune.
  Best for: Larger networks of intersections, better adaptability to dynamic traffic.`,
  MARL: `MARL (Multi-Agent Reinforcement Learning) Deals with multiple agents (each intersection can be an agent). Agents collaborate or compete to optimize traffic globally.
  Pros: Scales to city-wide traffic grids, enables decentralized control.
  Cons: Coordination among agents is challenging (non-stationarity problem).
  Best for: City-wide traffic control with many intersections working together.`,
};

const chooseMetricsTool = ai.defineTool({
  name: 'chooseMetrics',
  description: 'Chooses the most relevant metrics for comparing traffic control algorithms, considering their descriptions and best use cases.',
  inputSchema: z.object({
    algorithm1: z.string().describe('The first algorithm.'),
    algorithm2: z.string().describe('The second algorithm.'),
    algorithm3: z.string().describe('The third algorithm.'),
  }),
  outputSchema: z.array(z.string()).describe('An array of the names of the selected metrics.'),
}, async input => {
  // In a real implementation, this would use a more sophisticated method to choose metrics.
  // For this example, we'll just return a fixed set of metrics.
  return ['averageWaitTime', 'throughput', 'congestionLevel'];
});

const summarizeAlgorithmsPrompt = ai.definePrompt({
  name: 'summarizeAlgorithmsPrompt',
  input: {
    schema: z.object({
      algorithm1Data: z.string().describe('Traffic data for the first algorithm.'),
      algorithm2Data: z.string().describe('Traffic data for the second algorithm.'),
      algorithm3Data: z.string().describe('Traffic data for the third algorithm.'),
      algorithm1Description: z.string().describe('Description of the first algorithm.'),
      algorithm2Description: z.string().describe('Description of the second algorithm.'),
      algorithm3Description: z.string().describe('Description of the third algorithm.'),
      metrics: z.string().describe('The chosen metrics to consider.'),
    }),
  },
  output: {
    schema: AlgorithmSummaryOutputSchema,
  },
  prompt: `You are an expert in traffic control algorithms. You will receive traffic data for three algorithms. You will also receive a description for each algorithm.
  
  Algorithm descriptions:
  - Algorithm 1 ({{{algorithm1Description}}})
  - Algorithm 2 ({{{algorithm2Description}}})
  - Algorithm 3 ({{{algorithm3Description}}})

  Traffic data:
  - Algorithm 1 data: {{{algorithm1Data}}}
  - Algorithm 2 data: {{{algorithm2Data}}}
  - Algorithm 3 data: {{{algorithm3Data}}}
  
  Metrics to consider: {{{metrics}}}.

  Generate a summary report comparing and contrasting the three algorithms, highlighting their strengths and weaknesses based on the provided traffic data, algorithm descriptions, and chosen metrics. The summary should explain the suitability for different traffic scenarios.

  Include a final recommendation: If your project is for a single intersection -> DQN is enough. If you want better performance and can handle complexity -> PPO is better even for a few intersections. If you are aiming for multiple intersections and true smart city scale -> MARL is the best (but most challenging).
`,
  tools: [chooseMetricsTool],
});

const generateAlgorithmSummaryFlow = ai.defineFlow<
  typeof AlgorithmSummaryInputSchema,
  typeof AlgorithmSummaryOutputSchema
>({
  name: 'generateAlgorithmSummaryFlow',
  inputSchema: AlgorithmSummaryInputSchema,
  outputSchema: AlgorithmSummaryOutputSchema,
}, async input => {
  const algorithm1Data = JSON.stringify(await getTrafficData(input.algorithm1));
  const algorithm2Data = JSON.stringify(await getTrafficData(input.algorithm2));
  const algorithm3Data = JSON.stringify(await getTrafficData(input.algorithm3));

  const {output} = await summarizeAlgorithmsPrompt({
    algorithm1Data,
    algorithm2Data,
    algorithm3Data,
    algorithm1Description: algorithmDescriptions[input.algorithm1 as keyof typeof algorithmDescriptions],
    algorithm2Description: algorithmDescriptions[input.algorithm2 as keyof typeof algorithmDescriptions],
    algorithm3Description: algorithmDescriptions[input.algorithm3 as keyof typeof algorithmDescriptions],
    metrics: 'averageWaitTime, throughput, congestionLevel', //metrics hardcoded
  });
  return output!;
});
