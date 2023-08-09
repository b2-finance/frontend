export interface B2IconProps {
  color?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export default function B2Icon({ color }: B2IconProps) {
  let css: string;

  switch (color) {
    case 'primary':
      css = 'bg-primary mask mask-hexagon w-16 p-2';
      break;
    case 'secondary':
      css = 'bg-secondary mask mask-hexagon w-16 p-2';
      break;
    case 'accent':
      css = 'bg-accent mask mask-hexagon w-16 p-2';
      break;
    case 'neutral':
    default:
      css = 'bg-neutral mask mask-hexagon w-16 p-2';
      break;
  }

  return (
    <div className="avatar placeholder text-base-100 text-2xl">
      <div className={css}>B2</div>
    </div>
  );
}
