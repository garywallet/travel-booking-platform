'use client';

import { useState } from 'react';

export default function Home() {

  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('LHR');
  const [departureDate, setDepartureDate] = useState('');
  const [cabinClass, setCabinClass] = useState('economy');
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
            departure_date: departureDate
          }
        ],
        passengers,
        cabin_class: cabinClass
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
      setResponseJson(err.toString());
    }
  }

  return (
    <main style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial' }}>

      <h1>Duffel Flight Search</h1>

      <p>Origin Airport</p>

      <input
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />

      <p>Destination Airport</p>

      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <p>Departure Date</p>

      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
      />

      <p>Cabin Class</p>

      <select
        value={cabinClass}
        onChange={(e) => setCabinClass(e.target.value)}
      >
        <option value="economy">Economy</option>
        <option value="premium_economy">Premium Economy</option>
        <option value="business">Business</option>
        <option value="first">First</option>
      </select>

      <p>Adults</p>

      <input
        type="number"
        min="1"
        value={adults}
        onChange={(e) => setAdults(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={searchFlights}>
        Search Flights
      </button>

      <h2>Request JSON</h2>

      <pre>{requestJson}</pre>

      <h2>Response JSON</h2>

      <pre>{responseJson}</pre>

    </main>
  );
}
