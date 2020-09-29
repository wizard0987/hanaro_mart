import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BaseTouchable,
  screenWidth,
  BaseButtonContainer,
  screenHeight,
} from "@UI/BaseUI";
import { setPreview } from "@actions/auth";

const LoginButtons = (props) => {
  const dispatch = useDispatch();
  const isJoin = useSelector((state) => state.auth.isJoin);
  const onPressJoin = () => {
    props.navigation.closeDrawer();
    dispatch(setPreview(false));
  };
  return (
    <BottomContainer>
      <ButtonContainer>
        {/* <GreenButton>
          <ButtonText>로그인</ButtonText>
        </GreenButton> */}
        {!isJoin && (
          <BlueButton onPress={() => onPressJoin()}>
            <ButtonText>회원가입</ButtonText>
          </BlueButton>
        )}
      </ButtonContainer>

      <GrayContainer>
        <Text1>사업자명 : 하나로마트 양재점</Text1>
        <Text2>
          {`대표이사 : 김병수 / 사업자 등록 번호 104-86-00934 서울특별시 마포구 신촌로 66, 8층 고객만족센타 : 1588-0028 / 개인정보관리책임자 : 김승철`}
        </Text2>
        <TextArea>
          <TouchableOpacity onPress={() => props.navigation.navigate("Terms")}>
            <Text3>이용약관</Text3>
          </TouchableOpacity>
          <Text3> / </Text3>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Privacy")}
          >
            <Text3>개인정보처리방침</Text3>
          </TouchableOpacity>
        </TextArea>
      </GrayContainer>
      <BlackContainer>
        <Info>{`하나로마트앱은 하나로마트에서 독립적으로 운영하는 서비스로서 이용자와 하나로마트간의 양자간 거래이며, 모바일앱을 공급 관리하는 농협하나로유통과는 거래당사자가 아니며 보증책임도 지지않음을 양지하여 주시기 바랍니다.`}</Info>
      </BlackContainer>
    </BottomContainer>
  );
};
const Info = styled.Text({
  margin: 9,
  fontSize: 10,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 12,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.pinkishGrey,
});
const TextArea = styled.View({
  flexDirection: "row",
});
const Text3 = styled.Text({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const Text2 = styled.Text({
  marginTop: 2,
  marginBottom: 4,
  fontSize: 10,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 12,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishBrown,
});
const Text1 = styled.Text({
  fontSize: 14,
  fontWeight: "500",
  fontStyle: "normal",

  letterSpacing: 0,
  textAlign: "left",
  color: colors.black,
});
const GrayContainer = styled.View({
  backgroundColor: colors.white,
  paddingLeft: 21,
  paddingRight: 21,
  paddingTop: 10,
  paddingBottom: 10,
});
const BaseButton = styled(BaseButtonContainer)({
  width: screenWidth * 0.333,
  maxWidth: 120,
  marginLeft: 3,
  marginRight: 3,
});
const GreenButton = styled(BaseButton)({
  backgroundColor: colors.pine,
});

const BlueButton = styled(BaseButtonContainer)({
  width: null,
  maxWidth: null,
  flex: 1,
  marginLeft: 16,
  marginRight: 16,
  backgroundColor: colors.cerulean,
});
const ButtonText = styled.Text({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
});

const BottomContainer = styled.View({
  width: "100%",
  height: "auto",
  alignItems: "flex-end",
  justifyContent: "flex-end",
});
const BlackText = styled.Text({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.greyishThree,
});
const BlackBar = styled(BlackText)({});
const BlackButton = styled(BaseTouchable)({});
const BlackContainer = styled.View({
  backgroundColor: colors.black,
  flexDirection: "row",
  paddingRight: 16,
  justifyContent: "flex-end",

  alignSelf: "stretch",

  // position: "absolute",
  // bottom: 0,
  // left: 0,
  // right: 0,
  // height: 40,
});
const ButtonContainer = styled.View({
  flexDirection: "row",
  paddingTop: 25,
  justifyContent: "center",
  paddingBottom: 20,
  backgroundColor: colors.trueWhite,
});
export default LoginButtons;
