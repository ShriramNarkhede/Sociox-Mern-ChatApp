import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! Dude", isSent: false },
  { id: 2, content: "I'm doing great! Just grinding hard for placements.", isSent: true },
  { id: 3, content: "What about you?", isSent: false },
  { id: 4, content: "Just finished a project, feeling accomplished!", isSent: true },
  { id: 5, content: "Let's catch up soon!", isSent: false },
  { id: 6, content: "Absolutely! How about this weekend?", isSent: true },
  { id: 7, content: "Are you free for a quick call?", isSent: false },
  { id: 8, content: "Sure, I'll call you in 5 minutes", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-10 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Theme</h2>
      <p className="text-sm text-gray-500 mb-6">Select a theme for your chat interface</p>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`
              group flex flex-col items-center p-2 rounded transition-colors
              ${theme === t ? "bg-gray-200" : "hover:bg-gray-100"}
            `}
            onClick={() => setTheme(t)}
          >
            <div className="relative h-8 w-full rounded overflow-hidden" data-theme={t}>
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-xs font-medium text-center">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Preview Section */}
      <h3 className="text-lg font-semibold mb-3">Preview</h3>
      <div className="rounded border border-gray-300 overflow-hidden bg-white shadow-sm">
        <div className="p-2">
          {/* Mock Chat UI */}
          <div className="bg-white rounded shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="px-3 py-2 border-b border-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  S
                </div>
                <div>
                  <h3 className="font-medium text-sm">Shriram Narkhede</h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-2 space-y-2 h-[300px] overflow-y-auto">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[75%] rounded-lg p-2 shadow-sm
                      ${message.isSent ? "bg-primary text-white" : "bg-gray-100"}
                    `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1">12:00 PM</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-2 border-t border-gray-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 text-sm h-10"
                  placeholder="Type a message..."
                  value=""
                  readOnly
                />
                <button className="btn btn-primary h-10 min-h-0">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
