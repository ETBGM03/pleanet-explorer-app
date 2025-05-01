import { useCallback } from "react";
import { Text, View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { PlanetCard } from "@components";
import { useFavorites } from "@/providers";
import { APP_STRINGS, COLORS_APP } from "@/constants";
import { Planet } from "@/types";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  const renderItem = useCallback<ListRenderItem<Partial<Planet>>>(
    ({ item }) => <PlanetCard planet={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{APP_STRINGS.favorites.title}</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.containerEmpty}>
            <Text style={styles.emptyText}>
              {APP_STRINGS.favorites.listEmpty}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_APP.primary,
    paddingTop: 16,
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: COLORS_APP.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS_APP.titleCard,
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  separator: {
    height: 12,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS_APP.textColorEmpty,
    textAlign: "center",
    fontWeight: "500",
  },
});
