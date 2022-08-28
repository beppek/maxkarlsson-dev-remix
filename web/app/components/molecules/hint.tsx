import { SVG } from '../atoms/svg';

type Props = {
  content: string;
  colors: {
    main: string;
    secondary: string;
  };
  variant: 'tip' | 'warning';
};

export function Hint({ content, colors, variant = 'tip' }: Props) {
  return (
    <div
      style={{
        borderColor: colors.main,
        boxShadow: `5px 5px 0 0 ${colors.secondary}`,
        borderImageSlice: 1,
        borderImageSource: `linear-gradient(to top left, ${colors.main}, ${colors.secondary})`,
      }}
      className="flex flex-col lg:flex-row shadow-retro border-4 items-center py-3 my-5"
    >
      <div className="px-3">
        <SVG fill={colors.main} height="40px" src={`/icons/${variant}.svg`} />
      </div>
      <p className="pr-3 pl-3 lg:pl-0 font-heading text-xs leading-5">
        {content}
      </p>
    </div>
  );
}
