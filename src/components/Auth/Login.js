import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signin } from 'redux/actions/auth';
import { toast } from 'react-toastify';
import { useHistory } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
      const loginCheck = await dispatch(signin(data))
      if(loginCheck) {
        toast.success("Giris basarili, yonlendiriliyorsunuz...", {autoClose: 3000})
        setTimeout(() => {
          history.push('/')
        }, 3000);
      } else {
        toast.error("Bilgilerinizi kontrol ediniz")
      }
    };

  return (
     <form onSubmit={handleSubmit(onSubmit)}>
       <label htmlFor="mail">Email</label>
      <input id='mail' type="email" placeholder="Email" {...register("email", {required: true, max: 20, min: 8, maxLength: 20, pattern: /^\S+@\S+$/i})} />
      {errors.email && errors.email.type === "required" && (
        <span role="alert">This is required</span>
      )}
      <label htmlFor="passwords">Sifre</label>
      <input id='passwords' type="password" placeholder="Password" {...register("password", {required: true, maxLength: 80})} />
      {errors.password && errors.password.type === "required" && (
        <span role="alert">This is required</span>
      )}
      <input type="submit" value='Giris'/>
    </form>
  );
};

export default Login;
