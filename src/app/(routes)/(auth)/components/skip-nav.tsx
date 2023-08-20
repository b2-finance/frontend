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
      className="bg-base-100 text-base-content p-3 text-sm absolute left-4 top-0 -translate-y-full 
        focus:z-10 focus:transition-transform focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
