import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import TicketItem from '../components/TicketItem';
import { Link } from 'react-router-dom';

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // On component mount, dispatch the action to get tickets
    dispatch(getTickets());
    
    // Clear the tickets state when the component unmounts
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);


  if (isLoading) {
    return <h3>Loading...</h3>; // We can add a spinner here later if we want
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <Link to="/" className="btn btn-ghost">
          Back to Dashboard
        </Link>
      </div>
      
      {tickets.length > 0 ? (
        <div className="space-y-4">
          {/* Header for the ticket list */}
          <div className="grid grid-cols-4 gap-4 p-4 text-left font-semibold text-gray-500">
             <div>Date</div>
             <div>Title</div>
             <div>Status</div>
             <div></div> {/* Empty for the button column */}
          </div>
          {/* Map through tickets and display them */}
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">You have not created any tickets yet.</p>
      )}
    </div>
  );
}

export default Tickets;
