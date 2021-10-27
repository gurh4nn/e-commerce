import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function BuyModal({ setShowBuy, setBuy  }) {
  const history = useHistory();
  const close = (e) => {
    e.target.className === 'modal' && setShowBuy(false)
  };

  const loggedIn = useSelector(({auth}) => auth.token)
  if(!loggedIn) {
    history.push('/login')
  }

  return (
    <div onClick={close} className="modal">
      <div className="modal-content">
        <h3>Satın Al</h3>
        <p>Satın Almak istiyor musunuz?</p>
        <button onClick={() => setShowBuy(false)} className="btn-light">Vazgeç</button>
        <button onClick={() => setBuy(true)} className="btn-primary">Satın Al</button>
      </div>
    </div>
  );
}

export default BuyModal;
