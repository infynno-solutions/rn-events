import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const PerformerList = ({ performer, navigation }) => {
  // console.log(performer);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PerformerEvents", {
          performerId: performer.id,
          performerName: performer.name,
          performerImage: performer.image
        })
      }
    >
      <View style={styles.performerWrapper}>
        <View style={styles.performerContainer}>
          {performer.image ? (
            <View style={styles.performerImageWrapper}>
              <Image
                source={{ uri: performer.image }}
                style={styles.performerImage}
              />
            </View>
          ) : (
            <View style={styles.noImageWrapper} />
          )}
          <View style={styles.performerName}>
            <Text>{performer.name}</Text>
            {performer.num_upcoming_events > 0 ? (
              <Text>{performer.num_upcoming_events} events</Text>
            ) : (
              <Text>No events</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  performerWrapper: {
    flex: 1,
    flexDirection: "column"
  },
  performerContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  performerImageWrapper: {
    minWidth: 50,
    backgroundColor: "#cccccc",
    marginRight: 15,
    borderRadius: 50
  },
  noImageWrapper: {
    minWidth: 50,
    height: 50,
    backgroundColor: "#cccccc",
    marginRight: 15,
    borderRadius: 50
  },
  performerImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  performerName: {
    flex: 1
  }
});

export default PerformerList;
