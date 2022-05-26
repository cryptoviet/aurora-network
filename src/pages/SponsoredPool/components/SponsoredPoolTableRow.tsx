import { Td, Text, Tr, useColorModeValue } from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import { shorten } from 'components/utils';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import React from 'react';
import { useSubstrateState } from 'substrate-lib';
import TableActions from './TableActions';

interface IProps {
  SponsoredPool: SponsoredPool;
  onClick?: () => void;
}

const SponsoredPoolTableRow: React.FC<IProps> = ({
  SponsoredPool,
  onClick,
}) => {
  const { poolOwner, discount, txLimit, amount } = SponsoredPool;
  const textColor = useColorModeValue('gray.700', 'white');
  const { chainDecimal } = useSubstrateState();

  return (
    <Tr cursor="pointer">
      <Td onClick={onClick} minWidth={{ sm: '250px' }} pl="0px">
        <Text fontSize="md" color={textColor} minWidth="100%">
          {shorten(poolOwner || '')}
        </Text>
      </Td>

      <Td onClick={onClick}>
        <Text fontSize="md" color={textColor}>
          {discount} %
        </Text>
      </Td>
      <Td onClick={onClick}>
        <Text fontSize="md" color={textColor}>
          {txLimit}
        </Text>
      </Td>
      <Td onClick={onClick} maxWidth="130px">
        <Text fontSize="md" color={textColor} pb=".5rem">
          {formatBalance(
            amount,
            { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
            chainDecimal || 18
          )}
        </Text>
      </Td>
      <Td textAlign="right">
        <TableActions pool={SponsoredPool} />
      </Td>
    </Tr>
  );
};

export default SponsoredPoolTableRow;
