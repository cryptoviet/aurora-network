import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import {
  GafiPrimitivesTicket,
  GafiPrimitivesTicketTicketInfo,
} from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import { formatBalance } from '@polkadot/util';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import Pool, { IPool } from './components/Pool';

import Banner from 'components/Banner';
import Card from 'components/card/Card';
import featureFlag from 'components/FeatureFlags';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'contexts/substrateContext';
import { PoolInfo } from 'interfaces/pool';

export interface TicketType {
  upfront?: string;
  staking?: string;
}

const JoinPool = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');
  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo | undefined> => {
      if (api) {
        const res = await api.query.pool.tickets(
          currentAccount?.address as string
        );
        if (res.isSome) {
          return res.unwrap();
        }
        return undefined;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: joinedUpfrontPoolInfo, refetch: refetchJoinedUpfrontPoolInfo } =
    useQuery(
      ['getJoinedUpfrontPool', currentAccount],
      async (): Promise<GafiPrimitivesTicket | undefined> => {
        if (api) {
          const res = await api.query.upfrontPool.tickets(
            currentAccount?.address as string
          );
          if (res.isSome) {
            return res.unwrap();
          }
          return undefined;
        }
      },
      {
        enabled: !!currentAccount,
      }
    );

  const isJoinedPool = !!joinedPoolInfo?.ticketType.toHuman();
  const isJoinedUpfrontPool =
    !!joinedPoolInfo &&
    joinedPoolInfo.ticketType.isSystem &&
    joinedPoolInfo.ticketType.asSystem.isUpfront;

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.upfrontPool.services('Basic');
        const medium = await api.query.upfrontPool.services('Medium');
        const advance = await api.query.upfrontPool.services('Advance');
        return {
          basic: basic.unwrap(),
          medium: medium.unwrap(),
          advance: advance.unwrap(),
        };
      }
    }
  );

  const pools: Array<IPool> = [
    {
      poolType: t('BASIC'),
      discount: poolInfo?.basic.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.basic.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-1.png',
      fee: {
        gaki: poolInfo?.basic.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => onJoinPool('Basic'),
      onLeave: () => onLeavePool('Basic'),
      isLoading: selectedPool === 'Basic',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo.ticketType.asSystem.asUpfront.type === 'Basic',
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('MEDIUM'),
      discount: poolInfo?.medium.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.medium.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-2.png',
      fee: {
        gaki: poolInfo?.medium.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => onJoinPool('Medium'),
      onLeave: () => onLeavePool('Medium'),
      isLoading: selectedPool === 'Medium',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo.ticketType.asSystem.asUpfront.isMedium,
      isDisabled: isJoinedPool,
    },
    {
      poolType: t('ADVANCE'),
      discount: poolInfo?.advance.service.discount.toNumber() || 0,
      rate: {
        txLimit: poolInfo?.advance.service.txLimit.toNumber() || 0,
        minute: 30,
      },
      banner: '/assets/layout/pool-banner-3.png',
      fee: {
        gaki: poolInfo?.advance.value.toString() || '0',
        minute: 30,
      },
      onJoin: () => onJoinPool('Advance'),
      onLeave: () => onLeavePool('Advance'),
      isLoading: selectedPool === 'Advance',
      isJoined:
        isJoinedUpfrontPool &&
        joinedPoolInfo.ticketType.asSystem.asUpfront.isAdvance,
      isDisabled: isJoinedPool,
    },
  ];

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      refetch();
      refetchJoinedUpfrontPoolInfo();
      setSelectedPool('');
    } else {
      toast({
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      const txExecute = api.tx.pool.join({ System: { Upfront: poolPackage } });
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
        }
      }
    }
  };

  const onLeavePool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);
    if (api) {
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: t('TRANSACTION_FAILED', {
              errorMessage: err.toString(),
            }),
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
        }
      }
    }
  };

  return (
    <>
      {featureFlag.isDisplayNewDashboardUI ? (
        <>
          <Banner
            title={t('POOL.UPFRONT_POOL')}
            subTitle={t('POOL_DESCRIPTION.UPFRONT_POOL')}
            bannerBg="/assets/layout/upfront-banner-bg.png"
            btnLink="https://wiki.gafi.network/learn/upfront-pool"
          />
          <Box sx={{ display: 'flex' }}>
            {React.Children.toArray(
              pools.map((pool: IPool, index: number) => (
                <Pool sx={index !== 0 ? { ml: 4 } : {}} pool={pool} />
              ))
            )}
          </Box>
        </>
      ) : (
        <Box pt={{ base: '120px', md: '75px' }}>
          <Text fontWeight="bold" fontSize="2xl" mb={5}>
            {t('POOL.UPFRONT_POOL')}
          </Text>
          {joinedUpfrontPoolInfo && (
            <VStack>
              <Text>
                Joined pool type:{' '}
                {joinedUpfrontPoolInfo.ticketType.isSystem &&
                  joinedUpfrontPoolInfo.ticketType.asSystem.isUpfront &&
                  joinedUpfrontPoolInfo.ticketType.asSystem.asUpfront.type}
              </Text>
              <Text>
                Time:{' '}
                {new Date(
                  joinedUpfrontPoolInfo.joinTime.toNumber()
                ).toLocaleString()}
              </Text>
            </VStack>
          )}
          <HStack p={5} gap={5}>
            <Card>
              <Text textAlign="center" fontWeight="bold" mb={5}>
                {t('BASIC')}
              </Text>
              <VStack>
                {poolInfo?.basic?.service?.txLimit && (
                  <Text>
                    {t('TRANSACTIONS_RATE', {
                      transactionAmount:
                        poolInfo.basic.service.txLimit.toNumber(),
                    })}
                  </Text>
                )}
                {poolInfo?.basic?.service?.discount && (
                  <Text>
                    {t('DISCOUNT_FEE', {
                      discountPercent:
                        poolInfo.basic.service.discount.toNumber(),
                    })}
                  </Text>
                )}
                {poolInfo?.basic.value && (
                  <Text>
                    {t('POOL_FEE', {
                      poolFee: formatBalance(
                        poolInfo?.basic.value.toString(),
                        { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                        chainDecimal
                      ),
                    })}
                  </Text>
                )}

                {joinedPoolInfo?.ticketType.asSystem.asUpfront.isBasic ? (
                  <Button
                    variant="solid"
                    color="red.300"
                    onClick={() => onLeavePool('Basic')}
                    isLoading={selectedPool === 'Basic'}
                  >
                    {t('LEAVE')}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="solid"
                    isDisabled={isJoinedPool}
                    onClick={() => onJoinPool('Basic')}
                    isLoading={selectedPool === 'Basic'}
                  >
                    {t('JOIN')}
                  </Button>
                )}
              </VStack>
            </Card>
            <Card>
              <Text textAlign="center" fontWeight="bold" mb={5}>
                {t('MEDIUM')}
              </Text>
              <VStack>
                {poolInfo?.medium.service.txLimit && (
                  <Text>
                    {t('TRANSACTIONS_RATE', {
                      transactionAmount:
                        poolInfo.medium.service.txLimit.toNumber(),
                    })}
                  </Text>
                )}
                {poolInfo?.medium.service.discount && (
                  <Text>
                    {t('DISCOUNT_FEE', {
                      discountPercent:
                        poolInfo.medium.service.discount.toNumber(),
                    })}
                  </Text>
                )}
                {poolInfo?.medium.value && (
                  <Text>
                    {t('POOL_FEE', {
                      poolFee: formatBalance(
                        poolInfo?.medium.value.toString(),
                        { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                        chainDecimal
                      ),
                    })}
                  </Text>
                )}

                {joinedPoolInfo?.ticketType.asSystem.asUpfront.isMedium ? (
                  <Button
                    variant="secondary"
                    color="red.300"
                    onClick={() => onLeavePool('Medium')}
                    isLoading={selectedPool === 'Medium'}
                  >
                    {t('LEAVE')}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={() => onJoinPool('Medium')}
                    isLoading={selectedPool === 'Medium'}
                  >
                    {t('JOIN')}
                  </Button>
                )}
              </VStack>
            </Card>
            <Card>
              <Text textAlign="center" fontWeight="bold" mb={5}>
                {t('ADVANCE')}
              </Text>
              <VStack>
                {poolInfo?.advance?.service.txLimit && (
                  <Text>
                    {t('TRANSACTIONS_RATE', {
                      transactionAmount:
                        poolInfo.advance.service.txLimit.toNumber(),
                    })}
                  </Text>
                )}
                {poolInfo?.advance?.service.discount && (
                  <Text>
                    {t('DISCOUNT_FEE', {
                      discountPercent:
                        poolInfo.advance.service.discount.toNumber(),
                    })}
                  </Text>
                )}
                {poolInfo?.advance.value && (
                  <Text>
                    {t('POOL_FEE', {
                      poolFee: formatBalance(
                        poolInfo?.advance.value.toString(),
                        { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                        chainDecimal
                      ),
                    })}
                  </Text>
                )}

                {joinedPoolInfo?.ticketType.asSystem.asUpfront.isAdvance ? (
                  <Button
                    variant="solid"
                    color="red.300"
                    onClick={() => onLeavePool('Advance')}
                    isLoading={selectedPool === 'Advance'}
                  >
                    {t('LEAVE')}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={() => onJoinPool('Advance')}
                    isLoading={selectedPool === 'Advance'}
                  >
                    {t('JOIN')}
                  </Button>
                )}
              </VStack>
            </Card>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default JoinPool;
