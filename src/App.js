import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [errorMessages, setErrorMessages] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e.target.className === 'modal') {
      setIsModalOpen(false);
      setErrors({});
      setErrorMessages('');
      setFormSubmitted(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
    if (formSubmitted) {
      validateField(id, value);
    }
  };

  const validateField = (id, value) => {
    let error = '';
    switch (id) {
      case 'username':
        if (!value.trim()) error = 'Username is required.';
        break;
      case 'email':
        if (!value.includes('@')) error = 'Invalid email. Please check your email address.';
        break;
      case 'dob':
        if (new Date(value) > new Date()) error = "Invalid date of birth. Date of birth cannot be in the future.";
        break;
      case 'phone':
        if (value.length !== 10) error = 'Invalid phone number. Please enter a 10-digit phone number.';
        break;
      default:
        break;
    }

    if (id === 'dob' && error) {
      alert(error); // Show alert for invalid date of birth
    } else if (id === 'phone' && error) {
      alert(error); // Show alert for invalid phone number
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([id, value]) => {
      validateField(id, value);
      if (errors[id]) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setFormData({
        username: '',
        email: '',
        dob: '',
        phone: ''
      });
      setErrors({});
      setErrorMessages('');
    }
  };
  

  return (
    <div className="App">
      <h2>User Details Modal</h2>
      <button onClick={handleOpenModal} className="open-form-button">Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Email Address:
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Date of Birth:
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <button type="submit" className="open-form-button">Submit</button>
            </form>
            {errorMessages && (
              <div className="popup">
                <p>{errorMessages}</p>
                <button onClick={() => setErrorMessages('')}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
