/**
 * Props for the {@link SkipNav} component.
 */
export interface SkipNavProps {
  /**
   * The id of main content of the page. If the skip nav is clicked, focus will be transferred here.
   */
  mainId: string;
}

/**
 * A hidden anchor that links to the main content of the page, for accessibility purposes.
 * The skip nav is the first tabbable link in the page, which allows for bypassing of the
 * entire header content.
 *
 * @param props {@link SkipNavProps}
 * @returns A JSX Element.
 */
export default function SkipNav({ mainId }: SkipNavProps) {
  return (
    <a
      id="skip-nav"
      href={`#${mainId}`}
      className={`absolute left-0 transform -translate-y-full p-1 text-sm underline focus:z-10
        focus:transition-transform focus:bg-accent-focus focus:text-accent-content focus:translate-y-0`}
    >
      Skip to main content
    </a>
  );
}
