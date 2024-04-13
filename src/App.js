import React, { useState } from 'react';
import { client } from './client'
import './App.css'; // Import CSS file with styles

function App() {
  // State variables to manage form visibility, submission, and Try Again button visibility
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    instagram: ''
  });
  const { name, whatsapp,instagram} = formData;
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send the form data to your server or handle it as needed
    
    const contact = {
      _type: 'contact',
      name: formData.name,
      whatsapp: formData.whatsapp,
      instagram: formData.instagram,
    };

    client.create(contact)
    
  

    
    
    console.log(formData);
    setShowForm(false);
    setShowTryAgainButton(true);
    
// Show the "Try Again" button after form submission
  };

  // Function to handle 'Yes' button click
  const handleYesClick = () => {
    setShowLoveMessage(true);
    setShowForm(true);
  };

  // Function to handle 'No' button mouseover
  const handleNoMouseOver = (event) => {
    event.target.style.transform = `translate(${Math.random() * 200}px, ${Math.random() * 200}px)`;
  };

  // Function to handle "Try Again" button click
  const handleTryAgainClick = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <p className="question">Do you love me?</p>
      <button id="yes" onClick={handleYesClick}>Yes</button>
      <button id="no" onMouseOver={handleNoMouseOver}>No</button>
      {showLoveMessage && <div id="loveMessage">I love you too!</div>}
      {showForm &&
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input type="text" id="name" name="name"  value={name} placeholder="Your name" required
             onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" id="whatsapp" name="whatsapp"  value={whatsapp}  placeholder="Your WhatsApp number" required
               onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
            <input type="text" id="instagram" name="instagram" value={instagram} placeholder="Your Instagram (optional)"
               onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      }
      {showTryAgainButton &&
      <><h3>We will contact later</h3>
      <button className="try-again-btn" onClick={handleTryAgainClick}>Try Again</button>
      </>
      }
    </div>
  );
}

export default App;
