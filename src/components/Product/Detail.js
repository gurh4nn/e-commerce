import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailItem, buyProduct } from "redux/actions/product";
import BuyModal from "./BuyModal";
import OfferModal from "./OfferModal";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [showOffer, setShowOffer] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [buy, setBuy] = useState(false);
  const [offered, setOffered] = useState(false);

  useEffect(() => {
    const initFunction = async () => {
      const data = await dispatch(getDetailItem(id));
      setContent(data);
    };
    initFunction();
  }, [dispatch]);
  useEffect(() => {
    if (buy) {
      const buy = dispatch(buyProduct(id));
      setShowBuy(false);
      console.log(buy);
    }
  }, [buy]);

  // useEffect(() => {
  //   if (offered) {
  //     const buy = dispatch(buyProduct(id));
  //     setShowBuy(false);
  //     console.log(buy);
  //   }
  // }, [offered]);
  useEffect(() => {
    console.log(content?.title);
  }, [content]);
  return (
    <>
      {content && (
        <div className="product-detail">
          <div className="detail__img">
            <img src={content.imageUrl} alt={content.title} />
          </div>
          <div className="detail__content">
            <h1 className="content--title">{content.title}</h1>
            <div className="content__info">
              <table>
                <tr>
                  <td>Marka:</td>
                  <td>{content.brand.title}</td>
                </tr>
                <tr>
                  <td>Renk:</td>
                  <td>{content.color.title}</td>
                </tr>
                <tr>
                  <td>Kullanım Durumu:</td>
                  <td>{content.status.title}</td>
                </tr>
              </table>
            </div>
            <div className="content__pricing">
              <p>{content.price} TL</p>
              {offered && (
                <div className="offered">
                  <span>Verilen Teklif: </span>
                  <b>119,90 TL</b>
                </div>
              )}
            </div>
            <div className="content__actions">
              {!buy && !content.isSold ? (
                <>
                  <button
                    onClick={() => setShowBuy((show) => !show)}
                    className="btn-primary"
                  >
                    Satin Al
                  </button>
                  {offered || content.isOfferable && (
                    <button onClick={() => setShowOffer((show) => !show)} className="btn-light">Teklif Ver</button>
                  )}
                </>
              ) : (
                <button className="btn-orange">Bu Ürün Satışta Değil</button>
              )}
            </div>
            <div className="content__description">
              <h4>Açıklama</h4>
              <p>{content.description}</p>
            </div>
          </div>
          {showBuy && <BuyModal setShowBuy={setShowBuy} setBuy={setBuy} />}
          {showOffer && (
            <OfferModal
              content={content}
              setShowOffer={setShowOffer}
              setOffered={setOffered}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Detail;
