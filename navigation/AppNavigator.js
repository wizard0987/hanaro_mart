import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { MainNavigator } from "./MainNavigator";
import JoinNavigator from "./JoinNavigator";
import { navigationRef, isReadyRef } from "./RootNavigation";
import StartupScreen from "@screens/StartupScreen";
import PopupScreen from "@screens/PopupScreen";
import Alert from "@UI/Alert";
import Loading from "@UI/Loading";
import colors from "@constants/colors";
import * as CommonActions from "@actions/common";
import * as Notifications from "expo-notifications";

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: colors.trueWhite,
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

const AppNavigator = (props) => {
  const eventEmitter = props.eventEmitter;
  const dispatch = useDispatch();
  const isPreview = useSelector((state) => state.auth.isPreview);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const isJoin = useSelector((state) => state.auth.isJoin);
  const didTryPopup = useSelector((state) => state.common.didTryPopup);

  const currentScreen = () => {
    if (!isPreview && isJoin && didTryAutoLogin && !didTryPopup)
      return <PopupScreen />;
    else if (isPreview && !isJoin && !didTryAutoLogin && !didTryPopup)
      return <StartupScreen />;
    else if (!isPreview && !isJoin && didTryAutoLogin) return <JoinNavigator />;
    else if ((isPreview || isJoin) && didTryPopup) return <MainNavigator />;
    return <MainNavigator />;
  };

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.warn(JSON.stringify(response, null, "\t"));
        // console.warn(response.notification.request.content.data);
        dispatch(CommonActions.setNotification(response.notification));
      }
    );
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.warn(JSON.stringify(notification, null, "\t"));
        //  console.warn(notification.request.content.data);
        dispatch(CommonActions.setNotification(notification));
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);
  return (
    <Fragment>
      <Loading />
      <Alert />
      <NavigationContainer
        theme={Theme}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        {currentScreen()}
      </NavigationContainer>
    </Fragment>
  );
};

export default AppNavigator;
