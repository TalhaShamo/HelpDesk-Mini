import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// 1. Import deleteTicket action and useNavigate hook
import { getTicket, addComment, updateTicket, deleteTicket } from '../features/tickets/ticketSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function TicketPage() {
  // Get global state from Redux
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { user } = useSelector((state) => state.auth);

  // Local state for the comment form
  const [commentText, setCommentText] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');

  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Initialize navigate
  const { ticketId } = useParams(); // Get ticketId from the URL

  // Fetch the ticket data when the component loads
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId, dispatch]);

  // Update local status state when ticket data is loaded
  useEffect(() => {
    if (ticket.ticket) {
      setTicketStatus(ticket.ticket.status);
    }
  }, [ticket.ticket]);

  // Handles new comment submission
  const onCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ ticketId, text: commentText }));
    setCommentText('');
    toast.success('Comment added!');
  };

  // Handles ticket status update by an agent/admin
  const onStatusChange = () => {
    dispatch(updateTicket({ ticketId, status: ticketStatus }));
    toast.success('Ticket status updated!');
  };

  // 3. Add handler for deleting the ticket
  const onDelete = () => {
    dispatch(deleteTicket(ticketId));
    toast.success('Ticket deleted successfully');
    navigate('/tickets'); // Redirect after deleting
  };

  // Show a loading state while fetching data
  if (isLoading || !ticket.ticket) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/tickets" className="btn btn-ghost mb-4">
        Back To Tickets
      </Link>

      {/* --- Ticket Details Header --- */}
      <header className="bg-base-200 p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Ticket ID: {ticket.ticket._id}
          <span className={`badge badge-lg ml-4 ${ticket.ticket.status === 'open' ? 'badge-info' : ticket.ticket.status === 'in-progress' ? 'badge-warning' : 'badge-success'}`}>
            {ticket.ticket.status}
          </span>
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          Date Submitted: {new Date(ticket.ticket.createdAt).toLocaleString('en-US')}
        </p>
         <p className="text-sm text-gray-500 mb-4">
          Priority: <span className="font-bold">{ticket.ticket.priority}</span>
        </p>
        <hr />
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2">Description of Issue</h3>
          <p>{ticket.ticket.description}</p>
        </div>
      </header>

      {/* --- Agent/Admin Control Panel (Conditional) --- */}
      {(user.role === 'agent' || user.role === 'admin') && (
        <div className="bg-base-200 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Manage Ticket</h3>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Update Status</span>
                </label>
                <div className="flex gap-4">
                    <select
                        className="select select-bordered flex-grow"
                        value={ticketStatus}
                        onChange={(e) => setTicketStatus(e.target.value)}
                    >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <button onClick={onStatusChange} className="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
      )}

      {/* 4. Add the conditional Admin-only delete button */}
      {user.role === 'admin' && (
          <div className="mt-6">
              <button onClick={onDelete} className="btn btn-error btn-outline w-full">
                  Delete Ticket
              </button>
          </div>
      )}

      <h2 className="text-2xl font-bold mb-4 mt-6">Comments</h2>

      {/* --- Comment Form --- */}
       <form onSubmit={onCommentSubmit}>
           <div className="form-control">
               <textarea
                   name="comment"
                   id="comment"
                   className="textarea textarea-bordered h-24"
                   placeholder="Add a comment..."
                   value={commentText}
                   onChange={(e) => setCommentText(e.target.value)}
                   required
               ></textarea>
           </div>
           <div className="form-control mt-4">
               <button type="submit" className="btn btn-primary">Add Comment</button>
           </div>
       </form>

      {/* --- Comments List --- */}
      <div className="mt-6 space-y-4">
        {ticket.comments && ticket.comments.map((comment) => (
          <div key={comment._id} className={`chat ${comment.author.toString() === user._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
              {comment.author.toString() === user._id ? 'You' : 'Support Agent'}
            </div>
            <div className="chat-bubble">
              {comment.text}
            </div>
            <div className="chat-footer opacity-50">
              {new Date(comment.createdAt).toLocaleString('en-US')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketPage;