import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "antd";
import { useState, useEffect } from "react";
import { setCurrentUser } from "../store/user/user.reducer";

export default function EditUser() {
  const { userId } = useParams();
  const userData = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure userId is a number if your data uses numeric IDs
  const selectedUser = userData.find((user) => user.id === parseInt(userId));

  // Local state for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    company: ''
  });

  // Set initial form values when selectedUser is available
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        address: selectedUser.address,
        company: selectedUser.company
      });
    }
  }, [selectedUser]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Updated user data:', formData);

    // Update the user in the array
    const updatedUser = { ...selectedUser, ...formData };

    // Replace the updated user in the array of users
    const updatedUserData = userData.map((user) =>
      user.id === selectedUser.id ? updatedUser : user
    );

    // Dispatch the action to update the Redux store with the updated user array
    dispatch(setCurrentUser(updatedUserData)); 

    // Navigate back to the main page
    navigate("/"); // Navigate to the main page ("/")
  };

  return (
    <>
      <h1 className="text-center mt-7">Edit User Page</h1>

      {selectedUser ? (
        <>
          <div className="text-center flex justify-center flex-col items-center">
            <div className="flex flex-col w-80 m-4">
              <p>Name: {selectedUser.name}</p>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Change Name"
              />
            </div>
            <div className="flex flex-col w-80 m-4">
              <p>Email: {selectedUser.email}</p>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Change Email"
              />
            </div>
            <div className="flex flex-col w-80 m-4">
              <p>Address: {selectedUser.address}</p>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Change Address"
              />
            </div>
            <div className="flex flex-col w-80 m-4">
              <p>Company: {selectedUser.company}</p>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Change Company"
              />
            </div>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </>
  );
}
