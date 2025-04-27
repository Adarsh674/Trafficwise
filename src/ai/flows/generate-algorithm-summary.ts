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

const chooseMetricsTool = ai.defineTool({
  name: 'chooseMetrics',
  description: 'Chooses the most relevant metrics for comparing traffic control algorithms.',
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
      metrics: z.string().describe('The chosen metrics to consider.'),
    }),
  },
  output: {
    schema: AlgorithmSummaryOutputSchema,
  },
  prompt: `You are an expert in traffic control algorithms. You will receive traffic data for three algorithms: {{{algorithm1Data}}}, {{{algorithm2Data}}}, and {{{algorithm3Data}}}.

  You will also receive metrics to consider: {{{metrics}}}.

  Generate a summary report comparing and contrasting the three algorithms, highlighting their strengths and weaknesses based on the provided traffic data and chosen metrics. The summary should explain the suitability for different traffic scenarios.
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
    metrics: 'averageWaitTime, throughput, congestionLevel', //metrics hardcoded
  });
  return output!;
});
