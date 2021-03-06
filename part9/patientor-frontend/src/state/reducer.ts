import {
  Patient,
  SET_CURRENT_PATIENT,
  SET_PATIENT_LIST,
  ADD_PATIENT,
  SET_DIAGNOSES_LIST,
  SetDiagnosesListAction,
  SetCurrentPatientAction,
  AddPatientAction,
  SetPatientListAction,
  Diagnosis,
  Entry,
  ADD_ENTRY,
  State,
  AddEntryAction,
} from "../types";

export type Action =
  | SetCurrentPatientAction
  | AddPatientAction
  | SetPatientListAction
  | SetDiagnosesListAction
  | AddEntryAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case SET_CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
      };
    case SET_DIAGNOSES_LIST:
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (acc, diagnosis) => ({
              ...acc,
              [diagnosis.code]: diagnosis,
            }),
            {}
          ),
        },
      };
    case ADD_ENTRY:
      const currentPatient = state.currentPatient;
      if (currentPatient) {
        currentPatient.entries = [...currentPatient?.entries, action.payload];
      }
      return {
        ...state,
        currentPatient,
      };
    default:
      return state;
  }
};

export const setPatientList = (
  patientList: Patient[]
): SetPatientListAction => {
  return { type: SET_PATIENT_LIST, payload: patientList };
};

export const addPatient = (newPatient: Patient): AddPatientAction => {
  return { type: ADD_PATIENT, payload: newPatient };
};

export const setCurrentPatient = (
  patient: Patient
): SetCurrentPatientAction => {
  return { type: SET_CURRENT_PATIENT, payload: patient };
};

export const setDiagnosesList = (
  diagnosisList: Diagnosis[]
): SetDiagnosesListAction => {
  return { type: SET_DIAGNOSES_LIST, payload: diagnosisList };
};

export const addEntry = (newEntry: Entry): AddEntryAction => {
  return { type: ADD_ENTRY, payload: newEntry };
};
