import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Work from './Work.jsx'
import AppointmentReminders from './pages/automations/AppointmentReminders.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<Work />} />
        <Route path="/automations/appointment-reminders" element={<AppointmentReminders />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
