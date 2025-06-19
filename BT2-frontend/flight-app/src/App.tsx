//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightSearch from './components/FlightSearch.tsx'
//import FlightList from './components/FlightList.tsx';
//import FlightItem from './components/FlightItem.tsx';
import './App.css'
import FlightItem from './components/FlightItem.tsx';
import DetailsPage from './components/DetailsPage.tsx';

function App() {

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearch />} /> 
        <Route path="/ListFlights" element={<FlightItem />} />         
        <Route path="/Details" element={<DetailsPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
