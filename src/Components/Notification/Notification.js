// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    let storedAppointmentData = null;
    if (storedDoctorData?.name) {
      storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData.name));
    }

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    } else {
      setAppointmentData(null);
      setShowNotification(false);
    }

    // Listen for localStorage changes (appointment cancellation)
    const handleStorageChange = (event) => {
      if (storedDoctorData?.name && event.key === storedDoctorData.name) {
        const updatedAppointment = JSON.parse(event.newValue);
        if (!updatedAppointment) {
          setAppointmentData(null);
          setShowNotification(false);
        } else {
          setAppointmentData(updatedAppointment);
          setShowNotification(true);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div>
      {/* Render Navbar component */}
      <Navbar></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="appointment-card">
            <button 
              className="close-notification" 
              onClick={() => setShowNotification(false)}
            >
              ×
            </button>
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Confirmed</h3>
              <p className="appointment-card__message">
                <strong>Patient:</strong> {appointmentData.name}
              </p>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name} ({doctorData?.speciality})
              </p>
              <p className="appointment-card__message">
                <strong>Date:</strong> {appointmentData.date}
              </p>
              <p className="appointment-card__message">
                <strong>Time:</strong> {appointmentData.timeSlot}
              </p>
              <p className="appointment-card__message">
                <strong>Contact:</strong> {appointmentData.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
