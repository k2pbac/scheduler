import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const { name, interviewers, value, onChange, onCancel, onSave } = props;
  const [_name, setName] = useState(name || "");
  const [interviewer, setInterviewer] = useState(value || null);

  const changeHandler = (event) => {
    setName(event.target.value);
  };

  const resetForm = () => {
    setName("");
    setInterviewer(null);
    onCancel();
  };

  const changeInterviewHandler = (id) => {
    setInterviewer(id);
  };

  const saveInterviewHandler = () => {
    onSave(_name, interviewer);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={_name}
            placeholder="Enter Student Name"
            onChange={changeHandler}
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={changeInterviewHandler}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={resetForm} danger>
            Cancel
          </Button>
          <Button onClick={saveInterviewHandler} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
