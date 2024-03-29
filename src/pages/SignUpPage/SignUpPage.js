import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logoSign.svg";
import BlueButton from "../../components/Common/BlueButton";
import SignContainer from "../../components/Common/SignContainer";
import SignInput from "../../components/Common/SignInput";
import { BASE_URL } from "../../constants/BASE_URL";
import { ThreeDots } from "react-loader-spinner";
import { secondaryColor } from "../../constants/colors";
import { TokenContext } from "../../Contexts/TokenContext";
const SignUpPage = () => {
  const { handleUser } = useContext(TokenContext);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      handleUser(localToken);
      navigate("/hoje");
    }
  }, []);
  function handleSignUpForm(e) {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  }
  function registerUser(e) {
    e.preventDefault();
    setIsLoading(!isLoading);
    const url = `${BASE_URL}auth/sign-up`;
    const body = signUpForm;
    const promise = axios.post(url, body);
    promise.then((res) => navigate("/"));
    promise.catch((err) => {
      alert("Cadastro inválido! Por favor, tente novamente.");
      setIsLoading(false);
    });
  }
  return (
    <SignContainer>
      <img src={logo} alt="Just TrackIt!" />
      <form onSubmit={registerUser}>
        <div>
          <SignInput
            name="email"
            type={`email`}
            onChange={handleSignUpForm}
            value={signUpForm.email}
            placeholder=""
            disabled={isLoading}
            data-test="email-input"
            required
          />
          <label>email</label>
        </div>
        <div>
          <SignInput
            name="password"
            type={`password`}
            onChange={handleSignUpForm}
            value={signUpForm.password}
            placeholder=""
            disabled={isLoading}
            data-test="password-input"
            required
          />
          <label>senha</label>
        </div>
        <div>
          <SignInput
            name="name"
            type={`text`}
            onChange={handleSignUpForm}
            value={signUpForm.name}
            placeholder=""
            disabled={isLoading}
            data-test="user-name-input"
            required
          />
          <label>nome</label>
        </div>
        <div>
          <SignInput
            name="image"
            type={`url`}
            onChange={handleSignUpForm}
            value={signUpForm.image}
            placeholder=""
            disabled={isLoading}
            data-test="user-image-input"
            required
          />
          <label>foto</label>
        </div>
        <BlueButton type={`submit`} data-test="signup-btn" disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              height="30"
              width="50"
              color={secondaryColor}
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Cadastrar"
          )}
        </BlueButton>
      </form>
      <Link to="/"  data-test="login-link">Já tem uma conta? Faça login!</Link>
    </SignContainer>
  );
};

export default SignUpPage;
