import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signin } from "redux/actions/auth";
import { useHistory } from "react-router";
import useDocumentTitle from "components/Layout/useDocumentTitle";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const loginCheck = await dispatch(signin(data));
    if (loginCheck) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  };
  useDocumentTitle('Giriş Yap')


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className='form-title'>Giriş Yap</h3>
      <p className='form-desc'>Fırsatlardan yararlanmak için giriş yap!</p>
      <label htmlFor="mail">Email</label>
      <input
        id="mail"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: true,
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
          maxLength: 20,
          minLength: 8,
        })}
        className={errors.password?.type ? "input-error" : ""}
      />
      {errors.password && errors.password.type === "required" && (
        <span style={{ marginTop: "8px" }} className="error-area">
          Bu Alan Boş Olamaz
        </span>
      )}
      {errors.password?.type === "maxLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">Girilen Parola Çok uzun</span>
      )}
      {errors.password?.type === "minLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">Girilen Parola Çok Kısa</span>
      )}
      <input type="submit" value="Giriş Yap" />
      <font className='user-status'>Hesabın yok mu? <Link to='/register'>Kayıt Ol</Link></font>
    </form>
  );
};

export default Login;
