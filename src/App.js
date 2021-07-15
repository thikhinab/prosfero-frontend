import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMemo, useState } from "react";

<<<<<<< HEAD
import Profile from './pages/Profile'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { UserContext } from './utils/UserContext'
import Welcome from './pages/Welcome';
import WelcomeRouter from './utils/WelcomeRouter';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import YourRequests from './pages/YourRequests'
=======
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { UserContext } from "./utils/UserContext";
import Welcome from "./pages/Welcome";
import WelcomeRouter from "./utils/WelcomeRouter";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
>>>>>>> chat

function App() {
  // Is this fecthing the token in each render??
  const [user, setUser] = useState({
    token: localStorage.getItem("prosfero-token"),
    id: localStorage.getItem("prosfero-id"),
  });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Switch>
<<<<<<< HEAD
          <Route path='/login' exact component={Login} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/registration' exact component={Registration} />
          <Route path='/welcome' exact component={Welcome} />
          <Route path='/createpost'exact component={CreatePost} />
          <Route path='/home' exact component={Home} />
          <Route path= '/post/:postId'exact component={Post} />
          <Route path='/editpost/:postId' exact component={EditPost} />
          <Route path='/requests' exact component={YourRequests} />
          <Route path='/' component={WelcomeRouter} />
=======
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/home" exact component={Home} />
          <Route path="/post/:postId" exact component={Post} />
          <Route path="/editpost/:postId" exact component={EditPost} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/search" component={Search} />
          <Route path="/" component={WelcomeRouter} />
>>>>>>> chat
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
