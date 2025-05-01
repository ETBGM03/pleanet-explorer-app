import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";

export const SearchBar = ({
  value,
  onChange,
  customStyles,
}: {
  value: string;
  onChange: (text: string) => void;
  customStyles?: StyleProp<TextStyle>;
}) => (
  <TextInput
    placeholder="Search"
    style={StyleSheet.compose(styles.input, customStyles)}
    placeholderTextColor="gray"
    defaultValue={value}
    onChangeText={onChange}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E5E7EB",
    color: "#111827",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
});
