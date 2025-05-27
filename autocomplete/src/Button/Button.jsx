import React from "react";

function Button(props) {
  const { name, onClick, className } = props;
  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
