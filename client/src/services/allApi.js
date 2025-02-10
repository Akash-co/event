import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";
import axios from "axios";
 

// registerAPI
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}


// loginAPI
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}
// addEventApi
export const addEventAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-event`,reqBody,reqHeader)
}


// home Event api
export const homeEventAPI = async()=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/home-events`,{})
}
// All Events API
// export const allEventAPI = async()=>{
//   return await commonAPI("GET",`${SERVER_BASE_URL}/all-events`,{})
// }

export const allEventAPI = async (eventId = null) => {
  // If eventId is provided, fetch a single event
  if (eventId) {
    return await commonAPI("GET", `${SERVER_BASE_URL}/events/${eventId}`, {});
  } 
  // If no eventId is provided, fetch all events
  else {
    return await commonAPI("GET", `${SERVER_BASE_URL}/all-events`, {});
  }
}





// Event view API
export const  getEventByIdAPI = async(id)=>{
  return await commonAPI("GET",`${SERVER_BASE_URL}/event-view/${id}`,{})
}


// Example of booking API function using commonAPI
export const createBookingAPI = async (bookingDetails) => {
  return await commonAPI('POST', `${SERVER_BASE_URL}/add-booking`, bookingDetails);
};

// services/allApi.js
export const getBookingsAPI = async (userId) => {
  return await commonAPI('GET', `${SERVER_BASE_URL}/bookings/${userId}`);
};


// Delete booking API
export const deleteBookingAPI = async (bookingId) => {
  return await commonAPI('DELETE', `${SERVER_BASE_URL}/${bookingId}`);
};

// post adminBookingListAPI
export const sendBookingDetailsAPI = async (reqBody) => {
  return await commonAPI('POST', `${SERVER_BASE_URL}/booking-list`, reqBody);
};

// get adminBookingListAPI
export const getAdminBookingListAPI = async () => {
  return await commonAPI('GET', `${SERVER_BASE_URL}/booking-list`, {});
}
// Delete Event API 
export const deleteEventAPI = async (eventId) => {
   return await axios.delete(`${SERVER_BASE_URL}/events-list/${eventId}`)};

//update eventAPI
// export const editEventAPI = async (eventId, reqBody, reqHeader) => {
//   return await commonAPI("PUT", `${SERVER_BASE_URL}/edit-event/${eventId}`, reqBody, reqHeader);
// };

// export const updateEventAPI = async (eventId, eventData) => {
//   return await commonAPI("PUT", `${SERVER_BASE_URL}/update-event/${eventId}`, eventData);
// };

export const updateEventAPI = async (eventId, eventData, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_BASE_URL}/update-event/${eventId}`, eventData, reqHeader);
};


// update userAPI
export const updateUserAPI = async (userId, userData, token) => {
  return await commonAPI("PUT", `${SERVER_BASE_URL}/user/${userId}`, userData, {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
  });
};
