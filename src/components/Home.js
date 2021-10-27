import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoryList } from "redux/actions/detail";
import { getProductList } from "redux/actions/product";
import { useLocation } from "react-router-dom";
import Cards from "./Product/Cards";
import useDocumentTitle from "./Layout/useDocumentTitle";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const dispatch = useDispatch();
  let query = useQuery();

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getProductList());
  }, [dispatch]);

  const categoryList = useSelector(({ detail }) => detail.category);
  const productList = useSelector(({ product }) => product.products);

  const pageQuery = query.get("category");
  const filterCategory = productList?.filter(
    (item) => item.category.title === pageQuery
  );
  useDocumentTitle('Anasayfa')
  return (
    <div className='container'>
      <div className="home">
        <div className="home__banner">
          <img src="/img/banner.png" alt="" />
        </div>
        <div className="home__category">
          <Link className={pageQuery === 'all' || pageQuery === null ? 'active' : '' } to="/product?category=all">Hepsi</Link>
          {categoryList.map((item, index) => (
            <Link className={pageQuery === item.title ? 'active' : ''} to={`/product?category=${item.title}`} key={index}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="home__products">
          {!!pageQuery && pageQuery !== "all" && filterCategory.length > 0 ? (
            <Cards products={filterCategory} />
          ) : (
            <Cards products={productList} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
