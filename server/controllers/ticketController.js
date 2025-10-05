const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const Comment = require('../models/commentModel');

//-------------------- GET ALL TICKETS --------------------//
// @desc    Get tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Pagination
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  let tickets;
  // RBAC: Users can only see their own tickets. Agents/Admins can see all.
  if (req.user.role === 'user') {
    tickets = await Ticket.find({ user: req.user.id }).limit(limit).skip(offset);
  } else {
    tickets = await Ticket.find({}).limit(limit).skip(offset);
  }

  res.status(200).json({
    items: tickets,
    next_offset: offset + tickets.length,
  });
});

//-------------------- CREATE TICKET --------------------//
// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    res.status(400);
    throw new Error('Please add a title, description, and priority');
  }

  // Simplified SLA Deadline Logic
  let deadline;
  const now = new Date();
  switch (priority) {
    case 'high':
      deadline = new Date(now.setDate(now.getDate() + 1)); // 1 day
      break;
    case 'medium':
      deadline = new Date(now.setDate(now.getDate() + 3)); // 3 days
      break;
    case 'low':
    default:
      deadline = new Date(now.setDate(now.getDate() + 7)); // 7 days
      break;
  }

  const ticket = await Ticket.create({
    title,
    description,
    priority,
    deadline,
    user: req.user.id,
  });

  res.status(201).json(ticket);
});

//-------------------- GET SINGLE TICKET --------------------//
// @desc    Get a single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // RBAC: Check if the user is authorized to view this ticket
  if (
    req.user.role !== 'admin' &&
    req.user.role !== 'agent' &&
    ticket.user.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('User not authorized to view this ticket');
  }

  // Fetch comments for the ticket
  const comments = await Comment.find({ ticket: req.params.id });

  res.status(200).json({ ticket, comments });
});

//-------------------- UPDATE TICKET --------------------//
// @desc    Update a ticket
// @route   PATCH /api/tickets/:id
// @access  Private (Agents and Admins only)
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Update fields from request body (e.g., status, assignee)
  if (req.body.status) ticket.status = req.body.status;
  if (req.body.assignee) ticket.assignee = req.body.assignee;
  // Add more fields to update as needed

  try {
    const updatedTicket = await ticket.save(); // .save() triggers optimistic concurrency
    res.status(200).json(updatedTicket);
  } catch (error) {
    // This will catch the VersionError if optimistic concurrency fails
    if (error.name === 'VersionError') {
      res.status(409); // 409 Conflict
      throw new Error(
        'This ticket has been modified by someone else. Please refresh and try again.'
      );
    }
    throw error; // Rethrow other errors
  }
});

//-------------------- ADD COMMENT --------------------//
// @desc    Add a comment to a ticket
// @route   POST /api/tickets/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const ticketId = req.params.id;

  if (!text) {
    res.status(400);
    throw new Error('Please add comment text');
  }

  // First, find the ticket to make sure it exists
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Security: Ensure the commenter is the ticket owner or an agent/admin
  if (
    req.user.role !== 'admin' &&
    req.user.role !== 'agent' &&
    ticket.user.toString() !== req.user.id
  ) {
    res.status(403);
    throw new Error('User not authorized to comment on this ticket');
  }

  // Create the comment
  const comment = await Comment.create({
    ticket: ticketId,
    author: req.user.id,
    text: text,
    // The 'type' defaults to 'comment' as per our model
  });

  res.status(201).json(comment);
});

// ------------------ Delete Comment --------------- //
// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private (Admin only)
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Delete associated comments first
  await Comment.deleteMany({ ticket: req.params.id });
  
  // Now delete the ticket
  await ticket.deleteOne();

  res.status(200).json({ success: true, id: req.params.id });
});


module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  addComment,
  deleteTicket,
};