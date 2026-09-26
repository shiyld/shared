/**
 * Hand-maintained ethers v6 human-readable ABI fragment for ShieldedPool.
 * Only the functions/events the wallet actually calls — not a full artifact export.
 * Signatures verified directly against packages/contracts/contracts/core/ShieldedPool.sol.
 * Re-verify against that file if ShieldedPool.sol changes.
 */
export const SHIELDED_POOL_ABI = [
  "function deposit(uint256[2] pA, uint256[2][2] pB, uint256[2] pC, bytes32 commitment, bytes32 pubkey, uint256 amount, bytes envelope) payable",
  "function transfer(uint256[2] pA, uint256[2][2] pB, uint256[2] pC, bytes32 nullifier, bytes32 outputCommitment, bytes32 changeCommitment, bytes32 merkleRoot, uint256 fee, bytes outputEnvelope, bytes changeEnvelope)",
  "function withdraw(uint256[2] pA, uint256[2][2] pB, uint256[2] pC, bytes32 nullifier, address payable recipient, uint256 amount, bytes32 merkleRoot, uint256 fee, bytes32 changeCommitment, bytes changeEnvelope)",
  // Two-input variants — Phase 2 Completion Checklist item #1 ("Multi-input note
  // selection", see CLAUDE.md). Take a single calldata struct (ShieldedPool.sol's
  // Transfer2Params/Withdraw2Params), not flat args — a "stack too deep" fix, not a
  // stylistic choice; ethers' tuple ABI syntax below matches the struct field order
  // exactly. Only pools deployed v6+ have these — check AssetConfig.supports2Input
  // before ever calling either (see constants/assets.ts).
  "function transfer2((uint256[2] pA, uint256[2][2] pB, uint256[2] pC, bytes32 nullifier1, bytes32 nullifier2, bytes32 outputCommitment, bytes32 changeCommitment, bytes32 merkleRoot, uint256 fee, bytes outputEnvelope, bytes changeEnvelope) p)",
  "function withdraw2((uint256[2] pA, uint256[2][2] pB, uint256[2] pC, bytes32 nullifier1, bytes32 nullifier2, address payable recipient, uint256 amount, bytes32 merkleRoot, uint256 fee, bytes32 changeCommitment, bytes changeEnvelope) p)",
  "function root() view returns (bytes32)",
  "function isKnownRoot(bytes32 root) view returns (bool)",
  "function asset() view returns (address)",
  "function nullifiers(bytes32) view returns (bool)",
  // Fee Enforcement (see CLAUDE.md's "Fee Enforcement Strategy" and "Net-Receiver
  // Withdraw Fee Tiering" sections) — wallet-core reads these directly to compute the
  // exact fee a withdrawal must carry before generating its proof, mirroring
  // ShieldedPool.sol's own _settleWithdrawFee logic exactly (see circuitInputs.ts).
  "function epochManager() view returns (address)",
  "function parameterRegistry() view returns (address)",
  "function lifetimeDeposited(address) view returns (uint256)",
  "function freelyWithdrawn(address) view returns (uint256)",
  "function netReceiverWithdrawnThisEpoch(address) view returns (uint256)",
  "function lastEpochSeen(address) view returns (uint256)",
  // envelope/outputEnvelope/changeEnvelope: Stealth Notes ciphertext (see CLAUDE.md's
  // "Note Discovery" section) — every wallet trial-decrypts these to rediscover its own
  // notes. envelope (deposit) and changeEnvelope (transfer/withdraw) stay fully opaque
  // on-chain — always self-sealed, never verified. transfer()'s outputEnvelope is the
  // one exception: Cross-Wallet Send's ciphertext-correctness constraint means it's
  // parsed and checked against the proof — same ABI signature either way, only the
  // contract's internal handling changed.
  "event Deposit(bytes32 indexed commitment, uint32 leafIndex, uint256 amount, bytes envelope)",
  "event Transfer(bytes32 indexed nullifier, bytes32 indexed outputCommitment, bytes32 indexed changeCommitment, bytes outputEnvelope, bytes changeEnvelope)",
  "event Withdrawal(bytes32 indexed nullifier, address indexed recipient, uint256 amount, bytes32 indexed changeCommitment, bytes changeEnvelope)",
  // nullifier2 rides as plain (non-indexed) data on both — only 3 indexed topics are
  // available per event, and nullifier1 + the discovery-relevant fields (commitments/
  // recipient) already use them, matching Transfer/Withdrawal's own indexing choices.
  "event Transfer2(bytes32 indexed nullifier1, bytes32 indexed outputCommitment, bytes32 indexed changeCommitment, bytes32 nullifier2, bytes outputEnvelope, bytes changeEnvelope)",
  "event Withdrawal2(bytes32 indexed nullifier1, address indexed recipient, bytes32 indexed changeCommitment, bytes32 nullifier2, uint256 amount, bytes changeEnvelope)",
  // Emitted once per leaf insertion (MerkleTree.sol) — the authoritative, order-correct
  // source for tree reconstruction. leafIndex + emission order removes any need to infer
  // insertion order from Deposit/Transfer/Withdrawal alone (transfer() inserts 2 leaves
  // per call, withdraw() inserts 1 alongside a public payout — LeafInserted disambiguates
  // both directly instead of relying on contract-internal insert-order knowledge).
  "event LeafInserted(uint32 indexed leafIndex, bytes32 leaf, bytes32 root)",
] as const;
