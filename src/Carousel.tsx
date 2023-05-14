import { Carousel } from '@mantine/carousel';
import { Button, Loader, Box, Text, Accordion } from '@mantine/core';

interface ContentCarouselProps {
  videoContent: string[];
  imageContent: string[];
}
const ContentCarousel = ({
  videoContent,
  imageContent,
}: ContentCarouselProps) => {
  const content = videoContent.concat(imageContent);
  const filteredContent = content.filter((item) => item !== '');

  console.log(content);

  return filteredContent.length ? (
    <Carousel
      maw={'80vw'}
      mx="auto"
      withIndicators
      height={400}
      loop
      styles={{
        control: {
          '&[data-inactive]': {
            opacity: 0,
            cursor: 'default',
          },
        },
      }}
    >
      {filteredContent.map((url, index) => (
        <Carousel.Slide key={index}>
          {url.endsWith('.mov') ? (
            <video
              src={`./videos/${url}`}
              controls
              autoPlay
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            >
              Video not available
            </video>
          ) : url.endsWith('.png') ? (
            <img
              src={`./images/${url}`}
              alt={`${url}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : null}
        </Carousel.Slide>
      ))}
    </Carousel>
  ) : (
    <Text>No Content</Text>
  );
};

export { ContentCarousel };
