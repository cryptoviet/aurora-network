import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import Chevron02Icon from 'public/assets/line/chevron-02.svg';
import LayoutGridIcon from 'public/assets/line/layout-grid.svg';
import LayoutRowIcon from 'public/assets/line/layout-row.svg';
import { useQueries } from '@tanstack/react-query';

import { useAppSelector } from 'hooks/useRedux';
import Web3Games, { Web3GamesDataProps } from './components/Web3Games';
import Web3Items, { Web3ItemsDataProps } from './components/Web3Items';
import Web3FirstBuild from './components/Web3FirstBuild';
import Web3Collections, {
  Web3CollectionsDataProps,
} from './components/Web3Collections';
import DefaultWeb3 from 'layouts/DefaultLayout/DefaultWeb3';
import { Outlet, useLocation } from 'react-router-dom';
import theme from 'theme/theme';
import { TypeMetadataOfCollection, TypeMetadataOfItem } from 'types';

export interface Web3OutletContextProps {
  collection: () => void;
  items: () => void;
}

export default function Web3() {
  const { pathname } = useLocation();
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { api } = useAppSelector(state => state.substrate);

  const [game, collection, item] = useQueries({
    queries: [
      {
        queryKey: ['gameAccount', account?.address],
        queryFn: async () => {
          if (api && api.query.game && account?.address) {
            const getGamesOfAccount = await api.query.game.gameAccount.entries(
              account.address
            );

            return Promise.all(
              getGamesOfAccount.map(
                async ([
                  {
                    args: [owner, game_id],
                  },
                ]) => {
                  const collectionsOfGame = await api.query.game.collectionsOf(
                    game_id
                  );

                  return {
                    owner: owner.toHuman(),
                    game_id: game_id.toNumber(),
                    collections: collectionsOfGame.toPrimitive(),
                  } as Web3GamesDataProps;
                }
              )
            );
          }

          return []; // undefined
        },
        enabled: !!(api && api.query.game),
      },
      {
        queryKey: ['collectionAccount', account?.address],
        queryFn: async () => {
          if (api && api.query.game && account && account.address) {
            const res = await api.query.nfts.collectionAccount.entries(
              account.address
            );

            return Promise.all(
              res.map(
                async ([
                  {
                    args: [owner, collection_id],
                  },
                ]) => {
                  const metadataOfCollection = (await api.query.nfts
                    .collectionMetadataOf(collection_id.toNumber())
                    .then(item => {
                      const data = item.value.toHuman();

                      if (data) {
                        return JSON.parse(String(data.data));
                      }
                    })) as TypeMetadataOfCollection;

                  const gamesOfCollection = await api.query.game
                    .gamesOf(collection_id.toNumber())
                    .then(data => {
                      const collection = data.toHuman() as number[];

                      return collection;
                    });

                  const adminOfCollection =
                    await api.query.nfts.collectionRoleOf
                      .entries(collection_id.toNumber())
                      .then(item => {
                        const data = item[0][0].toHuman() as string[];

                        return data[1];
                      });

                  return {
                    admin: adminOfCollection,
                    owner: owner.toHuman(),
                    collection_id: collection_id.toNumber(),
                    metadataOfCollection,
                    game_id: gamesOfCollection,
                  } as Web3CollectionsDataProps;
                }
              )
            );
          }

          return []; // undefined
        },
        enabled: !!api && !!(api.query.game || api.query.nfts),
      },
      {
        queryKey: ['item', account?.address],
        queryFn: async () => {
          if (api && api.query.nfts && account?.address) {
            const getCollections = await api.query.nfts.collectionAccount
              .entries(account.address)
              .then(item =>
                item.map(
                  ([
                    {
                      args: [, collection],
                    },
                  ]) => ({
                    collection_id: collection.toNumber(),
                  })
                )
              );

            return Promise.all(
              getCollections.map(async item => {
                const itemsOfCollection = await api.query.nfts.item.entries(
                  item.collection_id
                );

                const getValues = itemsOfCollection.map(
                  ([
                    {
                      args: [collection_id, item_id],
                    },
                  ]) => {
                    return {
                      collection_id: collection_id.toNumber(),
                      item_id: item_id.toNumber(),
                    };
                  }
                );

                if (getValues.length) {
                  return Promise.all(
                    getValues.map(async ({ collection_id, item_id }) => {
                      const metadataOfItem = (await api.query.nfts
                        .itemMetadataOf(collection_id, item_id)
                        .then(item => {
                          const data = item.value.toHuman();
                          if (data && !data.data.startsWith('0x')) {
                            return JSON.parse(String(data.data));
                          }
                        })) as TypeMetadataOfItem;

                      const supplyOfItem = await api.query.game.supplyOf(
                        collection_id,
                        item_id
                      );

                      return {
                        collection_id,
                        item_id,
                        metadataOfItem,
                        supply: supplyOfItem.toHuman(),
                      };
                    })
                  );
                }
              })
            ).then(then =>
              then.filter((item): item is Web3ItemsDataProps[] => !!item)
            );
          }

          return []; // undefined
        },
        enabled: !!(api && api.query.nfts),
      },
    ],
  });

  if (game.isLoading || collection.isLoading) {
    return (
      <Center height="100vh" gap={4}>
        <Spinner color="primary.a.500" size="md" />
        <Heading fontSize="lg" color="shader.a.600" fontWeight="medium">
          Loading
        </Heading>
      </Center>
    );
  }

  return (
    <>
      {pathname === '/web3' ? (
        game.data?.length || collection.data?.length || item.data?.length ? (
          <DefaultWeb3>
            <Tabs variant="unstyled">
              <TabList flexWrap="wrap-reverse" gap={4}>
                <Flex
                  overflowX="auto"
                  whiteSpace="pre"
                  gap={3}
                  sx={{
                    button: {
                      ...theme.components.Button.variants.cancel,

                      _selected: {
                        ...theme.components.Button.variants.primary,
                        borderColor: 'transparent',
                      },
                    },
                  }}
                >
                  <Tab>Games {game.data?.length}</Tab>

                  <Tab>Collections {collection.data?.length}</Tab>

                  <Tab>
                    Items&nbsp;
                    {item.data && item.data.length
                      ? item.data
                          .map(item => item.length)
                          .reduce((prev, current) => prev + current)
                      : 0}
                  </Tab>
                </Flex>

                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  fontSize="sm"
                  gap={3}
                  flex={{
                    md: 1,
                  }}
                >
                  <Center gap={2}>
                    Filter:
                    <Menu>
                      <MenuButton
                        color="primary.a.500"
                        border="unset"
                        display="flex"
                        variant="unstyled"
                        fontWeight="medium"
                        height="unset"
                        as={Button}
                        iconSpacing={1}
                        rightIcon={<Chevron02Icon />}
                      >
                        Date modified
                      </MenuButton>

                      <MenuList padding={0}>
                        <MenuItem>children</MenuItem>
                      </MenuList>
                    </Menu>
                  </Center>

                  <Icon
                    as={LayoutGridIcon}
                    color="primary.a.500"
                    width={6}
                    height={6}
                  />

                  <Icon
                    as={LayoutRowIcon}
                    color="shader.a.900"
                    width={6}
                    height={6}
                  />
                </Flex>
              </TabList>

              <TabPanels
                sx={{
                  '> div': {
                    px: 0,
                  },
                }}
              >
                {game.data && (
                  <TabPanel>
                    <Web3Games data={game.data} />
                  </TabPanel>
                )}

                {collection.data && (
                  <TabPanel>
                    <Web3Collections data={collection.data} />
                  </TabPanel>
                )}

                {item.data && (
                  <TabPanel>
                    <Web3Items data={item.data} />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </DefaultWeb3>
        ) : (
          <Web3FirstBuild />
        )
      ) : (
        <Outlet
          context={{
            collection: collection.refetch,
            items: item.refetch,
          }}
        />
      )}
    </>
  );
}
