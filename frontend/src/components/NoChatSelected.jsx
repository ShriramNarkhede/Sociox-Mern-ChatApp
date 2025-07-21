import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 animate-bounce">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Hey there, welcome to Socio-X!</h2>
        <p className="text-base-content/60">
          Tap on a convo from the sidebar to start vibing! ✌️
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
