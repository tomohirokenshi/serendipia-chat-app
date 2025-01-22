const AuthWelcome = ({ title, subtitle, gifUrl }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {gifUrl && (
          <img
            src={gifUrl}
            alt="Welcome Animation"
            className="mx-auto mb-6 max-w-full"
          />
        )}
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthWelcome;
