import React from "react";

import "./button.css";

const Button = (props) => {
  const { children, btnType, ...restProps } = props;

  return (
    <button className={`button ${btnType}`} {...restProps}>
      {children}
    </button>
  );
};

export default React.memo(Button);
