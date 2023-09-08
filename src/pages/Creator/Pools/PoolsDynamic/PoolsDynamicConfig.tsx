import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import useItemBalanceOf from 'hooks/useItemBalanceOf';
import PoolsDynamic from '.';
import PoolsConfigEdit from '../PoolsConfig/PoolsConfigEdit';
import PoolsConfigSelect from '../PoolsConfig/PoolsConfigSelect';
import PoolsConfigState from '../PoolsConfig/PoolsConfigState';
import { useEffect } from 'react';

interface PoolsDynamicConfigProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  register: UseFormRegister<PoolsFieldProps>;
}

export default ({ setValue, watch, register }: PoolsDynamicConfigProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { add_item_dynamic } = watch();
  const toast = useToast();

  const { itemBalanceOf } = useItemBalanceOf({
    filter: 'address',
    key: `creator_pools/${account?.address}`,
    arg: [account?.address as string],
  });

  const product = Object.values(add_item_dynamic || []).filter(meta => !!meta);

  useEffect(() => {
    if (isOpen && !itemBalanceOf?.length) {
      toast({
        description: `you don't have any item`,
        position: 'top-right',
        status: 'error',
      });
      onClose();
    }
  }, [isOpen]);

  return (
    <>
      <PoolsConfigState
        setValue={setValue}
        add_key="add_item_dynamic"
        watch={add_item_dynamic}
      >
        <PoolsConfigEdit length={product.length} onToggle={onToggle} />

        <PoolsConfigSelect
          add_key="add_item_dynamic"
          register={register}
          product={product}
          onToggle={onToggle}
        />
      </PoolsConfigState>

      {isOpen && itemBalanceOf?.length ? (
        <PoolsDynamic
          setValue={setValue}
          itemBalanceOf={itemBalanceOf}
          onClose={onClose}
          product={product}
        />
      ) : null}
    </>
  );
};
