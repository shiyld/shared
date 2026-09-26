/**
 * Hand-maintained ethers v6 human-readable ABI fragment for EpochManager.
 * Only the read function wallet-core actually calls — not a full artifact export.
 * Signature verified directly against packages/contracts/contracts/core/EpochManager.sol.
 */
export const EPOCH_MANAGER_ABI = ["function currentEpoch() view returns (uint256)"] as const;
