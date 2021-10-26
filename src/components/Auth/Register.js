import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "redux/actions/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const loginCheck = dispatch(signup(data));
    if (loginCheck) {
      toast.success("Giris basarili, yonlendiriliyorsunuz...", {
        autoClose: 3000,
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } else {
      toast.error("Bilgilerinizi kontrol ediniz");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {...register("password", { required: true, maxLength: 80 })}
        className={errors.password?.type ? "input-error" : ""}
      />
      {errors.password?.type === "maxLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">Girilen Parola Çok uzun</span>
      )}
      {errors.password?.type === "minLength" && (
        <span style={{ marginTop: "8px" }} className="error-area">Girilen Parola Çok Kısa</span>
      )}
      <input type="submit" value="Üye Ol" />
    </form>
  );
};

export default Register;
