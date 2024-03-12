import { Loader } from "lucide-react";
import PropTypes from "prop-types";
import backgroundImage from "../assets/loginbg.jpg";
import { useState } from "react";

const Login = (props) => {
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemoLogin = async () => {
    try {
      setDemoLoading(true); // Start the demo login loading
      const demoEmail = "demo@gmail.com";
      const demoPassword = "rai";
      await props.signIn(demoEmail, demoPassword);
    } catch (error) {
      console.error("Demo login error:", error);
    } finally {
      setDemoLoading(false); // Stop the demo login loading
    }
  };
  return (
    <>
      <div
        className="flex justify-center items-center flex-col h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-xl lg:text-6xl font-bold font-mono">
          Welcome to PowrLingo
        </h1>
        <h1 className="text-lg lg:text-3xl font-bold font-mono py-2 text-center ">
          <span className="font-normal text-sm">
            (If Not Registered you can Do that here!!)
          </span>
        </h1>

        <section>
          <form onSubmit={props.onSubmit}>
            <div className="flex flex-col w-80">
              <input
                type="email"
                className="p-4 w-full bg-gray-300 rounded font-mono focus:outline-none"
                placeholder="example@gmail.com"
                value={props.email}
                onChange={props.onEmailChange}
              />

              <input
                type="password"
                className="p-4 w-full bg-gray-300 rounded font-mono focus:outline-none mt-4"
                placeholder="Password"
                value={props.password}
                onChange={props.onPasswordChange}
              />

              <button className="mt-4 w-full bg-black p-4 text-white rounded-md flex justify-center items-center font-mono">
                {props.loading ? <Loader /> : "Login/Register"}
              </button>
            </div>
          </form>
        </section>
        <section className="p-4 border-t-[0.07rem] border-black mt-4">
          <button
            className="w-80 p-4 bg-black text-white rounded-md font-mono flex justify-center items-center"
            onClick={handleDemoLogin}
            disabled={demoLoading} // Disable the demo login button while loading
          >
            {demoLoading ? <Loader /> : "Demo Login"}
          </button>
        </section>
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
