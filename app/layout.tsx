import '@mantine/core/styles.css';
import './globals.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { Navbar } from '../components/Navbar/Navbar';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body color="#f7f7f7">
        <MantineProvider theme={theme}>
          <Navbar />
          <div className="relative flex flex-col md:flex-row md:justify-between mx-auto w-6/6 lg:w-5/6 xl:w-4/6 gap-10 top-8">
            {children}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
