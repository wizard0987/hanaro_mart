import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import { screenWidth, BaseButtonContainer, BaseText } from "@UI/BaseUI";
import * as MyInfoScreen from "@screens/MyInfoScreen";
import MemberInfoB from "@components/myPage/MemberInfoB";
import { CheckBox } from "react-native-elements";
// import Barcode from "react-native-jsbarcode";
import {
  SafeAreaView,
  View,
  Text as TextView,
  StyleSheet,
  FlatList,
  BackHandler,
  Image,
  Switch,
} from "react-native";
import _ from "lodash";
import * as Util from "@util";

import BaseScreen from "@components/BaseScreen";
import { BackButton, TextTitle } from "@UI/header";
import { setAlert } from "@actions/common";
import * as authActions from "@actions/auth";

const MyADAgreementScreen = (props) => {
  const params = props.route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userStore = useSelector((state) => state.auth.userStore);
  const [barcode, setBarcode] = useState();
  const [sms, setSms] = useState(false);
  const [push, setPush] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      setSms(userInfo.sms_agree == "Y" ? true : false);
      setPush(userInfo.push_agree == "Y" ? true : false);
    }
  }, [userInfo]);
  const onPress = () => {
    const prevPush = userInfo.push_agree == "Y";
    const prevSms = userInfo.sms_agree == "Y";
    if (push == prevPush && sms == prevSms) return;
    let query = {
      user_cd: userInfo.user_cd,
      push_agree: push ? "Y" : "N",
      sms_agree: sms ? "Y" : "N",
    };
    dispatch(authActions.signup(query)).then((userInfo) => {
      dispatch(
        setAlert({
          message: "수정되었습니다.",
          onPressConfirm: () => {
            dispatch(setAlert(null));
          },
        })
      );
    });
  };
  return (
    <BaseScreen
      isPadding={false}
      style={{
        backgroundColor: colors.trueWhite,
      }}
      contentStyle={{
        backgroundColor: colors.trueWhite,
        marginBottom: 40,
      }}
    >
      <MemberInfoB />
      <MyInfoScreen.MarginContainer>
        <TextContainer>
          <Desc>
            등록하신 휴대폰번호와 APP알림 받기 설정으로 제품할인정보,이벤트,
            쿠폰소식을 받으실 수 있습니다.
          </Desc>
        </TextContainer>
        <RoundBox>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>회원번호</Text1>
            <Text2>SMS, PUSH / 광고성 정보 수신동의</Text2>
          </TextContainer>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>이용목적</Text1>
            <Text2>서비스 및 신상품이나 이벤트 정보 등의 안내</Text2>
          </TextContainer>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>보유기간</Text1>
            <Text2>별도 동의 철회시 까지, 약관철회 후 1주일까지</Text2>
          </TextContainer>
          <TextContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Text1>마케팅 동의날짜</Text1>
            <Text2>{userInfo && userInfo.marketing_date}</Text2>
          </TextContainer>
        </RoundBox>
        <SwitchContainer>
          <SwitchBox>
            <SwitchText>SMS</SwitchText>
            <CheckBox
              activeOpacity={0.8}
              onPress={() => setSms(!sms)}
              checkedIcon={<Image source={require("@images/ckon.png")} />}
              uncheckedIcon={<Image source={require("@images/ckoff.png")} />}
              checked={sms}
              containerStyle={[
                {
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  paddinRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  // paddingLeft: 0,
                },
              ]}
            />
          </SwitchBox>
          <SwitchBox>
            <SwitchText>PUSH</SwitchText>
            <CheckBox
              activeOpacity={0.8}
              onPress={() => setPush(!push)}
              checkedIcon={<Image source={require("@images/ckon.png")} />}
              uncheckedIcon={<Image source={require("@images/ckoff.png")} />}
              checked={push}
              containerStyle={[
                {
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  paddinRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  // paddingLeft: 0,
                },
              ]}
            />
          </SwitchBox>
        </SwitchContainer>
        <MyInfoScreen.Button onPress={onPress}>
          <MyInfoScreen.BtnText>확인</MyInfoScreen.BtnText>
        </MyInfoScreen.Button>
      </MyInfoScreen.MarginContainer>
    </BaseScreen>
  );
};

const SwitchText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const SwitchBox = styled.View({
  flexDirection: "row",
  flex: 0.5,
  justifyContent: "center",
});
const SwitchContainer = styled.View({
  flexDirection: "row",
  marginTop: 21,
  paddingLeft: 50,
  paddingRight: 50,
  width: "100%",
});
const Desc = styled(BaseText)({
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  flex: 1,
  marginBottom: 33,
});
const RoundBox = styled.View({
  borderRadius: 14,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,
  marginLeft: 16,
  marginRight: 16,
  paddingLeft: 15,
  paddingRight: 15,
  paddingTop: 16,
  paddingBottom: 16,
});
const BaseTextStyle = styled(BaseText)({
  fontSize: 12,
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  // alignSelf: "stretch",
});
const Text1 = styled(BaseTextStyle)({
  width: "30%",
  flexShrink: 0,
  fontFamily: "CustomFont-Bold",
});
const Text2 = styled(BaseTextStyle)({
  width: "70%",
  flexShrink: 0,
});
Text2.defaultProps = {
  // numberOfLines: 1,
};

const TextContainer = styled.View({
  flexDirection: "row",
  paddingLeft: 50,
  paddingRight: 50,
  width: "100%",
  alignSelf: "stretch",
  flexWrap: "wrap",
});
const BarcodeContainer = styled.View({
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.pinkishGrey,
  borderRadius: 7,
  margin: 34,
  paddingTop: 14,
  paddingBottom: 14,
});
const BlueButtonText = styled(BaseText)({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 9,
});
const BlueButton = styled(BaseButtonContainer)({
  marginTop: 5,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: colors.cerulean,
  paddingTop: 8,
  paddingBottom: 8,
  flex: 1,
  width: screenWidth - 18 * 2,
  alignSelf: "center",
  aspectRatio: 100 / 12.804,
});
const Warn = styled(BaseText)({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
  marginLeft: 18,
  flex: 1,
});
const WarnContainer = styled.View({
  overflow: "hidden",
  marginTop: 22,
  flexDirection: "row",
  marginLeft: 28,
  marginRight: 28,
  marginBottom: 22,
  flex: 1,
});
const Now = styled(BaseText)({
  color: colors.appleGreen,
});
const TimerText = styled(BaseText)({
  marginTop: 45,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginBottom: 5,
  flex: 1,
  width: "100%",
  marginRight: 35,
});
const TimerBar = styled.View({
  width: (props) => {
    return (props.elapsedTime * props.barContainerWidth) / 120;
  },
  flex: 1,
  backgroundColor: colors.appleGreen,
});
const TimerBarContainer = styled.View({
  overflow: "hidden",

  marginBottom: 70,
  width: screenWidth - 50,
  aspectRatio: 100 / 7.042,
  backgroundColor: colors.pinkishGrey,
  borderRadius: 20,
});
const Container = styled.View({
  alignItems: "center",
  width: "100%",
  flex: 1,
  backgroundColor: colors.trueWhite,
  marginTop: 7,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 45,
});
export const screenOptions = ({ navigation }) => {
  return {
    title: "광고성 정보 수신동의",
    cardStyle: {
      marginBottom: 0,
    },
    headerLeft: () => <BackButton />,
    headerTitle: (props) => <TextTitle {...props} />,
    headerRight: () => <></>,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyADAgreementScreen;