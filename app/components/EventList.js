import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import moment from "moment";
import { Config } from "../common";
import * as WebBrowser from "expo-web-browser";

const EventList = ({ event }) => {
  // console.log(event);
  const formattedDate = moment(event.datetime_local).format("MMM D");
  const formattedTime = moment(event.datetime_local).format("LT");
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (typeof WebBrowser !== "undefined") {
          WebBrowser.openBrowserAsync(event.url);
        } else {
          Linking.canOpenURL(url)
            .then(supported => {
              if (!supported) {
              } else {
                return Linking.openURL(event.url);
              }
            })
            .catch(err => error("An error occurred", err));
        }
      }}
      style={styles.eventsWrapper}
    >
      <View style={styles.eventsContainer}>
        <View style={styles.dateTime}>
          <Text style={styles.eventDate}>{formattedDate}</Text>
          <Text style={styles.eventTime}>{formattedTime}</Text>
        </View>
        <View style={styles.nameLocation}>
          <Text style={styles.eventName}>{event.title}</Text>
          <Text style={styles.eventLocation}>
            {event.stats.average_price && (
              <Text style={styles.eventPrice}>
                ${event.stats.average_price}
              </Text>
            )}{" "}
            {`${event.venue.city} - ${event.venue.state}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventsWrapper: {
    flex: 1,
    flexDirection: "column",
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1
  },
  eventsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  dateTime: { flex: 0, marginRight: 15, minWidth: 60 },
  eventDate: {
    fontWeight: "bold",
    fontFamily: Config.fontFamily,
    color: Config.textColor
  },
  eventTime: {
    fontFamily: Config.fontFamily,
    color: Config.textColor
  },
  nameLocation: {
    flex: 1
  },
  eventName: {
    fontFamily: Config.fontFamily,
    color: Config.textColor,
    fontWeight: "bold"
  },
  eventPrice: {
    fontFamily: Config.fontFamily,
    color: Config.primaryColor
  },
  eventLocation: {
    fontFamily: Config.fontFamily,
    color: Config.textColor
  }
});

export default EventList;
