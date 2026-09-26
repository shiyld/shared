export interface ZKProof {
  pi_a: string[];
  pi_b: string[][];
  pi_c: string[];
  protocol: "groth16";
  curve: "bn128";
}

export interface PublicSignals {
  root: string;
  nullifierHash: string;
  recipient?: string;
  relayer?: string;
  fee?: string;
  refund?: string;
}

export interface ProofBundle {
  proof: ZKProof;
  publicSignals: PublicSignals;
}

export type OperationType = "deposit" | "transfer" | "withdraw";
