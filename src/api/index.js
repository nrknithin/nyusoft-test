import { del, get, post, put } from "./NetworkUtils";
import { BASE_URL } from "./config";

// get api - use the mode to create new api functions
export const getLeadList = (offset = 0, title = "", education = "", fromDate = "", toDate = "", minRate = 0, maxRate = "") => {
  const titleUrlFragment = title === "" ? "" : `title=${title}&`;
  const educationUrlFragment = education === "" ? "" : `education=${education}&`;
  const fromDateUrlFragment = fromDate === "" ? "" : `fromDate=${fromDate}&`;
  const toDateUrlFragment = toDate === "" ? "" : `toDate=${toDate}&`;
  const minRateUrlFragment = minRate === "" ? "" : `minRate=${minRate}&`;
  const maxRateUrlFragment = maxRate === "" ? "" : `maxRate=${maxRate}&`;
  const isAuthenticated = false;
  const URL = `/leads?${titleUrlFragment}${educationUrlFragment}${fromDateUrlFragment}${toDateUrlFragment}${minRateUrlFragment}${maxRateUrlFragment}limit=5&offset=${offset}`;
  return get(BASE_URL, URL, isAuthenticated);
};

export const addNewLead = PAYLOAD => {
  const isAuthenticated = false;
  const multiPathConfig = true;
  const URL = `/leads`;
  return post(BASE_URL, URL, PAYLOAD, isAuthenticated, multiPathConfig);
};
export const getLead = id => {
  const isAuthenticated = false;
  const URL = `/leads/${id}`;
  return get(BASE_URL, URL, isAuthenticated);
};
export const updateLead = (id, PAYLOAD) => {
  const isAuthenticated = false;
  const multiPathConfig = true;
  const URL = `/leads/${id}`;
  return put(BASE_URL, URL, PAYLOAD, isAuthenticated, multiPathConfig);
};
export const deleteLead = id => {
  const isAuthenticated = false;
  const URL = `/leads/${id}`;
  return del(BASE_URL, URL, isAuthenticated);
};
