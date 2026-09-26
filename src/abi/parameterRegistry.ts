/**
 * Hand-maintained ethers v6 human-readable ABI fragment for ParameterRegistry.
 * Only the read functions wallet-core actually calls — not a full artifact export.
 * Signatures verified directly against packages/contracts/contracts/core/ParameterRegistry.sol.
 */
export const PARAMETER_REGISTRY_ABI = [
  "function depositFeeBps() view returns (uint256)",
  "function withdrawFreeFeeBps() view returns (uint256)",
  "function withdrawNetReceiverFeeBps() view returns (uint256)",
  "function netReceiverCap(address pool) view returns (uint256)",
  "function mainnetLaunchTimestamp() view returns (uint256)",
] as const;
