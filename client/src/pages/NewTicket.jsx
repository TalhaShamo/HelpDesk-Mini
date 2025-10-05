import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createTicket, reset } from '../features/tickets/ticketSlice';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      toast.success('New ticket created!');
      navigate('/tickets');
    }
    
    return () => {
        dispatch(reset());
    }
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ title, description, priority }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold">Create New Ticket</h1>
        <p className="text-lg text-gray-600">Please fill out the form below</p>
      </section>

      <section className="form bg-white p-8 rounded-lg shadow-md">
        <div className="form-group mb-4">
          <label className="font-semibold">Customer Name</label>
          <input type="text" className="input input-bordered w-full" value={name} disabled />
        </div>
        <div className="form-group mb-6">
          <label className="font-semibold">Customer Email</label>
          <input type="text" className="input input-bordered w-full" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="title" className="font-semibold block mb-2">
              Ticket Title
            </label>
            <input
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
              placeholder="A brief title for your issue"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="description" className="font-semibold block mb-2">
              Description of the Issue
            </label>
            <textarea
              name="description"
              id="description"
              className="textarea textarea-bordered w-full h-32"
              placeholder="Describe your issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group mb-6">
            <label htmlFor="priority" className="font-semibold block mb-2">Priority</label>
            <select
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="select select-bordered w-full"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-primary w-full">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewTicket;