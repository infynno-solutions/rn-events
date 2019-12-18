import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
  Animated,
  ScrollView,
  Button
} from "react-native";
import { NotchSafe, EventList, Search } from "../components";
import { connect } from "react-redux";
import { fetchEvents } from "../redux/actions";
import { Config } from "../common";

const AnimatedListView = Animated.createAnimatedComponent(FlatList);

class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  state = { scrollY: new Animated.Value(0) };

  componentDidMount() {
    this.page = 1;
    this.fetchEvents();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.list != prevProps.list) {
  //     this.page = 1;
  //     this.fetchEvents();
  //   }
  // }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list;
  }

  fetchEvents = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const { fetchEvents } = this.props;
    fetchEvents(this.page);
  };

  nextEvents = () => {
    // console.log(this.props);
    if (!this.props.finish) {
      this.page += 1;
      this.fetchEvents();
    }
  };

  renderEvents = ({ item }) => {
    // console.log(event);
    if (item === null) return <View />;

    return <EventList event={item} navigation={this.props.navigation} />;
  };

  renderHeader = () => {
    return (
      <View>
        <Text style={styles.upcomingHeading}>Upcoming Events</Text>
      </View>
    );
  };

  renderFooter = () => {
    const { isFetching, finish } = this.props;

    if (isFetching)
      return (
        <ActivityIndicator
          color={Config.primaryColor}
          size="large"
          style={{ padding: 20 }}
        />
      );

    return (
      !finish && (
        <View>
          <Button
            color={Config.primaryColor}
            name="arrow-down"
            title={isFetching ? "LOADING..." : "MORE"}
            onPress={this.nextEvents}
          />
        </View>
      )
    );
  };

  render() {
    const { list, isFetching, navigation } = this.props;

    return (
      <ScrollView>
        <Search navigation={navigation} />

        <View>
          <AnimatedListView
            data={list}
            keyExtractor={(item, index) => `eventList-${item.id} || ${index}`}
            renderItem={this.renderEvents}
            // refreshing={isFetching}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={isFetching}
            //     onRefresh={() => this.fetchEvents(true)}
            //   />
            // }
            onMomentumScrollBegin={this._onMomentumScrollBegin}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            onScrollEndDrag={this._onScrollEndDrag}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            // onEndReachedThreshold={0.4}
            // onEndReached={distance => {
            //   distance.distanceFromEnd < 700 && this.nextEvents();
            // }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: this.state.scrollY } }
                }
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  upcomingHeading: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 24,
    fontFamily: Config.fontFamily,
    fontWeight: "bold",
    color: Config.headingColor
  },
  eventsContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    flex: 1,
    backgroundColor: "#000000"
  }
});

const mapStateToProps = ({ events }) => {
  const list = events.list;

  return {
    list,
    isFetching: events.isFetching,
    finish: events.finish
  };
};
export default connect(mapStateToProps, { fetchEvents })(HomeScreen);
