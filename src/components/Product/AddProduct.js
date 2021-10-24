import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllList } from "redux/actions/detail";
import ImageUploading from "react-images-uploading";

function AddProduct() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllList());
  }, [dispatch]);

  const category = useSelector(({ detail }) => detail.category);
  const brand = useSelector(({ detail }) => detail.brand);
  const color = useSelector(({ detail }) => detail.color);
  const status = useSelector(({ detail }) => detail.status);

  const onSubmit = (data) => setFormData(data);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div className="add-product">
      <div className="add-detail">
        <h3>Ürün Detayları</h3>
        <form onChange={handleSubmit(onSubmit)}>
          <label htmlFor="productName">Ürün Adı</label>
          <input
            type="text"
            id="productName"
            placeholder="Örnek: Iphone 12 Pro Max"
            {...register("title")}
          />
          <label htmlFor="productDesc">Açıklama</label>
          <input
            type="textbox"
            id="productDesc"
            placeholder="Ürün açıklaması girin"
            {...register("description")}
          />
          <div className="selectbox-area">
            <div className="select-item">
              <label htmlFor="productCategory">Kategori</label>
              <select
                id="productCategory"
                {...register("category", {
                  onChange: (e) => console.log("cat", e),
                })}
              >
                <option value="">Kategori seç</option>
                {category?.map((item, index) => (
                  <option value={item.title} id={item.id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-item">
              <label htmlFor="productBrand">Marka</label>
              <select id="productBrand" {...register("brand")}>
                <option value="">Marka seç</option>
                {brand?.map((item, index) => (
                  <option value={item.title} id={item.id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-item">
              <label htmlFor="productColor">Renk</label>
              <select id="productColor" {...register("color")}>
                <option value="">Renk seç</option>

                {color?.map((item, index) => (
                  <option value={item.title} id={item.id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-item">
              <label htmlFor="productStatus">Kullanim Durumu</label>
              <select id="productStatus" {...register("status.title")}>
                <option value="">Kullanım durumu seç</option>
                {status?.map((item, index) => (
                  <option value={item.title} id={item.id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label htmlFor="productPrice">Kategori</label>
          <div className="price-input">
            <input
              id="productPrice"
              type="number"
              {...register("productPrice", { min: 0 })}
            />
            <span>TL</span>
          </div>
          {/* <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
          <input type="number" {...register("productPrice", { min: 0})} /> */}
          <input type="submit" />
        </form>
      </div>
      <div className="add-img">
        <ImageUploading
        //   multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}

export default AddProduct;
