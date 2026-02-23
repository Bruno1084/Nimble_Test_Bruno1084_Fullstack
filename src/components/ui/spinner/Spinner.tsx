import "./spinner.css";

interface SpinnerProps {
  size?: "default" | "small";
}

export function Spinner({ size = "default" }: SpinnerProps) {
  const className = size === "small" ? "spinner spinner--small" : "spinner";

  return (
    <div className={size === "default" ? "spinner-container" : undefined}>
      <div className={className} />
    </div>
  );
}
