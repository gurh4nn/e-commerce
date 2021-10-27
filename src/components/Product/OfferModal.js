import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendOffer } from "redux/actions/product";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function OfferModal({ setShowOffer, setOffered, content }) {
  const offerInput = useRef(null);
  const [offer, setOffer] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const offerCheck = useSelector(({product}) => product.offered)
  const close = (e) => {
    e.target.className === "modal" && setShowOffer(false);
  };
  const customPrice = (e) => {
    setOffer(Number(e.target.value));
    const checkbox = document.querySelectorAll(".offer-item input[type=radio]");
    checkbox.forEach((item) => (item.checked ? (item.checked = false) : ""));
  };
  const checkedOffer = (e) => {
    const checkedPrice = Number(e.target.value)/100
    const contentPrice = content.price
    setOffer(contentPrice+(contentPrice*checkedPrice));
  };

  const send = async () => {
    await dispatch(sendOffer(content.id, offer));
    setOffered(offerCheck)
    offerCheck && setShowOffer(false)
  };

  const loggedIn = useSelector(({auth}) => auth.token)
  if(!loggedIn) {
    history.push('/login')
  }

  return (
    <div onClick={close} className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Satın Al</h3>
          <span onClick={() => setShowOffer(false)} className="modal-close">x</span>
        </div>
        <div className="product-info">
          <div className="info-content">
            <img src={content.imageUrl} alt="" />
            <p>
              <span>{content.title}</span>
              <span>{content.status.title}</span>
            </p>
          </div>
          <span>{content.price} TL</span>
        </div>
        <div className="offer">
          <div className="offer-item">
            <input
              type="radio"
              onClick={checkedOffer}
              name="offer"
              value="20"
              id="offer20"
            />
            <label htmlFor="offer20">%20’si Kadar Teklif Ver</label>
          </div>
          <div className="offer-item">
            <input
              type="radio"
              onClick={checkedOffer}
              name="offer"
              value="30"
              id="offer30"
            />
            <label htmlFor="offer30">%30’u Kadar Teklif Ver</label>
          </div>
          <div className="offer-item">
            <input
              type="radio"
              onClick={checkedOffer}
              name="offer"
              value="40"
              id="offer40"
            />
            <label htmlFor="offer40">%40’ı Kadar Teklif Ver</label>
          </div>
          <div className="offer-item">
            <input
              type="number"
              name=""
              min="0"
              step="any"
              className="offer-price"
              plpeholder="Teklif Belirle"
              onChange={customPrice}
              ref={offerInput}
            />
            <span>TL</span>
          </div>
          <button onClick={send} disabled={offer === 0 && 'disabled'} className="btn-primary">
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
