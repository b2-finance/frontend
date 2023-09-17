import { ICON_DEFAULT_CSS, ICON_DEFAULT_STROKE, IconProps } from './utilities';

export default function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={ICON_DEFAULT_STROKE}
      stroke="currentColor"
      className={className ?? ICON_DEFAULT_CSS}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
