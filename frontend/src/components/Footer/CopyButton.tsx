import { useEffect, useRef, useState } from "react";

type CopyButtonProps = {
  value: string;
  label?: string;
};

export default function CopyButton({
  value,
  label = "کپی شماره",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // اگر کامپوننت قبل از تمام شدن تایمر حذف شود، تایمر را پاک می‌کنیم
  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // مرورگر اجازه‌ی دسترسی به clipboard نداد؛ بی‌صدا رد می‌شویم
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      title={copied ? "کپی شد" : label}
      className={`copy-btn${copied ? " copy-btn--copied" : ""}`}
    >
      {copied ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "شماره کپی شد" : ""}
      </span>
    </button>
  );
}