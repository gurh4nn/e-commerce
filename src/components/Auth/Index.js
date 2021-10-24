import Login from "./Login";
import style from "components/Auth/auth.module.scss";
import Register from "./Register";
import { useLocation} from "react-router";

function Index() {
  const location = useLocation();
  console.log(location)
  return (
    <div className={style.auth}>
      <div className={style.auth__banner}>
        <img src="/img/login.png" alt="" />
      </div>
      <div className={style.auth__form}>
        <img src="/img/logo.svg" alt="" />
        {location.pathname === "/login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Index;
