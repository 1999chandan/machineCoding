import React from "react";

function InputText(props) {
  const { onChange, value } = props;
  return <input onChange={onChange} value={value} type="text" />;
}

export default InputText;
