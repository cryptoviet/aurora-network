import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTxCallback from './useTxCallback';

import { useSubstrateState } from 'contexts/substrateContext';
import { getFromAcct } from 'utils';

const useStakingPool = (refetch: () => void) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [loadingPool, setLoadingPool] = useState('');
  const { api, currentAccount } = useSubstrateState();

  const onSucess = () => {
    setLoadingPool('');
    refetch();
  };

  const txCallback = useTxCallback(onSucess);

  const joinStakingPool = async (poolPackage: string) => {
    setLoadingPool(poolPackage);

    const [account, options] = await getFromAcct(currentAccount);

    if (api && account) {
      try {
        const txExecute = await api.tx.pool.join(poolPackage);

        await txExecute.signAndSend(account, options || {}, txCallback);
      } catch (error: any) {
        toast({
          position: 'top-right',
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setLoadingPool('');
      }
    }
  };

  return {
    joinStakingPool,
    loadingPool,
  };
};

export default useStakingPool;
