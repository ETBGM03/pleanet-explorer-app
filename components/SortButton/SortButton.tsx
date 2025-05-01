import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const SortButton = ({
  isAsc,
  onToggle,
}: {
  isAsc: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={styles.button}
    onPress={onToggle}
  >
    <Text style={styles.buttonText}>{isAsc ? "Asc" : "Desc"}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
