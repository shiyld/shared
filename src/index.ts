// Explicit named re-exports, not `export *` barrel — TypeScript compiles `export *`
// (CJS target) to a dynamic __exportStar(require(...), exports) loop, which Rollup can't
// statically analyze for named exports (silently produces `undefined` for consumers that
// import named bindings from this package in a Vite/Rollup production build, even though
// it works fine under ts-node/Jest/webpack's more lenient CJS interop). Explicit named
// exports compile to statically-analyzable Object.defineProperty calls instead — see
// CLAUDE.md's Vite migration section.
export type { Note, NoteType, NoteWithMeta, MerkleProof, ProofInputs } from "./types/note";
export type { Pool, PoolEvent } from "./types/pool";
export type { ZKProof, PublicSignals, ProofBundle, OperationType } from "./types/proof";
export { ETH_ADDRESS, ASSETS, TESTNET_SYD } from "./constants/assets";
export type { AssetConfig } from "./constants/assets";
export { ADDRESSES } from "./constants/addresses";
export type { ChainAddresses } from "./constants/addresses";
export { NETWORKS, networkBySlug, networkByChainId } from "./constants/networks";
export type { NetworkConfig } from "./constants/networks";
export { SHIELDED_POOL_ABI } from "./abi/shieldedPool";
export { PARAMETER_REGISTRY_ABI } from "./abi/parameterRegistry";
export { EPOCH_MANAGER_ABI } from "./abi/epochManager";
