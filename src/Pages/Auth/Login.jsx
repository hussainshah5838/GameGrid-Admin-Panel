import React, { useState, useRef } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ---------- Tiny UI kit (DRY) ---------- */
const Card = ({ className = "", children }) => (
  <div
    className={`bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.08)] ${className}`}
  >
    {children}
  </div>
);

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-[13px] font-medium text-gray-700 mb-1.5"
  >
    {children}
  </label>
);

const Input = React.forwardRef(function Input(
  {
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    left,
    right,
    variant = "outline",
    ...rest
  },
  ref
) {
  const base =
    "w-full h-12 rounded-xl text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/70";
  const style =
    variant === "filled"
      ? "bg-gray-100 border border-gray-200 focus:border-transparent"
      : "bg-white border-2 border-purple-300 focus:border-transparent";

  return (
    <div className="relative">
      {left && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {left}
        </div>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${base} ${style} ${left ? "pl-9" : "pl-3"} ${
          right ? "pr-10" : "pr-3"
        }`}
        {...rest}
      />
      {right && (
        <button
          type="button"
          tabIndex={-1}
          className="absolute inset-y-0 right-0 px-3 grid place-items-center"
        >
          {right}
        </button>
      )}
    </div>
  );
});

const Button = ({ children, className = "", ...rest }) => (
  <button
    className={`h-10 w-full rounded-lg bg-purple-600 text-white text-sm font-medium 
      shadow-[0_6px_16px_rgba(126,87,194,0.35)] hover:bg-purple-700 active:bg-purple-800 transition ${className}`}
    {...rest}
  >
    {children}
  </button>
);

/* ---------- OTP input (6 boxes) ---------- */
const OtpInput = ({ length = 6, value, onChange }) => {
  const refs = useRef(Array.from({ length }, () => React.createRef()));

  const handle = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const chars = value.split("");
    chars[i] = v || "";
    const newVal = chars.join("").slice(0, length);
    onChange(newVal);

    if (v && i < length - 1) refs.current[i + 1].current?.focus();
    if (!v && i > 0 && e.nativeEvent.inputType === "deleteContentBackward")
      refs.current[i - 1].current?.focus();
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={refs.current[i]}
          inputMode="numeric"
          className="w-11 h-11 text-center rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500/70 focus:border-transparent text-sm"
          value={value[i] ?? ""}
          onChange={(e) => handle(i, e)}
          maxLength={1}
        />
      ))}
    </div>
  );
};

/* ---------- Right image panel (matches screenshot) ---------- */
const PromoPanel = () => (
  <Card className="overflow-hidden rounded-2xl h-72 md:h-[520px]">
    <div className="relative w-full h-full">
      {/* If your file is `public/assets/Frame 1 (1).png`, use the encoded path below */}
      <img
        src="/assets/Frame%201%20(1).png"
        alt="Fashion in city"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/65 via-black/30 to-transparent">
        <h3 className="text-white font-semibold text-[15px]">
          Your Exclusive Shopping Store
        </h3>
        <p className="mt-1 text-white/80 text-[12px] leading-5 max-w-sm">
          Lorem ipsum dolor sit amet consectetur. Leo diam tincidunt nec diam
          justo. At sagittis mi egestas vitae lectus adipiscing.
        </p>
      </div>
    </div>
  </Card>
);

/* ---------- Auth screens ---------- */
const PasswordField = ({
  show,
  setShow,
  id = "password",
  placeholder = "Password",
}) => (
  <Input
    id={id}
    type={show ? "text" : "password"}
    placeholder={placeholder}
    variant="filled"
    left={<FiLock className="w-4 h-4 text-gray-400" />}
    right={
      <span
        onClick={() => setShow((s) => !s)}
        className="cursor-pointer"
        aria-label="Toggle password visibility"
      >
        {show ? (
          <FiEyeOff className="w-4 h-4 text-gray-500" />
        ) : (
          <FiEye className="w-4 h-4 text-gray-500" />
        )}
      </span>
    }
  />
);

const LoginForm = ({ onForgot }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // simple condition for now (both fields non-empty)
    // remove this block if you want unconditional redirect
    const email = document.getElementById("email")?.value?.trim();
    const pass = document.getElementById("password")?.value?.trim();
    if (!email || !pass) return;

    navigate("/"); // ← redirect
  };

  return (
    <Card className="p-10 md:p-12 h-auto md:h-[520px] flex flex-col justify-center font-poppins">
      <img src="/assets/Logo.png" alt="Logo" className="h-12 w-auto mx-auto" />

      <h1 className="mt-6 text-center text-2xl md:text-3xl font-semibold text-gray-900">
        Welcome Back!
      </h1>
      <p className="mt-1 text-center text-[14px] text-gray-500">
        Enter your credentials to login
      </p>

      <div className="mt-8 space-y-4">
        <div>
          {/* Purple outline like the mock */}
          <Input
            id="email"
            placeholder="Email"
            variant="outline"
            left={<FiMail className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <div>
          <PasswordField show={show} setShow={setShow} />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={onForgot}
            className="text-[13px] font-medium text-purple-600 hover:text-purple-700"
          >
            Forgot Password
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="mt-2 h-12 w-full rounded-xl bg-purple-600 text-white text-base font-semibold
                     shadow-[0_6px_16px_rgba(126,87,194,0.35)] hover:bg-purple-700 active:bg-purple-800 transition"
        >
          Login
        </button>
      </div>
    </Card>
  );
};

const ForgotFlow = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <Card className="p-8 md:p-10 h-auto md:h-[520px]">
      <img src="/assets/Logo.png" alt="Logo" className="h-10 w-auto" />

      <h1 className="mt-6 text-xl font-semibold text-gray-900">
        {step < 3 ? "Forgot Password?" : "Reset Password"}
      </h1>
      <p className="mt-1 text-[13px] text-gray-500">
        {step === 1 && "Provide your email to receive a reset code."}
        {step === 2 && "Provide the verification code we sent to your email."}
        {step === 3 && "Enter and confirm your new password."}
      </p>

      {step === 1 && (
        <div className="mt-6 space-y-5">
          <div>
            <Label htmlFor="fp-email">Email</Label>
            <Input
              id="fp-email"
              placeholder="example@email.com"
              left={<FiMail className="w-4 h-4 text-gray-400" />}
            />
          </div>
          <Button onClick={() => setStep(2)}>Send Code</Button>
          <button
            onClick={onBack}
            className="block text-center text-[12px] text-gray-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-5">
          <div>
            <Label>Code</Label>
            <OtpInput value={otp.padEnd(6)} onChange={setOtp} />
          </div>
          <Button onClick={() => setStep(3)}>Verify Code</Button>
          <button
            onClick={onBack}
            className="block text-center text-[12px] text-gray-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-5">
          <div>
            <Label htmlFor="new-pass">New Password</Label>
            <PasswordField
              id="new-pass"
              show={show1}
              setShow={setShow1}
              placeholder="New password"
            />
          </div>
          <div>
            <Label htmlFor="confirm-pass">Confirm Password</Label>
            <PasswordField
              id="confirm-pass"
              show={show2}
              setShow={setShow2}
              placeholder="Confirm password"
            />
          </div>
          <Button>Reset Password</Button>
          <button
            onClick={onBack}
            className="block text-center text-[12px] text-gray-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      )}
    </Card>
  );
};

/* ---------- Page shell ---------- */
const Shell = ({ children, rightPanel = true }) => (
  <div className="min-h-screen bg-gray-100 px-3 sm:px-4 md:px-6 py-16 md:py-10">
    <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
      <div className="order-2 md:order-1">{children}</div>
      {rightPanel && (
        <div className="order-1 md:order-2">
          <PromoPanel />
        </div>
      )}
    </div>
  </div>
);

/* ---------- Exported page ---------- */
const Login = () => {
  const [mode, setMode] = useState("login"); // login | forgot
  return (
    <Shell>
      {mode === "login" ? (
        <LoginForm onForgot={() => setMode("forgot")} />
      ) : (
        <ForgotFlow onBack={() => setMode("login")} />
      )}
    </Shell>
  );
};

export default Login;
