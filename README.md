# Metis verifier node setup guide

## Prerequisites

- docker
- docker-compose

## Setup a verifier node

### Clone this repository

```
git clone https://github.com/ericlee42/metis-verifier-node-setup.git
```

### Run DTL (data transfer layer) service

**Mainnet**

```
docker-compose up -d dtl-mainnet
```

**Testnet**

```
docker-compose -f docker-compose-testnet.yml up -d dtl-testnet
```

### Run l2geth service

**Mainnet**

```
docker-compose up -d l2geth-mainnet
```

**Testnet**

```
docker-compose -f docker-compose-testnet.yml up -d l2geth-testnet
```

The config of the services, you can get from [config.md](./CONFIG.md)

## Enter staking

Make sure your wallet address is whitelisted first and you have sufficient METIS and ETH in your address

Read code example [here](./src/enterStake.ts).

## Make a challenge

Read code example [here](./src/makeChallenge.ts).

## Verify1 phase

You have to make a `verify1` if someone makes a challenge.

Read code example [here](./src/verify1.ts).

## Verify2 phase

If verify1 phase is done, you have to make a `verify2` transaction.

Read code example [here](./src/verify2.ts).
