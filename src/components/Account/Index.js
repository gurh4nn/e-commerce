import GivenOffers from "./GivenOffers";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import ReceivedOffers from "./ReceivedOffers";
import { useEffect } from "react";

function Index() {
  const userEmail = localStorage.getItem("userMail");
  const [tabShow, setTabShow] = useState(false);
//   const loggedIn = localStorage.getItem("accessToken");


//   useEffect(() => {
//   }, [loggedIn])
  return (
    <div className="account container">
      <div className="account-info">
        <FaUserCircle />
        <span>{userEmail}</span>
      </div>
      <div className="offer-list">
          <div className="offer-tab">
            <span className={!tabShow ? 'active' : ''} onClick={() => setTabShow(false)}>Teklif Aldıklarım</span>
            <span className={tabShow ? 'active' : ''} onClick={() => setTabShow(true)}>Teklif Verdiklerim</span>
          </div>
          {!tabShow ? <ReceivedOffers />  : <GivenOffers />}
       
      </div>
    </div>
  );
}

export default Index;
