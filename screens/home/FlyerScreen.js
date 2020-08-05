import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";
import ImageSlider from "react-native-image-slider";
import Carousel from "react-native-looped-carousel";
import { Overlay } from "react-native-elements";
import { useSelector } from "react-redux";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import StoreListPopup from "../../components/StoreListPopup";

const { width, height } = Dimensions.get("window");

const FlyerScreen = ({ navigation }) => {
  const pushToken = useSelector((state) => state.auth.pushToken);

  const state = {
    size: { width, height },
  };
  const images = [
    "https://placeimg.com/640/640/nature",
    "https://placeimg.com/640/640/people",
    "https://placeimg.com/640/640/animals",
    "https://placeimg.com/640/640/beer",
  ];
  const [isVisible, setIsVisible] = useState(false);

  const triggerNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first local notification we are sending!',
    //     data: { mySpecialData: 'Some text' },
    //   },
    //   trigger: {
    //     seconds: 10,
    //   },
    // });
    console.log("triggerNotificationHandler");
    console.log("FlyerScreen PushToken ==>" + pushToken);
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        data: { extraData: "Some data" },
        title: "Sent via the app",
        body: "This push notification was sent via the app!",
      }),
    });
  };
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <StoreListPopup isVisible={isVisible} />

        <View style={styles.content1}>
          <Button
            title="전단 상세"
            onPress={() => navigation.navigate("FlyerDetail")}
          />
        </View>
        <Carousel
          delay={2000}
          style={{ flex: 1, height: 100 }}
          autoplay
          pageInfo
        >
          <View style={[{ backgroundColor: "#BADA55" }, state.size]}>
            <Text>1</Text>
          </View>
          <View style={[{ backgroundColor: "red" }, state.size]}>
            <Text>2</Text>
          </View>
          <View style={[{ backgroundColor: "blue" }, state.size]}>
            <Text>3</Text>
          </View>
        </Carousel>

        <View style={styles.content2}>
          <Button
            title="팝업"
            onPress={() => {
              setIsVisible((isVisible) => !isVisible);
            }}
          />
        </View>
        <View style={styles.content2}>
          <Button
            title="Trigger Notification"
            onPress={() => triggerNotificationHandler()}
          />
        </View>
        <View style={styles.content2}>
          <Text style={styles.contentText}>Content 2</Text>
        </View>
        <View style={styles.content2}>
          <Text style={styles.contentText}>Content 2</Text>
        </View>
        <View style={styles.content2}>
          <Text style={styles.contentText}>Content 2</Text>
        </View>
        <View style={styles.content2}>
          <Text style={styles.contentText}>Content 2</Text>
        </View>
        <Text>FlyerScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { backgroundColor: "#000", height: 350 },
  content1: {
    flex: 1,
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: { color: "#fff" },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSelected: {
    opacity: 1,
    color: "red",
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: 100,
    height: 100,
  },
});

export default FlyerScreen;
