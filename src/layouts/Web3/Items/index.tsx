import {
  Box,
  Center,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import GoBack from 'components/GoBack';

import LineAddIcon from 'public/assets/line/add.svg';

import AddSupply from './components/AddSupply';
import theme from 'theme/theme';
import CreateItem from './components/CreateItem';
import AddMetadataItem from './components/AddMetadataItem';

export default function Items() {
  return (
    <Box
      px={{
        lg: 48,
      }}
    >
      <GoBack />

      <Tabs variant="unstyled">
        <TabList
          gap={4}
          mt={8}
          mb={4}
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
          <Tab>Create Item</Tab>

          <Tab>
            <Center gap={2}>
              <Icon as={LineAddIcon} width={4} height={4} />
              <Text>Add Supply</Text>
            </Center>
          </Tab>

          <Tab>Add Metadata</Tab>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              padding: 0,
            },
          }}
        >
          <TabPanel>
            <CreateItem />
          </TabPanel>

          <TabPanel>
            <AddSupply />
          </TabPanel>

          <TabPanel>
            <AddMetadataItem />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
