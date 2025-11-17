import { ThemedView } from '@/components/themed-view';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import FeedScreen from './feed';

export default function HomeScreen() {
  return (
    <Suspense
      fallback={
        <ThemedView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </ThemedView>
      }
    >
      <FeedScreen />
    </Suspense>
  );
}
