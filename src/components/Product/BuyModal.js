function BuyModal({ setShowBuy, setBuy  }) {
  const close = (e) => {
    e.target.className === 'modal' && setShowBuy(false)
  };
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
