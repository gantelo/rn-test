import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/use-color-scheme';

const queryCache = new QueryCache({
  onError: (error) => {
    console.error('[QueryClient] Query error:', error);
  },
});

const mutationCache = new MutationCache({
  onError: (error) => {
    console.error('[QueryClient] Mutation error:', error);
  },
});

const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.error(`[QueryClient] Retry attempt ${failureCount}:`, error);
        return failureCount < 3;
      },
    },
  },
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Feed' }} />
          <Stack.Screen name="feed" options={{ headerShown: false }} />
          <Stack.Screen name="feed-details" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
