
import { useNavigate } from "react-router-dom";
import { signInWithEmailPassword } from "../../firebase/firebase";
import { useRef } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  return (
    <div className="main">
      <div className="sign-in-box">
        <input type="email" placeholder="Email" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        <button
          onClick={() =>
            signInWithEmailPassword(
              email.current.value,
              password.current.value,
              navigate
            )
          }
        >
          Sign In
        </button>
      </div>
    </div>
  );
}