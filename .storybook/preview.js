import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../src/styles/GlobalStyles';
import { lightTheme } from '../src/styles/Theme';
import i18n from './i18next.js';

export const decorators = [
  Story => (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#FFF',
      },
      {
        name: 'black',
        value: '#000',
      },
    ],
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    de: 'German',
  },
};
