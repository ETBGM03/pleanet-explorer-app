import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { APP_ROUTES, COLORS_APP } from "@constants";
import { FavoriteContextProvider } from "@/providers";

const queryClient = new QueryClient();

const screenOptions = {
  headerShown: false,
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteContextProvider>
        <StatusBar
          animated
          networkActivityIndicatorVisible
          backgroundColor={COLORS_APP.black}
          barStyle="light-content"
        />
        <Stack>
          <Stack.Screen name={APP_ROUTES.TABS} options={screenOptions} />
          <Stack.Screen name={APP_ROUTES.NOT_FOUND} />
        </Stack>
      </FavoriteContextProvider>
    </QueryClientProvider>
  );
}
