export const Spinner = ({ className }: { className?: string }) => {
  return <div className={`border-2 border-gray-500 border-t-transparent rounded-full animate-spin ${className}`}></div>;
};
