import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AllSafes from './Components/Safes/AllSafes/AllSafes'
import VaultAppRoles from './Components/VaultAppRoles/VaultAppRoles';
import ServiceAccounts from './Components/ServiceAccounts/ServiceAccounts';
import IAMServiceAccounts from './Components/IAMServiceAccounts/IAMServiceAccounts';
import AzureActiveDirectory from './Components/AzureActiveDirectory/AzureActiveDirectory';
import logo from './assets/logo.svg'

function App() {
  return (
    <Router>
      <div className='wrapper'>
          <nav className="navbar">
          <img src={logo} className='logo' alt='logo'/>
            <ul className="navbar-nav">
              <NavLink end className={({ isActive }) =>"nav-link " + (isActive ? "selected" : "")} to={'/'}>Safes</NavLink>
              <NavLink className={({ isActive }) =>"nav-link " + (isActive ? "selected" : "")} to={'/VaultAppRoles'} >VaultAppRoles</NavLink>
              <NavLink className={({ isActive }) =>"nav-link " + (isActive ? "selected" : "")} to={'/ServiceAccounts'} >ServiceAccounts</NavLink>
              <NavLink className={({ isActive }) =>"nav-link " + (isActive ? "selected" : "")} to={'/IAMServiceAccounts'} >IAMServiceAccounts</NavLink>
              <NavLink className={({ isActive }) =>"nav-link " + (isActive ? "selected" : "")} to={'/AzureActiveDirectory'} >AzureActiveDirectory</NavLink>
            </ul>
          </nav>
        <div className='container'>
          <Routes>
              <Route path='/' element={<AllSafes/>}/>
              <Route path='/VaultAppRoles' element={<VaultAppRoles/>} />
              <Route path='/ServiceAccounts' element={<ServiceAccounts/>} />
              <Route path='/IAMServiceAccounts' element={<IAMServiceAccounts/>}/>
              <Route path='/AzureActiveDirectory' element={<AzureActiveDirectory/>}/>
          </Routes>
        </div>
        </div>
      </Router>
  );
}

export default App;
