import React, { useState } from 'react';
import './App.css'; // Import CSS file with styles

function App() {
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "00d13e15-1a4a-4086-910e-e8e8ea8ca07e");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setLoading(true); // Start loading

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    setLoading(false); // Stop loading

    if (res.success) {
      console.log("Success", res);
      setShowForm(false);
      setShowTryAgainButton(true); // Show "Try Again" button after successful submission
    }
  };

  const handleYesClick = () => {
    setShowLoveMessage(true);
    setShowForm(true);
  };

  const handleNoMove = (event) => {
    event.target.style.transform = `translate(${Math.random() * 200}px, ${Math.random() * 200}px)`;
  };

  const handleTryAgainClick = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <p className="question">Do you love me?</p>
      <button id="yes" onClick={handleYesClick}>Yes</button>
      <button id="no" onMouseMove={handleNoMove} onTouchMove={handleNoMove}>No</button>
      {showLoveMessage && <div id="loveMessage">I love you too!</div>}
      {showForm &&
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <input type="text" name="name" placeholder='Your name'/>
            <input type="text" name="instagram" placeholder='Your instagram' />
            <input type="text" name="whatsapp" placeholder='Your whatsapp number' />
            
            <button type="submit" style={{background:'#20B2AA', marginTop:'17px'}} disabled={loading}>{loading ? 'Wait...' : 'Submit Form'}</button>
          </form>
        </div>
      }
      {showTryAgainButton &&
        <>
          <h3>We will contact later</h3>
          <button className="try-again-btn" onClick={handleTryAgainClick}>Try Again</button>
        </>
      }
    </div>
  );
}

export default App;
