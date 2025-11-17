import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import DetailsScreen from './details';
import { useLocalSearchParams } from 'expo-router';

export default function FeedDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
      <DetailsScreen id={id} />
    </Suspense>
  );
}
