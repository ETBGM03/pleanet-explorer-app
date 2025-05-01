import { COLORS_APP } from "@/constants";
import { getPlanetAcronym } from "@/lib";
import { Planet } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function PlanetDetails() {
  const { planet } = useLocalSearchParams<{ planet: string }>();
  const planetParsed: Planet = JSON.parse(planet);

  if (!planetParsed.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No planet data available</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: `${planetParsed.name} Details`,
          headerStyle: {
            backgroundColor: "#F3F4F6",
          },
          headerTitleStyle: {
            color: "#111827",
          },
          headerTintColor: "#111827",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.imageWrapper}>
              <Text style={styles.textAcronym}>
                {getPlanetAcronym(planetParsed.name)}
              </Text>
            </View>
            <Text style={styles.planetName}>{planetParsed.name}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <DetailRow
              label="Mean Radius"
              value={`${planetParsed.meanRadius} km`}
            />
            <DetailRow label="Gravity" value={`${planetParsed.gravity} m/s²`} />
            <DetailRow
              label="Moons"
              value={planetParsed.moons?.length.toString() || "0"}
            />
            <DetailRow
              label="Density"
              value={`${planetParsed.density} g/cm³`}
            />
            <DetailRow
              label="Average Temperature"
              value={`${planetParsed.avgTemp} K`}
            />
            <DetailRow
              label="Discovered By"
              value={planetParsed.discoveredBy || "Unknown"}
            />
            <DetailRow
              label="Discovery Date"
              value={planetParsed.discoveryDate || "Unknown"}
            />
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_APP.primary,
  },
  card: {
    backgroundColor: COLORS_APP.white,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS_APP.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS_APP.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  textAcronym: {
    fontSize: 60,
    fontWeight: "bold",
    color: COLORS_APP.planetNameDetail,
    textTransform: "uppercase",
  },
  planetName: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS_APP.planetNameDetail,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  label: {
    fontSize: 16,
    color: COLORS_APP.label,
  },
  value: {
    fontSize: 16,
    color: COLORS_APP.textColor,
    fontWeight: "500",
  },
  errorText: {
    color: "#9CA3AF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
