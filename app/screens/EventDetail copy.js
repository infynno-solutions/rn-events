import React, { Component } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { fetchEventDetails } from "../redux/actions";
import moment from "moment";
import { Config } from "../common";

class EventDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.eventName
  });

  componentDidMount() {
    // this.props.fetchEventDetails(this.props.navigation.state.params.eventID);
  }

  render() {
    const { info, isFetching } = this.props;
    // console.log(isFetching);
    const formattedDate = moment(info.datetime_local).format("MMM D");
    const formattedTime = moment(info.datetime_local).format("LT");

    return (
      <View>
        {isFetching ? (
          <ActivityIndicator
            color={Config.primaryColor}
            size="large"
            style={{ padding: 20 }}
          />
        ) : (
          <View style={{ flex: 1, margin: 20 }}>
            <Text
              style={{
                borderRadius: 5,
                marginVertical: 5,
                color: "#rgb(22, 115, 230)",
                textTransform: "uppercase"
              }}
            >
              {info.type}
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>
              {info.title}
            </Text>
            <Text style={{ paddingVertical: 5 }}>
              {formattedDate} - {formattedTime}
            </Text>
            {/* {info.venue.address && (
          <Text style={{ paddingVertical: 5 }}>
            {info.venue.address}, {info.venue.city}, {info.venue.state}
          </Text>
        )} */}
            {/* {info.stats.average_price && (
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Starting From $ {info.stats.average_price}
          </Text>
        )} */}
            <View style={{ marginTop: 10 }}>
              <Button
                title="Get Tickets"
                onPress={() => Alert.alert("Fetching Tickets ")}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return {
    info: events.event,
    isFetching: events.isFetching
  };
};

export default connect(mapStateToProps, { fetchEventDetails })(EventDetail);
