# @shiyld/shared

Shared TypeScript types, address/asset constants, and contract ABIs used across the
[Shiyld](https://shiyld.com) privacy protocol — a zero-knowledge, shielded-pool DeFi
protocol on Base.

This package has no runtime logic of its own. It exists so that Shiyld's own apps
(wallet, indexer, relayer) and any third-party integration share one source of truth
for the `Note` type, deployed contract addresses per chain, asset configuration, and
contract ABIs, instead of each maintaining its own copy.

## Install

```bash
npm install @shiyld/shared
```

## What's in here

- `Note`, `NoteType`, `NoteWithMeta`, `MerkleProof`, `ProofInputs` — the core note schema
- `Pool`, `PoolEvent` — pool/event types
- `ZKProof`, `PublicSignals`, `ProofBundle`, `OperationType` — proof types
- `ADDRESSES` — deployed contract addresses, keyed by chain ID
- `ASSETS`, `ETH_ADDRESS`, `TESTNET_SYD` — supported asset configuration
- `NETWORKS`, `networkBySlug`, `networkByChainId` — supported network configuration
- `SHIELDED_POOL_ABI`, `PARAMETER_REGISTRY_ABI`, `EPOCH_MANAGER_ABI` — contract ABIs

## Provenance

This repository is a mirrored, independently-versioned release of
`packages/shared` from Shiyld's private monorepo. It's published here so that
`@shiyld/indexer-core`, `@shiyld/wallet-core`, and any third-party consumer can depend
on it as a normal npm package rather than a private workspace link. Source changes
land here via a one-way mirror from the private monorepo; this repo's own history
starts fresh at `v1.0.0`, independent of the monorepo's internal version history.

## License

MIT
