import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getNewsByCategory } from "../../../lib/api/api";

const NewsByCategory = () => {
  // Get the category from the URL
  const { newsByCategory } = useLocalSearchParams();

  const {
    data,
    error,
    isError,
    isLoading,
    refetch, // Add refetch function
  } = useQuery({
    queryKey: ["newsByCategory", newsByCategory], // Include category in queryKey
    queryFn: () => getNewsByCategory(newsByCategory),
    staleTime: 0, // Optional: Ensure data is fresh
  });

  const router = useRouter();

  // Refetch when category changes
  useEffect(() => {
    refetch();
  }, [newsByCategory]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c669f" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Error state
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {error.message || "An error occurred"}
        </Text>
      </View>
    );
  }

  // Render articles
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{newsByCategory}: News</Text>
      <FlatList
        data={data?.articles || []} // Ensure data is always an array
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.articleContainer}
            onPress={() =>
              router.push({
                pathname: "/news/details/[id]",
                params: {
                  id: encodeURIComponent(
                    JSON.stringify({
                      title: item.title,
                      description: item.description,
                      content: item.content,
                      urlToImage: item.urlToImage,
                    })
                  ),
                },
              })
            }            
          >
            {item.urlToImage && (
              <Image
                source={{ uri: item.urlToImage }}
                style={styles.articleImage}
              />
            )}
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>
            No articles found for {newsByCategory}.
          </Text>
        }
      />
    </View>
  );
};

export default NewsByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  articleContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleDescription: {
    fontSize: 14,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#4c669f",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
