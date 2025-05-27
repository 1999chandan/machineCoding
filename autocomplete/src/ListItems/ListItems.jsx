import React from "react";
import Button from "../Button";
import "./style.css";


function ListItems(props) {
  const { value, onSelect } = props;
  const handleSelect = ()=>{
    onSelect(value);
  }
  return <Button onClick={handleSelect} className={"listItem"} name={value} />;
}

export default ListItems;
