import React from "react";

import classNames from "classnames";
import "components/DayListItem.scss";
export default function DayListItem(props) {
  let spotsText = "";
  const formatSpots = () => {
    if (props.spots === 0) {
      spotsText = "no spots remaining";
    } else if (props.spots === 1) {
      spotsText = `${props.spots} spot remaining`;
    } else {
      spotsText = `${props.spots} spots remaining`;
    }
    return spotsText;
  };

  let listItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li
      className={listItemClass}
      onClick={props.onClick}
      spots={props.spots}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
