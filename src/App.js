import React from 'react'
import StepperComp from './Components/Stepper'
import Header from './Components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
    <Header />
    <StepperComp />
<ToastContainer />

    </div>
  )
}

export default App