import React, { useState } from 'react';
import './styles.css';
import StarRatingInput from './compo';
import logo from './Veg n Fru Ind logo.png'; 
import logo1 from './logo.png';
export default function App() {
  const [popupMessage, setPopupMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [formType, setFormType] = useState('');
  function Submit(e) {
    e.preventDefault();
  
    setShowForm(false);
    setPopupMessage('Data saved successfully!');
    setShowButtons(true);
  
    const formEle = e.target;
    const formData = new FormData(formEle);
  
    if (formType === 'visitors') {
      const productsSeenValue = formData.get('ProductsSeen') === 'yes' ? 'Yes' : 'No';
      formData.set('ProductsSeen', productsSeenValue);
    } else if (formType === 'exhibitors') {
      const participateValue = formData.get('ParticipateSIAL2024') === 'yes' ? 'Yes' : 'No';
      formData.set('ParticipateSIAL2024', participateValue);
  
      const starRatings = {};
      const starRatingInputs = formEle.querySelectorAll('.star-rating-input');
      starRatingInputs.forEach(input => {
        starRatings[input.name] = input.value;
      });
      formData.append('StarRatings', JSON.stringify(starRatings));
    }
  
    fetch('https://script.google.com/macros/s/AKfycbzPjLwouS816hZWy3xUHvx293BD_TWLKyM9tTNrztedipOJdUuv-OgqBy_u7HLycDlu3w/exec', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       
        formEle.reset();
      })
      .catch((error) => {
        console.log(error);
        setPopupMessage('Error saving data. Please try again.');
      });
  }
  

  return (
    <div className="App">
      <div className="logo-container"> {/* Container for logo */}
        <img src={logo1} alt="Logo" className="app-logo1" /> {/* Logo image */}
        <img src={logo} alt="Logo" className="app-logo" /> {/* Logo image */}
      </div>
      {showButtons && (
        <div className="center-container">
          <div className="button-container">
            <button
              className="form-button"
              onClick={() => {
                setShowForm(true);
                setShowButtons(false);
                setFormType('visitors');
              }}
            >
              Visitors
            </button>
            <button
              className="form-button"
              onClick={() => {
                setShowForm(true);
                setShowButtons(false);
                setFormType('exhibitors');
              }}
            >
              Exhibitors
            </button>
          </div>
        </div>
      )}
      {showForm && (
        <div>
          <h1>{formType === 'visitors' ? 'Visitor' : 'Exhibitor'} Registration Form</h1>
          <form className="form" onSubmit={(e) => Submit(e)}>
          {formType === 'exhibitors' && (
  <>
    <input placeholder="Company Name" name="CompanyName" type="text" />
    <input placeholder="Contact Person's Name" name="ContactPersonName" type="text" />
    <input placeholder="Address" name="Address" type="text" />
    <input placeholder="Telephone/Mobile Number" name="PhoneNumber" type="text" />
    {/* <input placeholder="Fax Number" name="FaxNumber" type="text" /> */}
    <input placeholder="Email ID" name="Emailre" type="text" />
    <input placeholder="Website" name="Website" type="text" />
    <input placeholder="Products Displayed" name="ProductsDisplayed" type="text" />
    <input placeholder="No. of Business Enquiries" name="BusinessEnquiries" type="text" />
    <input placeholder="Actual Business Worth (Rs.)" name="BusinessWorth" type="text" />
              
    <label>
      How was the response of your products in this event? <br />
      <StarRatingInput name="ResponseRating" />
    </label>
    <label>
      How was your overall experience at SIAL 2016? <br />
      <StarRatingInput name="ExperienceRating" />
    </label>
    <label>
      How did you find the design and layout of the APEDA India Pavilion? <br />
      <StarRatingInput name="DesignRating" />
    </label>
    <label>
      How did you find the overall management of the Pavilion? <br />
      <StarRatingInput name="ManagementRating" />
    </label>

    {/* Checkbox for "Would you like to participate at SIAL 2018?" */}
    <label>
                  Would you like to participate at SIAL 2024?
                  <div>
                    <input type="radio" name="ParticipateSIAL2024" value="yes" /> Yes
                    <input type="radio" name="ParticipateSIAL2024" value="no" /> No
                  </div>
                </label>

    {/* Star ratings questions omitted for brevity */}

    {/* Comments input field */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <label style={{ marginRight: "10px" }}>Comments:</label>
      <textarea style={{ width: "100%" }} placeholder="Enter your comments..." name="Comments" />
    </div>
  </>
)}
{formType === 'visitors' && (
  <>
    <input placeholder="Your Name" name="Name" type="text" />
    <input placeholder="Your Email" name="Email" type="text" />
    <input placeholder="Company" name="Company" type="text" />
    <input placeholder="Contact Number" name="ContactNumber" type="text" />
    <input placeholder="Area of Business" name="AreaOfBusiness" type="text" />
    <label>
                  Did you see the products you were looking at?
                  <div>
                    <input type="radio" name="ProductsSeen" value="yes" /> Yes
                    <input type="radio" name="ProductsSeen" value="no" /> No
                  </div>
                </label>
  </>
)}

            <button
              className="back-button"
              onClick={() => {
                setShowForm(false);
                setShowButtons(true);
              }}
            >
              Go Back
            </button>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
     {popupMessage && (
  <div className={`popup fadeInOut`} onAnimationEnd={() => setPopupMessage('')}>
    <p>{popupMessage}</p>
    <button onClick={() => setPopupMessage('')}>Close</button>
  </div>
)}

    </div>
  );
}
