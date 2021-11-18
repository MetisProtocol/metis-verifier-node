
## DTL Service Enviroment Config


| Variable                                                | Default     | Description                                                                                        |
| ------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| URL                                                     | -           | used for setting the address manager address                                                       |
| DATA_TRANSPORT_LAYER__DB_PATH                           | /data/db    | Path to the database for this service, recommend using `URL` settting.                             |
| DATA_TRANSPORT_LAYER__ADDRESS_MANAGER                   | -           | Address of the AddressManager contract on L1.                                                      |
| DATA_TRANSPORT_LAYER__POLLING_INTERVAL                  | 5000        | Period of time between execution loops.                                                            |
| DATA_TRANSPORT_LAYER__DANGEROUSLY_CATCH_ALL_ERRORS      | false       | If true, will catch all errors without throwing.                                                   |
| DATA_TRANSPORT_LAYER__CONFIRMATIONS                     | 12          | Number of confirmations to wait before accepting transactions as "canonical".                      |
| DATA_TRANSPORT_LAYER__SERVER_HOSTNAME                   | localhost   | Host to run the API on.                                                                            |
| DATA_TRANSPORT_LAYER__SERVER_PORT                       | 7878        | Port to run the API on.                                                                            |
| DATA_TRANSPORT_LAYER__SYNC_FROM_L1                      | true        | Whether or not to sync from L1.                                                                    |
| DATA_TRANSPORT_LAYER__L1_RPC_ENDPOINT                   | -           | RPC endpoint for an L1 node.                                                                       |
| DATA_TRANSPORT_LAYER__LOGS_PER_POLLING_INTERVAL         | 2000        | Logs to sync per polling interval.                                                                 |
| DATA_TRANSPORT_LAYER__SYNC_FROM_L2                      | false       | Whether or not to sync from L2.                                                                    |
| DATA_TRANSPORT_LAYER__L2_RPC_ENDPOINT                   | -           | RPC endpoint for an L2 node.                                                                       |
| DATA_TRANSPORT_LAYER__TRANSACTIONS_PER_POLLING_INTERVAL | 1000        | Number of L2 transactions to query per polling interval.                                           |
| DATA_TRANSPORT_LAYER__L2_CHAIN_ID                       | -           | L2 chain ID.                                                                                       |
| DATA_TRANSPORT_LAYER__LEGACY_SEQUENCER_COMPATIBILITY    | false       | Whether or not to enable "legacy" sequencer sync (without the custom `eth_getBlockRange` endpoint) |
| DATA_TRANSPORT_LAYER__NODE_ENV                          | development | Environment the service is running in: production, development, or test.                           |
| DATA_TRANSPORT_LAYER__ETH_NETWORK_NAME                  | -           | L1 Ethereum network the service is deployed to: mainnet, kovan, goerli.                            |
| DATA_TRANSPORT_LAYER__L1_GAS_PRICE_BACKEND              | l1          | Where to pull the l1 gas price from (l1 or l2)                                                     |
| DATA_TRANSPORT_LAYER__DEFAULT_BACKEND                   | l1          | Where to sync transactions from (l1 or l2)                                                         |

NOTE:

| Variable                              | Stardust                                                                    | Andromeda                                                                      |
| ------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| DATA_TRANSPORT_LAYER__ADDRESS_MANAGER | 0xC9EB2B0bD7dbA69bb72886E9cF5da34d1Ca88C38                                  | 0x918778e825747a892b17C66fe7D24C618262867d                                     |
| URL                                   | https://metis-us-east-2-prod-json.s3.us-east-2.amazonaws.com/addresses.json | https://metis-us-east-2-mainnet-json.s3.us-east-2.amazonaws.com/addresses.json |
| DATA_TRANSPORT_LAYER__L2_CHAIN_ID     | 588                                                                         | 1088                                                                           |
| DATA_TRANSPORT_LAYER__L2_RPC_ENDPOINT | https://stardust.metis.io/?owner=588                                        | http://andromeda.metis.io/?owner=1088                                          |

## L2Geth Service Enviroment Config

| Variable                   | Default               | Description                                                                                                      |
| -------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| BLOCK_SIGNER_KEY           |                       | only used internally to sign blocks,no need to keep this secret                                                  |
| BLOCK_SIGNER_ADDRESS       |                       | block signer adddress                                                                                            |
| ROLLUP_CLIENT_HTTP         | http://localhost:7878 | HTTP endpoint for the rollup client                                                                              |
| ROLLUP_POLL_INTERVAL_FLAG  | 10s                   | Interval for polling with the rollup http client                                                                 |
| ROLLUP_TIMESTAMP_REFRESH   | 3min                  | Interval for refreshing the timestamp                                                                            |
| ROLLUP_BACKEND             | l1                    | Sync backend for verifiers ("l1" or "l2"), defaults to l1                                                        |
| ROLLUP_VERIFIER_ENABLE     |                       | Enable the verifier                                                                                              |
| ROLLUP_MAX_CALLDATA_SIZE   |                       | Maximum allowed calldata size for Queue Origin Sequencer Txs                                                     |
| ROLLUP_ENFORCE_FEES        |                       | Disable transactions with 0 gas price                                                                            |
| ROLLUP_FEE_THRESHOLD_DOWN  |                       | Allow txs with fees below the current fee up to this amount, must be < 1                                         |
| ROLLUP_FEE_THRESHOLD_UP    |                       | Allow txs with fees above the current fee up to this amount, must be > 1                                         |
| ETH1_SYNC_SERVICE_ENABLE   |                       | Enable the sync service                                                                                          |
| ETH1_CTC_DEPLOYMENT_HEIGHT |                       | Deployment of the canonical transaction chain                                                                    |
| NO_USB                     |                       | Disables monitoring for and managing USB hardware wallets                                                        |
| NETWORK_ID                 |                       | Network identifier                                                                                               |
| GCMODE                     | full                  | Blockchain garbage collection mode ("full", "archive")                                                           |
| IPC_DISABLE                |                       | Disable the IPC-RPC server                                                                                       |
| RPC_ENABLE                 |                       | Enable the HTTP-RPC server                                                                                       |
| RPC_ADDR                   | localhost             | HTTP-RPC server listening interface                                                                              |
| RPC_PORT                   | 8545                  | HTTP-RPC server listening port                                                                                   |
| RPC_CORS_DOMAIN            |                       | Comma separated list of domains from which to accept cross origin requests (browser enforced)                    |
| RPC_VHOSTS                 |                       | Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. |
| RPC_API                    |                       | API's offered over the HTTP-RPC interface                                                                        |
| WS                         |                       | Enable the WS-RPC server                                                                                         |
| WS_ADDR                    | 127.0.0.1             | WS-RPC server listening interface                                                                                |
| WS_PORT                    | 8546                  | WS-RPC server listening port                                                                                     |
| WS_API                     |                       | API's offered over the WS-RPC interface                                                                          |
| WS_ORIGINS                 |                       | Origins from which to accept websockets requests                                                                 |
| NO_DISCOVER                |                       | Disables the peer discovery mechanism (manual peer addition)                                                     |
| METRICS_ENABLE             |                       | Enable metrics collection and reporting                                                                          |
| DATADIR                    |                       | Block data directory                                                                                             |


BLOCK_SIGNER_KEY(**only used internally to sign blocks,no need to keep this secret**)

6587ae678cf4fc9a33000cdbf9f35226b71dcc6a4684a31203241f9bcfd55d27

BLOCK_SIGNER_ADDRESS:

0x00000398232E2064F896018496b4b44b3D62751F
