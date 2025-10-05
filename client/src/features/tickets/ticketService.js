import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/tickets/`;

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data.items;
};

// Get single ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

// Add a comment
const addComment = async (commentData, token) => {
    const { ticketId, text } = commentData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + ticketId + '/comments', { text }, config);
    return response.data;
}

// Update a ticket
const updateTicket = async (ticketData, token) => {
    const { ticketId, status } = ticketData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(API_URL + ticketId, { status }, config);
    return response.data;
}

// Delete a ticket
const deleteTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + ticketId, config);
    return response.data;
}


const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  addComment,
  updateTicket,
  deleteTicket,
};

export default ticketService;