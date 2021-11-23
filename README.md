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

It retrieves and indexes blocks from L1, and saves states in local database.

Before running this service, please read our [configuration instructions](./CONFIG.md) and changes to the correct configuration.

Start the service

```sh
docker-compose up -d dtl-mainnet
```

Get the logs

```sh
docker-compose logs -f dtl-mainnet
```

If you get this log below, it means the start-up was successful

```
{"level":30,"time":1637635043668,"msg":"Service has started"}
```

NOTE: After the Mainnet is live, we need to monitor the status of the verifier nodes.

We will send a `/verifier/get/*` request to your DTL service

Please change your firewall inbound rules to allow the IP `3.13.115.31` to access port `8080` of your verifier node.

### Run l2geth service

It gets states from DTL service, and reconstructs blocks locally, and provides web3 interface for your applications.

```
docker-compose up -d l2geth-mainnet
```

**NOTE: the DTL and L2Geth services doesn't work on testnest now**

## Fraud proof service

**BUILDING, DON'T USE IT NOW**

NOTE: the service is not yet fully operational on mainnet, please watch for our subsequent announcements

There isn't an out-of-the-box service yet, you can read the code examples here and then build your own service.

### Enter staking

Make sure your wallet address is whitelisted first and you have sufficient METIS and ETH in your address

Read code example [here](./src/enterStake.ts).

### Make a challenge

Read code example [here](./src/makeChallenge.ts).

### Verify1 phase

You have to make a `verify1` if someone makes a challenge.

Read code example [here](./src/verify1.ts).

### Verify2 phase

If verify1 phase is done, you have to make a `verify2` transaction.

Read code example [here](./src/verify2.ts).
