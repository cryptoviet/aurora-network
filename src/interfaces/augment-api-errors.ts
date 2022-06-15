// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';

declare module '@polkadot/api-base/types/errors' {
  export interface AugmentedErrors<ApiType extends ApiTypes> {
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed MaxReserves
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    ethereum: {
      /**
       * Signature is invalid.
       **/
      InvalidSignature: AugmentedError<ApiType>;
      /**
       * Pre-log is present, therefore transact is not allowed.
       **/
      PreLogExists: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    evm: {
      /**
       * Not enough balance to perform action
       **/
      BalanceLow: AugmentedError<ApiType>;
      /**
       * Calculating total fee overflowed
       **/
      FeeOverflow: AugmentedError<ApiType>;
      /**
       * Gas price is too low.
       **/
      GasPriceTooLow: AugmentedError<ApiType>;
      /**
       * Nonce is invalid
       **/
      InvalidNonce: AugmentedError<ApiType>;
      /**
       * Calculating total payment overflowed
       **/
      PaymentOverflow: AugmentedError<ApiType>;
      /**
       * Withdraw fee failed
       **/
      WithdrawFailed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    faucet: {
      DontBeGreedy: AugmentedError<ApiType>;
      NotEnoughBalance: AugmentedError<ApiType>;
      PleaseWait: AugmentedError<ApiType>;
      TransferToSelf: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    gameCreator: {
      /**
       * The contract had claimed
       **/
      ContractClaimed: AugmentedError<ApiType>;
      /**
       * Claim the contract does not exist
       **/
      ContractNotFound: AugmentedError<ApiType>;
      /**
       * Not the contract creator either game creator
       **/
      NotContractOwner: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    palletCache: {
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    palletCacheFaucet: {
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    player: {
      PlayerExisted: AugmentedError<ApiType>;
      PlayerIdUsed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    pool: {
      AlreadyJoined: AugmentedError<ApiType>;
      ComingSoon: AugmentedError<ApiType>;
      NotFoundInPool: AugmentedError<ApiType>;
      TicketNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    poolName: {
      /**
       * A name is too long.
       **/
      TooLong: AugmentedError<ApiType>;
      /**
       * A name is too short.
       **/
      TooShort: AugmentedError<ApiType>;
      /**
       * A pool isn't named.
       **/
      Unnamed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    proofAddressMapping: {
      AlreadyBond: AugmentedError<ApiType>;
      NonbondAccount: AugmentedError<ApiType>;
      SignatureOrAddressNotCorrect: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sponsoredPool: {
      ExceedMaxPoolOwned: AugmentedError<ApiType>;
      ExceedPoolTarget: AugmentedError<ApiType>;
      GreaterThanMaxTxLimit: AugmentedError<ApiType>;
      GreaterThanMinDiscountPercent: AugmentedError<ApiType>;
      /**
       * Can not convert pool id to account
       **/
      IntoAccountFail: AugmentedError<ApiType>;
      IntoU32Fail: AugmentedError<ApiType>;
      LessThanMinDiscountPercent: AugmentedError<ApiType>;
      LessThanMinTxLimit: AugmentedError<ApiType>;
      NotReachMinPoolBalance: AugmentedError<ApiType>;
      /**
       * Origin not the owner
       **/
      NotTheOwner: AugmentedError<ApiType>;
      /**
       * Generate the pool id that duplicated
       **/
      PoolIdExisted: AugmentedError<ApiType>;
      PoolNotExist: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    stakingPool: {
      IntoBalanceFail: AugmentedError<ApiType>;
      LevelNotFound: AugmentedError<ApiType>;
      PlayerNotStake: AugmentedError<ApiType>;
      StakeCountOverflow: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    txHandler: {
      IntoAccountFail: AugmentedError<ApiType>;
      IntoBalanceFail: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    upfrontPool: {
      CanNotClearNewPlayers: AugmentedError<ApiType>;
      ExceedMaxPlayer: AugmentedError<ApiType>;
      IntoBalanceFail: AugmentedError<ApiType>;
      LevelNotFound: AugmentedError<ApiType>;
      PlayerCountOverflow: AugmentedError<ApiType>;
      PlayerNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
