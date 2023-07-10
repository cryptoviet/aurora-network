import { Box, Heading } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import CardTypeOne from 'components/ProductCard/CardTypeOne';
import { TestPropsType1 } from '../../Collections/components/TrendingSection';

export const TestData: TestPropsType1[] = [
  {
    image:
      'data:image/jpeg;base64,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',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    id: '18',
  },
  {
    image:
      'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    id: '17',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '16',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '15',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '14',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '13',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '12',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '3',
  },
];
const TopAdventureGame = () => {
  return (
    <>
      <Box>
        <Heading variant="sub01" mb={4}>
          Top Adventure Games
        </Heading>

        <Carousel>
          {TestData.map(item => (
            <SwiperSlide key={item.id}>
              <CardTypeOne item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default TopAdventureGame;
