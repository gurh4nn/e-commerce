import { HeaderButton } from "components/Styled/Buttons";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineUser, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const mobileCheck = window.innerWidth;
  const [userLogged, setUserLogged] = useState(false)
  const loggedIn = useSelector(({auth}) => auth.token)
  return (
    <div className="header">
      <div className="container">
        <div className="nav">
          <Link to="/" className="nav__logo">
            <img src="/img/logo.svg" alt="" />
          </Link>
          <div className="nav__nav">
            {!!loggedIn ? (
              <>
                <Link to="/add-product">
                  <HeaderButton to="/test">
                    <AiOutlinePlus />
                    {mobileCheck > 768 && <span>Ürün Ekle</span>}
                  </HeaderButton>
                </Link>
                <Link to="/account">
                  {" "}
                  <HeaderButton>
                    <AiOutlineUser />
                    <span>Hesabim</span>
                  </HeaderButton>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <HeaderButton>
                  <AiOutlineUser />
                  <span>Giris Yap</span>
                </HeaderButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
