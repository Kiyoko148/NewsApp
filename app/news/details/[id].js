import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";

const NewsDetails = () => {
  const { id } = useLocalSearchParams();

  if (!id) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No news details available.</Text>
      </View>
    );
  }

  let details;
  try {
    details = JSON.parse(decodeURIComponent(id));
  } catch (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid news data.</Text>
      </View>
    );
  }

  const { title, description, content, urlToImage } = details;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title || "No Title"}</Text>
      {urlToImage && <Image source={{ uri: urlToImage }} style={styles.image} />}
      <Text style={styles.description}>{description || "No Description"}</Text>
      <Text style={styles.content}>{content || "No Content"}</Text>
    </ScrollView>
  );
};

export default NewsDetails;

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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
  },
});
