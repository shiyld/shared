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
  /** Revised staking plan (STAKING-AND-TREASURY-PLAN.md §6): Staking, its settings
   * registry and the emission schedule exist on Base only; a Treasury on every chain.
   * Empty until deployed. */
  staking?: string;
  stakingParameters?: string;
  emissionSchedule?: string;
  treasury?: string;
  /** Uniswap v2 on Base Sepolia, deployed by us from Uniswap's own published bytecode
   * (Uniswap never deployed v2 there), and the SYD/WETH pair whose token is the LP token
   * Staking accepts. Base mainnet uses Uniswap's official v2. Empty until deployed. */
  uniswapV2Factory?: string;
  uniswapV2Router?: string;
  sydWethPair?: string;
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
  // redeployed 2026-10-03 for the staking plan (fees to the chain's Treasury). Tokens, EpochManager and
  // ParameterRegistry match Base Sepolia's; pools, verifiers and the factory don't. No $SYD.
  421614: {
    shieldedPool: "0xc8b6F4AC0a25030909D8bCc3Fff52dD6219be047",
    poolFactory: "0x73637439148c131C4D45421B9541BfC06d89A914",
    merkleTree: "0xc8b6F4AC0a25030909D8bCc3Fff52dD6219be047",
    depositVerifier: "0x4f0dC3d0AA049842f408Ea0fBd1eF00F2d6b6D10",
    transferVerifier: "0x3afE59973a4A5c36a6546FFA83f2570b43A72dcE",
    withdrawVerifier: "0x41B91aAe4903F3A249346253cf30B10cb44cF9b2",
    transfer2Verifier: "0x0b93d21861A6417a178db2fC70CCf3234319209A",
    withdraw2Verifier: "0x2b2ad3F79E576d6c430A87A266D36348ff419030",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 315457554,
    treasury: "0x6BdD7F6B8585416509Dea1f7B6D743fE6C7a0cea",
  },
  // Ethereum Sepolia (sidechain) — the "v1" deployment, same owner as Base Sepolia, pools
  // redeployed 2026-10-03 for the staking plan (fees to the chain's Treasury). Tokens, EpochManager and
  // ParameterRegistry match Base Sepolia's; pools, verifiers and the factory don't. No $SYD.
  11155111: {
    shieldedPool: "0xB8f93a39c4515b352afDfB0CAd061b8C750Bb5C9",
    poolFactory: "0xda9B1974e93974552e47cCda1b472664e03327b9",
    merkleTree: "0xB8f93a39c4515b352afDfB0CAd061b8C750Bb5C9",
    depositVerifier: "0xCD9891022D59aEE79819C8beB15893BE77dE1407",
    transferVerifier: "0x893B2915550d569907b272175bE18E9c48750b23",
    withdrawVerifier: "0x4f0dC3d0AA049842f408Ea0fBd1eF00F2d6b6D10",
    transfer2Verifier: "0x3afE59973a4A5c36a6546FFA83f2570b43A72dcE",
    withdraw2Verifier: "0x41B91aAe4903F3A249346253cf30B10cb44cF9b2",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 11838242,
    treasury: "0x2045D03224839d2D41bd3fa398a9112d3d1edcC3",
  },
  // Base Sepolia (testnet) — the "v1" deployment, pools redeployed 2026-10-03 for the
  // staking plan (fees to the Treasury, perks from Staking): ETH pool shown here, every other
  // asset's pool in constants/assets.ts. All pools share this factory, verifier set,
  // EpochManager and ParameterRegistry.
  84532: {
    shieldedPool: "0x2C4eFB36751D6D2594ec5F1eB4e49b1142C6BFEc",
    poolFactory: "0x8b84f7ECDF1eF1938f14484A5130E31B6d49be8C",
    merkleTree: "0x2C4eFB36751D6D2594ec5F1eB4e49b1142C6BFEc",
    depositVerifier: "0x8eCC87BC1dD25e0676285fC41BAa781df4E5Aabd",
    transferVerifier: "0xc9Fc30C4022BB924C6B22884ff13540496972479",
    withdrawVerifier: "0x0761eBfD43cDBA1A8dD7AdEDF50D1367423a8AB9",
    transfer2Verifier: "0x82Ac1abCe8b9c838AD98Cf4b2b107A5786c69C38",
    withdraw2Verifier: "0x2164eE940d2972BfeFbBcda162A78Dac91047Bf1",
    epochManager: "0xB28FfcD6f1346ea9F80290c039cb87F0A121240E",
    parameterRegistry: "0xB838CFCE14F3A5681c4AC808A3B67bB7F8f1A95b",
    deploymentBlock: 47646962,
    staking: "0xcCfFFFCaC07DbFF0a51932dDdE137AcBe2ab2358",
    stakingParameters: "0xa3Ca288928580D1573ef1CBadb39f972eb56BcBc",
    emissionSchedule: "0x58Ed71269fF1AB33766b2Bdd3C595704623CDEb0",
    treasury: "0x2EF7c2CD254c469B14460411f27B4b85a85E6Cef",
    uniswapV2Factory: "0x448ABD39Ce16118572181aDB1296dFDFC3E2E428",
    uniswapV2Router: "0x9c19061069895298302BbE80e98474Ed22E46d57",
    sydWethPair: "0x25667327Cc5204b9c448DB06A5eF315874D578dC",
  },
};
