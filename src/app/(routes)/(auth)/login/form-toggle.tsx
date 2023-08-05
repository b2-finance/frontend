'use client';

import { ReactNode, useState } from 'react';

/**
 * Content displayed on the slider.
 */
export interface SliderProps {
  title?: string;
  content?: string;
  buttonText: string;
}

/**
 * Props for the {@link FormToggle} component.
 */
export interface FormSliderProps {
  /**
   * Form displayed when the slider is "open."
   */
  openForm: ReactNode;
  /**
   * Form displayed when the slider is "closed."
   */
  closedForm: ReactNode;
  /**
   * Content displayed on the slider when it is "open."
   */
  openContent: SliderProps;
  /**
   * Content displayed on the slider when it is "closed."
   */
  closedContent: SliderProps;
}

/**
 * Toggles between displaying two forms. While in the "open"/"closed" state,
 * the `openFrom`/`closedForm` is displayed on the right/left side, respectively,
 * with a button on the opposite side for toggling between the forms. In mobile
 * views, the forms are positioned vertically (one on top of the other) with the
 * "open" state corresponding to the bottom form being exposed. In tablet and
 * wider views, the forms are positioned side-by-side with the "open" state
 * corresponding to the right-side form being exposed.
 *
 * @param props {@link FormSliderProps}
 * @returns A JSX element.
 */
export default function FormToggle({
  openForm,
  closedForm,
  openContent,
  closedContent
}: FormSliderProps) {
  const [open, setOpen] = useState(false);

  // Each CSS pair differs only in the translate and visibility properties.

  const sliderCss = open
    ? `absolute grow basis-0 bg-neutral transition duration-300
    bottom-0 h-1/2 w-full -translate-y-full
    tablet:right-0 tablet:inset-y-0 tablet:w-1/2 tablet:h-full tablet:-translate-x-full tablet:translate-y-0`
    : `absolute grow basis-0 bg-neutral transition duration-300
    bottom-0 h-1/2 w-full translate-y-0
    tablet:right-0 tablet:inset-y-0 tablet:w-1/2 tablet:h-full tablet:translate-x-0`;

  const openSliderContentCss = open
    ? `absolute flex flex-col grow basis-0 gap-6 p-8 justify-center items-center text-center bg-transparent transition-all duration-300
    top-0 h-1/2 w-full translate-y-0
    tablet:left-0 tablet:h-full tablet:w-1/2 tablet:translate-x-0`
    : `absolute flex flex-col grow basis-0 gap-6 p-8 justify-center items-center text-center bg-transparent transition-all duration-300 invisible
    top-0 h-1/2 w-full -translate-y-full
    tablet:left-0 tablet:h-full tablet:w-1/2 tablet:-translate-x-full tablet:translate-y-0`;

  const closedSliderContentCss = open
    ? `absolute flex flex-col grow basis-0 gap-6 p-8 justify-center items-center text-center bg-transparent transition-all duration-300 invisible
    bottom-0 h-1/2 w-full translate-y-full
    tablet:right-0 tablet:h-full tablet:w-1/2 tablet:translate-x-full tablet:translate-y-0`
    : `absolute flex flex-col grow basis-0 gap-6 p-8 justify-center items-center text-center bg-transparent transition-all duration-300
    bottom-0 h-1/2 w-full translate-y-0
    tablet:right-0 tablet:h-full tablet:w-1/2 tablet:translate-x-0`;

  const closedFormCss = open
    ? 'flex flex-col justify-center tablet:w-1/2 h-1/2 tablet:h-full invisible transition-{visibility} duration-300'
    : 'flex flex-col justify-center tablet:w-1/2 h-1/2 tablet:h-full';

  const openFormCss = open
    ? 'flex flex-col justify-center tablet:w-1/2 h-1/2 tablet:h-full'
    : 'flex flex-col justify-center tablet:w-1/2 h-1/2 tablet:h-full invisible transition-{visibility} duration-300';

  const slider = (content: SliderProps, css: string) => {
    return (
      <div className={css}>
        <h2 className="card-title text-4xl text-neutral-content">
          {content.title}
        </h2>
        <p className="text-base-300 tablet:grow-0">{content.content}</p>
        <div className="form-control items-center">
          <button
            className="btn btn-outline btn-primary w-fit"
            onClick={() => setOpen((prev) => !prev)}
          >
            {content.buttonText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex tablet:card grow tablet:grow-0 tablet:h-[32rem] w-full max-w-3xl shadow-xl overflow-hidden">
      <div className="relative tablet:card-body flex flex-col tablet:flex-row grow tablet:gap-0 tablet:p-0">
        <div className={sliderCss} />
        <div className={closedFormCss}>{closedForm}</div>
        {slider(closedContent, closedSliderContentCss)}
        {slider(openContent, openSliderContentCss)}
        <div className={openFormCss}>{openForm}</div>
      </div>
    </div>
  );
}
