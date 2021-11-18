# Metis verifier node setup guide

## Prerequired

- docker
- docker-compose

## Setup a verifier node

clone this repository

```
git clone https://github.com/ericlee42/metis-verifier-node-setup.git
```

Run DTL(data transfer layer) service

```
docker-compose up -d dtl-mainnet

# testnet
docker-compose -f docker-compose-testnet.yml up -d dtl-testnet
```

Run l2geth service

```
docker-compose up -d l2geth-mainnet

# testnet
docker-compose -f docker-compose-testnet.yml up -d l2geth-test
```

the config of the services, you can get from [config.md](./CONFIG.md)

## Enter staking

Make sure your wallet address is in the whitelist first, and that you have sufficient METIS and ETH at your address

Read code example [here](https://github.com/ericlee42/metis-verifier-node-setup/blob/main/src/index.ts#L33-L48).

## Make a challenge

Read code example [here](https://github.com/ericlee42/metis-verifier-node-setup/blob/main/src/index.ts#L33-L48).

## Verify1 phase

You have to make a `verify1` if someone makes a challenge.

Read code example [here](https://github.com/ericlee42/metis-verifier-node-setup/blob/main/src/index.ts#L83-L104).

## Verify2 phase

If verify1 phase is done, you have to make a `verify2` transaction.

Read code example [here](https://github.com/ericlee42/metis-verifier-node-setup/blob/main/src/index.ts#L106-L115).
