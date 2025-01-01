import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './sign-in/SignIn'
import PasswordsPage from './PasswordsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/passwords" element={<PasswordsPage />} />
      </Routes>
    </Router>
  )
}

export default App
