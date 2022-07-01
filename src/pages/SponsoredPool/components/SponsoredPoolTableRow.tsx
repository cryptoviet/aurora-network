import {
  Avatar,
  HStack,
  Td,
  Text,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import React from 'react';
import { useQueryParam } from 'use-query-params';

import OwnedTableActions from './OwnedTableActions';
import TableActions from './TableActions';

import { useSubstrateState } from 'contexts/substrateContext';
import { SponsoredPool } from 'graphQL/generates';
import useBreakPoint from 'hooks/useBreakPoint';
import { shorten } from 'utils';

interface IProps {
  pool: SponsoredPool;
  onClick?: () => void;
  onEditClick: () => void;
  onOpenDetail: () => void;
}

const SponsoredPoolTableRow: React.FC<IProps> = ({
  pool,
  onClick,
  onEditClick,
  onOpenDetail,
}) => {
  const { poolOwner, discount, txLimit, amount } = pool;
  const textColor = useColorModeValue('gray.700', 'white');
  const { chainDecimal } = useSubstrateState();
  const [type, _] = useQueryParam('type');
  const isOwned = type === 'owned';
  const { isMediumScreen, isSmallScreen, isLargeScreen, isExtraLargeScreen } =
    useBreakPoint();
  const isZoomOut = isSmallScreen || isLargeScreen || isExtraLargeScreen;
  return (
    <>
      <Tr cursor="pointer" onClick={onClick}>
        <Td textAlign="center">
          <HStack>
            <Avatar
              mr={{ base: 0, lg: 4 }}
              w={{ base: 10, lg: isLargeScreen ? 10 : 14 }}
              h={{ base: 10, lg: isLargeScreen ? 10 : 14 }}
              name="Segun Adebayo"
              src="/assets/layout/contract-img-1.png"
            />
            <VStack ml={0} alignItems="flex-start">
              <Text
                fontWeight="bold"
                fontSize="md"
                color={textColor}
                minWidth="100%"
              >
                {shorten(
                  poolOwner || '',
                  isSmallScreen || isMediumScreen ? 3 : undefined
                )}
              </Text>
              <Text fontSize="xs">Games</Text>
            </VStack>
          </HStack>
        </Td>

        <Td textAlign="center">
          <Text
            fontWeight={{ base: 'bold', md: 'normal' }}
            fontSize={{ base: '2xl', md: 'md' }}
            color={textColor}
          >
            {discount / 10000} %
          </Text>
        </Td>

        <Td sx={(isZoomOut && { display: 'none' }) || {}} textAlign="center">
          <Text fontWeight="normal" fontSize="md" color={textColor}>
            {txLimit}
          </Text>
        </Td>
        <Td
          sx={(isZoomOut && { display: 'none' }) || {}}
          textAlign="center"
          maxWidth="130px"
        >
          <Text fontWeight="normal" fontSize="md" color={textColor}>
            {formatBalance(
              amount,
              { withSi: true, forceUnit: '-', withUnit: '' },
              chainDecimal
            )}
          </Text>
        </Td>
        <Td
          onClick={e => {
            if (isZoomOut) {
              e.stopPropagation();
              onOpenDetail();
            }
          }}
          textAlign="center"
          fontWeight="normal"
          fontSize="md"
        >
          {isOwned ? (
            <OwnedTableActions poolId={pool.id} onClick={onEditClick} />
          ) : (
            <TableActions poolId={pool.id} />
          )}
        </Td>
      </Tr>
    </>
  );
};

export default SponsoredPoolTableRow;
