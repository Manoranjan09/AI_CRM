import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

import StructuredForm from "./StructuredForm";
import AIConversation from "./AIConversation";
import AgentStatus from "./AgentStatus";

export default function InteractionTabs() {
  const [activeTab, setActiveTab] = useState<"form" | "chat">("form");

  return (
    <div className="space-y-6">

      {/* Tabs */}

      <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">

        {/* Manual Form */}

        <button
          onClick={() => setActiveTab("form")}
          className={`flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-medium transition-all duration-300 ${
            activeTab === "form"
              ? "scale-[1.02] bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_35px_rgba(37,99,235,0.45)]"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <FileText
            size={22}
            className={
              activeTab === "form"
                ? "text-white"
                : "text-slate-500"
            }
          />

          Structured Form
        </button>

        {/* AI Conversation */}

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-medium transition-all duration-300 ${
            activeTab === "chat"
              ? "scale-[1.02] bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white shadow-[0_10px_35px_rgba(124,58,237,0.45)]"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <Sparkles
            size={22}
            className={
              activeTab === "chat"
                ? "text-white"
                : "text-slate-500"
            }
          />

          AI Conversation
        </button>

      </div>

      {/* Content */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">

          {activeTab === "form" ? (
            <StructuredForm />
          ) : (
            <AIConversation />
          )}

        </div>

        <AgentStatus />

      </div>

    </div>
  );
}