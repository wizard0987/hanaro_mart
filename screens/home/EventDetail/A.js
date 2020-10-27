import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import ApplyBox from "@components/event/ApplyBox";
const A = (props) => {
  return (
    <Container>
      <ApplyBox
        scrollRef={props.scrollRef}
        onApply={props.onApply}
        {...props}
        eventDetail={props.eventDetail}
      />
    </Container>
  );
};
const Container = styled.View({
  paddingRight: 18,
  paddingLeft: 18,
  flex: 1,
  width: "100%",
});
export default A;
