const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-4 border-border border-t-accent animate-spin"></div>

        {/* Center dot */}
        <div className="absolute w-3 h-3 rounded-full bg-accent animate-pulse-dot"></div>
      </div>
    </div>
  );
};

export default Loader;
