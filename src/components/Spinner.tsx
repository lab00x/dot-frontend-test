

function Spinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center gap-x-2">
      <span className="flex w-6 h-6 rounded-full border border-gray-600 border-t-transparent animate-spin duration-1000"></span>
      <p className="text-sm animate-ping">{message}</p>
    </div>
  );
}

export default Spinner;
