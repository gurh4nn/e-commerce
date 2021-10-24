import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { givenOffers } from "redux/actions/account";
import { buyOfferedProduct } from "redux/actions/product";

function GivenOffers() {
  const dispatch = useDispatch();
  const givenOffer = useSelector(({ account }) => account.givenOffers);
  console.log(givenOffer);
  useEffect(() => {
    dispatch(givenOffers());
  }, [dispatch]);

  const buyProduct = (id) => {
    dispatch(buyOfferedProduct(id));
  };
  return (
    <>
      {givenOffer.length > 0 ? (
        <>
          {givenOffer
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div className="offers given" key={index}>
                <div className="offers__info">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="offers__info--img"
                  />
                  <div className="offers__info__content">
                    <h3 className="offers__info__content--title">
                      {item.product.title}
                    </h3>
                    <div className="offers__info--given">
                      <span>Verilen Teklif:</span> <b>{item.offeredPrice} TL</b>
                    </div>
                  </div>
                </div>
                <div className="offers__actions">
                  {item.isSold !== "sold" && item.status === "accepted" && (
                    <button
                      onClick={() => buyProduct(item.product.id)}
                      className="btn-primary"
                    >
                      Satın Al
                    </button>
                  )}

                  {item.status === "accepted" && (
                    <span className="approved">Onaylandı</span>
                  )}
                  {item.status === "rejected" && (
                    <span className="denied">Reddedildi</span>
                  )}
                  {item.isSold === "sold" && (
                    <span className="sold">Satin Alindi</span>
                  )}
                </div>
              </div>
            ))}
        </>
      ) : (
        <div className="offers received">"Data Yok..."</div>
      )}
    </>
  );
}

export default GivenOffers;
