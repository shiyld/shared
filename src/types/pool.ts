export interface Pool {
  address: string;
  asset: string;
  chainId: number;
  merkleRoot: string;
  totalDeposits: bigint;
  deployedAt: number;
}

export interface PoolEvent {
  type: "commitment" | "nullifier" | "root";
  blockNumber: number;
  transactionHash: string;
  data: string;
}
