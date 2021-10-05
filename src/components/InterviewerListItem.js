import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {
  const { id, name, avatar, selected, setInterviewer } = props;
  let itemClasses = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  let imageClasses = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected,
  });

  return (
    <li
      key={id}
      className={itemClasses}
      selected={selected}
      onClick={setInterviewer}
    >
      <img
        className={imageClasses}
        src={avatar}
        alt={name}
        selected={selected}
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
