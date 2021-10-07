import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const { name, interviewers, value, onChange, onCancel, onSave } = props;
  const [_name, setName] = useState(name || "");
  const [interviewer, setInterviewer] = useState(value || null);
  const [error, setError] = useState("");
  const changeHandler = (event) => {
    setName(event.target.value);
  };

  const resetForm = () => {
    setName("");
    setInterviewer(null);
    onCancel();
  };

  function validate() {
    if (_name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    onSave(_name, interviewer);
  }
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={(id) => setInterviewer(id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={resetForm} danger>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
