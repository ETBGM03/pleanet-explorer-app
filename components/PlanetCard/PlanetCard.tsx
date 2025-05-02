import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useFavorites } from "@/providers";
import { COLORS_APP } from "@/constants";
import { Planet } from "@types";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getPlanetAcronym } from "@/lib";

interface PlanetCardProps {
  planet: Partial<Planet>;
}

export function PlanetCard({ planet }: PlanetCardProps) {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();

  const handleFavorite = async () => {
    try {
      if (isFavorite(planet.id!)) {
        // Remove from favorites
        removeFavorite(planet.id!);
      } else {
        // Add to favorites
        addFavorite(planet as Planet);
      }
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Link
        href={{
          pathname: "/planetDetails",
          params: { planet: JSON.stringify(planet) },
        }}
        style={styles.link}
      >
        <View style={styles.imageContainer}>
          <View style={styles.planetWrapper}>
            <Text>{getPlanetAcronym(planet.name as string)}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{planet.name}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Radio:</Text>
            <Text style={styles.value}>{planet.meanRadius} km</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Gravedad:</Text>
            <Text style={styles.value}>{planet.gravity} m/s²</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lunas:</Text>
            <Text style={styles.value}>{planet.moons?.length || 0}</Text>
          </View>
        </View>
      </Link>

      <View style={styles.favoriteButton}>
        <TouchableOpacity onPress={handleFavorite} activeOpacity={0.7}>
          <Ionicons
            name={isFavorite(planet.id!) ? "heart" : "heart-outline"}
            size={28}
            color={
              isFavorite(planet.id!)
                ? COLORS_APP.tabBarActive
                : COLORS_APP.border
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS_APP.white,
    borderRadius: 16,
    overflow: "hidden",
    borderColor: COLORS_APP.border,
    borderWidth: 1,
  },
  link: {
    flex: 1,
  },
  favoriteButton: {
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  planetWrapper: {
    width: 46,
    height: 46,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: COLORS_APP.bgImageWrapper,
    borderWidth: 1,
    borderColor: COLORS_APP.borderImage,
  },
  content: {
    flex: 1,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS_APP.titleCard,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 90,
    fontWeight: "600",
    color: COLORS_APP.label,
  },
  value: {
    color: COLORS_APP.textColor,
  },
});
