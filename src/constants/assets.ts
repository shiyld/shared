/**
 * Asset registry.
 * Add new assets here as new pools are deployed via PoolFactory.
 */

export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export interface AssetConfig {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  poolAddress?: string;
  /** Block the pool's proxy was created at — wallets scan events from here, not genesis. */
  deploymentBlock?: number;
  /** Whether this asset's deployed pool has transfer2()/withdraw2() (Phase 2 Completion
   * Checklist item #1 — "Multi-input note selection", see CLAUDE.md). All four assets
   * support it today — kept as a
   * per-asset flag (not assumed universally true) since any future new asset listing
   * needs this checked explicitly before ever falling back to a 2-input spend; calling
   * transfer2()/withdraw2() on a pool without them would revert (unrecognized function
   * selector). Defaults to false/undefined when omitted. */
  supports2Input?: boolean;
  /** Whether this asset's deployed pool has the mandatory deposit ciphertext-
   * correctness constraint (Phase 2 Completion Checklist item #2 — "Deposit-to-a-
   * different-pubkey ciphertext protection", see CLAUDE.md). `wallet-core`'s
   * `prepareDeposit` unconditionally produces the new 9-signal proof (no opt-out, no
   * old-format branch retained) — every current asset supports it, kept as a per-asset flag for the same future-asset-listing reason as
   * `supports2Input` above; calling deposit() on a pool without this would revert
   * (verifier arity mismatch). Defaults to false/undefined when omitted. */
  supportsDepositCiphertext?: boolean;
  /** Whether this asset's deployed pool actually enforces fees (Phase 2 Completion
   * Checklist's last item — "Fee Enforcement", see CLAUDE.md). All four assets migrated
   * as of the Post-Phase 2 "multi-asset fee enforcement migration" — kept as a
   * per-asset flag (not assumed universally true) for the same future-asset-listing
   * reason as `supports2Input`/`supportsDepositCiphertext` above. When
   * `false`/undefined, wallet-core must submit `fee: 0n` on withdraw (the pool has no
   * ParameterRegistry to validate a computed fee against) — see wallet-store.ts. */
  supportsFeeEnforcement?: boolean;
}

/**
 * Keyed by chainId, matching `ADDRESSES`'s existing per-chain shape (see
 * constants/addresses.ts) — extended to this shape 2026-09-06 for the wallet's
 * network-switcher work (see CLAUDE.md). Base Sepolia (84532) carries the real, live
 * "v1" pools; Arbitrum Sepolia (421614) and Ethereum Sepolia (11155111) are empty
 * on purpose — no `ShieldedPool` has been deployed on either yet (tracked separately in
 * CLAUDE.md's Multi-Chain Deployment Plan). An empty entry here is what lets the wallet
 * show an honest "no pools on this network yet" state instead of a broken one.
 */
export const ASSETS: Record<number, Record<string, AssetConfig>> = {
  // Base Sepolia "v1" deployment (Make-Us-Untrackable, 2026-09-26) — every pool from the
  // same PoolFactory/verifiers/EpochManager/ParameterRegistry, see constants/addresses.ts.
  84532: {
    ETH: {
      symbol: "ETH",
      name: "Ether",
      address: ETH_ADDRESS,
      decimals: 18,
      poolAddress: "0xc41106C1051cFC48380C9936cD99f28DcE636080",
      deploymentBlock: 47337662,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0xBD2F73d20d04f444c01972C1A70273C4F3734dcb",
      deploymentBlock: 47337664,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0x1A36d17D064593eeB45026c31d2ced201A3DdE08",
      deploymentBlock: 47337665,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0x4d9E98815D6De8faDdB6Df3bC445bf43f86F14cb",
      deploymentBlock: 47337667,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xA14F5831481a05dDcCe63F7c0f449772C727CB96",
      deploymentBlock: 47337669,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x8Cfba9227f16860100C2Dc7C1CEcc9C3944bfaAc",
      deploymentBlock: 47337670,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0xc5b29e367416dd8fA7052123959Bb4857afC1183",
      deploymentBlock: 47337672,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x37f0d866aCFd62149D8F8713B95b87b7b940069d",
      deploymentBlock: 47337673,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0x2763E4305Ce2D06A4f799C19E189C3774638d2a2",
      deploymentBlock: 47337675,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0x3F8740a32A499782e5Bd94D9e5F0C0C4efcC6954",
      deploymentBlock: 47337676,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0xA39350A5B6604Ffe4D68896C55f57516d9b2A1ef",
      deploymentBlock: 47337678,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
  },
  // Arbitrum Sepolia — no ShieldedPool deployed yet. See CLAUDE.md's Multi-Chain
  // Deployment Plan (Left item #2).
  421614: {},
  // Ethereum Sepolia — no ShieldedPool deployed yet. See CLAUDE.md's Multi-Chain
  // Deployment Plan (Left item #2).
  11155111: {},
};

/**
 * Testnet-only $SYD (Parallel Phase 2, deployed 2026-09-06) — deliberately NOT part of
 * `ASSETS` above: it has no `ShieldedPool`, by design (its purpose here is faucet
 * distribution + future staking-mechanics testing, not shielded custody). Genesis-mint
 * mirrors the real mainnet tokenomics' one defining property (fixed supply, minted once
 * — see `TestSYD.sol`); explicitly non-transferable, superseded rather than migrated
 * once the real $SYD launches. Keyed by chainId for consistency with `ASSETS`/`ADDRESSES`
 * even though only 84532 has an entry today.
 */
export const TESTNET_SYD: Record<number, { address: string; decimals: number } | undefined> = {
  84532: { address: "0xca1f9cc28eC3Ad7b60513BbF0e771240850Ad354", decimals: 18 },
};
