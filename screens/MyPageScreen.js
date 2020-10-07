import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { BaseTouchable } from "@UI/BaseUI";
import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import { StoreBox, BottomCover } from "@components/store/InfoBox";
import { WhiteContainer } from "@screens/snb/StoreChangeScreen";
import MemberInfo from "@components/myPage/MemberInfo";

const MyPageScreen = ({ navigation }) => {
  return (
    <BaseScreen
      isPadding={false}
      style={{
        backgroundColor: colors.trueWhite,
      }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
      }}
    >
      <MemberInfo />
      <WhiteContainer>
        {/* <BtnContainer>
          <Icon source={require("@images/tools.png")} />
          <BtnText>내정보관리</BtnText>
        </BtnContainer> */}
        <BtnContainer onPress={() => navigation.navigate("MyReviews")}>
          <Icon source={require("@images/chat3.png")} />
          <BtnText>나의리뷰</BtnText>
        </BtnContainer>
        {/* <BtnContainer>
          <Icon source={require("@images/calculator.png")} />
          <BtnText>상품주문내역</BtnText>
        </BtnContainer>
        <BtnContainer>
          <Icon source={require("@images/barcode.png")} />
          <BtnText>이벤트 응모내역</BtnText>
        </BtnContainer> */}
        <BtnContainer onPress={() => navigation.navigate("Inquiry")}>
          <Icon source={require("@images/clipboard.png")} />
          <BtnText>나의 문의내역</BtnText>
        </BtnContainer>
        <BtnContainer
          style={{ borderBottomWidth: 0 }}
          onPress={() => navigation.navigate("Withdrawal")}
        >
          <Icon source={require("@images/unlocked2.png")} />
          <BtnText>회원탈퇴</BtnText>
        </BtnContainer>
        <BlackBox>
          <Image source={require("@images/cogs.png")} />
          <Buttons>
            <GrayBtn onPress={() => navigation.navigate("Terms")}>
              <GrayText>이용약관</GrayText>
            </GrayBtn>
            <GrayBtn onPress={() => navigation.navigate("Privacy")}>
              <GrayText>개인정보처리방침</GrayText>
            </GrayBtn>
          </Buttons>
        </BlackBox>
      </WhiteContainer>
    </BaseScreen>
  );
};
const GrayText = styled.Text({
  fontSize: 12,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 17,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
  overflow: "hidden",
  width: "auto",
});
const GrayBtn = styled(BaseTouchable)({
  borderRadius: 13,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 3,
  paddingBottom: 3,
  width: "auto",
  margin: 5,
});
const Buttons = styled.View({ width: "auto" });
const BlackBox = styled.View({
  backgroundColor: colors.black,
  flex: 1,
  flexDirection: "row",
  width: "100%",
  marginTop: 30,
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: 10,
  paddingLeft: 10,
});
const Icon = styled.Image.attrs({
  resizeMode: "contain",
})({
  width: 21,
});
const BtnText = styled.Text({
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 26,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 25,
});
const BtnContainer = styled.TouchableOpacity({
  borderBottomWidth: 1,
  borderColor: colors.white,
  marginLeft: "14.44%",
  marginRight: "14.44%",
  flexDirection: "row",
  paddingTop: 15.5,
  paddingBottom: 15.5,
  paddingLeft: "13.88%",
  alignItems: "center",
});
const Title = styled.Text({
  fontSize: 20,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 29,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Name = styled.Text({
  marginLeft: 8,
  fontSize: 30,
  fontWeight: "normal",
  fontStyle: "normal",
  // lineHeight: 1,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const BlueText = styled.Text({
  fontSize: 22,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.cerulean,
});
const MemberInfoContainer = styled.View({
  flexDirection: "row",
  flex: 1,
  marginTop: 48,
  marginBottom: 59,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "마이페이지",
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

export default MyPageScreen;
