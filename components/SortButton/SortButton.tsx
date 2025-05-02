import { COLORS_APP } from "@/constants";
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
    backgroundColor: COLORS_APP.bgInput,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS_APP.border,
  },
  buttonText: {
    color: COLORS_APP.black,
    fontSize: 16,
  },
});
