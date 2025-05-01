import React, { useCallback } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  PlanetCard,
  ErrorScreen,
  LoaderScreen,
  SearchBar,
  SortButton,
} from "@components";
import { Planet } from "@types";
import { APP_STRINGS, COLORS_APP } from "@constants";
import { TouchableWithoutFeedback } from "react-native";
import { useListPlanets } from "@/hooks";

export default function PlanetListScreen() {
  const {
    error,
    filteredAndSortedData,
    isLoading,
    refetch,
    setIsAsc,
    setSearchTerm,
    searchTerm,
    isAsc,
  } = useListPlanets();

  const renderItem = useCallback<ListRenderItem<Partial<Planet>>>(
    ({ item, index }) => (
      <Animated.View entering={FadeIn.delay(index * 80).duration(300)}>
        <PlanetCard planet={item} />
      </Animated.View>
    ),
    []
  );

  const renderContent = () => {
    const isEmptyResult = filteredAndSortedData.length === 0;
    const hasSearch = searchTerm.trim().length > 0;

    if (isEmptyResult) {
      const message = hasSearch
        ? `Oops! We couldn't find any planets matching "${searchTerm}".`
        : "There are no planets to show right now.";

      return (
        <Animated.View
          entering={FadeIn.duration(400)}
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyText}>{message}</Text>
        </Animated.View>
      );
    }

    return (
      <FlatList
        data={filteredAndSortedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id!}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  if (isLoading) return <LoaderScreen />;
  if (error) return <ErrorScreen onRetry={refetch} />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{APP_STRINGS.home.title}</Text>
        <View style={styles.containerSearch}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            customStyles={{ flex: 1 }}
          />
          <SortButton
            isAsc={isAsc}
            onToggle={() => setIsAsc((prev) => !prev)}
          />
        </View>
        {renderContent()}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS_APP.primary,
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  containerSearch: {
    flexDirection: "row",
    gap: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS_APP.titleCard,
    textAlign: "center",
    marginBottom: 20,
  },
  separator: {
    height: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS_APP.label, // Gris neutro
    textAlign: "center",
  },
});
