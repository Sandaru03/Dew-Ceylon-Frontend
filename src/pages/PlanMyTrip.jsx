import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanMyTrip = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Trip Details
    destination: '',
    startDate: '',
    endDate: '',
    flexibleDates: false,
    adults: 1,
    children: 0,
    infants: 0,
    
    // Step 2: Budget & Preferences
    budget: '',
    accommodation: '',
    travelPace: '',
    
    // Step 3: Trip Style / Interests
    interests: [],
    occasion: '',
    
    // Step 4: Special Requests
    dietary: '',
    transport: '',
    message: '',
    
    // Step 5: Contact Details
    fullName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const submitForm = (e) => {
    e.preventDefault();
    // In a real app, you would send this to the backend
    console.log('Form Submitted', formData);
    alert('Thank you! Your custom trip plan request has been submitted.');
    navigate('/');
  };

  return (
    <div className="plan-trip-container">
      <style>{`
        .plan-trip-container {
          min-height: 100vh;
          background-color: var(--bg-dark, #0F0F0F);
          color: var(--text-white, #ffffff);
          padding: 8rem 2rem 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
        }

        .form-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 3rem;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .step-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .step-indicator::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
          transform: translateY(-50%);
        }

        .step-pill {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #2a2a2a;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 0.9rem;
          z-index: 2;
          color: rgba(255,255,255,0.5);
          transition: all 0.4s ease;
          border: 2px solid #2a2a2a;
        }

        .step-pill.active {
          background: var(--primary, #b9ff00);
          color: var(--bg-dark, #0F0F0F);
          border-color: var(--primary, #b9ff00);
          box-shadow: 0 0 15px rgba(185, 255, 0, 0.4);
        }

        .step-pill.completed {
          background: rgba(185, 255, 0, 0.2);
          color: var(--primary, #b9ff00);
          border-color: var(--primary, #b9ff00);
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .form-header h1 {
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #ffffff, #a0a0a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-header p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
        }

        .form-section {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--primary, #b9ff00);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.8rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .plan-trip-container label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .plan-trip-container input[type="text"],
        .plan-trip-container input[type="email"],
        .plan-trip-container input[type="tel"],
        .plan-trip-container input[type="number"],
        .plan-trip-container input[type="date"],
        .plan-trip-container select,
        .plan-trip-container textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem;
          border-radius: 10px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          width: 100%;
        }

        .plan-trip-container input:focus, 
        .plan-trip-container select:focus, 
        .plan-trip-container textarea:focus {
          outline: none;
          border-color: var(--primary, #b9ff00);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 3px rgba(185, 255, 0, 0.1);
        }

        .plan-trip-container textarea {
          resize: vertical;
          min-height: 100px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .checkbox-group input {
          width: 18px;
          height: 18px;
          accent-color: var(--primary, #b9ff00);
        }

        .number-inputs {
          display: flex;
          gap: 1rem;
        }
        
        .number-inputs .form-group {
          flex: 1;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .option-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .option-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .option-btn.selected {
          border-color: var(--primary, #b9ff00);
          background: rgba(185, 255, 0, 0.1);
          color: var(--primary, #b9ff00);
        }

        .btn-container {
          display: flex;
          justify-content: space-between;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn {
          padding: 0.8rem 2rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-prev {
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-prev:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .btn-next {
          background: var(--primary, #b9ff00);
          color: var(--bg-dark, #0F0F0F);
        }

        .btn-next:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(185, 255, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          .form-card { padding: 2rem 1.5rem; }
          .form-grid { grid-template-columns: 1fr; }
          .form-header h1 { font-size: 2rem; }
          .number-inputs { flex-direction: column; }
        }
      `}</style>
      
      <div className="form-card">
        <div className="form-header">
          <h1>Plan Your Dream Trip</h1>
          <p>Tell us what you're looking for, and we'll craft the perfect itinerary.</p>
        </div>

        <div className="step-indicator">
          {[1, 2, 3, 4, 5].map(step => (
            <div 
              key={step} 
              className={`step-pill ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>

        <form onSubmit={submitForm}>
          {currentStep === 1 && (
            <div className="form-section">
              <h2 className="section-title">1. Basic Trip Details</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Destination (City or Country)</label>
                  <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder="Where do you want to go?" required />
                </div>
                
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
                </div>
                
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                </div>

                <div className="form-group full-width checkbox-group">
                  <input type="checkbox" id="flexibleDates" name="flexibleDates" checked={formData.flexibleDates} onChange={handleInputChange} />
                  <label htmlFor="flexibleDates">My dates are flexible</label>
                </div>

                <div className="form-group full-width number-inputs">
                  <div className="form-group">
                    <label>Adults</label>
                    <input type="number" min="1" name="adults" value={formData.adults} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Children (2-12)</label>
                    <input type="number" min="0" name="children" value={formData.children} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Infants (Under 2)</label>
                    <input type="number" min="0" name="infants" value={formData.infants} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-section">
              <h2 className="section-title">2. Budget & Preferences</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Budget Range (Per Person)</label>
                  <select name="budget" value={formData.budget} onChange={handleInputChange} required>
                    <option value="" disabled>Select a budget range</option>
                    <option value="economy">Economy (Under $1000)</option>
                    <option value="standard">Standard ($1000 - $2500)</option>
                    <option value="luxury">Luxury ($2500 - $5000)</option>
                    <option value="ultra-luxury">Ultra Luxury ($5000+)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Accommodation Preference</label>
                  <select name="accommodation" value={formData.accommodation} onChange={handleInputChange} required>
                    <option value="" disabled>Select accommodation type</option>
                    <option value="luxury-hotels">Luxury Hotels & Resorts</option>
                    <option value="boutique">Boutique Hotels</option>
                    <option value="guesthouses">Guest Houses & B&Bs</option>
                    <option value="camping">Camping & Glamping</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Travel Pace</label>
                  <select name="travelPace" value={formData.travelPace} onChange={handleInputChange}>
                    <option value="" disabled>How do you like to travel?</option>
                    <option value="relaxed">Relaxed - Take it easy, more free time</option>
                    <option value="moderate">Moderate - A good balance of activities and rest</option>
                    <option value="active">Active - Fit in as much as possible</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-section">
              <h2 className="section-title">3. Trip Style & Interests</h2>
              <div className="form-group full-width">
                <label>What are your main interests? (Select all that apply)</label>
                <div className="options-grid">
                  {['Adventure', 'Culture & History', 'Food & Culinary', 'Nature & Scenery', 'Wildlife', 'Nightlife', 'Wellness & Spa'].map(interest => (
                    <div 
                      key={interest}
                      className={`option-btn ${formData.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group full-width" style={{marginTop: '1.5rem'}}>
                <label>Special Occasion? (Optional)</label>
                <select name="occasion" value={formData.occasion} onChange={handleInputChange}>
                  <option value="">None / Regular Vacation</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="birthday">Birthday</option>
                  <option value="family-reunion">Family Reunion</option>
                  <option value="solo">Solo Adventure</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-section">
              <h2 className="section-title">4. Special Requests</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Dietary Requirements</label>
                  <input type="text" name="dietary" value={formData.dietary} onChange={handleInputChange} placeholder="e.g. Vegetarian, Halal, Vegan, No Nuts" />
                </div>

                <div className="form-group full-width">
                  <label>Transport Preferences</label>
                  <select name="transport" value={formData.transport} onChange={handleInputChange}>
                    <option value="" disabled>How would you like to get around?</option>
                    <option value="private-driver">Private Car with Driver</option>
                    <option value="public-transport">Public Transport & Trains</option>
                    <option value="rent-car">Rent a Car (Self-drive)</option>
                    <option value="domestic-flights">Including Domestic Flights</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Anything else we should know?</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us any specific places you want to visit or any special requests..."></textarea>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="form-section">
              <h2 className="section-title">5. Contact Details</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" required />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required />
                </div>
                
                <div className="form-group">
                  <label>Phone Number (with WhatsApp preferred)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 234 567 8900" required />
                </div>
              </div>
            </div>
          )}

          <div className="btn-container">
            {currentStep > 1 ? (
              <button type="button" className="btn btn-prev" onClick={prevStep}>Back</button>
            ) : (
              <div></div> // Empty div for spacing
            )}
            
            {currentStep < 5 ? (
              <button type="button" className="btn btn-next" onClick={nextStep}>Next Step</button>
            ) : (
              <button type="submit" className="btn btn-next" style={{background: '#b9ff00', color: '#000'}}>Start Planning My Adventure</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanMyTrip;
