type ProgressBarProps = {
  value: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "dark" | "light";
};

export default function ProgressBar({
  value,
  label,
  showPercentage = true,
  variant = "light",
}: ProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  const trackClassName =
    variant === "dark" ? "bg-white/10" : "bg-slate-100";

  const labelClassName =
    variant === "dark" ? "text-slate-300" : "text-slate-500";

  return (
    <div>
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {label ? (
            <p className={`text-xs font-bold ${labelClassName}`}>
              {label}
            </p>
          ) : (
            <span />
          )}

          {showPercentage && (
            <p className={`text-xs font-black ${labelClassName}`}>
              {normalizedValue}%
            </p>
          )}
        </div>
      )}

      <div
        className={`h-2.5 overflow-hidden rounded-full ${trackClassName}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={normalizedValue}
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}