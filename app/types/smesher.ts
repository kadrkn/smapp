export type ComputeProvider = {
  id: number;
  model: string;
  computeApi: string;
  performance: number;
};

export type ComputeProviders = Array<ComputeProvider>;

export type Reward = {
  total: number;
  layerReward: number;
  layerComputed: number;
  coinbase: string;
  smesher: string;
};