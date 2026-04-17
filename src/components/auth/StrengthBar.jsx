export default function StrengthBar({ password }) {
  if (!password) return null;

  return <p>Password length: {password.length}</p>;
}