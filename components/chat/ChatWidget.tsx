"use client";

import { useState, useRef, useEffect, SubmitEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { loadMessages, saveMessages } from "@/utils/chat.utils";

const SAMPLE_QUESTIONS = [
  "Which month has been the best in the past 6 months?",
  "How is the FinTech industry doing?",
  "When should we raise funding?"
];

export default function ChatWidget() {
  const { messages, sendMessage, error, status } = useChat({
    messages: loadMessages(),
  });
  const isLoading = status === "submitted" || status === "streaming";

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) saveMessages(messages);
  }, [messages]);

  const handleSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await sendMessage({ text: input });
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-left text-xs px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--muted)] text-[var(--foreground)]"
              }`}
            >
              {message.parts?.map(
                (part, i) =>
                  part.type === "text" && (
                    <span key={`${message.id}-${i}`}>{part.text}</span>
                  ),
              )}
            </div>
          </div>
        ))}
        {error && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-xl px-3 py-2 text-sm bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20">
              Something went wrong. Please try again.
            </div>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--muted)] rounded-xl px-4 py-3 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted-foreground)] animate-bounce" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2 px-3 py-3 border-t border-[var(--border)]"
      >
        <input
          className="flex-1 text-sm px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50"
          value={input}
          placeholder="Ask about VN startups..."
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-3 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </form>
    </div>
  );
}
