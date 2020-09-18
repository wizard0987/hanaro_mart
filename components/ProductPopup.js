import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  Button,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { BaseImage, screenWidth, screenHeight } from "@UI/BaseUI";
import * as flyerActions from "@actions/flyer";
import {
  BaseTouchable,
  BaseSquareButtonContainer,
  ButtonText,
} from "./UI/BaseUI";
import * as Util from "@util";

const ProductPopup = (props) => {
  if (!props.item) return <></>;
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.flyer.productDetail);

  useEffect(() => {
    // props.setIsLoading(true);

    const fetchProductDetail = dispatch(
      flyerActions.fetchProductDetail({ product_cd: props.item.product_cd })
    );

    Promise.all([fetchProductDetail]).then(() => {
      // props.setIsLoading(false);
    });
  }, []);

  //   if (props.isVisible != isVisible) {
  //
  //   }

  return (
    <Modal
      isVisible={props.isVisible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      {productDetail && (
        <Container>
          <Header>
            <TouchableOpacity
              onPress={props.setIsVisible.bind(this, !props.isVisible)}
            >
              <Image source={require("@images/cross.png")} />
            </TouchableOpacity>
          </Header>
          <Body contentContainerStyle={{ alignItems: "center" }}>
            <BaseImage
              style={{
                width: screenWidth * 0.566,
                height: screenWidth * 0.566,
                aspectRatio: 1 / 1,
                marginTop: screenWidth * 0.147,
              }}
              source={props.item.title_img}
              resizeMode="cover"
            />
            <Title>{props.item.title}</Title>
            <PriceContainer style={{}}>
              <Price>상품가 : {Util.formatNumber(props.item.price)}원</Price>
              <SalePrice>
                판매가 : {Util.formatNumber(props.item.sale_price)}원
              </SalePrice>
            </PriceContainer>
            <QuantityContainer>
              <QContainer>
                <Image source={require("@images/clipboard02.png")} />
                <QuantityTitle>수량</QuantityTitle>
              </QContainer>
              <QButtonContainer>
                <TouchableOpacity>
                  <Image source={require("@images/sp107.png")} />
                </TouchableOpacity>
                <QInput value="1" keyboardType="numeric" />
                <TouchableOpacity>
                  <Image source={require("@images/sp108.png")} />
                </TouchableOpacity>
              </QButtonContainer>
            </QuantityContainer>
            <TotalContainer>
              <TotalUnit>합계 : </TotalUnit>
              <Total>{Util.formatNumber(props.item.price)}원</Total>
            </TotalContainer>
            <BtnContainer style={{}}>
              <BlueBtn>
                <Image
                  source={require("@images/baseline-shopping_cart-24px.png")}
                />
                <BtnText>장바구니</BtnText>
              </BlueBtn>
              <GreenBtn
                onPress={props.setIsVisible.bind(this, !props.isVisible)}
              >
                <Image
                  source={require("@images/baseline-backspace-24px.png")}
                />
                <BtnText>닫기</BtnText>
              </GreenBtn>
            </BtnContainer>
          </Body>
        </Container>
      )}
    </Modal>
  );
};
const BtnText = styled.Text({
  fontSize: 12,
  fontWeight: "300",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "left",
  color: colors.trueWhite,
  marginLeft: 6,
});
const BlueBtn = styled(BaseSquareButtonContainer)({
  backgroundColor: colors.cerulean,
  height: screenWidth * 0.1,
  flexDirection: "row",
  flexGrow: 0,
  width: screenWidth * 0.333,
  marginLeft: 2.5,
  marginRight: 2.5,
});
const GreenBtn = styled(BlueBtn)({
  backgroundColor: colors.appleGreen,
});
const BtnContainer = styled.View({
  marginTop: screenHeight * 0.076,
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end",
  marginBottom: 24,
});
const TotalUnit = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
});
const Total = styled.Text({
  fontSize: 22,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 32,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.cerulean,
});
const TotalContainer = styled.View({
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  marginTop: 5,
});
const QInput = styled.TextInput({
  width: 50,
  fontSize: 21,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 30,
  letterSpacing: 0,
  textAlign: "center",
  color: colors.greyishBrown,
});
const QButtonContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginTop: 7,
  marginBottom: 7,
});
const QContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  borderRightWidth: 1,
  borderColor: colors.white,
  paddingRight: 20.5,
});
const QuantityTitle = styled.Text({
  fontSize: 16,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginLeft: 11,
});
const QuantityContainer = styled.View({
  paddingLeft: 28,
  paddingRight: 28,
  alignItems: "center",
  borderRadius: 23,
  backgroundColor: colors.trueWhite,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: colors.white,

  marginLeft: 25,
  marginRight: 25,
  justifyContent: "center",
  flexDirection: "row",
  // width: () => `calc(100% -20)`,
});
const SalePrice = styled.Text({
  fontSize: 14,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginLeft: 11,
});
const Price = styled.Text({
  fontSize: 14,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishThree,
  marginRight: 11,
});
const PriceContainer = styled.View({
  flexDirection: "row",
  marginBottom: 7,
});

const Title = styled.Text({
  fontSize: 16,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: colors.greyishBrown,
  marginTop: 22,
  marginBottom: 25,
});
Title.defaultProps = {
  numberOfLines: 1,
};
const Body = styled.ScrollView({ flex: 1, width: "100%" });
const Header = styled.View({
  backgroundColor: colors.black,
  padding: 8,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
});
const Container = styled.View({
  alignItems: "center",
  backgroundColor: colors.trueWhite,
  width: "100%",
  // height: screenHeight * 0.784,
  aspectRatio: 54.86 / 100,
});
const styles = StyleSheet.create({});

export default ProductPopup;