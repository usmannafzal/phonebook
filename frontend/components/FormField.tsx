const inputClass =
  'w-full h-8 px-2 text-sm bg-white border border-[#e0e2e5] rounded-[3px] outline-none';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  className = 'mb-3',
}: Props) {
  return (
    <div className={className}>
      <label className="block text-xs mb-1">{label}</label>
      <input
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
