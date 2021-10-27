import GivenOffers from "./GivenOffers";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import ReceivedOffers from "./ReceivedOffers";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Index() {
  const userEmail = localStorage.getItem("userMail");
  const [tabShow, setTabShow] = useState(false);
  let query = useQuery();

useEffect(() => {
  const pageQuery = query.get('teklif')
  if(pageQuery === 'aldiklarim') {
    setTabShow(false)
  } else if (pageQuery === 'verdiklerim') {
    setTabShow(true)
  }
}, [query])
  return (
    <div className="account container">
      <div className="account-info">
        <FaUserCircle />
        <span>{userEmail}</span>
      </div>
      <div className="offer-list">
          <div className="offer-tab">
            <Link to='/account?teklif=aldiklarim' className={!tabShow ? 'active' : ''} onClick={() => setTabShow(false)}>Teklif Aldıklarım</Link>
            <Link to='/account?teklif=verdiklerim' className={tabShow ? 'active' : ''} onClick={() => setTabShow(true)}>Teklif Verdiklerim</Link>
          </div>
          {!tabShow ? <ReceivedOffers />  : <GivenOffers />}
       
      </div>
    </div>
  );
}

export default Index;
