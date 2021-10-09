import React from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import DayList from "./DayList";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function Application() {
  const { appointmentState, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(
    appointmentState,
    appointmentState.day
  );
  const interviewers = getInterviewersForDay(
    appointmentState,
    appointmentState.day
  );

  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(appointmentState, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  appointmentsList.push(<Appointment key="last" time="5pm" />);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={appointmentState.days}
            value={appointmentState.day}
            onClick={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentsList}</section>
    </main>
  );
}
