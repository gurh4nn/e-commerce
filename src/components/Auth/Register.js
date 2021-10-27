import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "redux/actions/auth";
import { useHistory } from "react-router";
import useDocumentTitle from "components/Layout/useDocumentTitle";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const loginCheck = await dispatch(signup(data));
    console.log(loginCheck);
    if (loginCheck) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  };
  useDocumentTitle("Kayıt Ol");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Kayıt Ol</h3>
      <p className="form-desc">Fırsatlardan yararlanmak için kayıt ol!</p>
      <label htmlFor="mail">Email</label>
      <input
        id="mail"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
          max: 20,
          min: 8,
          maxLength: 20,
          pattern: /^\S+@\S+$/i,
        })}
        className={errors.email?.type ? "input-error" : ""}
      />
      {errors.email && errors.email.type === "required" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Bu Alan Boş Olamaz
        </span>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Lütfen Geçerli Bir Değer Giriniz
        </span>
      )}
      <label htmlFor="passwords">Sifre</label>
      <input
        id="passwords"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: 8,
          maxLength: 80,
        })}
        className={errors.password?.type ? "input-error" : ""}
      />
      {errors.password?.type === "maxLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Girilen Parola Çok uzun
        </span>
      )}
      {errors.password?.type === "minLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Girilen Parola Çok Kısa
        </span>
      )}
      <input type="submit" value="Üye Ol" />

      <font className='user-status'>Hesabın var mı? <Link to='/login'>Giriş Yap</Link></font>
    </form>
  );
};

export default Register;
