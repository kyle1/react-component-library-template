import "./Button.css";

interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  return <button className="bg-green-500">{label}</button>;
};
