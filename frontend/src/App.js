import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Registration from './Components/Registration';
import CompanyInfo from './Components/CompanyInfo';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Studentsdash from './Components/Studentsdash';
import About from './Components/About';
import { AuthProvider } from './Components/Auth';
import ReqAuth from './Components/ReqAuth';
import React, { lazy, Suspense } from 'react';
import Loader from './Components/Loader';
import Signup from './Components/Signup';
import Detailsform from './Components/Detailsform';
import Admin from './Components/Admin';
import Updatestudent from './Components/Updatestudent';
import Company from './Components/Company';


const LazyHome = React.lazy(() => import('./Components/Home')); // Lazy Loading
const LazyRegister =React.lazy(()=>import('./Components/Registration'))
const LazyDashboard =React.lazy(()=>import('./Components/Studentsdash'))
const LazyDetails =React.lazy(()=>import('./Components/Detailsform'))
const LazyCmpnyinfo =React.lazy(()=>import('./Components/CompanyInfo'))
const LazyAbout =React.lazy(()=>import('./Components/About'))
const LazyProfile =React.lazy(()=>import('./Components/Profile'))
const LazyLogin =React.lazy(()=>import('./Components/Login'))
const LazySignup =React.lazy(()=>import('./Components/Signup'))
const LazyAdmin=React.lazy(()=>import('./Components/Admin'))
const LazyUpdatestdnt =React.lazy(()=>import('./Components/Updatestudent'))
const LazyCompany =React.lazy(()=>import('./Components/Company'))

function App() {
  
  return (

    <AuthProvider>
            <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<React.Suspense fallback={<Loader/>}><LazyHome/></React.Suspense>}/>
        <Route path='/registration' element={<ReqAuth><React.Suspense fallback={<Loader/>}><LazyRegister/></React.Suspense></ReqAuth>}/>
        <Route path='/dashboard/' element={<ReqAuth><React.Suspense fallback={<Loader/>}><LazyDashboard/></React.Suspense></ReqAuth>}/>
        <Route path='/companyinfo' element={<ReqAuth><React.Suspense fallback={<Loader/>}><LazyCmpnyinfo/></React.Suspense></ReqAuth>}/>
        <Route path='/about' element={<ReqAuth><React.Suspense fallback={<Loader/>}><LazyAbout/></React.Suspense></ReqAuth>}/>
        <Route path='/profile' element={<ReqAuth><React.Suspense fallback={<Loader/>}><LazyProfile/></React.Suspense></ReqAuth>}/>
        <Route path='/login' element={<React.Suspense fallback={<Loader/>}><LazyLogin/></React.Suspense>}/>
        <Route path='/signup' element={<React.Suspense fallback={<Loader/>}><LazySignup/></React.Suspense>}/>
        <Route path='/details/:sid' element={<React.Suspense fallback={<Loader/>}><LazyDetails/></React.Suspense>}/>
        <Route path='/admin' element={<React.Suspense fallback={<Loader/>}><LazyAdmin/></React.Suspense>}/>
        <Route path='/updateform/:uid' element={<React.Suspense fallback={<Loader/>}><LazyUpdatestdnt/></React.Suspense>}/>
        <Route path='/admindashboard' element={<React.Suspense fallback={<Loader/>}><LazyAdmin/></React.Suspense>}/>
        <Route path='/admincompany' element={<React.Suspense fallback={<Loader/>}><LazyCompany/></React.Suspense>}/>
      </Routes>
    </div>
    </AuthProvider>

  );
}

export default App;