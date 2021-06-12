import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { setUser } from './store/reducers/authSlice';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./components/TheLayout'));

// Pages
const Login = React.lazy(() => import('./features/Auth/Login'));
const Register = React.lazy(() => import('./features/Auth/Register'));
const Page404 = React.lazy(() => import('./components/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./components/pages/page500/Page500'));

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() =>{
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch(setUser(user))
    }
  }, [auth.authen])

  return (
    <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
          </Switch>
        </React.Suspense>
    </HashRouter>
  );
}

export default App;
