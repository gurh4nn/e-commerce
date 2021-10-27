import Header from "components/Layout/Header";
import AddProduct from "components/Product/AddProduct";
import Detail from "components/Product/Detail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "style/main.scss";
import Account from "components/Account/Index";
import Home from "components/Home";
import Auth from "components/Auth/Index";
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth())
  }, [])
  const loggedIn = useSelector(({auth}) => auth.token)
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product" component={Home} />
          <Route exact path="/product/:id" component={Detail} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/login">
            {!!loggedIn ? <Redirect to="/account" /> : <Auth />}
          </Route>
          <Route exact path="/register">
            {!!loggedIn ? <Redirect to="/account" /> : <Auth />}
          </Route>
          <Route exact path="/account">
            {!!loggedIn ? <Account /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
      <ToastContainer />

    </div>
  );
}

export default App;
