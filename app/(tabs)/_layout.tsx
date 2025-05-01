import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS_APP } from "@/constants";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const screenOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: COLORS_APP.tabBarActive,
  headerShown: false,
  headerShadowVisible: false,
  headerTintColor: COLORS_APP.white,
  tabBarStyle: {
    backgroundColor: COLORS_APP.bgTab,
  },
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Planets",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list-circle-sharp" : "list-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart-circle-sharp" : "heart-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
