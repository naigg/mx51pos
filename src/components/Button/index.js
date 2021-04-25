import React from "react";

import "./button.css";

const Button = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className="button" {...restProps}>
      {children}
    </button>
  );
};

export default React.memo(Button);
