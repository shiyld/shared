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
 * differ since the 2026-09-29 soundness-fix redeploy (redeployed again 2026-10-03 with the
 * pre-mainnet hardening fixes), and an address on one chain can be
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
      poolAddress: "0x21565437890Ea3932077739ad88630d7008504b1",
      deploymentBlock: 47608623,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0xec1827CE769C399f42EA5953803Fe8511d6D6890",
      deploymentBlock: 47608632,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0xC3d4315B7cF4457988489b8E32b768bC1C407d07",
      deploymentBlock: 47608641,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0xB6363673d9E58750E6D1008A280e52Cf846A4579",
      deploymentBlock: 47608650,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xC8630dd17058Cc1db32664E669AD2dD9C586dA21",
      deploymentBlock: 47608659,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0xe3E2624FdC217FB2D26D9714B62228c402B90F84",
      deploymentBlock: 47608668,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0xa266382158E8564DC31A307025BD916568AE6023",
      deploymentBlock: 47608677,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x3158fa8abfB13d15c36f7C4a5df28ec75f8821aD",
      deploymentBlock: 47608686,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0xDb03eF70844223dc657ede2754bB7a3035e88dA8",
      deploymentBlock: 47608695,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0xe3FC16547cfE4FAc8B1C0BFf42aA6ac440ef7A81",
      deploymentBlock: 47608703,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0x17c556bC30faBe4eF570354caCD47d28F82110bD",
      deploymentBlock: 47608712,
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
      poolAddress: "0xE87C8A79a7088675D9D27BF488d650C61835F368",
      deploymentBlock: 315152078,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x3e971033FC74Dd8Db9C9FE05E32ECCb67ec7e2eb",
      deploymentBlock: 315152154,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0xdA92bB0226A420383c87388236432E5FE424c572",
      deploymentBlock: 315152241,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0xf8e189a7ad0d846072f2DbDF0D540f2156b08744",
      deploymentBlock: 315152316,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xdc8D1A7C8AE6FaF6B5D550FC0F288E18b3Ce1879",
      deploymentBlock: 315152395,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x95ba9AC8B7e574b14626e67F586bA3A704b117e3",
      deploymentBlock: 315152482,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0x7139f6F8Ff16FbfA62940a4A3398E0ec3E5b3A05",
      deploymentBlock: 315152615,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x70168d337B225036757985c433d5d165CcDD0cAa",
      deploymentBlock: 315152697,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0x6336707eD56d253Ab5cd45Ca1a8E65AE359C385C",
      deploymentBlock: 315152772,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0xD3FBE8402cF326E545C340936a27A7EEC023AB7D",
      deploymentBlock: 315152854,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0x976c58Ecb66a1faDa5613558efA3e49e7C8bCAE6",
      deploymentBlock: 315152930,
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
      poolAddress: "0xBBc38a5B99184F66638f304f380089e1EDf2e31B",
      deploymentBlock: 11832497,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x16009c32CD120c36dd170f719e874d65d680170D",
      deploymentBlock: 11832499,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0xb1c7De80E0F464c739cB06B2D8538bC8C89F641a",
      deploymentBlock: 11832501,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0x00166909602811FAe7874a800c324F6f17972fAC",
      deploymentBlock: 11832503,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xa7ba25dB2A762646bb688f2E60764F1973Cee3C1",
      deploymentBlock: 11832506,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x2F399bAa1001ecC534Ebbda8C86540f05E7FF6c7",
      deploymentBlock: 11832509,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0x8Af12B0001c711Ad40b81977977074685d4331BC",
      deploymentBlock: 11832512,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x1C25C0b9584d59c9521ef82182E41CC5766c5c50",
      deploymentBlock: 11832514,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0x8e694c0B40b12a7070a3c2f06fEe35A8c2573eD4",
      deploymentBlock: 11832517,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0xba3ac5c0d913EeB6A36c5E5d9823A166149cf798",
      deploymentBlock: 11832520,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0x1eADb2419537e05557874837c4753a147a811173",
      deploymentBlock: 11832523,
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
