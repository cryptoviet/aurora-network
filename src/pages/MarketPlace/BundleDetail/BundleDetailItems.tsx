import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { GafiSupportGameTypesPackage } from '@polkadot/types/lookup';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions, Swiper as SwiperType } from 'swiper/types';

import { Thumbs } from 'swiper';

interface BundleDetailItemsProps {
  queryKey: string;
  data: GafiSupportGameTypesPackage[];
  setThumbsSwiper: React.Dispatch<SwiperType>;
  sx?: SwiperOptions;
}

export default function BundleDetailItems({
  queryKey,
  data,
  setThumbsSwiper,
  sx,
}: BundleDetailItemsProps) {
  const { metaCollection } = useMetaCollection({
    key: queryKey,
    group: data.map(meta => ({
      collection_id: meta.collection.toNumber(),
    })),
  });

  const { metaNFT } = useMetaNFT({
    key: queryKey,
    group: data.map(meta => ({
      nft_id: meta.item.toNumber(),
      collection_id: meta.collection.toNumber(),
    })),
  });

  return (
    <Box
      padding={6}
      pt={4}
      sx={{
        '.swiper-slide-thumb-active': {
          '> div': { borderColor: 'primary.a.500' },
        },
      }}
    >
      <Swiper
        modules={[Thumbs]}
        slidesPerView={data.length}
        mousewheel={{ forceToAxis: true }}
        onSwiper={setThumbsSwiper}
        direction="vertical"
        {...sx}
      >
        {React.Children.toArray(
          data.map(meta => {
            const currentMetaCollection = metaCollection?.find(
              data => data?.collection_id === meta.collection.toNumber()
            );

            const currentMetaNFT = metaNFT?.find(
              data =>
                data?.collection_id === meta.collection.toNumber() &&
                data?.nft_id === meta.item.toNumber()
            );

            return (
              <SwiperSlide>
                <Center
                  mt={2}
                  justifyContent="space-between"
                  wordBreak="break-word"
                  borderRadius="xl"
                  gap={4}
                  padding={4}
                  border="0.0625rem solid"
                  borderColor="shader.a.300"
                >
                  <Flex gap={4}>
                    <Box>
                      <RatioPicture
                        src={
                          currentMetaNFT?.image
                            ? cloundinary_link(currentMetaNFT.image)
                            : null
                        }
                        sx={{ pt: 'unset', width: 12, height: 12 }}
                      />
                    </Box>

                    <Box>
                      <Text
                        as="strong"
                        fontWeight="medium"
                        color="shader.a.500"
                        fontSize="sm"
                      >
                        {currentMetaCollection?.title || '-'}
                      </Text>

                      <Text color="shader.a.900" fontWeight="medium">
                        {currentMetaNFT?.title || '-'}&nbsp;
                        <Text
                          as="span"
                          fontSize="sm"
                          color="shader.a.700"
                          fontWeight="normal"
                        >
                          ID: {meta.item.toNumber()}
                        </Text>
                      </Text>
                    </Box>
                  </Flex>

                  <Text as="span" color="shader.a.900" fontWeight="medium">
                    x{meta.amount.toNumber()}
                  </Text>
                </Center>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </Box>
  );
}
