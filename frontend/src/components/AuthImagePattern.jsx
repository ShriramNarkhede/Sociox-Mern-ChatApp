const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
