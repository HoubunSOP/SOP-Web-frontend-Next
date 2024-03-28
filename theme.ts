'use client';

import { MantineColorsTuple, createTheme } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#eef2ff',
  '#dae1f6',
  '#b4c0e7',
  '#8b9dd8',
  '#697fcc',
  '#526cc5',
  '#4662c2',
  '#3752ac',
  '#2f499a',
  '#223f89',
];
export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    myColor,
  },
});
