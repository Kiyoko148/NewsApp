import { QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import queryClient from "../lib/react-query/queryClient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          headerShown: false, // Ẩn header mặc định
        }}
      >
        {/* Tab Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={40} color={color} />
            ),
          }}
        />

        {/* Tab Search News */}
        <Tabs.Screen
          name="news/everything/index"
          options={{
            title: "Search News",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="search" size={40} color={color} />
            ),
          }}
        />

        {/* Tab All Countries */}
        <Tabs.Screen
          name="news/categories/countryCategories/index"
          options={{
            title: "All Countries",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="flag" size={40} color={color} />
            ),
          }}
        />

        {/* Tab All Categories */}
        <Tabs.Screen
          name="news/categories/index"
          options={{
            title: "All Categories",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="category" size={40} color={color} />
            ),
          }}
        />

        {/* Ẩn các route không phải tab */}
        <Tabs.Screen
          name="news/categories/[newsByCategory]"
          options={{
            href: null, // Không hiển thị route này trong Tab Navigator
          }}
        />
        <Tabs.Screen
          name="news/details/[id]"
          options={{
            href: null, // Không hiển thị route này trong Tab Navigator
          }}
        />
        <Tabs.Screen
          name="news/countries/index"
          options={{
            href: null, // Không hiển thị route này trong Tab Navigator
          }}
        />
        <Tabs.Screen
          name="news/countries/[country]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
