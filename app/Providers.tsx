// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { HuddleProvider, HuddleClient } from '@huddle01/react';

const huddleClient = new HuddleClient({
  projectId: "ak_uZrBhaybfGtQtCNi",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});
export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <CacheProvider>
      <HuddleProvider client={huddleClient}>

      <ChakraProvider>{children}</ChakraProvider>
      </HuddleProvider>
    </CacheProvider>
  );
}