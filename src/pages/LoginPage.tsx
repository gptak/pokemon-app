import Header from "../comp/Header";
import Login from "../comp/Login";

type LoginPageProps = {
  checkCookies: () => void;
};

const LoginPage = ({ checkCookies }: LoginPageProps) => {
  return (
    <>
      <Header />
      <Login checkCookies={checkCookies} />
    </>
  );
};

export default LoginPage;
