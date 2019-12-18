import React, { Component } from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { NotchSafe, EventList, PerformerList } from "../components";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Config } from "../common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Constants from "expo-constants";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
import * as Network from "expo-network";

class SearchScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    term: "",
    events: [],
    performers: [],
    location: null,
    errorMessage: null
  };

  componentWillMount() {
    this.getIP();
  }

  getIP = async () => {
    const ip = await Network.getIpAddressAsync();
    // console.log(ip);
    return ip;
  };

  // componentWillMount() {
  //   if (Platform.OS === "android" && !Constants.isDevice) {
  //     this.setState({
  //       errorMessage:
  //         "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
  //     });
  //   } else {
  //     this._getLocationAsync();
  //   }
  // }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     this.setState({
  //       errorMessage: "Permission to access location was denied"
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   // console.log(location);
  //   this.setState({ location });
  // };

  handleSearch = async (text, geoip = false) => {
    if (text.length > 3) {
      const reqUrlPerformers = `https://api.seatgeek.com/2/performers?q=${text}&client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;
      let reqUrlEvents;
      if (geoip) {
        const ip = await this.getIP();
        // console.log(ip);
        reqUrlEvents = `https://api.seatgeek.com/2/events?q=${text}&geoip=${ip}&client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;
      } else {
        reqUrlEvents = `https://api.seatgeek.com/2/events?q=${text}&client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;
      }
      console.log(reqUrlEvents);
      axios.get(reqUrlPerformers).then(res => {
        this.setState({ performers: res.data.performers });
      });
      axios.get(reqUrlEvents).then(res => {
        this.setState({ events: res.data.events });
      });
    } else {
      console.log("less then 3 char");
    }
  };

  render() {
    // console.log(this.state);
    const { navigation } = this.props;

    const { events, performers } = this.state;
    return (
      <NotchSafe>
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            flex: 0
          }}
        >
          <View
            style={{
              flex: 0,
              backgroundColor: "#eee",
              flexDirection: "row",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.goBack()}
              style={{ marginHorizontal: 10 }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={Config.primaryColor}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                flex: 1,
                color: "#303030",
                backgroundColor: "#eee",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5
              }}
              placeholder="Performer, event or venue"
              placeholderTextColor="#666"
              autoFocus={true}
              onChangeText={text => this.handleSearch(text)}
            />
          </View>
          <ScrollView>
            {performers.length > 1 && (
              <View
                style={{
                  marginTop: 20
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginHorizontal: 10,
                    color: Config.textColor,
                    textTransform: "uppercase"
                  }}
                >
                  Performers
                </Text>
                <View>
                  {performers.map(performer => (
                    <PerformerList
                      key={performer.id}
                      navigation={navigation}
                      performer={performer}
                    />
                  ))}
                </View>
              </View>
            )}
            {events.length > 1 && (
              <View
                style={{
                  marginTop: 20
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginHorizontal: 10,
                    color: Config.textColor,
                    textTransform: "uppercase"
                  }}
                >
                  Events
                </Text>
                <View>
                  {events.map(event => (
                    <EventList key={event.id} event={event} />
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </NotchSafe>
    );
  }
}

export default SearchScreen;
