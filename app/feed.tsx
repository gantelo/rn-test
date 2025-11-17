import { FlatList, StyleSheet, TouchableOpacity, Platform, RefreshControl } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getFeed, Post } from '@/api/get-feed';
import { router } from 'expo-router';

export default function FeedScreen() {
  const queryClient = useQueryClient();

  // stale time is 15 minutes
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
    staleTime: 1000 * 60 * 15,
  });

  const handleSwipeToRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['feed'] });
  };

  const renderItem = ({ item }: { item: Post }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => router.push({ pathname: '/feed-details', params: { id: item.id.toString() } })}
        style={styles.cardContainer}
        activeOpacity={0.7}
      >
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.body} numberOfLines={3}>
            {item.body}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={handleSwipeToRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    gap: 12,
  },
  cardContainer: {
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  title: {
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
