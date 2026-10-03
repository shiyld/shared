/**
 * Minimal Staking ABI — stake / withdraw / claim and the fee-perk views the wallet needs
 * (STAKING-AND-TREASURY-PLAN.md §3–§4). Hand-maintained, same convention as the other ABIs
 * here. Staking is a Base-only contract.
 */
export const STAKING_ABI = [
  "function stake(uint256 amount, uint256 lockEpochs) returns (uint256 id)",
  "function stakeLp(uint256 amount, uint256 lockEpochs) returns (uint256 id)",
  "function withdraw(uint256 id)",
  "function claim()",
  "function claimAndRelock(uint256 lockEpochs) returns (uint256 id)",
  "function refreshPerks() returns (uint256 validUntil)",
  "function perksOf(address staker) view returns (uint128[3] syd, uint128[3] lp, uint64 validUntil)",
  "function quotePerks(address staker, address pool, uint256 netAmount, uint256 discountUsed) view returns (uint256 extraLimit, uint256 covered, uint256 coveredFee)",
  "function earned(address staker) view returns (uint256[2])",
  "function activePositionIds(address staker) view returns (uint256[])",
  "function unlockTimeFor(uint256 lockEpochs) view returns (uint256)",
  "function positions(uint256 id) view returns (uint128 amount, uint64 unlockTime, uint16 multiplierBps, uint8 tier, uint8 kind, bool withdrawn, bool migrated, address owner, uint64 stakedAt)",
] as const;
