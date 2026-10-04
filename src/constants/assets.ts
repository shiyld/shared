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
      poolAddress: "0xcd04e0F287A0bEbDEDEBFdFCd83ff5F4973C35bD",
      deploymentBlock: 47672278,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x475713b723d96a2FCE6a483Ca3856dDeEEaF003e",
      deploymentBlock: 47672286,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0x642bad272134A20BA815e5c0E113d4761ebd7384",
      deploymentBlock: 47672295,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0xF4B57DF06eAB81254AE27C864BD1a5e6bA785068",
      deploymentBlock: 47672304,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0x52dd7f65169e0AeF6a8e70600B90D5D246772562",
      deploymentBlock: 47672313,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x115d7aCAA5f3154cDd34b60780DF2b4027B9Bce7",
      deploymentBlock: 47672322,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0xF6421c5f8AA5088E67a71d724Ab21B8C599dA1a2",
      deploymentBlock: 47672331,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0xd16882C1B5880cc395005FE527392c3CA030a84b",
      deploymentBlock: 47672340,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0xc1956E634F60C390664E1b1D4a9cE47a6B22AFd3",
      deploymentBlock: 47672348,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0xcD1F29BF3650AE2B08fac07ba81a5b90a75f283A",
      deploymentBlock: 47672357,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0xb55990e05b15149a3b6Bd11CdEA5fd2ef2DF5bc1",
      deploymentBlock: 47672366,
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
      poolAddress: "0xc8b6F4AC0a25030909D8bCc3Fff52dD6219be047",
      deploymentBlock: 315457554,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x004f4496A7F0C32Ae46F54a1Bc19e759Fd21Fc94",
      deploymentBlock: 315457627,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0xCB7C393938c05815Ff641b5B186Ef2FD1b47cF9B",
      deploymentBlock: 315457702,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0x156c4deA1F4dAb9A3F15966becF2Fe9606477D72",
      deploymentBlock: 315457877,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0x50dC59f66481b89F4DbD15A3fF80f84B98D171Da",
      deploymentBlock: 315457952,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x54435683Db41b038d6D10fc5D42EaEDb9687881c",
      deploymentBlock: 315458025,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0x84511F7fC0FC0f822736af2f37d45e303b8bADC5",
      deploymentBlock: 315458097,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x29E7A8D68b696F81873f16199CdFD5a9Bb734226",
      deploymentBlock: 315458171,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0xF613C2Aca25eA58cfd9527322106ae092296Cef8",
      deploymentBlock: 315458243,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0xE2fE5BB270b14Da4Fa9B100E910C0b8ba0A0b211",
      deploymentBlock: 315458325,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0xd5098bda9B08b33e5C6940b1eBddf705ADd845b5",
      deploymentBlock: 315458445,
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
      poolAddress: "0xB8f93a39c4515b352afDfB0CAd061b8C750Bb5C9",
      deploymentBlock: 11838242,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDT: {
      symbol: "USDT",
      name: "USDT Mocked",
      address: "0x6F1F10b56ad4D634C1327299572E330f65C51B67",
      decimals: 6,
      poolAddress: "0x088AddF46B1a3EA749b0eA203BFfE657f723a879",
      deploymentBlock: 11838244,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    USDC: {
      symbol: "USDC",
      name: "USDC Mocked",
      address: "0xF696990424EFe917b17eD6DE37C8e2b0D3dA5442",
      decimals: 6,
      poolAddress: "0xd25a4BF0C707cd40524BFb8D9aACE16E8A750Ce2",
      deploymentBlock: 11838246,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    DAI: {
      symbol: "DAI",
      name: "DAI Mocked",
      address: "0x73C816A6660cd9640774BEb99dE027Bc07E4b3e8",
      decimals: 18,
      poolAddress: "0xBF7657c4530A2E83B7378387A79857819017cAde",
      deploymentBlock: 11838249,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    BTC: {
      symbol: "BTC",
      name: "WBTC Mocked",
      address: "0x002336Cf16c4d2FcB0CB68133A0573501B6b0A34",
      decimals: 8,
      poolAddress: "0xFAF09BeCB44b7826487c91b74640Cc73b23DF765",
      deploymentBlock: 11838252,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAU: {
      symbol: "XAU",
      name: "XAU Mocked",
      address: "0xCe6DCC40E7eD73e2Cdf4cb25A427F87c7733A807",
      decimals: 18,
      poolAddress: "0x943aA5882231505a7Be2De8Bc308744226B71eBF",
      deploymentBlock: 11838254,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    XAG: {
      symbol: "XAG",
      name: "XAG Mocked",
      address: "0xf0C8bEB8b3c4046F197cD97470172C0F0cb0fB4B",
      decimals: 18,
      poolAddress: "0x45033563df69478334AFC94f68A422d4F0E41250",
      deploymentBlock: 11838257,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AAPL: {
      symbol: "AAPL",
      name: "AAPL Mocked",
      address: "0x6132d2f94dc9fc645191FB51b6f1a1a79dF422d9",
      decimals: 18,
      poolAddress: "0x321aDCA539e1aBabEF88D2a6ddd7227Da061Ee39",
      deploymentBlock: 11838260,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    MSFT: {
      symbol: "MSFT",
      name: "MSFT Mocked",
      address: "0xf24E35131d7B78d5817BC3418f56Aec70556FC2A",
      decimals: 18,
      poolAddress: "0xf5F01fBc1BE19B044Da36e4B06374228813e492f",
      deploymentBlock: 11838263,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    AMZN: {
      symbol: "AMZN",
      name: "AMZN Mocked",
      address: "0x1EC9e7d95dc809221c084A428B4aAd7AaaC5364a",
      decimals: 18,
      poolAddress: "0x56Ea519Be2c38c861be69534cD0D96a2ec54a534",
      deploymentBlock: 11838265,
      supports2Input: true,
      supportsDepositCiphertext: true,
      supportsFeeEnforcement: true,
    },
    NVDA: {
      symbol: "NVDA",
      name: "NVDA Mocked",
      address: "0x6d94C2b7b14b1d98877C6474a4A8190198119dd0",
      decimals: 18,
      poolAddress: "0x6bB1FfD2B43D786a837a392eA3a4Bf8E1dAbe2C7",
      deploymentBlock: 11838267,
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
