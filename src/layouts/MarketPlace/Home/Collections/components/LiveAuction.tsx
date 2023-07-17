import { Box, Button, Flex, HStack, Heading, Icon } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import CardTypeThree from 'components/ProductCard/CardTypeThree';
import { CircleIcon } from 'components/Substrate/SubstrateNode';
import { Link } from 'react-router-dom';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
import { SwiperSlide } from 'swiper/react';
import { colors } from 'theme/theme';
import { convertHex } from 'utils/utils';
export interface TestDataProps3 {
  image: string;
  name: string;
  id: string;
  currentAuction: string;
  isVerified?: boolean;
}
export const dataTest: TestDataProps3[] = [
  {
    id: '1230',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
  {
    id: '1231',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png',
    isVerified: true,
  },
  {
    id: '1232',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
  {
    id: '1233',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
  {
    id: '1234',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
  {
    id: '1235',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
  {
    id: '1236',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
  {
    id: '1237',
    name: 'Karas',
    currentAuction: '110000000000',
    image:
      'https://cdn.dribbble.com/userupload/2777908/file/original-314c68bc24d518d315fff80d848cf737.png',
    isVerified: true,
  },
];
const LiveAuction = () => {
  return (
    <Box mt={4}>
      <HStack justifyContent="space-between" spacing={0} position="sticky">
        <Flex gap={3} alignItems="center" color="shader.a.900">
          <CircleIcon
            sx={{
              height: 3.5,
              width: 3.5,
              color: 'second.purple',
              borderRadius: 'full',
              border: `0.125rem solid ${convertHex(colors.second.purple, 0.3)}`,
            }}
          />
          <Heading variant="sub02">Live Auction</Heading>
        </Flex>

        <Link to="/marketplace/explorer/nfts">
          <Button
            variant="more"
            fontSize="sm"
            rightIcon={
              <Icon
                as={ArrowIcon}
                transform="rotate(180deg)"
                color="primary.a.500"
                height={5}
                width={5}
              />
            }
          >
            more
          </Button>
        </Link>
      </HStack>
      <Box mt={5}>
        <Carousel>
          {dataTest.map(item => (
            <SwiperSlide key={item.id}>
              <Link to={`/marketplace/nft/${item.id}`}>
                <CardTypeThree item={item} />
              </Link>
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default LiveAuction;
