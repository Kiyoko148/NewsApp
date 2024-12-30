import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getTopNewsByCountry } from "../../../lib/api/api";

const CountryNews = () => {
  const { country } = useLocalSearchParams(); // Lấy tham số `country` từ URL
  const router = useRouter();

  // State để lưu dữ liệu bài báo
  const [articles, setArticles] = useState([]);

  // Fetch tin tức theo quốc gia
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["newsByCountry", country],
    queryFn: () => getTopNewsByCountry(country),
    enabled: !!country, // Chỉ fetch khi `country` có giá trị
  });

  // Reset dữ liệu khi `country` thay đổi
  useEffect(() => {
    setArticles([]); // Xóa bài báo cũ
    if (data?.articles) {
      setArticles(data.articles); // Đặt bài báo mới
    }
  }, [country, data]);

  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c669f" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  // Hiển thị trạng thái lỗi
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error fetching news: {error?.message || "Unknown error"}
        </Text>
      </View>
    );
  }

  // Hiển thị danh sách tin tức
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{country?.toUpperCase()} News</Text>
      <FlatList
        data={articles || []} // Sử dụng state `articles`
        keyExtractor={(item) => item?.url || String(Math.random())}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.articleContainer}
            onPress={() =>
              router.push({
                pathname: `/news/details/[id]`,
                params: {
                  id: JSON.stringify({
                    title: item.title,
                    description: item.description,
                    content: item.content,
                    urlToImage: item.urlToImage,
                  }),
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
            No articles found for {country}.
          </Text>
        }
      />
    </View>
  );
};

export default CountryNews;

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
