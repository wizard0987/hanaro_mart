import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Image, View } from "react-native";
import {
  StyleConstants,
  BaseImage,
  BaseText,
  SCREEN_WIDTH,
} from "../../components/UI/BaseUI";
import colors from "../../constants/Colors";
import * as Linking from "expo-linking";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setAlert, setIsLoading } from "../../store/actions/common";
import * as Util from "../../util";
import _ from "lodash";
import { styles } from "../../screens/home/FlyerScreen";
import FlyerItemColumn2 from "../../components/FlyerItemColumn2";
import { styles as FlyerItemColumn2Styles } from "../../components/FlyerItemColumn2";
import ExtendedFlatList from "../../components/UI/ExtendedFlatList";
import * as homeActions from "../../store/actions/home";
import ProductPopup from "../../components/ProductPopup";
import * as RootNavigation from "../../navigation/RootNavigation";

const HomeProducts = ({ isFocused, userStore }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.isLoading);
  const homeProducts = useSelector((state) => state.home.homeProducts);
  const [isVisible, setIsVisible] = useState(false);
  const currentItem = useRef(null);
  const page = useRef(1);
  const clearData = () => {
    page.current = 1;
    dispatch({ type: homeActions.SET_HOME_PRODUCTS, homeProducts: null });
  };
  useEffect(() => {
    if (!isFocused || _.isEmpty(userStore)) return;
    dispatch(setIsLoading(true));
    clearData();
    let query = {
      store_cd: userStore.storeInfo.store_cd,
      page: 1,
    };
    dispatch(homeActions.fetchHomeProducts(query)).then((data) => {
      dispatch(setIsLoading(false));
    });
  }, [isFocused]);

  const loadMore = () => {
    if (
      !isLoading &&
      page.current + 1 <= homeProducts.finalPage &&
      !_.isEmpty(homeProducts) &&
      _.size(homeProducts.productList) > 0
    ) {
      dispatch(setIsLoading(true));
      page.current++;
      let query = {
        store_cd: userStore.storeInfo.store_cd,
        page: page.current,
      };
      dispatch(homeActions.fetchHomeProducts(query)).then(() => {
        dispatch(setIsLoading(false));
      });
    }
  };
  const popupHandler = (item) => {
    setIsVisible((isVisible) => !isVisible);
    currentItem.current = item;
  };

  if (!homeProducts || !homeProducts.productList) return <></>;
  // console.log("================HomeProducts rendered================");
  return (
    <>
      {_.size(homeProducts.productList) > 0 && (
        <RoundedContainer>
          <TitleContainer style={{ marginBottom: 0 }}>
            <Title>전체상품</Title>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={RootNavigation.navigate.bind(this, "Flyer")}
            >
              <MoreContainer>
                <MoreText>더보기</MoreText>
                <Image source={require("../../assets/images/path2.png")} />
              </MoreContainer>
            </TouchableOpacity>
          </TitleContainer>
        </RoundedContainer>
      )}
      {homeProducts && (
        <ExtendedFlatList
          listKey={`FlyerList-${userStore.storeInfo.store_cd}`}
          onEndReached={loadMore}
          columnWrapperStyle={styles.flyerListColumnWrapperStyle}
          numColumns={2}
          style={[styles.flyerListStyle, { marginTop: 0 }]}
          data={homeProducts.productList}
          keyExtractor={(item) =>
            `${userStore.storeInfo.store_cd}-${item.product_cd}`
          }
          renderItem={(itemData) => (
            <FlyerItemColumn2
              onPress={popupHandler.bind(this, itemData.item)}
              item={itemData.item}
            />
          )}
        />
      )}
      {currentItem.current && isVisible && (
        <ProductPopup
          item={currentItem.current}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </>
  );
};

export const MoreText = styled(BaseText)({
  fontSize: Util.normalize(9),
  color: colors.emerald,
  marginRight: 3,
});
export const MoreContainer = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 5,
  paddingBottom: 5,
});

export const Title = styled(BaseText)({
  fontSize: Util.normalize(15.5),
  fontStyle: "normal",
  lineHeight: 28,
  letterSpacing: -0.38,
  fontFamily: "Roboto-Medium",
  flex: 1,
});
export const TitleContainer = styled.View({
  marginTop: 17.5,
  marginBottom: 8.5,
  flexDirection: "row",
  alignItems: "center",
});
const RoundedContainer = styled.View({
  flex: 1,
  width: "100%",
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 10,
  overflow: "hidden",
});

export default React.memo(HomeProducts);