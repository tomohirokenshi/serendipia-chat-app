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
    selectedUser,
    selectedGroup,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToGroupMessages,
    unsubscribeFromGroupMessages,
    getGroupMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    const chatId = selectedUser?._id || selectedGroup?._id;

    if (chatId) {
      if (selectedGroup) {
        getGroupMessages(chatId);
      } else if (selectedUser) {
        getMessages(chatId);
      }

      if (selectedUser) {
        subscribeToMessages(chatId);
      } else if (selectedGroup) {
        subscribeToGroupMessages(chatId);
      }
    }

    return () => {
      if (chatId) {
        if (selectedUser) {
          unsubscribeFromMessages(chatId);
        } else if (selectedGroup) {
          unsubscribeFromGroupMessages(chatId);
        }
      }
    };
  }, [
    selectedUser?._id,
    selectedGroup?._id,
    getMessages,
    getGroupMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToGroupMessages,
    unsubscribeFromGroupMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser && !selectedGroup) {
    return (
      <div className="flex-1 flex flex-col overflow-auto items-center justify-center">
        <p className="text-base-content/70">
          Please select a user or group to start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => {
            const isSender = message.senderId === authUser._id;
            // Logic for One-on-One Chat
            if (selectedUser) {
              const sender =
                message.senderId === authUser._id ? authUser : selectedUser;
              return (
                <div
                  key={message._id}
                  className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img
                        src={sender.profilePic || "/avatar.png"}
                        alt="profile pic"
                        ref={messageEndRef}
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <time className="text-xs opacity-50 ml-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                  <div className="chat-bubble flex flex-col">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              );
            }

            // Logic for Group Chat
            if (selectedGroup) {
              const isSender =
                message.isSender || message.senderId._id === authUser._id;
              const sender =
                message.senderId === authUser._id ? authUser : message.senderId;
              return (
                <div
                  key={message._id}
                  className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border">
                      <img
                        src={sender.profilePic || "/avatar.png"}
                        alt="profile pic"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1">
                    <span className="ml-2 text-sm font-semibold text-base-content/80">
                      {sender.userName}
                    </span>
                    <time className="text-xs opacity-50 ml-1">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                  <div className="chat-bubble flex flex-col">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              );
            }

            return null;
          })
        ) : (
          <div className="text-center text-base-content/70">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
