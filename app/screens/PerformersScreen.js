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
import { PerformerList, NotchSafe } from "../components";
import { connect } from "react-redux";
import { fetchPerformers } from "../redux/actions";
import { Config } from "../common";

const AnimatedListView = Animated.createAnimatedComponent(FlatList);

class PerformersScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  state = { scrollY: new Animated.Value(0) };

  componentDidMount() {
    this.page = 2;
    this.fetchPerformers();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list;
  }

  fetchPerformers = (reload = false) => {
    if (reload) {
      this.page = 1;
    }
    const { fetchPerformers } = this.props;
    fetchPerformers(this.page);
  };

  nextPerformers = () => {
    console.log("fetching next performers");
    // console.log(this.props);
    if (!this.props.finish) {
      this.page += 1;
      this.fetchPerformers();
    }
  };

  renderPerformers = ({ item }) => {
    // console.log(event);
    if (item === null) return <View />;

    return (
      <PerformerList performer={item} navigation={this.props.navigation} />
    );
  };

  renderHeader = () => {
    return (
      <View>
        <Text style={styles.upcomingHeading}>All Performers</Text>
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
            onPress={() => this.nextPerformers}
          />
        </View>
      )
    );
  };

  render() {
    const { list, isFetching } = this.props;

    return (
      <ScrollView>
        {isFetching ? (
          <ActivityIndicator
            color={Config.primaryColor}
            size="large"
            style={{ padding: 20 }}
          />
        ) : (
          <NotchSafe>
            <AnimatedListView
              data={list}
              keyExtractor={(item, index) =>
                `performerList-${item.id} || ${index}`
              }
              renderItem={this.renderPerformers}
              refreshing={isFetching}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={() => this.fetchPerformers(true)}
                />
              }
              onMomentumScrollBegin={this._onMomentumScrollBegin}
              onMomentumScrollEnd={this._onMomentumScrollEnd}
              onScrollEndDrag={this._onScrollEndDrag}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              // onEndReachedThreshold={1}
              // onEndReached={distance => {
              //   distance.distanceFromEnd < 700 && this.nextPerformers();
              // }}
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: this.state.scrollY } }
                  }
                ],
                { useNativeDriver: true }
              )}
            />
          </NotchSafe>
        )}
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

const mapStateToProps = ({ performers }) => {
  const list = performers.list;

  // console.log(performers.finish);

  return {
    list,
    isFetching: performers.isFetching,
    finish: performers.finish
  };
};
export default connect(mapStateToProps, { fetchPerformers })(PerformersScreen);
