import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function FeedDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'Feed Details',
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
