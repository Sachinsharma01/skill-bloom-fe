import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { makeAPICall } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { validateUserName } from "../../utils";
import { Link } from "react-router-dom";
import SignUpImage from "../../assets/auth.svg";
import { isMobileDevice, isTabletDevice } from "../../utils";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [profession, setProfession] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameError: string | Promise<boolean> = validateUserName(username);
    if (typeof usernameError === "string") {
      toast.error(usernameError);
      return;
    } else {
      usernameError.then((response: any) => {
        if (!response.valid) {
          toast.error("Username is already taken");
          return;
        }
      });
    }
    makeAPICall("signup", {
      name,
      username,
      email,
      password,
      mobile_number: mobile,
      country,
      state,
      profession,
    }).then((res: any) => {
      console.log(res);
      if (res.error) {
        toast.error(res.message ?? res.error);
      } else {
        toast.success("Account created successfully");
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex md:flex-col sm:flex-col lg:flex-row items-center justify-center h-screen">
      {!isMobileDevice() && !isTabletDevice() && <img src={SignUpImage} alt="logo" className="w-1/3 h-1/3" />}
      <div className="w-full max-w-md p-10 login-container bg-white border-gray-200 rounded-lg shadow-md mx-2">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
        <div className="w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex lg:flex-row gap-4 md:flex-col sm:flex-col">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Input
                  type="text"
                  id="username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex lg:flex-row gap-4 md:flex-col sm:flex-col">
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <Input
                  type="number"
                  id="mobile"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                  placeholder="Enter your mobile number"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <Input
                  type="text"
                  id="profession"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                  placeholder="Enter your profession"
                  onChange={(e) => setProfession(e.target.value)}
                  value={profession}
                />
              </div>
            </div>
            <div className="flex lg:flex-row gap-4 md:flex-col sm:flex-col">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <Input
                  type="text"
                  id="country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                  placeholder="Enter your country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Input
                  type="text"
                  id="state"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                  placeholder="Enter your state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" style={{ backgroundColor: '#396FDF' }}>
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-edtech-secondary hover:text-edtech-primary"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
