export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const buttonClass = "px-2.5 py-1 text-xs border rounded-[3px]";
  const normalClass = `${buttonClass} bg-white border-[#e0e2e5]`;
  const activeClass = `${buttonClass} bg-[#4779ee] border-[#4779ee] text-white`;

  return (
    <div className="flex justify-center gap-1 mt-4">
      <button
        className={`${normalClass} disabled:opacity-50`}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={p === page ? activeClass : normalClass}
        >
          {p}
        </button>
      ))}

      <button
        className={`${normalClass} disabled:opacity-50`}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
