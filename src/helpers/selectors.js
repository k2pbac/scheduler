export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointments = { ...state };
  let results = [];
  for (let el in appointments.days) {
    if (appointments.days[el].name === day) {
      for (let num of appointments.days[el].appointments) {
        results.push(appointments.appointments[num]);
      }
    }
  }

  return results || [];
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const interviewers = { ...state };
  let results = [];
  for (let el in interviewers.days) {
    if (interviewers.days[el].name === day) {
      for (let num of interviewers.days[el].interviewers) {
        results.push(interviewers.interviewers[num]);
      }
    }
  }

  return results || [];
}

export function getInterview(state, interview) {
  return interview
    ? {
        student: interview.student,
        interviewer: { ...state.interviewers[interview.interviewer] },
      }
    : null;
}
