import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "../../../../navigation/RootNavigation";
import { BaseTouchable, BaseText } from "../../../../components/UI/BaseUI";
import _ from "lodash";

const LogoTitle = (props, { navigation }) => {
  const userStore = useSelector((state) => state.auth.userStore);
  return (
    <Container onPress={() => RootNavigation.navigate("Home")}>
      <Image source={require("../../../../assets/images/HANAlogo.png")} />
      {userStore && userStore.storeInfo && !_.isEmpty(userStore) && (
        <BranchName>{userStore.storeInfo.store_nm}</BranchName>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity({
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const BranchName = styled(BaseText)({
  fontSize: 15,
  fontFamily: "CustomFont-Bold",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.nastyGreen,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default LogoTitle;
