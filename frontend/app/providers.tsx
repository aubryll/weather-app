// app/providers.jsx
"use client";

import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { PropsWithChildren, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Persister, PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#0E1214",
      paper: "#15191D",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    fontFamily: `"IBM Plex Sans", sans-serif`,
    h1: { fontSize: "2.4em", fontFamily: "PlusJakartaSans" },
    h2: { fontSize: "2.1em", fontFamily: "PlusJakartaSans" },
    h3: { fontSize: "1.7em", fontFamily: "PlusJakartaSans" },
    h4: { fontSize: "1.4em", fontFamily: "PlusJakartaSans" },
    h5: { fontSize: "1.2em", fontFamily: "PlusJakartaSans" },
    h6: { fontSize: "1em", fontFamily: "PlusJakartaSans" },
    button: { textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
    @font-face {
      font-family: 'IBM Plex Sans';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf");
    }
    @font-face {
      font-family: 'IBM Plex Sans';
      font-style: medium;
      font-display: swap;
      font-weight: 500;
      src: url("/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf");
    }
    @font-face {
      font-family: 'IBM Plex Sans';
      font-style: bold;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/IBMPlexSans/IBMPlexSans-Bold.ttf");
    }
    @font-face {
      font-family: 'PlusJakartaSans';
      font-style: bold;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.woff");
    }
  `,
    },
  },
});

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient());
  //Persister to persist all API data in order for the application to work offline
  const localStoragePersistor = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistQueryClientProvider client={queryClient} persistOptions={{
        persister: localStoragePersistor,
        maxAge: Infinity
      }}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </ThemeProvider>
  );
}
