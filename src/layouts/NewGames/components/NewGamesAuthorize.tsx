import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

import NewGamesProfile from './NewGamesProfile';

import { FieldValues, UseFormGetValues } from 'react-hook-form';
import GafiAmount from 'components/GafiAmount';

interface NewGamesFieldSubmitProps {
  owner: {
    account: string;
    hash: string;
  };

  title: string;
  games_id: number;

  admin: {
    account: string;
    hash: string;
  };
}

interface NewGamesAuthorizeProps {
  onClose: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

export default function NewGamesAuthorize({
  onClose,
  getValues,
}: NewGamesAuthorizeProps) {
  const { owner, title, games_id, admin } =
    getValues() as NewGamesFieldSubmitProps;

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent
        padding={{
          base: 4,
          md: 6,
        }}
        mx={3}
      >
        <ModalHeader px={0} pt={0} pb={6}>
          <Center justifyContent="space-between" pb={8}>
            <Heading fontWeight="bold" fontSize="xl" color="shader.a.900">
              Authorize transaction
            </Heading>

            <ModalCloseButton
              _hover={{}}
              _active={{}}
              position="unset"
              size="sm"
            />
          </Center>

          <NewGamesProfile account={owner.account} hash={owner.hash} />
        </ModalHeader>

        <ModalBody
          padding={0}
          borderWidth="0.0625rem 0 0.0625rem 0"
          borderColor="shader.a.300"
        >
          <Table variant="createGameSubmit">
            <Tbody>
              <Tr>
                <Td>Tittle</Td>

                <Td>{title}</Td>
              </Tr>

              <Tr>
                <Td>Game ID</Td>
                <Td>{games_id}</Td>
              </Tr>

              <Tr>
                <Td>Fee</Td>
                <Td>
                  <GafiAmount amount="50,689" />
                </Td>
              </Tr>

              <Tr>
                <Td>Admin</Td>
                <Td>
                  <NewGamesProfile
                    hash={admin.hash}
                    account={admin.account}
                    sx={{
                      textAlign: 'left',
                      mt: {
                        base: 2,
                        md: 0,
                      },
                      justifyContent: {
                        md: 'flex-end',
                      },
                    }}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="createGameSubmit"
            margin="unset"
            onClick={() => {
              console.log(getValues());
            }}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
