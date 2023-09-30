import { ArrowRightCircle, Loader } from "lucide-react";
import PropTypes from "prop-types";

const Login = (props) => {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="text-xl lg:text-6xl font-bold font-mono p-5">
          Welcome to PowrLingo
        </h1>
        <h1 className="text-lg lg:text-3xl font-bold font-mono p-4 flex flex-col text-center ">
          Enter Your Email and Password to Login
          <span className="font-normal text-sm">
            (If Not Registered you can Do that it here!!)
          </span>
        </h1>

        <form onSubmit={props.onSubmit}>
          <div className="flex flex-col">
            <input
              type="email"
              className="p-2 lg:w-80 w-64 bg-gray-300 rounded font-mono focus:outline-none"
              placeholder="example@gmail.com"
              value={props.email}
              onChange={props.onEmailChange}
            />
            <div className="flex flex-row">
              <input
                type="password"
                className="p-2 lg:w-80 w-64 bg-gray-300 rounded font-mono focus:outline-none mt-4"
                placeholder="Password"
                value={props.password}
                onChange={props.onPasswordChange}
              />
              {props.loading ? (
                <div className="mt-4 ml-4">
                  <Loader size={"2.5rem"}/>
                </div>
              ) : (
                <button className="mt-4">
                  <ArrowRightCircle className="h-10 w-10 ml-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;
