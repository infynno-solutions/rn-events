import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Config } from "./common";

import HomeScreen from "./screens/HomeScreen";
import PerformersScreen from "./screens/PerformersScreen";
import PerformerEvents from "./screens/PerformerEvents";
import SearchScreen from "./screens/SearchScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Search: SearchScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: "Events",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="ticket-outline"
          size={32}
          color={tintColor}
        />
      )
    })
  }
);

const PerformersStack = createStackNavigator(
  {
    Performers: PerformersScreen,
    PerformerEvents: PerformerEvents
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: "Performers",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="account-outline"
          size={32}
          color={tintColor}
        />
      )
    })
  }
);

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Performers: PerformersScreen,
    PerformerEvents: PerformerEvents
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: "Search",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="magnify" size={32} color={tintColor} />
      )
    })
  }
);

const BottomTabs = createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    PerformersStack
  },
  {
    tabBarOptions: {
      activeTintColor: Config.accentColor,
      inactiveTintColor: Config.textColor,
      showLabel: false,
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      },
      tabBarSelectedItemStyle: {
        borderBottomWidth: 2,
        borderBottomColor: "red"
      }
    }
  }
);

export default createAppContainer(BottomTabs);
