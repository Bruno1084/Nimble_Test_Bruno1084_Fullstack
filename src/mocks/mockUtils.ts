export function simulateDelay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomFail(probability = 0.2): boolean {
  return Math.random() < probability;
}