import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    let newDay;
    let days = [];

    for (let d in state.days) {
      if (state.days[d].name === state.day) {
        newDay = { ...state.days[d] };
        newDay.spots--;
        days.push(newDay);
      } else {
        days.push(state.days[d]);
      }
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      setState((prev) => {
        return { ...prev, days, appointments };
      })
    );
  }

  function cancelInterview(id) {
    let newDay;
    let days = [];

    for (let d in state.days) {
      if (state.days[d].name === state.day) {
        newDay = { ...state.days[d] };
        newDay.spots++;
        days.push(newDay);
      } else {
        days.push(state.days[d]);
      }
    }
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState((prev) => {
        return { ...prev, days, appointments };
      })
    );
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      setState({
        ...state,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
