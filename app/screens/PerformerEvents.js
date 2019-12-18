import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  Dimensions,
  Image
} from "react-native";
import { NotchSafe, EventList } from "../components";
import { connect } from "react-redux";
import { fetchEvents } from "../redux/actions";
import { Config } from "../common";

const AnimatedListView = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get("window");

class PerformerEvents extends Component {
  static navigationOptions = ({ navigation }) =>
    // console.log(navigation);
    ({
      headerStyle: {
        backgroundColor: navigation.state.params.bgColor
          ? navigation.state.params.bgColor
          : "transparent",
        color: "#ffffff"
      },
      headerTransparent: {
        position: "absolute"
      },
      headerTintColor: "#ffffff"
    });

  state = { scrollY: new Animated.Value(0) };

  componentWillMount() {
    // console.log(this.props.navigation.state);
    const { navigation } = this.props;
    const { scrollY } = this.state;
    navigation.setParams({
      bgColor: scrollY.interpolate({
        inputRange: [0, height / 2 - 50],
        outputRange: ["transparent", "#ffffff"],
        extrapolate: "clamp"
      })
    });
  }

  componentDidMount() {
    this.page = 1;
    this.performerId = this.props.navigation.state.params.performerId;
    this.fetchEvents();
  }

  fetchEvents = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const { fetchEvents } = this.props;
    fetchEvents(this.page, this.performerId);
  };

  nextEvents = () => {
    if (!this.props.finish) {
      this.page += 1;
      this.fetchEvents();
    }
  };

  renderEvents = ({ item }) => {
    if (item === null) return <View />;

    return <EventList event={item} navigation={this.props.navigation} />;
  };

  render() {
    const { list, isFetching } = this.props;
    const { scrollY } = this.state;

    return (
      <Animated.ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
        scrollEventThrottle={16}
      >
        {this.props.navigation.state.params.performerImage ? (
          <Image
            style={{ width: width, height: height / 3 }}
            source={{
              uri: this.props.navigation.state.params.performerImage
            }}
          />
        ) : (
          <View
            style={{
              width: width,
              height: height / 3,
              backgroundColor: "#eeeeee"
            }}
          />
        )}
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
          <Text style={{ fontSize: 20, color: "#303030", fontWeight: "bold" }}>
            {this.props.navigation.state.params.performerName}
          </Text>
        </View>
        {isFetching ? (
          <ActivityIndicator
            color={Config.primaryColor}
            size="large"
            style={{ padding: 20 }}
          />
        ) : (
          <View>
            <AnimatedListView
              data={list}
              keyExtractor={(item, index) => `eventList-${item.id} || ${index}`}
              renderItem={this.renderEvents}
              refreshing={isFetching}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={() => this.fetchEvents(true)}
                />
              }
              onMomentumScrollBegin={this._onMomentumScrollBegin}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
              onScrollEndDrag={this._onScrollEndDrag}
              // ListHeaderComponent={this.renderHeader}
              // ListFooterComponent={this.renderFooter}
              onEndReachedThreshold={1}
              onEndReached={distance => {
                distance.distanceFromEnd < 700 && this.nextEvents();
              }}
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: this.state.scrollY } }
                  }
                ],
                { useNativeDriver: false }
              )}
            />
          </View>
        )}
      </Animated.ScrollView>
    );
  }
}

const mapStateToProps = ({ events }) => {
  const list = events.list;

  return {
    list,
    isFetching: events.isFetching,
    finish: events.finish
  };
};

export default connect(mapStateToProps, { fetchEvents })(PerformerEvents);
