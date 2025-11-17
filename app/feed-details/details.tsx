import { Comment, getCommentsByPostId, getFeedById } from '@/api/get-feed';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useMemo, useCallback } from 'react';

export default function DetailsScreen({ id }: { id: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { data } = useSuspenseQuery({
    queryKey: ['feed', id],
    queryFn: () => getFeedById(Number(id)),
  });

  // ideally would be chained or passed through state, but i didn't have time
  const { data: comments } = useSuspenseQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentsByPostId(Number(id)),
  });

  const idContainerStyle = useMemo(
    () => [styles.idContainer, { borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#E5E5E5' }],
    [isDark]
  );

  const commentCardStyle = useMemo(
    () => [
      styles.commentCard,
      { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' },
    ],
    [isDark]
  );

  const renderItem = useCallback(
    ({ item }: { item: Comment }) => (
      <ThemedView style={commentCardStyle}>
        <ThemedText style={styles.commentName}>{item.name}</ThemedText>
        <ThemedText style={styles.commentEmail}>{item.email}</ThemedText>
        <ThemedText style={styles.commentBody}>{item.body}</ThemedText>
      </ThemedView>
    ),
    [commentCardStyle]
  );

  const keyExtractor = useCallback((item: Comment) => item.id.toString(), []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedView style={styles.card}>
        <ThemedView style={idContainerStyle}>
          <ThemedText style={styles.idLabel}>Post ID</ThemedText>
          <ThemedText style={styles.idValue}>#{data?.id}</ThemedText>
        </ThemedView>

        <ThemedText type="title" style={styles.title}>
          {data?.title}
        </ThemedText>

        <ThemedText style={styles.body}>{data?.body}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.commentsSection}>
        <ThemedText type="subtitle" style={styles.commentsTitle}>
          Comments ({comments?.length || 0})
        </ThemedText>
        <FlatList
          data={comments}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  idLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  idValue: {
    fontSize: 18,
    fontWeight: '700',
    opacity: 0.8,
  },
  title: {
    marginBottom: 16,
    lineHeight: 36,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.85,
  },
  commentsSection: {
    marginTop: 8,
    borderRadius: 8,
  },
  commentsTitle: {
    marginBottom: 12,
    padding: 8,
  },
  commentCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  commentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  commentEmail: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  commentBody: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
