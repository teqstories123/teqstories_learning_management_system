import logo from './logo.svg';
import './App.css';
// import SideNavigationBar from './Shared Components/Header/Header';
import Login from './Login_Module/Common_Login/Login';
import { Switch, Route } from 'react-router-dom';
import Send_email from './Login_Module/Reset_password/Send_email/Send_email';
import Reset_password from './Login_Module/Reset_password/Reset_password/Reset_password';
import { ProtectedRoute } from './auth/ProtectedRoute';
import SideNavigationBar from './Shared_Components/Header/Header';
import Trainer from './Trainer_Module/Trainer/Trainer';
import Session from './Trainer_Module/Batch_Module/Session/Session';
import MainComponent from './Main_Module/Main_Container';
import CreateSession from './Trainer_Module/Batch_Module/Session/createSession';


function App() {
  return (
    // <SideNavigationBar />
    <>
    {/* <SideNavigationBar/> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute  path="/user/home" component={MainComponent} />
        <ProtectedRoute  path="/trainer/:email" component={Trainer} />
        
        {/* <ProtectedRoute exact path="/learner/:email" component={SideNavigationBar} /> */}
        <ProtectedRoute path="/session/:id" component={Session} />
        <ProtectedRoute path="/sessions/create-session/:id/:sessionIndex" component={CreateSession} />
        {/* <ProtectedRoute exact path="/sessions" component={SessionList} />  */}
        <Route path="/forgot-password" component={Send_email} />
        <Route path="/reset-password/:token" component={Reset_password} />
        {/* <Route path="*" component={() => "404 NOT FOUND"} /> */}
      </Switch>
    </>
  );
}

export default App;
