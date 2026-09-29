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
 * network-switcher work (see CLAUDE.md). Base Sepolia (84532) is the canonical chain;
 * Arbitrum Sepolia (421614) and Ethereum Sepolia (11155111) are sidechains carrying the
 * same "v1" protocol. Token addresses are identical on all three chains; pool addresses
 * differ since the 2026-09-29 soundness-fix redeploy, and an address on one chain can be
 * a different contract on another — always key by chainId. A chain with no
 * deployment gets an empty entry, which lets the wallet show an honest "no pools on this
 * network yet" state instead of a broken one.
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
      poolAddress: "0x3FA6242b74297dD07BdC7dD662F132c2A27635A9",
      deploymentBlock: 47466654,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0xf5C1446aB343110245efe2628Be15c9bC66EAB50",
      deploymentBlock: 47466659,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0x700206a3cFcA9E2E73Ed87245C54033996f2698d",
      deploymentBlock: 47466664,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0xB61ae3B9a073591826175844A6632071E0867f78",
      deploymentBlock: 47466669,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xA76609bC4666bc2DeF57223513425e94e5f09Ceb",
      deploymentBlock: 47466674,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0xff6A8DA18d5E9720d268001AB26ff76a025371ea",
      deploymentBlock: 47466679,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0xAcc8a1712f6A5fbd6739b07f96e4e58933F51954",
      deploymentBlock: 47466684,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x6Cfc30384670e4D2c0dBBc08B3B7144c6DA829f3",
      deploymentBlock: 47466689,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0x30A9B04113fdf2d2dcE05b83A1DED4769a70Bf75",
      deploymentBlock: 47466694,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0x51b3d0D59424D6621177f474b639990b1C1Eb696",
      deploymentBlock: 47466699,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0xf7Bf18b9E2233A2353154A520d7Bc26ef4476F9a",
      deploymentBlock: 47466704,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
  },
  // Arbitrum Sepolia (sidechain) "v1" deployment, 2026-09-27 — same pool/token addresses as Base
  // Sepolia, different deployment blocks. Always look these up by chainId.
  421614: {
    ETH: {
      symbol: "ETH",
      name: "Ether",
      address: ETH_ADDRESS,
      decimals: 18,
      poolAddress: "0xBCF06223B275309AB5669E1554F53497bc54BF84",
      deploymentBlock: 314017581,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x2DEF7ab7eA15b1C26F3324eFfe37FE3dFe81BCeA",
      deploymentBlock: 314017655,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0x74310e2598BE3a7003Ed344720EE19f1e9F4C7cc",
      deploymentBlock: 314017728,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0x5D0F71C572457956E65a8585A34F7D79dA346f72",
      deploymentBlock: 314017800,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0x0254259AC3bD82C27905Ba40AF025b179145E1B2",
      deploymentBlock: 314017931,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0xF92459D190676840Fb91CB3cFaA15e4ad02E9E60",
      deploymentBlock: 314018003,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0x7dF64D71d32A279c600f23B6dEe7D2C242C3EDFd",
      deploymentBlock: 314018088,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x7Dc343657b43147F153f7A70b42948CCeab0220c",
      deploymentBlock: 314018161,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0xaa852C9969db36d9A78f81a4c4C1089862f41A57",
      deploymentBlock: 314018233,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0x6564852b5Da5ACA350408cFBeAB0C08B88f2eB18",
      deploymentBlock: 314018306,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0x36b151Bb2cb2F1720bf5c8b985578b378dA6c476",
      deploymentBlock: 314018380,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
  },
  // Ethereum Sepolia (sidechain) "v1" deployment, 2026-09-27 — same pool/token addresses as Base
  // Sepolia, different deployment blocks. Always look these up by chainId.
  11155111: {
    ETH: {
      symbol: "ETH",
      name: "Ether",
      address: ETH_ADDRESS,
      decimals: 18,
      poolAddress: "0x28eD5A1b4b91baBaF37F1cA285C25F8d92a43c6A",
      deploymentBlock: 11809035,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x87213D09C41142BdD4009bf2Fc24a6DDe507Fe05",
      deploymentBlock: 11809038,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0x370c26B9bc63aD03a79BC6b9f2C37BcFCca0D8E8",
      deploymentBlock: 11809040,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0xB35A8393BFed5725f8C090Fb333a272380CF71fb",
      deploymentBlock: 11809042,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xFD6054dd83f687e73D65f4FBA4058aB462f2ef3d",
      deploymentBlock: 11809044,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x28fdba84470Bc1395A5c8e8Eaf7BF04e007817Cc",
      deploymentBlock: 11809047,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0xa2cb0ACf20be2B1Aae905F134F45b1Ab9338F152",
      deploymentBlock: 11809050,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0xeaf3afA16A0079b8a3103371173dAbeFDb094627",
      deploymentBlock: 11809053,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0x7875d50c8758E022d8Dc7C76E36589b8ca3502Bb",
      deploymentBlock: 11809056,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0x1d5a8c62C49312203aAEcEe93BE8cDE08C7Fe959",
      deploymentBlock: 11809059,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0x10424ddE19779E7c9BaD50c31660A28EB4a14B36",
      deploymentBlock: 11809064,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
  },
};

/**
 * Testnet-only $SYD (Parallel Phase 2, deployed 2026-09-06) — deliberately NOT part of
 * `ASSETS` above: it has no `ShieldedPool`, by design (its purpose here is faucet
 * distribution + future staking-mechanics testing, not shielded custody). Genesis-mint
 * mirrors the real mainnet tokenomics' one defining property (fixed supply, minted once
 * — see `TestSYD.sol`); explicitly non-transferable, superseded rather than migrated
 * once the real $SYD launches. Keyed by chainId for consistency with `ASSETS`/`ADDRESSES`;
 * $SYD lives on Base Sepolia only — sidechains get it later via cross-chain bridging,
 * never a second mint.
 */
export const TESTNET_SYD: Record<number, { address: string; decimals: number } | undefined> = {
  84532: { address: "0xca1f9cc28eC3Ad7b60513BbF0e771240850Ad354", decimals: 18 },
};
