import {
  Box,
  Badge,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { mdiCogOutline } from '@mdi/js';
import { Text as PolText } from '@polkadot/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactJson from 'react-json-view';

import BlockInfo from './components/BlockInfo';
import EventInfo from './components/EventInfo';

import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';
import useAnalyticsEventTracker from 'hooks/useAnalyticsEventTracker';

interface IMetadata {
  data: any;
  version: number;
}

interface INodeInfo {
  chain: PolText;
  nodeName: PolText;
  nodeVersion: PolText;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const { api, socket } = useSubstrateState();
  const [metadata, setMetadata] = useState<IMetadata>();
  const [nodeInfo, setNodeInfo] = useState<INodeInfo>();
  const gaEventTracker = useAnalyticsEventTracker('Dashboard');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await api?.rpc.state.getMetadata();
        // console.log(data);
        setMetadata({ data, version: data?.version ? data?.version : 0 });
      } catch (e) {
        console.error(e);
      }
    };
    getMetadata();
  }, [api?.rpc.state]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api?.rpc.system.chain(),
          api?.rpc.system.name(),
          api?.rpc.system.version(),
        ]);
        if (chain && nodeName && nodeVersion)
          setNodeInfo({ chain, nodeName, nodeVersion });
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
  }, [api?.rpc.system]);
  return (
    <Box p={{ sm: 4, md: 0 }}>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        mb={4}
      >
        <GridItem colSpan={{ base: 2, md: 1, lg: 2, xl: 1 }}>
          <BlockInfo />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1, lg: 2, xl: 1 }}>
          <BlockInfo isFinalized />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1, lg: 2, xl: 1 }}>
          <Card h="full">
            <VStack alignItems="flex-start">
              <Heading mb={4} size="sm">
                {nodeInfo?.nodeName}
              </Heading>
              <Text fontWeight="light">
                <Badge colorScheme="yellow" mr={2}>
                  {nodeInfo?.chain}
                </Badge>
                {socket}
              </Text>
              {/* <Text color="black"></Text> */}
              <HStack
                w="full"
                pt={4}
                borderTop={`1px solid ${theme.colors.borderBottom}`}
              >
                <Icon color="primary">
                  <path fill="currentColor" d={mdiCogOutline} />
                </Icon>
                <Text>v{nodeInfo?.nodeVersion}</Text>
              </HStack>
            </VStack>
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1, lg: 2, xl: 1 }}>
          <Card h="full">
            <VStack
              h="full"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Heading size="sm">{t('METADATA')}</Heading>
              <Text pb={4} fontWeight="light">
                v{metadata?.version}
              </Text>
              <Button
                onClick={() => {
                  gaEventTracker({ action: 'Click Show metadata' });
                  onOpen();
                }}
                w="full"
                variant="primary"
              >
                {t('SHOW_METADATA')}
              </Button>
            </VStack>
          </Card>
        </GridItem>
      </Grid>
      <EventInfo />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('RUNTIME_METADATA')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactJson
              collapsed={4}
              src={
                metadata ? JSON.parse(metadata?.data) : { data: 'loading...' }
              }
            />
            {/* <pre>
              <code>{JSON.stringify(metadata?.data, null, 2)}</code>
            </pre> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
