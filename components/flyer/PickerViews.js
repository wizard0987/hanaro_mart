import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Image, Platform } from "react-native";

import RNPickerSelect from "react-native-picker-select";
import _ from "lodash";
import { BaseText } from "../../components/UI/BaseUI";

const PickerViews = (props) => {
  const pickerRef = useRef();
  let pickerItems = [];
  const [selectedItem, setSelectedItem] = useState({
    label: props.currentFlyer.title,
    value: props.currentFlyer.leaf_cd,
  });
  const [title, setTitle] = useState(props.currentFlyer.title);
  const carousel = useSelector((state) => state.flyer.carousel);
  const onItemChange = async (value) => {
    if (!value || value == selectedItem.value) return;
    const item = _.filter(pickerItems, (o) => o.value == value);
    setSelectedItem(item[0]);
    if (Platform.OS == "android") onItemSelected(item[0]);
  };

  const onItemSelected = async (obj) => {
    const val = Platform.OS == "android" ? obj.value : selectedItem.value;
    const title = Platform.OS == "android" ? obj.label : selectedItem.label;
    setTitle(title);
    const index = _.findIndex(pickerItems, (o) => o.value == val);
    props.setPageForCarousel(index);
    carousel.animateToPage(index);
  };

  useEffect(() => {
    setSelectedItem({
      label: props.currentFlyer.title,
      value: props.currentFlyer.leaf_cd,
    });
    setTitle(props.currentFlyer.title);
  }, [props.currentFlyer]);

  props.leafletList &&
    props.leafletList.map((item, index) => {
      pickerItems.push({
        label: item.title,
        value: item.leaf_cd,
      });
    });

  if (!selectedItem) return <></>;
  return (
    <PickerContainer>
      <RNPickerSelect
        doneText="확인"
        fixAndroidTouchableBug={true}
        InputAccessoryView={null}
        ref={pickerRef}
        placeholder={{ label: "행사전단 선택", value: "" }}
        value={selectedItem.value}
        style={pickerSelectStyles}
        onValueChange={(value) => onItemChange(value)}
        onDonePress={onItemSelected}
        items={pickerItems}
      >
        <PickerContainer>
          <PickerButton onPress={() => pickerRef.togglePicker()}>
            <PickerText>{title}</PickerText>
            <Image source={require("../../assets/images/bt.png")} />
          </PickerButton>
        </PickerContainer>
      </RNPickerSelect>
    </PickerContainer>
  );
};

const PickerText = styled(BaseText)({
  fontSize: 15,
  color: colors.CERULEAN_2,
  letterSpacing: -0.3,
  marginRight: 3.5,
});
const PickerButton = styled.TouchableOpacity({
  paddingBottom: 11.5,
  flexDirection: "row",
  alignItems: "center",
});
const PickerContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  justifyContent: "center",
  alignSelf: "center",
  backgroundColor: colors.trueWhite,
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.CERULEAN_2,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colors.CERULEAN_2,
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    height: 19,
  },
});
const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 14,
  },
  picker: {
    flexGrow: 0.5,
    color: colors.greyishBrown,
  },
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
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default PickerViews;