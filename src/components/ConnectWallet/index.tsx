import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import ButtonCopy from 'components/ButtonCopy';

import React, { useState } from 'react';
import SwapCircleIcon from 'public/assets/fill/swap-circle.svg';
import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';
import { getInjectedWeb3, shorten } from 'utils/utils';
import { useConnectWallet } from './ConnectWalletProvider';
import { useSubstrateState } from 'contexts/substrateContext';

import useTxError from 'hooks/useTxError';

export default function ConnectWallet() {
  const { api } = useSubstrateState();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { txError } = useTxError({
    onSuccess() {
      setIsLoading(false);
    },
  });
  const { account, allAccount, setAccount } = useConnectWallet();

  return (
    <Menu closeOnSelect={false} placement="bottom-end">
      {account ? (
        <MenuButton>
          <AccountJazzicon address={account} />
        </MenuButton>
      ) : (
        <MenuButton
          onClick={() => {
            if (allAccount && allAccount.length) {
              const getAccount = allAccount[0].address;

              localStorage.setItem(GAFI_WALLET_ACCOUNT_KEY, getAccount);

              console.log(getAccount);

              return setAccount(prev => ({
                ...prev,
                account: getAccount,
              }));
            }

            toast({
              title: 'not found account',
              position: 'top-right',
              status: 'warning',
              isClosable: true,
            });
          }}
        >
          Connect Wallet
        </MenuButton>
      )}

      {account && allAccount ? (
        <MenuList borderRadius="lg">
          <MenuItem _hover={{}} bg="unset">
            <Accordion allowToggle>
              <AccordionItem>
                <Flex gap={1} pb={2}>
                  <Text
                    padding={2}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    border="0.0625rem solid #99CFFF"
                  >
                    {shorten(account, 12)}
                    <ButtonCopy
                      value={account}
                      sx={{
                        'aria-label': 'copy-icon',
                        width: 5,
                        height: 5,
                      }}
                    />
                  </Text>

                  <AccordionButton
                    as={IconButton}
                    variant="unstyled"
                    width="auto"
                    _hover={{}}
                    padding={0}
                    sx={{
                      svg: {
                        width: 6,
                        height: 6,
                        color: 'primary.a.500',
                      },
                    }}
                    icon={<SwapCircleIcon />}
                  />
                </Flex>

                {allAccount
                  .filter(item => item.address !== account)
                  .map(item => (
                    <AccordionPanel
                      key={item.address}
                      padding={0}
                      onClick={() => {
                        setAccount(prev => ({
                          ...prev,
                          account: item.address,
                        }));
                      }}
                    >
                      <Text
                        padding={2.5}
                        color="shader.a.900"
                        borderRadius="lg"
                        _hover={{
                          bg: 'shader.a.200',
                        }}
                      >
                        {shorten(item.address, 12)}
                      </Text>
                    </AccordionPanel>
                  ))}

                <Button
                  bg="#2A79D6"
                  color="white"
                  width="full"
                  mt={4}
                  borderRadius="lg"
                  isLoading={isLoading}
                  onClick={async () => {
                    const injected = await getInjectedWeb3();
                    setIsLoading(true);

                    if (account && api && injected) {
                      const submit = api.tx.faucet.faucet();

                      await submit.signAndSend(
                        account,
                        {
                          signer: injected.signer,
                        },
                        txError
                      );
                    }
                  }}
                  _hover={{}}
                  _active={{}}
                >
                  Faucet
                </Button>
              </AccordionItem>
            </Accordion>
          </MenuItem>
        </MenuList>
      ) : null}
    </Menu>
  );
}
