import React from "react";
import { Text } from "react-native";

const StyledText = ({ fontSize, fontWeight, color, children, ...props }) => {
  // console.log(children);
  //   console.log("styledtext calling");
  return (
    <Text
      style={{
        fontFamily: "Poppins",
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
