import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  // Simple function to determine badge color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'badge-info';
      case 'in-progress':
        return 'badge-warning';
      case 'resolved':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="card-body">
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-sm text-gray-500">
            {new Date(ticket.createdAt).toLocaleString('en-US')}
          </div>
          <div className="font-bold">{ticket.title}</div>
          <div>
            <div className={`badge ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </div>
          </div>
          <div className="text-right">
            <Link
              to={`/ticket/${ticket._id}`}
              className="btn btn-sm btn-outline btn-primary"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketItem;
