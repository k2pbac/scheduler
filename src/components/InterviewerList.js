import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
const InterviewerList = (props) => {
  const { interviewers, value, onChange } = props;

  let interviewItems = interviewers.map((_interviewer) => {
    return (
      <InterviewerListItem
        // id={_interviewer.id}
        key={_interviewer.id}
        name={_interviewer.name}
        avatar={_interviewer.avatar}
        selected={_interviewer.id === value}
        setInterviewer={() => onChange(_interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewItems}</ul>
    </section>
  );
};

export default InterviewerList;
