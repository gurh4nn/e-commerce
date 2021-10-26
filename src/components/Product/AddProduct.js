import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllList } from "redux/actions/detail";
import ImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";
import { addProduct } from "redux/actions/product";
import { useHistory } from "react-router";

function AddProduct() {
  const [formData, setFormData] = useState({
    price: 0,
    imageUrl: "",
    title: "",
    status: {
      title: "",
      id: "",
    },
    color: {
      title: "",
      id: "",
    },
    brand: {
      title: "",
      id: "",
    },
    category: {
      title: "",
      id: "",
    },
    description: "",
    isOfferable: false,
  });
  const [images, setImages] = useState(null);
  const [imageSize, setImageSize] = useState(false);
  const [uploadCheck, setUploadCheck] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const category = useSelector(({ detail }) => detail.category);
  const brand = useSelector(({ detail }) => detail.brand);
  const color = useSelector(({ detail }) => detail.color);
  const status = useSelector(({ detail }) => detail.status);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    if (imageList[0].file.size < 400000) {
      setImages(imageList[0].data_url);
      // setFormData((state) => ({ ...state, imageUrl: imageList[0].data_url }));
      setFormData((state) => ({
        ...state,
        imageUrl:
          "https://storage.googleapis.com/frontend-bootcamp-e9376.appspot.com/products/images/test.png?GoogleAccessId=firebase-adminsdk-dli7s%40frontend-bootcamp-e9376.iam.gserviceaccount.com&Expires=16731014400&Signature=sE5hROYC%2FpKE25NqU4oZnkXi%2Fh%2BG1siPXOGrwSXtDqpcte3%2FrayXQacldbRkCPfk%2FJlxZf9mqp%2BXiDOKxpKyEU0ZEor7FIl3hqKFA0vmxFVNUcLTtI4w%2FOydtE0w5P6Wl62SBz6mLlDdyNDcXOfM%2FlM7gBX%2FLAndhpq6pJAOxy1JzBxns%2BFtEEBDv4p9sofzG1ULYlvv1cWBZlLRLMpteWBL9FYQHv1ewQVLd4uBKniJdYizm9jxCNTP%2BPNQHYBWIFeQSuDVs8LEJ3pNuWSec4EHLXw12L7A2YwIkVAIY1S309DZIuQxR8wFsjoFhIUuHzclf%2BOAIxQsJezE0CNkpQ%3D%3D",
      }));
      setImageSize(false);
      setUploadCheck(false);
    } else {
      setImageSize(true);
    }
  };

  const changeInput = (e) => {
    const selectName = e.target.name;
    const data = {};
    if (selectName === "price") {
      data[selectName] = Number(e.target.value);
    } else {
      data[selectName] = e.target.value;
    }
    setFormData((state) => ({ ...state, ...data }));
  };
  const onSubmit = async () => {
    !images && setUploadCheck(true);
    if (!!images) {
      const product = await dispatch(addProduct(formData));
      if (product) {
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    }
  };
  const changeSelectBox = (e) => {
    const selected = e.target.selectedOptions[0];
    const selectName = e.target.name;
    const obj = {};
    obj[selectName] = { id: selected.id, title: selected.value };
    setFormData((state) => ({ ...state, ...obj }));
  };

  return (
    <div className="container">
      <div className="add-product">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add-detail">
            <h3>Ürün Detayları</h3>
            <label htmlFor="productName">Ürün Adı</label>
            <input
              type="text"
              id="productName"
              placeholder="Örnek: Iphone 12 Pro Max"
              {...register("title", { required: true, maxLength: 100 })}
              onChange={changeInput}
              className={errors.title?.type ? "input-error" : ""}
            />
            {errors.title?.type === "required" && (
              <span className="error-area">Bu Alan Boş Olamaz</span>
            )}
            {errors.title?.type === "maxLength" && (
              <span className="error-area">Girilen Değer Çok uzun</span>
            )}
            {errors.title?.type.length}
            <label htmlFor="productDesc">Açıklama</label>
            <input
              type="textbox"
              id="productDesc"
              placeholder="Ürün açıklaması girin"
              {...register("description", { required: true, maxLength: 500 })}
              onChange={changeInput}
              className={errors.description?.type ? "input-error" : ""}
            />
            {errors.description?.type === "required" && (
              <span className="error-area">Bu Alan Boş Olamaz</span>
            )}
            {errors.description?.type === "maxLength" && (
              <span className="error-area">Girilen Değer Çok uzun</span>
            )}
            <div className="selectbox-area">
              <div className="select-item">
                <label htmlFor="productCategory">Kategori</label>
                <select
                  id="productCategory"
                  {...register("category", { required: true })}
                  onChange={changeSelectBox}
                  className={errors.category?.type ? "input-error" : ""}
                >
                  <option value="">Kategori seç</option>
                  {category?.map((item, index) => (
                    <option value={item.title} id={item.id} key={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.category?.type === "required" && (
                  <span className="error-area">Lütfen Seçim Yapınız</span>
                )}
              </div>
              <div className="select-item">
                <label htmlFor="productBrand">Marka</label>
                <select
                  id="productBrand"
                  {...register("brand", { required: true })}
                  onChange={changeSelectBox}
                  className={errors.brand?.type ? "input-error" : ""}
                >
                  <option value="">Marka seç</option>
                  {brand?.map((item, index) => (
                    <option value={item.title} id={item.id} key={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.brand?.type === "required" && (
                  <span className="error-area">Lütfen Seçim Yapınız</span>
                )}
              </div>
              <div className="select-item">
                <label htmlFor="productColor">Renk</label>
                <select
                  id="productColor"
                  {...register("color", { required: true })}
                  onChange={changeSelectBox}
                  className={errors.color?.type ? "input-error" : ""}
                >
                  <option value="">Renk seç</option>

                  {color?.map((item, index) => (
                    <option value={item.title} id={item.id} key={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.color?.type === "required" && (
                  <span className="error-area">Lütfen Seçim Yapınız</span>
                )}
              </div>
              <div className="select-item">
                <label htmlFor="productStatus">Kullanim Durumu</label>
                <select
                  id="productStatus"
                  {...register("status", { required: true })}
                  onChange={changeSelectBox}
                  className={errors.status?.type ? "input-error" : ""}
                >
                  <option value="">Kullanım durumu seç</option>
                  {status?.map((item, index) => (
                    <option value={item.title} id={item.id} key={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.status?.type === "required" && (
                  <span className="error-area">Lütfen Seçim Yapınız</span>
                )}
              </div>
            </div>
            <label htmlFor="productPrice">Fiyat</label>
            <div className="price-input">
              <input
                id="productPrice"
                type="number"
                {...register("price", { min: 0, required: true })}
                onChange={changeInput}
                className={errors.price?.type ? "input-error" : ""}
              />
              <span>TL</span>
            </div>
            {errors.price?.type === "required" && (
              <span className="error-area">Bu Alan Boş Olamaz</span>
            )}
            {errors.price?.type === "min" && (
              <span className="error-area">
                Lütfen Geçerli Bir Değer Giriniz
              </span>
            )}

            {/* <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
          <input type="number" {...register("productPrice", { min: 0})} /> */}
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
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  {!images && (
                    <button
                      className="upload-area"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <img src="/img/upload.svg" alt="" />
                      <p className="upload-title">
                        Sürükleyip bırakarak yükle <br /> veya
                      </p>
                      <span className="select-img">Görsel Seçin</span>
                      <p>PNG ve JPEG Dosya boyutu: max. 400kb</p>
                    </button>
                  )}
                  &nbsp;
                  <div className="image-item">
                    <img src={images} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      {imageSize && (
                        <span className="error-area">
                          Dosya Boyutu En Fazla 400kb olmalı
                        </span>
                      )}
                      {!!images && (
                        <button onClick={() => setImages(null)}>x</button>
                      )}
                    </div>
                  </div>
                  {uploadCheck && (
                    <span className="error-area">Bu Alan Boş Olamaz</span>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
          <button className="btn-primary send-product" type="submit">
            Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
