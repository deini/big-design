import { Box, Button, Flex, H0, H2, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { CodePreview, NextLink } from '../../components';

const BlueBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  display: 'inline-block',
  height: theme.spacing.large,
  width: theme.spacing.large,
}));

const StyledText = styled(Text)`
  padding: 0;
  margin: 0;
`;

export default () => {
  const { spacing } = useContext(ThemeContext);

  return (
    <>
      <H0>Spacing</H0>

      <Text>
        Spacing can be used directly on certain properties that expect a size value, like{' '}
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>{' '}
        and{' '}
        <NextLink href="/Padding/PaddingPage" as="/padding">
          Padding
        </NextLink>
        .
      </Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        <>
          <Button marginRight="medium">Button</Button>
          <Button>Button</Button>
        </>
        {/* jsx-to-string:end */}
      </CodePreview>

      <Text>You can also use spacing directly from the theme to style other components, for example:</Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        {function Example() {
          const StyledBox = styled(Box)(({ theme }) => ({
            backgroundColor: theme.colors.primary,
            height: theme.spacing.large,
            width: theme.spacing.large,
          }));

          return <StyledBox />;
        }}
        {/* jsx-to-string:end */}
      </CodePreview>

      <H2>Available Spacing</H2>

      <Flex justifyContent="space-around">
        {Object.keys(spacing)
          .reverse()
          .map(key => (
            <Flex alignItems="center" key={key} flexDirection="column" paddingBottom="xxxLarge">
              <StyledText>{key}</StyledText>
              <BlueBox marginTop="medium" style={{ width: spacing[key], height: spacing[key] }} />
            </Flex>
          ))}
      </Flex>
    </>
  );
};
