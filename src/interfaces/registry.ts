// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { DevnetRuntime, EthbloomBloom, EthereumBlock, EthereumHeader, EthereumLog, EthereumReceiptEip658ReceiptData, EthereumReceiptReceiptV3, EthereumTransactionAccessListItem, EthereumTransactionEip1559Transaction, EthereumTransactionEip2930Transaction, EthereumTransactionLegacyTransaction, EthereumTransactionTransactionAction, EthereumTransactionTransactionSignature, EthereumTransactionTransactionV2, EthereumTypesHashH64, EvmCoreErrorExitError, EvmCoreErrorExitFatal, EvmCoreErrorExitReason, EvmCoreErrorExitRevert, EvmCoreErrorExitSucceed, FinalityGrandpaEquivocationPrecommit, FinalityGrandpaEquivocationPrevote, FinalityGrandpaPrecommit, FinalityGrandpaPrevote, FpRpcTransactionStatus, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchClass, FrameSupportWeightsDispatchInfo, FrameSupportWeightsPays, FrameSupportWeightsPerDispatchClassU32, FrameSupportWeightsPerDispatchClassU64, FrameSupportWeightsPerDispatchClassWeightsPerClass, FrameSupportWeightsRuntimeDbWeight, FrameSupportWeightsWeightToFeeCoefficient, FrameSystemAccountInfo, FrameSystemCall, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonZeroSender, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, GafiPrimitivesPoolService, GafiPrimitivesSystemServicesSystemService, GafiPrimitivesTicket, GafiPrimitivesTicketCustomTicket, GafiPrimitivesTicketSystemTicket, GafiPrimitivesTicketTicketInfo, GafiPrimitivesTicketTicketLevel, GafiPrimitivesTicketTicketType, GafiTxCall, GafiTxError, GafiTxEvent, GameCreatorCall, GameCreatorError, GameCreatorEvent, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesCall, PalletBalancesError, PalletBalancesEvent, PalletBalancesReasons, PalletBalancesReleases, PalletBalancesReserveData, PalletBaseFeeCall, PalletBaseFeeEvent, PalletCacheCall, PalletCacheError, PalletCacheEvent, PalletCacheFlag, PalletCacheWrapDataTicketInfo, PalletCacheWrapDataU128, PalletDynamicFeeCall, PalletEthereumCall, PalletEthereumError, PalletEthereumEvent, PalletEvmCall, PalletEvmError, PalletEvmEvent, PalletFaucetCall, PalletFaucetError, PalletFaucetEvent, PalletGrandpaCall, PalletGrandpaError, PalletGrandpaEvent, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletPlayerCall, PalletPlayerError, PalletPlayerEvent, PalletPlayerPlayer, PalletPoolCall, PalletPoolError, PalletPoolEvent, PalletPoolNamesCall, PalletPoolNamesError, PalletPoolNamesEvent, PalletSudoCall, PalletSudoError, PalletSudoEvent, PalletTimestampCall, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentReleases, ProofAddressMappingCall, ProofAddressMappingError, ProofAddressMappingEvent, SpCoreEcdsaSignature, SpCoreEd25519Public, SpCoreEd25519Signature, SpCoreSr25519Signature, SpCoreVoid, SpFinalityGrandpaAppPublic, SpFinalityGrandpaAppSignature, SpFinalityGrandpaEquivocation, SpFinalityGrandpaEquivocationProof, SpRuntimeArithmeticError, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpVersionRuntimeVersion, SponsoredPool, SponsoredPoolCall, SponsoredPoolError, SponsoredPoolEvent, StakingPoolCall, StakingPoolError, StakingPoolEvent, UpfrontPoolCall, UpfrontPoolError, UpfrontPoolEvent } from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  export interface InterfaceTypes {
    DevnetRuntime: DevnetRuntime;
    EthbloomBloom: EthbloomBloom;
    EthereumBlock: EthereumBlock;
    EthereumHeader: EthereumHeader;
    EthereumLog: EthereumLog;
    EthereumReceiptEip658ReceiptData: EthereumReceiptEip658ReceiptData;
    EthereumReceiptReceiptV3: EthereumReceiptReceiptV3;
    EthereumTransactionAccessListItem: EthereumTransactionAccessListItem;
    EthereumTransactionEip1559Transaction: EthereumTransactionEip1559Transaction;
    EthereumTransactionEip2930Transaction: EthereumTransactionEip2930Transaction;
    EthereumTransactionLegacyTransaction: EthereumTransactionLegacyTransaction;
    EthereumTransactionTransactionAction: EthereumTransactionTransactionAction;
    EthereumTransactionTransactionSignature: EthereumTransactionTransactionSignature;
    EthereumTransactionTransactionV2: EthereumTransactionTransactionV2;
    EthereumTypesHashH64: EthereumTypesHashH64;
    EvmCoreErrorExitError: EvmCoreErrorExitError;
    EvmCoreErrorExitFatal: EvmCoreErrorExitFatal;
    EvmCoreErrorExitReason: EvmCoreErrorExitReason;
    EvmCoreErrorExitRevert: EvmCoreErrorExitRevert;
    EvmCoreErrorExitSucceed: EvmCoreErrorExitSucceed;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FpRpcTransactionStatus: FpRpcTransactionStatus;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSupportWeightsDispatchClass: FrameSupportWeightsDispatchClass;
    FrameSupportWeightsDispatchInfo: FrameSupportWeightsDispatchInfo;
    FrameSupportWeightsPays: FrameSupportWeightsPays;
    FrameSupportWeightsPerDispatchClassU32: FrameSupportWeightsPerDispatchClassU32;
    FrameSupportWeightsPerDispatchClassU64: FrameSupportWeightsPerDispatchClassU64;
    FrameSupportWeightsPerDispatchClassWeightsPerClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
    FrameSupportWeightsRuntimeDbWeight: FrameSupportWeightsRuntimeDbWeight;
    FrameSupportWeightsWeightToFeeCoefficient: FrameSupportWeightsWeightToFeeCoefficient;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonZeroSender: FrameSystemExtensionsCheckNonZeroSender;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    GafiPrimitivesPoolService: GafiPrimitivesPoolService;
    GafiPrimitivesSystemServicesSystemService: GafiPrimitivesSystemServicesSystemService;
    GafiPrimitivesTicket: GafiPrimitivesTicket;
    GafiPrimitivesTicketCustomTicket: GafiPrimitivesTicketCustomTicket;
    GafiPrimitivesTicketSystemTicket: GafiPrimitivesTicketSystemTicket;
    GafiPrimitivesTicketTicketInfo: GafiPrimitivesTicketTicketInfo;
    GafiPrimitivesTicketTicketLevel: GafiPrimitivesTicketTicketLevel;
    GafiPrimitivesTicketTicketType: GafiPrimitivesTicketTicketType;
    GafiTxCall: GafiTxCall;
    GafiTxError: GafiTxError;
    GafiTxEvent: GafiTxEvent;
    GameCreatorCall: GameCreatorCall;
    GameCreatorError: GameCreatorError;
    GameCreatorEvent: GameCreatorEvent;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReleases: PalletBalancesReleases;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletBaseFeeCall: PalletBaseFeeCall;
    PalletBaseFeeEvent: PalletBaseFeeEvent;
    PalletCacheCall: PalletCacheCall;
    PalletCacheError: PalletCacheError;
    PalletCacheEvent: PalletCacheEvent;
    PalletCacheFlag: PalletCacheFlag;
    PalletCacheWrapDataTicketInfo: PalletCacheWrapDataTicketInfo;
    PalletCacheWrapDataU128: PalletCacheWrapDataU128;
    PalletDynamicFeeCall: PalletDynamicFeeCall;
    PalletEthereumCall: PalletEthereumCall;
    PalletEthereumError: PalletEthereumError;
    PalletEthereumEvent: PalletEthereumEvent;
    PalletEvmCall: PalletEvmCall;
    PalletEvmError: PalletEvmError;
    PalletEvmEvent: PalletEvmEvent;
    PalletFaucetCall: PalletFaucetCall;
    PalletFaucetError: PalletFaucetError;
    PalletFaucetEvent: PalletFaucetEvent;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletPlayerCall: PalletPlayerCall;
    PalletPlayerError: PalletPlayerError;
    PalletPlayerEvent: PalletPlayerEvent;
    PalletPlayerPlayer: PalletPlayerPlayer;
    PalletPoolCall: PalletPoolCall;
    PalletPoolError: PalletPoolError;
    PalletPoolEvent: PalletPoolEvent;
    PalletPoolNamesCall: PalletPoolNamesCall;
    PalletPoolNamesError: PalletPoolNamesError;
    PalletPoolNamesEvent: PalletPoolNamesEvent;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    ProofAddressMappingCall: ProofAddressMappingCall;
    ProofAddressMappingError: ProofAddressMappingError;
    ProofAddressMappingEvent: ProofAddressMappingEvent;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpFinalityGrandpaAppPublic: SpFinalityGrandpaAppPublic;
    SpFinalityGrandpaAppSignature: SpFinalityGrandpaAppSignature;
    SpFinalityGrandpaEquivocation: SpFinalityGrandpaEquivocation;
    SpFinalityGrandpaEquivocationProof: SpFinalityGrandpaEquivocationProof;
    SpRuntimeArithmeticError: SpRuntimeArithmeticError;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SponsoredPool: SponsoredPool;
    SponsoredPoolCall: SponsoredPoolCall;
    SponsoredPoolError: SponsoredPoolError;
    SponsoredPoolEvent: SponsoredPoolEvent;
    StakingPoolCall: StakingPoolCall;
    StakingPoolError: StakingPoolError;
    StakingPoolEvent: StakingPoolEvent;
    UpfrontPoolCall: UpfrontPoolCall;
    UpfrontPoolError: UpfrontPoolError;
    UpfrontPoolEvent: UpfrontPoolEvent;
  } // InterfaceTypes
} // declare module
