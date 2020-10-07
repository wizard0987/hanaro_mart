import React from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { Platform, Text, View, StyleSheet, Image } from "react-native";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
} from "@UI/BaseUI";
import Constants from "expo-constants";
import _ from "lodash";

import { LinearGradient } from "expo-linear-gradient";
import UserName from "@UI/UserName";
import UserPhoneNumber from "@UI/UserPhoneNumber";
const MemberInfo = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  //   console.warn(userInfo);
  return (
    <>
      <MemberInfoContainer>
        <MemberContainer>
          <Text1>회원번호</Text1>
          <MemberID style={{ flexDirection: "row" }}>
            <Image source={require("@images/user.png")} />
            <Text2>
              <UserName />
            </Text2>
            <Text3>님</Text3>
          </MemberID>
          <Text4>
            <UserPhoneNumber />
          </Text4>
        </MemberContainer>
        <BaseTouchable onPress={() => props.navigation.closeDrawer()}>
          <Image source={require("@images/login.png")} />
        </BaseTouchable>
      </MemberInfoContainer>
      <GradientBar></GradientBar>
    </>
  );
};
const MemberID = styled.View({
  alignItems: "center",
});
const Text1 = styled.Text({
  fontSize: 12,

  color: "#b5b5b5",
});
const Text2 = styled.Text({
  fontSize: 24,
  color: colors.black,
  marginLeft: 6,
  marginRight: 9,
});
const Text3 = styled.Text({
  fontSize: 14,
  color: colors.black,
});
const Text4 = styled.Text({
  fontSize: 16,
  lineHeight: 16,
  color: colors.pine,
});

const MemberInfoContainer = styled.View({
  // marginTop: Constants.statusBarHeight,
  backgroundColor: colors.trueWhite,
  paddingRight: 16,
  paddingLeft: 21,
  paddingBottom: 10,
  paddingTop: 5,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
const MemberContainer = styled.View({});
const GradientBar = styled(LinearGradient)({
  height: 6,
});
GradientBar.defaultProps = {
  colors: [colors.pine, colors.cerulean],
  start: { x: -1, y: 0 },
  end: { x: 1, y: 0 },
};

export default MemberInfo;