import { Link, Input, Checkbox, Button, Spacer } from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, rememberMe);
  };

  return (
    <div className="flex flex-col w-[500px]">
      <h1 className="text-2xl font-semibold text-left mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          endContent={
            <EnvelopeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          variant="bordered"
        />
        <Spacer y={2} />
        <Input
          endContent={
            <LockClosedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          variant="bordered"
        />
        <Spacer y={4} />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            <p className="text-var(--text-color)">Remember me</p>
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot password?
          </Link>
        </div>
        <Spacer y={4} />
        <Button color="primary" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
