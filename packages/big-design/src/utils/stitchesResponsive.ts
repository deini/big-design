import { config, css } from '@bigcommerce/big-design-theme/src/stitches';
import { CSSProperties } from '@stitches/react';

type StitchesMediaKeys = keyof typeof config['media'];
type StitchesResponsive<T extends keyof CSSProperties> = { [key in StitchesMediaKeys as `@${key}`]?: CSSProperties[T] };

export type StitchesResponsiveProps<T extends keyof CSSProperties> = CSSProperties[T] | StitchesResponsive<T>;

export const responsiveHelper = (cssProperties: { [key: string]: StitchesResponsiveProps<any> }) => {
  const cssProperty = Object.keys(cssProperties);

  const computedStyles = cssProperty.reduce(
    (acc, key) => {
      const value = cssProperties[key];

      if (typeof value === 'object') {
        const responsiveKeys = Object.keys(value);

        return {
          ...acc,
          ...responsiveKeys.reduce(
            (responsiveAcc, responsiveKey) => ({
              ...responsiveAcc,
              [responsiveKey]: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ...acc[responsiveKey],
                [key]: value[responsiveKey],
              },
            }),
            {},
          ),
        };
      }

      return { ...acc, [key]: value };
    },
    Object.keys(config.media).reduce((acc, mediaKey) => ({ ...acc, [`@${mediaKey}`]: {} }), {}),
  );

  return css(computedStyles)();
};
