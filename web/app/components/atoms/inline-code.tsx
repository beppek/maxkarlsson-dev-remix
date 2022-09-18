type InlineCodeProps = {
  value: any;
};

export function InlineCode({ value }: InlineCodeProps) {
  return (
    <code className="font-inlineCode m-[1px] py-[2px] px-[8px] text-white bg-cyan-600 rounded-lg">
      {value}
    </code>
  );
}
