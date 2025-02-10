
import './App.css'
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Bookings from "./pages/Bookings";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import EventView from "./pages/EventView";
import Footer from "./components/Footer";
import { Routes,Route } from 'react-router-dom';
import AllEvents from './pages/AllEvents';
import AddEvent from './admin/AddEvent';
import BookingsList from './admin/BookingsList';
import EventsLists from './admin/EventsLists';
import Header from './components/Header';
import MyProfile from './pages/MyProfile';
import EditEvent from './admin/EditEvent';



function App() {

  return (
    <>
  <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/login' element={<Auth/>} />
  <Route path='/register' element={<Auth insideRegister={true}/>} />
  <Route path='/event-view/:id' element={<EventView/>} />
  <Route path='/services' element={<Services/>} />
  <Route path='/all-events' element={<AllEvents/>} />
  <Route path='/bookings' element={<Bookings/>} />
  <Route path='/contact-us' element={<ContactUs/>} />
  <Route path='/add-event' element={<AddEvent/>} />
  <Route path='/booking-list' element={<BookingsList/>} />
  <Route path='/events-list' element={<EventsLists/>} />
  {/* <Route path="/edit-event/:id" element={<EditEvent />} /> */}
  <Route path="/edit-event/:id" element={<EditEvent />} />

  <Route path='/my-profile' element={<MyProfile/>} />

  </Routes>
  <Footer/>
    </>
  )
}

export default App
