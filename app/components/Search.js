import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Config } from "../common";
import axios from "axios";

class Search extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{
          backgroundColor: Config.primaryColor,
          paddingTop: 80,
          paddingBottom: 50
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginHorizontal: 25,
              marginTop: 15,
              color: "#ffffff",
              fontFamily: Config.fontFamily
            }}
          >
            Life’s an event.
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginHorizontal: 25,
              marginBottom: 15,
              color: "#ffffff",
              fontFamily: Config.fontFamily
            }}
          >
            We have the tickets.
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Search")}
          >
            <View
              style={{
                marginHorizontal: 20,
                marginBottom: 0,
                backgroundColor: Config.primaryColorDark,
                borderRadius: 5,
                paddingHorizontal: 25,
                paddingVertical: 15
              }}
            >
              <Text
                style={{
                  fontFamily: Config.fontFamily,
                  color: "#ffffff"
                }}
              >
                Performer, event or venue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Search;
