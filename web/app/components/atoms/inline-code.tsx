type InlineCodeProps = {
  value: any;
};

export function InlineCode({ value }: InlineCodeProps) {
  return (
    <code className="font-inlineCode m-[3px] py-[1px] px-[6px] text-cyan-400 bg-slate-900 border-[1px] border-slate-50 rounded-sm">
      {value}
    </code>
  );
}
