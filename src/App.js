
import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const ShowDetails = lazy(() => import('./Components/ShowDetails'))
const MovieBookingForm = lazy(() => import('./Components/MovieBookingForm'))
const ShowList = lazy(() => import('./Components/ShowList'))
import './App.css'
import Loader from "./Loader/Loader";


function App() {
  

  return (
    <Router>
      <div style={{marginTop:'20px'}}>  
        <Routes>
          <Route exact path="/" element={ <Suspense fallback={<><Loader/></>}><ShowList /></Suspense>} />
          <Route path="/show/:id" element={ <Suspense fallback={<><Loader/></>}><ShowDetails /></Suspense>} />
          <Route path="/book-ticket/:showId" element={<Suspense fallback={<><Loader/></>}><MovieBookingForm /></Suspense> } />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
