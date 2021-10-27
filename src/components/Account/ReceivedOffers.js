import useDocumentTitle from "components/Layout/useDocumentTitle";
import Loader from "components/Loader/Loader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  acceptOffer,
  receivedOffers,
  rejectOffer,
} from "redux/actions/account";

function ReceivedOffers() {
  const dispatch = useDispatch();
  const receivedOffer = useSelector(({ account }) => account.receivedOffers);
  const loading = useSelector(({ account }) => account.loading);
  useEffect(() => {
    dispatch(receivedOffers());
  }, [dispatch]);

  const accept = (id) => {
    dispatch(acceptOffer(id));
  };
  const reject = (id) => {
    dispatch(rejectOffer(id));
  };
  useDocumentTitle('Teklif Alınanlar')

  return (
    <>
    {!loading ? (
      <>
      {receivedOffer.length > 0 ? (
        <>
          {receivedOffer
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div className="offers received">
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
                      <span>Alınan Teklif:</span> <b>{item.offeredPrice} TL</b>
                    </div>
                  </div>
                </div>
                <div className="offers__actions">
                  {item.status === "offered" && (
                    <>
                      {" "}
                      <button
                        onClick={() => accept(item.id)}
                        className="btn-primary"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => reject(item.id)}
                        className="btn-warn"
                      >
                        Reddet
                      </button>
                    </>
                  )}
                  {item.status === "rejected" && (
                    <span className="denied">Reddedildi</span>
                  )}
                  {item.status === "accepted" && (
                    <span className="approved">Onaylandı</span>
                  )}
                </div>
              </div>
            ))}
        </>
      ) : (
        <div className="offers received">"Data Yok..."</div>
      )}
      </>
    ) : <Loader />}
    </>
  );
}

export default ReceivedOffers;
