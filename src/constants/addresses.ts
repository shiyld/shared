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
  // Arbitrum Sepolia (sidechain) — the "v1" deployment, same owner as Base Sepolia, pools
  // redeployed 2026-09-29 with the circuit soundness fix. Tokens, EpochManager and
  // ParameterRegistry match Base Sepolia's; pools, verifiers and the factory don't. No $SYD.
  421614: {
    shieldedPool: "0xBCF06223B275309AB5669E1554F53497bc54BF84",
    poolFactory: "0x9C369276876f2c8ecC8B1Ca1Fd579A350061e890",
    merkleTree: "0xBCF06223B275309AB5669E1554F53497bc54BF84",
    depositVerifier: "0x935bAe22Bc98D4ebCeFe33A4bD259AF76c869Db8",
    transferVerifier: "0xbd22D05B6020D0bDa1E8b2E8E49F5126f4bb1d45",
    withdrawVerifier: "0x03E3a1553be0e97Af40aa870331c2B6e2A52Cb14",
    transfer2Verifier: "0xD0d6e7dd4033d1eA12De4bec77E6396b6C9aad6C",
    withdraw2Verifier: "0xCE650989aaf6bA3B374f657485C024c92aFD1e83",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 314017581,
  },
  // Ethereum Sepolia (sidechain) — the "v1" deployment, same owner as Base Sepolia, pools
  // redeployed 2026-09-29 with the circuit soundness fix. Tokens, EpochManager and
  // ParameterRegistry match Base Sepolia's; pools, verifiers and the factory don't. No $SYD.
  11155111: {
    shieldedPool: "0x28eD5A1b4b91baBaF37F1cA285C25F8d92a43c6A",
    poolFactory: "0xa3b81cb585f224d609E05ACbf98D2f6Df507Feed",
    merkleTree: "0x28eD5A1b4b91baBaF37F1cA285C25F8d92a43c6A",
    depositVerifier: "0xa250A2fadA94ddb5E77EE107acD133Ae7ec0FfD1",
    transferVerifier: "0x935bAe22Bc98D4ebCeFe33A4bD259AF76c869Db8",
    withdrawVerifier: "0xbd22D05B6020D0bDa1E8b2E8E49F5126f4bb1d45",
    transfer2Verifier: "0x03E3a1553be0e97Af40aa870331c2B6e2A52Cb14",
    withdraw2Verifier: "0xD0d6e7dd4033d1eA12De4bec77E6396b6C9aad6C",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 11809035,
  },
  // Base Sepolia (testnet) — the "v1" deployment, pools redeployed 2026-09-29 with the
  // circuit soundness fix: ETH pool shown here, every other
  // asset's pool in constants/assets.ts. All pools share this factory, verifier set,
  // EpochManager and ParameterRegistry.
  84532: {
    shieldedPool: "0x3FA6242b74297dD07BdC7dD662F132c2A27635A9",
    poolFactory: "0x7F1Ab0a9cEeD5280e53D8082718928D35C25f2FE",
    merkleTree: "0x3FA6242b74297dD07BdC7dD662F132c2A27635A9",
    depositVerifier: "0xBB409c02D2e5BFb936DFd19313AC6b6390FD2596",
    transferVerifier: "0x01A804bc7Dd351FE0BcFd8e0Ab27b44741F88708",
    withdrawVerifier: "0x00B2E5507c6a8B23b0fD2d329eA0e5F530c62add",
    transfer2Verifier: "0x169cD1AE0987DF999FF9E0Ab9876200E95453173",
    withdraw2Verifier: "0x3fb6a424d4945083372592C2C818eaC9dA328D4B",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 47466654,
  },
};
