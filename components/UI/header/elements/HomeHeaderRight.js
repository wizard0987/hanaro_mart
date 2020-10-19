import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "@navigation/RootNavigation";
import { BaseTouchable, BaseText } from "@UI/BaseUI";
import _ from "lodash";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeHeaderRight = (props) => {
  const userStore = useSelector((state) => state.auth.userStore);
  if (_.isEmpty(userStore)) return <></>;
  return (
    <BtnContainer>
      <Btn onPress={() => RootNavigation.navigate("SearchProduct")}>
        <MaterialIcons name="search" size={24} color={colors.pine} />
      </Btn>
      <Btn onPress={() => RootNavigation.navigate("Notification")}>
        <MaterialIcons
          name="notifications-none"
          size={24}
          color={colors.pine}
        />
      </Btn>
      <Btn
        onPress={() => RootNavigation.navigate("Cart")}
        style={{ paddingRight: 10 }}
      >
        <MaterialCommunityIcons
          name="cart-outline"
          size={24}
          color={colors.pine}
        />
      </Btn>
    </BtnContainer>
  );
};
const Btn = styled.TouchableOpacity({
  padding: 6,
});
const BtnContainer = styled.View({
  flexDirection: "row",
});
const Container = styled.View({
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
});
const BranchName = styled(BaseText)({
  fontSize: 15,
  fontWeight: "bold",
  lineHeight: 22,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.appleGreen,
});
BranchName.defaultProps = {
  numberOfLines: 1,
};
export default HomeHeaderRight;