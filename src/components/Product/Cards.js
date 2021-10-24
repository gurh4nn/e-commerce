import { Link } from "react-router-dom";

function Cards({ products }) {
  return (
    <div className="cards">
      {products.map((item, index) => (
        <Link to={'/product/'+item.id} className="cards__item" key={index}>
          <div className="cards__item--img">
          <img src={item.imageUrl} alt="" />
          </div>
          <div className="cards__item__content">
            <div className="cards__item__content__info">
              <span className="cards__item__content__info--brand">{item.brand.title}</span>
              <span className="cards__item__content__info--color">
                <b>Renk:</b> {item.color.title}
              </span>
            </div>
            <span className="cards__item__content--price">
              {item.price} TL
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
