import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Input } from 'antd';
import { setCurrentUser } from '../store/user/user.reducer';

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.currentUser);
  // Set initial state for the input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    company: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const newUser = {
      ...formData, // Use form data to create new user
      id: new Date().getTime(), // Use a temporary ID or generate a new one
    };

    // Dispatch action to add new user to Redux
    dispatch(setCurrentUser([...userData, newUser]));  // Assuming userData contains the existing users

    // Navigate back to the main page
    navigate('/');
  };

  return (
    <>
      <h1 className="text-center mt-7">Add New User</h1>
      <div className="text-center flex justify-center flex-col items-center">
        <div className="flex flex-col w-80 m-4">
          <p>Name:</p>
          <Input
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-80 m-4">
          <p>Email:</p>
          <Input
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-80 m-4">
          <p>Address:</p>
          <Input
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-80 m-4">
          <p>Company:</p>
          <Input
            name="company"
            placeholder="Enter Company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}
