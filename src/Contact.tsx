import React from 'react';
import { Text, Box, Anchor } from '@mantine/core';

interface Props {
  colorScheme: any;
}
const Contact: React.FC = () => {
  return (
    <Box>
      <Text>
        Send me an email at ...{' '}
        <Anchor href="matt.pronchick@gmail.com?subject=Blog%20Inquiry">
          matt.pronchick@gmail.com
        </Anchor>
      </Text>
    </Box>
  );
};

export { Contact };
