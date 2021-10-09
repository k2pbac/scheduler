import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  const { name, interviewers, value, onCancel, onSave } = props;
  const [studentName, setStudentName] = useState(name || "");
  const [interviewer, setInterviewer] = useState(value || null);
  const [error, setError] = useState("");
  const changeHandler = (event) => {
    setStudentName(event.target.value);
  };

  const resetForm = () => {
    setStudentName("");
    setInterviewer(null);
    onCancel();
  };

  function validate() {
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Interviewer cannot be blank");
      return;
    }
    setError("");

    onSave(studentName, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={studentName}
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
