import { useTheme } from "../ThemeContext";

const NoChatSelected = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
               justify-center animate-bounce"
            >
              <img
                src={theme === "business" ? "./Logo(inv).png" : "./Logo.png"}
                alt="Logo"
                className="size-16"
              />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to Serendipia!</h2>
        <p className="text-base-content/60 text-justify">
          Just like the unexpected and delightful discoveries of serendipity,
          our platform fosters meaningful connections you might not have
          anticipated. You'll encounter diverse perspectives, engage in
          unexpected conversations, and forge friendships you never knew you
          were looking for.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
