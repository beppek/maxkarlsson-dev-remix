interface Props {
  className?: string;
  width?: number;
  height?: number;
  size?: number;
  fill?: string;
}

export function LightBulbIcon({
  className = "fill-white dark:fill-black",
  width = 40,
  height = 40,
}: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      y="0px"
      x="0px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
    >
      <rect
        height="2"
        width="6"
        transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 70 -28)"
        y="20"
        x="46"
      ></rect>
      <rect
        height="2"
        width="6"
        transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 50 90)"
        y="44"
        x="22"
      ></rect>
      <rect
        height="2"
        width="6"
        transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 146 90)"
        y="44"
        x="70"
      ></rect>
      <polygon points="72,32 68,32 68,34 66,34 66,36 68,36 68,34 72,34"></polygon>
      <polygon points="68,56 68,54 66,54 66,56 68,56 68,58 72,58 72,56"></polygon>
      <polygon points="32,54 30,54 30,56 26,56 26,58 30,58 30,56 32,56"></polygon>
      <polygon points="62,22 60,22 60,26 58,26 58,28 60,28 60,26 62,26"></polygon>
      <polygon points="38,26 38,22 36,22 36,26 38,26 38,28 40,28 40,26"></polygon>
      <polygon points="30,34 30,32 26,32 26,34 30,34 30,36 32,36 32,34"></polygon>
      <path d="M64,40l0-4h-2l0-2h-2l0-1.999L58,32l0-2h-4l0-2H44v2h-4v2l-2,0.001V34h-2v2h-2v4h-2v10l2,0v4l2,0v2h2v1.999  L40,58l0,4h2v4h-2v2h2v2h-2v2h2v2h-2v2h2v2h2v2l2,0l0,2h6v-2h2v-2h2l0-2h2v-2h-2l0-2h2l0-2h-2l0-2h2v-2h-2l0-4h2v-4l2-0.001h0L60,56  h2l0-2l2,0l0-4l2,0V40H64z M52,80h-6l0-2h6L52,80z M56,76H42v-2h14L56,76z M44,44h2v2h2v-2h2v2h2v-2h2l0,6h-2v4l-2,0l0,10h-2l0-10  l-2,0v-4h-2V44z M56,66l0,2H42v-2H56z M56,70l0,2H42v-2H56z M64,50l-2,0l0,4h-2l0,2l-2-0.001L58,58h-2l0,4l-2,0.001V64h-2l0-10h2v-4  l2,0v-6l-2,0l0-2h-2v2h-2v-2h-2v2h-2v-2h-2v2l-2,0v6l2,0v4h2l0,10h-2v-2h-2v-4h-2v-2.001L38,56v-2h-2v-4l-2,0V40h2v-4h2v-2l2,0.001  V32h4v-2h10l0,2h4l0,2.001L60,34l0,2h2l0,4h2V50z"></path>
    </svg>
  );
}
