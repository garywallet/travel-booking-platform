'use client';

import { useState } from 'react';

export default function Home() {
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('LHR');
  const [departure, setDeparture] = useState('');
  const [cabin, setCabin] = useState('economy');
  const [adults, setAdults] = useState(1);

  const [requestJson, setRequestJson] = useState('');
  const [responseJson, setResponseJson] = useState('');

  async function searchFlights() {
    const passengers = [];

    for (let i = 0; i < adults; i++) {
      passengers.push({
        type: 'adult'
      });
    }

    const requestData = {
      data: {
        slices: [
          {
            origin: origin.toUpperCase(),
            destination: destination.toUpperCase(),
            departure_date: departure
          }
        ],
        passengers,
        cabin_class: cabin
      }
    };

    setRequestJson(JSON.stringify(requestData, null, 4));

    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      setResponseJson(JSON.stringify(result, null, 4));
    } catch (err) {
      setResponseJson(String(err));
    }
  }

  return (
    <main
      style={{
        fontFamily: 'Arial',
        margin: '40px',
        background: '#f5f5f5',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: 'auto',
          background: 'white',
          padding: '25px',
          borderRadius: '8px'
        }}
      >
        <h2>Duffel Flight Search</h2>

        <label>Origin Airport (IATA)</label>
        <input
          style={inputStyle}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <label>Destination Airport (IATA)</label>
        <input
          style={inputStyle}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <label>Departure Date</label>
        <input
          style={inputStyle}
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />

        <label>Cabin Class</label>

        <select
          style={inputStyle}
          value={cabin}
          onChange={(e) => setCabin(e.target.value)}
        >
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>

        <label>Adults</label>

        <input
          style={inputStyle}
          type="number"
          min={1}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />

        <button
          style={{
            marginTop: '20px',
            padding: '12px 30px',
            fontSize: '16px'
          }}
          onClick={searchFlights}
        >
          Search Flights
        </button>

        <h3>Request JSON</h3>

        <pre
          style={{
            background: '#efefef',
            padding: '15px',
            overflow: 'auto'
          }}
        >
          {requestJson}
        </pre>

        <h3>API Response</h3>

        <pre
          style={{
            background: '#efefef',
            padding: '15px',
            overflow: 'auto'
          }}
        >
          {responseJson}
        </pre>
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginTop: '5px',
  marginBottom: '15px',
  boxSizing: 'border-box' as const
};
