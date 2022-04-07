import { Box, HStack, Text, useToast, VStack, Button } from '@chakra-ui/react';
import { Balance } from '@polkadot/types/interfaces';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrateState } from '../substrate-lib';

import Card from './card/Card';
import CardHeader from './card/CardHeader';
import { getFromAcct } from './utils';

interface PoolJoinedInfo {
  address: string;
  joinTime: string;
  service: string;
}

interface PoolInfo {
  basic: {
    txLimit: number;
    discount: number;
    service: number;
  };
  medium: {
    txLimit: number;
    discount: number;
    service: number;
  };
  max: {
    txLimit: number;
    discount: number;
    service: number;
  };
}

const JoinPool = () => {
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<PoolJoinedInfo> => {
      const res = await api.query.optionPool.players(currentAccount.address);
      return res.toJSON();
    },
    {
      enabled: !!currentAccount,
    }
  );

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<PoolInfo> => {
      const basic = await api.query.optionPool.services('Basic');
      const medium = await api.query.optionPool.services('Medium');
      const max = await api.query.optionPool.services('Max');
      return {
        basic: {
          ...basic.toJSON(),
          service: basic.get('service').toString(),
        },
        medium: {
          ...medium.toJSON(),
          service: medium.get('service').toString(),
        },
        max: {
          ...max.toJSON(),
          service: max.get('service').toString(),
        },
      };
    }
  );

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.optionPool.join(poolPackage);
    try {
      await txExecute
        // Temporary using any. Define type later.
        .signAndSend(...fromAcct, ({ status }: any) => {
          if (status.isFinalized) {
            toast({
              description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
              isClosable: true,
              status: 'success',
              position: 'top-right',
            });
            refetch();
            setSelectedPool('');
          } else {
            toast({
              description: `Current transaction status: ${status.type}`,
              isClosable: true,
              status: 'info',
              position: 'top-right',
            });
          }
        });
    } catch (err: any) {
      toast({
        description: `😞 Transaction Failed: ${err.toString()}`,
        isClosable: true,
        status: 'error',
        position: 'top-right',
      });
      setSelectedPool('');
    }
  };

  const onLeavePool = async () => {
    const fromAcct = await getFromAcct(currentAccount);
    const txExecute = api.tx.optionPool.leave();
    try {
      await txExecute
        // Temporary using any. Define type later.
        .signAndSend(...fromAcct, ({ status }: any) => {
          if (status.isFinalized) {
            toast({
              description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
              isClosable: true,
              status: 'success',
            });
            refetch();
          } else {
            toast({
              description: `Current transaction status: ${status.type}`,
              isClosable: true,
              status: 'info',
            });
          }
        });
    } catch (err: any) {
      toast({
        description: `😞 Transaction Failed: ${err.toString()}`,
        isClosable: true,
        status: 'error',
      });
    } finally {
    }
  };

  return (
    <Box>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
        JoinPool
      </Text>
      {joinedPoolInfo && (
        <VStack>
          <Text>Joined pool type: {joinedPoolInfo.service}</Text>
          <Text>
            Time: {new Date(Number(joinedPoolInfo.joinTime)).toLocaleString()}
          </Text>
        </VStack>
      )}
      <HStack p={5}>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            Basic
          </Text>
          <VStack>
            {poolInfo?.basic?.txLimit && (
              <Text>Transaction per minute: {poolInfo.basic.txLimit}</Text>
            )}
            {poolInfo?.basic?.discount && (
              <Text>Discount fee: {poolInfo.basic.discount} %</Text>
            )}

            {joinedPoolInfo?.service === 'Basic' ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Basic')}
                isLoading={selectedPool === 'Basic'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            Medium
          </Text>
          <VStack>
            {poolInfo?.medium?.txLimit && (
              <Text>Transaction per minute: {poolInfo.medium.txLimit}</Text>
            )}
            {poolInfo?.medium?.discount && (
              <Text>Discount fee: {poolInfo.medium.discount} %</Text>
            )}

            {joinedPoolInfo?.service === 'Medium' ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Medium')}
                isLoading={selectedPool === 'Medium'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            Max
          </Text>
          <VStack>
            {poolInfo?.max?.txLimit && (
              <Text>Transaction per minute: {poolInfo.max.txLimit}</Text>
            )}
            {poolInfo?.max?.discount && (
              <Text>Discount fee: {poolInfo.max.discount} %</Text>
            )}

            {joinedPoolInfo?.service === 'Max' ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Max')}
                isLoading={selectedPool === 'Max'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
      </HStack>
    </Box>
  );
};

export default JoinPool;
