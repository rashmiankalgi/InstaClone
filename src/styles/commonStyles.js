import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("screen").width * 0.5,
    height: 40,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  textInput: {
    height: 50,
    width: Dimensions.get("screen").width * 0.6,
  },
});
