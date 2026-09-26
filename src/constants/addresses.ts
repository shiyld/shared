/**
 * Deployed contract addresses per chain.
 * Populated after each deployment.
 */

export interface ChainAddresses {
  shieldedPool: string;
  poolFactory: string;
  merkleTree: string;
  depositVerifier: string;
  transferVerifier: string;
  withdrawVerifier: string;
  /** Transfer2Verifier/Withdraw2Verifier — Phase 2 Completion Checklist item #1
   * ("Multi-input note selection", see CLAUDE.md), Optional since older
   * chain entries (e.g. the empty mainnet placeholder below) predate this. */
  transfer2Verifier?: string;
  withdraw2Verifier?: string;
  /** Fee Enforcement (Phase 2 Completion Checklist's last item, see CLAUDE.md's "Fee
   * Enforcement Strategy" section) — no circuit changed, so these are the only two
   * genuinely new contracts. Optional since every pool before this one predates them. */
  epochManager?: string;
  parameterRegistry?: string;
  /** Block the shieldedPool proxy was created at — wallets scan events from here, not genesis. */
  deploymentBlock: number;
  syd?: string;
  staking?: string;
  governor?: string;
}

export const ADDRESSES: Record<number, ChainAddresses> = {
  // Base Mainnet
  8453: {
    shieldedPool: "",
    poolFactory: "",
    merkleTree: "",
    depositVerifier: "",
    transferVerifier: "",
    withdrawVerifier: "",
    deploymentBlock: 0,
  },
  // Arbitrum Sepolia — no deployment yet. See CLAUDE.md's Multi-Chain Deployment Plan
  // (Left item #2). Placeholder entry, same shape as the Base Mainnet one above, so
  // lookups against this chainId resolve to honest empty strings rather than `undefined`.
  421614: {
    shieldedPool: "",
    poolFactory: "",
    merkleTree: "",
    depositVerifier: "",
    transferVerifier: "",
    withdrawVerifier: "",
    deploymentBlock: 0,
  },
  // Ethereum Sepolia — no deployment yet. Same note as Arbitrum Sepolia above.
  11155111: {
    shieldedPool: "",
    poolFactory: "",
    merkleTree: "",
    depositVerifier: "",
    transferVerifier: "",
    withdrawVerifier: "",
    deploymentBlock: 0,
  },
  // Base Sepolia (testnet) — the "v1" deployment: ETH pool shown here, every other
  // asset's pool in constants/assets.ts. All pools share this factory, verifier set,
  // EpochManager and ParameterRegistry.
  84532: {
    shieldedPool: "0xc41106C1051cFC48380C9936cD99f28DcE636080",
    poolFactory: "0x89AC6c59Dc722A21344AC9e7487aa9Fd2A6C8F29",
    merkleTree: "0xc41106C1051cFC48380C9936cD99f28DcE636080",
    depositVerifier: "0xc4a091829E5DeE786fea9cCF51585ab816Def6ac",
    transferVerifier: "0x9184550C36Ea1E1cB489909b6543E94b08487dE5",
    withdrawVerifier: "0x92A93d571cbd04222F41Bde3f962e0E8A5861eE6",
    transfer2Verifier: "0x3AABFcD53c70986Cd849de283604620385E17E41",
    withdraw2Verifier: "0x042693f727C3C01ee136D8540f819c23BF8b45b8",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 47337662,
  },
};
