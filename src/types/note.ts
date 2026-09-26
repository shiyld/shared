/**
 * NOTE SCHEMA — CRITICAL: DO NOT MODIFY AFTER CIRCUITS ARE WRITTEN.
 * Every field here is encoded in the Circom circuits.
 * Any change requires rewriting and re-auditing all circuits.
 */

export interface Note {
  /** Asset identifier — ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" */
  asset: string;
  /** Value in wei */
  amount: bigint;
  /** Owner's spending public key (derived from spending private key) */
  pubkey: string;
  /** Random blinding factor — makes commitments unlinkable */
  randomness: bigint;
  /** Poseidon(asset, amount, pubkey, randomness) — stored on-chain as a leaf */
  commitment: string;
  /** Poseidon(spending_privkey, commitment) — revealed on spend to prevent double-spend */
  nullifier: string;
}

/**
 * Wallet-local bookkeeping only — never a circuit input (unlike `Note` above, which
 * genuinely is one). Safe to extend freely.
 *
 * "transfer" vs. "transfer_in" is a real, deliberate distinction, not a naming
 * accident: a transfer-output note's envelope carries no sender identity by design
 * (that's the whole privacy point), so the only reliable way to know whether a given
 * wallet SENT this note or RECEIVED it is to track *how* it first entered that
 * wallet's local vault, not anything decodable from the note/envelope itself.
 * - "transfer" — this wallet's own send() action recorded this note synchronously,
 *   right after submitting the tx (only ever happens for a self-addressed send).
 * - "transfer_in" — this wallet only ever learned about this note by trial-decrypting
 *   someone else's on-chain Transfer/Transfer2 event during a scan — i.e. someone
 *   else genuinely sent it to this wallet.
 * See CLAUDE.md-equivalent reasoning in apps/wallet/src/lib/activity.ts and
 * packages/wallet-core/src/scanner.ts, where this distinction is actually produced
 * and consumed.
 */
export type NoteType =
  | "deposit"
  | "transfer"
  | "transfer_in"
  | "change"
  | "fee";

export interface NoteWithMeta extends Note {
  type: NoteType;
  /** Block number when the commitment was added to the Merkle tree */
  blockNumber: number;
  /** Index of this note's leaf in the Merkle tree */
  leafIndex: number;
  /** Whether this note has been spent (nullifier seen on-chain) */
  spent: boolean;
  /** The ShieldedPool contract address this note's leaf actually lives in — pure local
   * bookkeeping, no circuit/contract impact (not part of the locked Note schema above,
   * never hashed into a commitment/nullifier). Required because the vault is keyed only
   * by Shiyld address, not by pool: every pool version this identity has ever used
   * (v1..v5, and any future one) shares the same IndexedDB vault, so without this field
   * a note from a superseded pool would still look "spendable" after a pool migration —
   * its leafIndex no longer corresponds to any real leaf in the new pool's (much
   * smaller) tree, so a spend attempt fails a Merkle-membership circuit assertion
   * instead of a clean error. Notes written before this field existed come back as
   * `poolAddress: undefined` at runtime; they're deliberately excluded from
   * balance/spend-selection rather than guessed into the current pool. */
  poolAddress: string;
}

export interface MerkleProof {
  /** The Merkle root this proof is valid for */
  root: string;
  /** Sibling hashes along the path from leaf to root */
  siblings: string[];
  /** Direction bits: 0 = left, 1 = right */
  pathIndices: number[];
}

export interface ProofInputs {
  note: Note;
  merkleProof: MerkleProof;
  recipient?: string;
  relayer?: string;
  fee?: bigint;
}
