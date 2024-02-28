import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { useAuth0 } from '@auth0/auth0-react'
import { RequireLogin } from './components/RequireLogin';
import { LandingPage } from './pages/LandingPage';
import { Dashborad } from './pages/Dashborad';
import { FallingLines } from 'react-loader-spinner';


function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  return (
    <div className="App">
      {isLoading ? <div className='h-[100vh] absolute z-10 w-full bg-slate-50/80 flex items-center justify-center'><FallingLines /></div> : null}
      <h1 className='text-white m-5'>{user ? `Perfil de ${user.name}` : 'Invitado'}</h1>
      <Router>
        <NavBar />
        <Routes>
          <Route
            index
            element={
              <RequireLogin isAllowed={!isAuthenticated} redirectTo={'/dashboard'}>
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
