import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { RequireLogin } from './components/RequireLogin';
import { LandingPage } from './pages/LandingPage';
import { Dashborad } from './pages/Dashborad';
import { FallingLines, Oval } from 'react-loader-spinner';


function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  if (isLoading)
    return <div className='h-[100vh] w-full bg-slate-50/80 flex items-center justify-center'><FallingLines /></div>
  return (
    <div className="App">
      <h1 className='text-white'>{user ? `Perfil de ${user.name}` : 'Invitado'}</h1>
      <NavBar />
      <Router>
        <Routes>
          <Route index
            element={
              <RequireLogin isAllowed={!isAuthenticated} redirectTo={'dashboard'}>
                <LandingPage />
              </RequireLogin>
            }>
          </Route>
          <Route exact path='/dashboard' element={
            <RequireLogin isAllowed={isAuthenticated} redirectTo={'/'}>
              <Dashborad />
            </RequireLogin>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
