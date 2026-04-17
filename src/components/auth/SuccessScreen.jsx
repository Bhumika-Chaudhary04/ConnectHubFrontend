export default function SuccessScreen({ mode }) {
  return (
    <h3>
      {mode === "login"
        ? "Login Successful"
        : "Signup Successful"}
    </h3>
  );
}