import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser ,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  
  const { authUser  } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser ._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser ._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-base-100">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage 
            key={message._id} 
            message={message} 
            authUser ={authUser } 
            selectedUser ={selectedUser } 
          />
        ))}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

const ChatMessage = ({ message, authUser , selectedUser  }) => {
  return (
    <div className={`chat ${message.senderId === authUser ._id ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border border-base-300">
          <img
            src={
              message.senderId === authUser ._id
                ? authUser .profilePic || "/avatar.png"
                : selectedUser .profilePic || "/avatar.png"
            }
            alt="profile pic"
          />
        </div>
      </div>
      <div className="chat-header mb-1">
        <time className="text-xs text-base-content/60 ml-1">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>
      <div className={`chat-bubble ${message.senderId === authUser ._id ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}`}>
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-2 shadow"
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
};

export default ChatContainer;
