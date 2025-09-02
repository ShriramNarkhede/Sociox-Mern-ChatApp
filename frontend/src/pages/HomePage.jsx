import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      {/* Push content below fixed navbar (h-16) */}
      <div className="pt-16 px-4">
        <div className="w-full max-w-6xl mx-auto bg-base-100 border border-base-300 rounded-3xl shadow mt-6" style={{ height: "calc(100vh - 6rem)" }}>
          <div className="flex h-full rounded-3xl overflow-hidden min-h-0">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;