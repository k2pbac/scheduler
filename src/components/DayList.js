import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItems = props.days.map((day) => (
    <DayListItem
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      onClick={(event) => props.onClick(day.name)}
      key={day.id}
    />
  ));

  return <ul>{listItems}</ul>;
}
