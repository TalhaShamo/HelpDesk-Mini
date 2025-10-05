const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  addComment,
  deleteTicket,
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { idempotency } = require('../middleware/idempotencyMiddleware');

// --- Routes for '/' ---
router
  .route('/')
  .get(protect, getTickets)
  .post(protect, idempotency, createTicket)

// --- Route for comments ---
router.route('/:id/comments').post(protect, addComment);

// --- Combined routes for '/:id' ---
router
  .route('/:id')
  .get(protect, getTicket)
  .patch(protect, authorize('agent', 'admin'), updateTicket)
  .delete(protect, authorize('admin'), deleteTicket);

module.exports = router;