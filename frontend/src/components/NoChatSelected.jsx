import { MessageSquare } from "lucide-react";
import logo2 from "../assets/logo2.png";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="flex items-center justify-center w-20 h-20">
              <img src={logo2} alt="App logo" className="w-20 h-20 object-contain" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Yo, welcome to SocioX 👋</h2>
        <p className="text-base-content/60">
          Pick someone from the sidebar and shoot your shot. Real‑time vibes, zero lag.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
