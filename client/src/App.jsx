import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import TicketPage from './pages/TicketPage';

function App() {
  return (
    <>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/new-ticket" element={<PrivateRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
             <Route path="/ticket/:ticketId" element={<TicketPage />} />
          </Route>

        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;