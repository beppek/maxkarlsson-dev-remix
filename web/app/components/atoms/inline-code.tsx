type InlineCodeProps = {
  value: any;
};

export function InlineCode({ value }: InlineCodeProps) {
  return (
    <code className="font-inlineCode m-[1px] py-[2px] px-[8px] text-green-400 bg-slate-800 rounded-md">
      {value}
    </code>
  );
}
