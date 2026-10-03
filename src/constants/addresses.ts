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
  // redeployed 2026-10-03 with the pre-mainnet hardening fixes. Tokens, EpochManager and
  // ParameterRegistry match Base Sepolia's; pools, verifiers and the factory don't. No $SYD.
  421614: {
    shieldedPool: "0xE87C8A79a7088675D9D27BF488d650C61835F368",
    poolFactory: "0x6D57D118a7356B4B6c6e0d3D4e40cfF89187648a",
    merkleTree: "0xE87C8A79a7088675D9D27BF488d650C61835F368",
    depositVerifier: "0x4f0dC3d0AA049842f408Ea0fBd1eF00F2d6b6D10",
    transferVerifier: "0x3afE59973a4A5c36a6546FFA83f2570b43A72dcE",
    withdrawVerifier: "0x41B91aAe4903F3A249346253cf30B10cb44cF9b2",
    transfer2Verifier: "0x0b93d21861A6417a178db2fC70CCf3234319209A",
    withdraw2Verifier: "0x2b2ad3F79E576d6c430A87A266D36348ff419030",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 315152078,
  },
  // Ethereum Sepolia (sidechain) — the "v1" deployment, same owner as Base Sepolia, pools
  // redeployed 2026-10-03 with the pre-mainnet hardening fixes. Tokens, EpochManager and
  // ParameterRegistry match Base Sepolia's; pools, verifiers and the factory don't. No $SYD.
  11155111: {
    shieldedPool: "0xBBc38a5B99184F66638f304f380089e1EDf2e31B",
    poolFactory: "0x2b2ad3F79E576d6c430A87A266D36348ff419030",
    merkleTree: "0xBBc38a5B99184F66638f304f380089e1EDf2e31B",
    depositVerifier: "0xCD9891022D59aEE79819C8beB15893BE77dE1407",
    transferVerifier: "0x893B2915550d569907b272175bE18E9c48750b23",
    withdrawVerifier: "0x4f0dC3d0AA049842f408Ea0fBd1eF00F2d6b6D10",
    transfer2Verifier: "0x3afE59973a4A5c36a6546FFA83f2570b43A72dcE",
    withdraw2Verifier: "0x41B91aAe4903F3A249346253cf30B10cb44cF9b2",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 11832497,
  },
  // Base Sepolia (testnet) — the "v1" deployment, pools redeployed 2026-10-03 with the
  // pre-mainnet hardening fixes: ETH pool shown here, every other
  // asset's pool in constants/assets.ts. All pools share this factory, verifier set,
  // EpochManager and ParameterRegistry.
  84532: {
    shieldedPool: "0x21565437890Ea3932077739ad88630d7008504b1",
    poolFactory: "0xDd1b25114b63b43b65d8eEf2356395FabD2FaaB4",
    merkleTree: "0x21565437890Ea3932077739ad88630d7008504b1",
    depositVerifier: "0x8eCC87BC1dD25e0676285fC41BAa781df4E5Aabd",
    transferVerifier: "0xc9Fc30C4022BB924C6B22884ff13540496972479",
    withdrawVerifier: "0x0761eBfD43cDBA1A8dD7AdEDF50D1367423a8AB9",
    transfer2Verifier: "0x82Ac1abCe8b9c838AD98Cf4b2b107A5786c69C38",
    withdraw2Verifier: "0x2164eE940d2972BfeFbBcda162A78Dac91047Bf1",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 47608623,
  },
};
