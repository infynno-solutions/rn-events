import React from "react";
import { SafeAreaView, Platform, StyleSheet, StatusBar } from "react-native";

const NotchSafe = ({ children }) => {
  return (
    <SafeAreaView style={Platform.OS === "android" ? styles.android : ""}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  android: {
    marginTop: StatusBar.currentHeight
  }
});

export default NotchSafe;
