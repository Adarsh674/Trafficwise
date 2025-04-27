/**
 * Represents traffic data for a specific algorithm.
 */
export interface TrafficData {
  /**
   * The algorithm name (e.g., DQN, PPO, MARL).
   */
  algorithm: string;
  /**
   * Average wait time in seconds.
   */
  averageWaitTime: number;
  /**
   * Throughput in vehicles per hour.
   */
  throughput: number;
  /**
   * Congestion level (e.g., Low, Medium, High).
   */
  congestionLevel: string;
}

/**
 * Asynchronously retrieves traffic data for a given algorithm.
 *
 * @param algorithm The algorithm for which to retrieve traffic data.
 * @returns A promise that resolves to a TrafficData object.
 */
export async function getTrafficData(algorithm: string): Promise<TrafficData> {
  // TODO: Implement this by calling an API.

  return {
    algorithm: algorithm,
    averageWaitTime: 30,
    throughput: 1200,
    congestionLevel: 'Medium',
  };
}
