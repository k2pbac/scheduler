import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const Appointment = (props) => {
  const { interview, time, id, bookInterview, interviewers, cancelInterview } =
    props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(CONFIRM);
  }

  function confirmDelete() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {(mode === SHOW && (
        <Show
          key={interview.interviewer.id}
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={deleteInterview}
          onEdit={() => transition(EDIT)}
        />
      )) ||
        (mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />) ||
        (mode === CREATE && (
          <Form interviewers={interviewers} onSave={save} onCancel={back} />
        )) ||
        (mode === EDIT && (
          <Form
            name={interview.student}
            value={interview.interviewer.id}
            interviewers={interviewers}
            onCancel={back}
            onSave={save}
          />
        )) ||
        (mode === SAVING && <Status message="Saving" />) ||
        (mode === DELETING && <Status message="Deleting" />) ||
        (mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onConfirm={confirmDelete}
            onCancel={back}
          />
        )) ||
        (mode === ERROR_SAVE && (
          <Error message="Could not create an interview" onClose={back} />
        )) ||
        (mode === ERROR_DELETE && (
          <Error message="Could not delete an interview" onClose={back} />
        ))}
    </article>
  );
};

export default Appointment;
