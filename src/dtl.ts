export interface VerifierResultEntry {
  index: number; // match StateRootEntry's index
  stateRoot: string;
  verifierRoot: string;
  timestamp: number;
}

interface BatchEntry {
  index: number;
  blockNumber: number;
  timestamp: number;
  submitter: string;
  size: number;
  root: string;
  prevTotalElements: number;
  extraData: string;
  l1TransactionHash: string;
}

export type TransactionBatchEntry = BatchEntry;
export type StateRootBatchEntry = BatchEntry;

export interface VerifierResultResponse {
  verify: VerifierResultEntry;
  batch: StateRootBatchEntry;
  success: boolean;
}
