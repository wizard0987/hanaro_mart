import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import Colors from "../../constants/Colors";
import StoreItem from "../../components/store/StoreItem";
// import WheelPicker from "react-native-wheel-picker";
// var PickerItem = WheelPicker.Item;
import Modal from "react-native-modal";


const StoreChangeScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(2);
  const [itemList, setItemList] = useState([
    "제주도",
    "강원도",
    "서울",
    "경기",
    "경상남도",
    "경상북도",
    "전라남도",
    "전라북도",
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({ id: null, title: "" });
  let [webView, setWebview] = useState(null);
  const onPickerSelect = (index) => {
    setSelectedItem(() => index);
  };

  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    setCurrentItem(() => item);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let provider = await Location.getProviderStatusAsync();
      // console.log(provider);
      if (location == null) {
        let location = await Location.getCurrentPositionAsync({
          maximumAge: 60000, // only for Android
          accuracy: Platform.Android
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
        });
        setLocation(location);
        // console.log(location);
      }
    })();
  });

  const onMessage = (obj) => {
    // console.log(obj.nativeEvent.data);
    Linking.openURL(obj.nativeEvent.data);
  };

  const confirmHandler = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView>
      <View style={[styles.row]}>
        <TextInput placeholder="매장명을 입력하세요." />
        <Button title="검색" />
      </View>
      <View style={[styles.row]}>
        {/* <WheelPicker
          style={{ width: 150, height: 180 }}
          selectedValue={selectedItem}
          itemStyle={{ color: "black", fontSize: 14 }}
          onValueChange={(index) => onPickerSelect(index)}
        >
          {itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={"money" + value} />
          ))}
        </WheelPicker>
        <WheelPicker
          style={{ width: 150, height: 180 }}
          selectedValue={selectedItem}
          itemStyle={{ color: "black", fontSize: 14 }}
          onValueChange={(index) => onPickerSelect(index)}
        >
          {itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={"money" + value} />
          ))}
        </WheelPicker>
        <WheelPicker
          style={{ width: 150, height: 180 }}
          selectedValue={selectedItem}
          itemStyle={{ color: "black", fontSize: 14 }}
          onValueChange={(index) => onPickerSelect(index)}
        >
          {itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={"money" + value} />
          ))}
        </WheelPicker> */}
      </View>
      <View style={[styles.row]}>
        <Button title="취소" />
        <Button title="확인" />
      </View>
      <FlatList
        style={{ flat: 1, height: "100%" }}
        data={[
          {
            id: 0,
            title: "하나로마트 양재점",
          },
          {
            id: 1,
            title: "하나로마트 천안점",
          },
          {
            id: 2,
            title: "하나로마트 마포점",
          },
          {
            id: 3,
            title: "하나로마트 이태원점",
          },
          {
            id: 4,
            title: "하나로마트 홍대점",
          },
          {
            id: 5,
            title: "하나로마트 안산점",
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <StoreItem
            onPress={popupHandler.bind(this, itemData.item)}
            title={itemData.item.title}
          />
        )}
      />
      <Modal isVisible={isVisible} s>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: "white",
            flex: 0.8,
            width: "100%",
          }}
        >
          <Text
            style={{
              width: "100%",
            }}
          >
            {currentItem && currentItem.title}
          </Text>
          <View style={[styles.row]}></View>
          <Button title="닫기" onPress={() => setIsVisible(() => false)} />
          <WebView
            ref={(wv) => (webView = wv)}
            key={location}
            originWhitelist={["*"]}
            allowFileAccess={true}
            domStorageEnabled={true}
            javaScriptEnabled={true}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs={true}
            mixedContentMode="always"
            source={{ html: require("../../map.js")(location) }}
            // onNavigationStateChange={_onNavigationStateChange.bind(this)}
            startInLoadingState={false}
            onMessage={onMessage}
          />
          <Button title="설정" onPress={confirmHandler} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export const screenOptions = ({ navigation }) => {
  return {
    title: "매장변경",
    headerBackTitle: " ",
    gestureEnabled: false,
  };
};
const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
export default StoreChangeScreen;
