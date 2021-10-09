import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [appointmentState, setAppointmentState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    let days = [];
    let spots = 0;
    const appointment = {
      ...appointmentState.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...appointmentState.appointments,
      [id]: appointment,
    };

    for (let d in appointmentState.days) {
      let newDay = { ...appointmentState.days[d] };
      for (let day of newDay.appointments) {
        if (appointments[day].interview === null) {
          spots++;
        }
      }
      newDay.spots = spots;
      days.push(newDay);
      spots = 0;
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setAppointmentState((prev) => {
        return { ...prev, days, appointments };
      });
    });
  }

  function cancelInterview(id) {
    let days = [];
    let spots = 0;

    const appointment = {
      ...appointmentState.appointments[id],
      interview: null,
    };
    const appointments = {
      ...appointmentState.appointments,
      [id]: appointment,
    };

    for (let d in appointmentState.days) {
      let newDay = { ...appointmentState.days[d] };
      for (let day of newDay.appointments) {
        if (appointments[day].interview === null) {
          spots++;
        }
      }
      newDay.spots = spots;
      days.push(newDay);
      spots = 0;
    }

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setAppointmentState((prev) => {
        return { ...prev, days, appointments };
      })
    );
  }

  const setDay = (day) => setAppointmentState({ ...appointmentState, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      setAppointmentState({
        ...appointmentState,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      });
    });
  }, [appointmentState]);

  return {
    appointmentState,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
