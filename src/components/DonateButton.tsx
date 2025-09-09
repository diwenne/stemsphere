interface Props {
  className?: string;
}

export default function DonateButton({ className = "" }: Props) {
  return (
    <button
      className={`bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      Donate
    </button>
  );
}