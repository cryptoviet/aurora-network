import {
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import React from 'react';

import TableActions from './TableActions';

import { shorten } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

interface IProps {
  SponsoredPool: SponsoredPool;
  onClick?: () => void;
}

const SponsoredPoolTableRow: React.FC<IProps> = ({
  SponsoredPool,
  onClick,
}) => {
  const { poolOwner, discount, txLimit, amount, poolId } = SponsoredPool;
  const textColor = useColorModeValue('gray.700', 'white');
  const { chainDecimal } = useSubstrateState();

  return (
    <Tr cursor="pointer" onClick={onClick}>
      <Td minWidth={{ sm: '250px' }} pl="0px">
        <Text fontSize="md" color={textColor} minWidth="100%">
          {shorten(poolOwner || '')}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor}>
          {discount} %
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor}>
          {txLimit}
        </Text>
      </Td>
      <Td maxWidth="130px">
        <Text fontSize="md" color={textColor} pb=".5rem">
          {formatBalance(
            amount,
            { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
            chainDecimal || 18
          )}
        </Text>
      </Td>
      <Td>
        <TableActions poolId={poolId} />
      </Td>
    </Tr>
  );
};

export default SponsoredPoolTableRow;
