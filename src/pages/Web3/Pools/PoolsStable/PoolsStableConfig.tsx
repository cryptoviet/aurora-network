import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { useDisclosure } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import useItemBalanceOf from 'hooks/useItemBalanceOf';
import PoolsStable from '.';
import PoolsConfigEdit from '../PoolsConfig/PoolsConfigEdit';
import PoolsConfigSelect from '../PoolsConfig/PoolsConfigSelect';
import PoolsConfigState from '../PoolsConfig/PoolsConfigState';

interface PoolsDynamicConfigProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  register: UseFormRegister<PoolsFieldProps>;
}

export default ({ setValue, watch, register }: PoolsDynamicConfigProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { add_item_stable } = watch();

  const { itemBalanceOf } = useItemBalanceOf({
    filter: 'address',
    key: `web3_pools/${account?.address}`,
    arg: [account?.address as string],
  });

  const product = Object.values(add_item_stable || []).filter(meta => !!meta);

  return (
    <>
      <PoolsConfigState
        setValue={setValue}
        add_key="add_item_stable"
        watch={add_item_stable}
      >
        <PoolsConfigEdit length={product.length} onToggle={onToggle} />

        <PoolsConfigSelect
          add_key="add_item_stable"
          register={register}
          product={product}
          onToggle={onToggle}
        />
      </PoolsConfigState>

      {isOpen && itemBalanceOf?.length ? (
        <PoolsStable
          setValue={setValue}
          itemBalanceOf={itemBalanceOf}
          onClose={onClose}
          product={product}
        />
      ) : null}
    </>
  );
};
