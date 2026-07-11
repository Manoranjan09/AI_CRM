import { Bot, Send, User, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { sendChatMessage } from "../../services/chatService";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const suggestions = [
  "I met Dr Sharma today at Apollo Hospital. Discussed CardioX. Follow up next Monday.",
  "Show interactions with Dr Sharma",
  "Summarize interactions with Dr Sharma",
  "What is the next best action for Dr Sharma?",
];

export default function AIConversation() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        "Hello! I'm your AI CRM Assistant. I can log interactions, search previous meetings, summarize conversations, edit interactions and recommend the next best action.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to contact the backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
<div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-lg transition-all duration-300 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-blue-100 p-2">
            <Sparkles
              className="text-blue-600"
              size={20}
            />
          </div>

          <div>

            <h2 className="font-semibold">
              AI CRM Assistant
            </h2>

            <p className="text-xs text-gray-500">
              Powered by LangGraph • Groq
            </p>

            <p className="mt-1 text-xs font-medium text-green-600">
              {loading ? "Thinking..." : "Ready to Assist"}
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                text:
                  "Hello! I'm your AI CRM Assistant. I can log interactions, search previous meetings, summarize conversations, edit interactions and recommend the next best action.",
              },
            ])
          }
          className="rounded-lg border p-2 hover:bg-slate-50"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Suggestions */}

      <div className="border-b px-5 py-3">

        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Try asking
        </p>

        <div className="flex flex-wrap gap-2">

          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => setInput(item)}
              className="rounded-full bg-slate-100 px-3 py-2 text-xs hover:bg-slate-200"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Chat */}

      <div className="h-[500px] space-y-5 overflow-y-auto p-5">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`flex max-w-[80%] gap-3 ${
                msg.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >

              <div
                className={`h-fit rounded-full p-2 ${
                  msg.role === "assistant"
                    ? "bg-blue-100"
                    : "bg-slate-200"
                }`}
              >

                {msg.role === "assistant" ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}

              </div>

              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                  msg.role === "assistant"
                    ? "bg-slate-100"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.text}
              </div>

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex">

            <div className="flex max-w-[80%] gap-3">

              <div className="rounded-full bg-blue-100 p-2">
                <Bot size={18} />
              </div>

              <div className="animate-pulse rounded-2xl bg-slate-100 px-4 py-3 text-sm">
                Thinking...
              </div>

            </div>

          </div>

        )}

      </div>

      {/* Input */}

      <div className="flex gap-3 border-t p-5">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask the AI Assistant..."
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          <Send size={20} />
        </button>

      </div>

    </div>
  );
}