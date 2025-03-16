import { Stack } from "expo-router";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <StatusBar hidden={true} />
        <Stack>
          {/* Hides routes group (tabs) header */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
        </Stack>
      </>
    </QueryClientProvider>
  );
}
