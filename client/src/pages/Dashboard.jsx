import { Link } from 'react-router-dom';
import { PencilSquareIcon, TicketIcon } from '@heroicons/react/24/outline'; // Import icons

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center p-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        What do you need help with?
      </h1>
      <p className="text-2xl text-gray-600 mb-10">
        Please choose an option below
      </p>

      <div className="space-y-6 w-full max-w-md">
        <Link to="/new-ticket" className="btn btn-outline btn-lg w-full normal-case text-lg">
          <PencilSquareIcon className="h-6 w-6 mr-2" /> Create new ticket
        </Link>
        <Link to="/tickets" className="btn btn-primary btn-lg w-full normal-case text-lg">
          <TicketIcon className="h-6 w-6 mr-2" /> View my tickets
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;