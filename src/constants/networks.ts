/**
 * Canonical network registry — chain slug, chainId, and a free public default RPC URL.
 * This is the single source of truth for network naming, used identically across the
 * Indexer API's `<network>` path segments, the Indexer Directory's `networks` field,
 * and the wallet's own chain config — decided explicitly so these three consumers
 * never drift into inconsistent slugs (see the Indexer design discussion in CLAUDE.md).
 *
 * Naming convention (decided 2026-09-06): `<chain>[-sepolia]` for testnets, the bare
 * `<chain>` name for mainnet — e.g. "base-sepolia" / "base".
 *
 * `defaultRpcUrl` is each chain's own official or well-established free public
 * endpoint — verified directly (web search, not memory) before being hardcoded here.
 * Deliberately never a private, keyed provider URL (e.g. an Infura URL with an
 * embedded project ID) — this file is bundled into a public client, and anyone
 * loading the wallet can read it. These are sensible DEFAULTS only: a wallet's own
 * per-network RPC override (planned as part of the Data Source / network-switcher
 * work) is always the escape hatch if a default ever goes stale, rate-limits too
 * hard, or is deprecated.
 *
 * Only Base/Arbitrum/Ethereum are listed — the three chains actually decided for
 * Shiyld (see CLAUDE.md's "Multi-Chain Selection" section). Shiyld has live contracts
 * on Base Sepolia only as of this entry; the other testnets and every mainnet entry
 * here are forward-looking config, not yet backed by a real deployment.
 */

export interface NetworkConfig {
  slug: string;
  chainId: number;
  name: string;
  defaultRpcUrl: string;
  isTestnet: boolean;
  /** Added 2026-09-06 for the wallet's network-switcher work (EOA `wallet_addEthereumChain`
   * calls and "view on explorer" links both need this) — same canonical-registry
   * reasoning as `defaultRpcUrl` above, just a different well-known public URL. */
  blockExplorerUrl: string;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  "base-sepolia": {
    slug: "base-sepolia",
    chainId: 84532,
    name: "Base Sepolia",
    defaultRpcUrl: "https://sepolia.base.org",
    isTestnet: true,
    blockExplorerUrl: "https://sepolia.basescan.org",
  },
  base: {
    slug: "base",
    chainId: 8453,
    name: "Base",
    defaultRpcUrl: "https://mainnet.base.org",
    isTestnet: false,
    blockExplorerUrl: "https://basescan.org",
  },
  "arbitrum-sepolia": {
    slug: "arbitrum-sepolia",
    chainId: 421614,
    name: "Arbitrum Sepolia",
    defaultRpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    isTestnet: true,
    blockExplorerUrl: "https://sepolia.arbiscan.io",
  },
  arbitrum: {
    slug: "arbitrum",
    chainId: 42161,
    name: "Arbitrum One",
    defaultRpcUrl: "https://arb1.arbitrum.io/rpc",
    isTestnet: false,
    blockExplorerUrl: "https://arbiscan.io",
  },
  "ethereum-sepolia": {
    slug: "ethereum-sepolia",
    chainId: 11155111,
    name: "Ethereum Sepolia",
    defaultRpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    isTestnet: true,
    blockExplorerUrl: "https://sepolia.etherscan.io",
  },
  ethereum: {
    slug: "ethereum",
    chainId: 1,
    name: "Ethereum",
    defaultRpcUrl: "https://ethereum-rpc.publicnode.com",
    isTestnet: false,
    blockExplorerUrl: "https://etherscan.io",
  },
};

export function networkBySlug(slug: string): NetworkConfig | undefined {
  return NETWORKS[slug];
}

export function networkByChainId(chainId: number): NetworkConfig | undefined {
  return Object.values(NETWORKS).find((n) => n.chainId === chainId);
}
