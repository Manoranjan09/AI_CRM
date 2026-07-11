import {
  Brain,
  Database,
  Search,
  Bot,
  Sparkles,
  CheckCircle2,
  Cpu,
  Server,
} from "lucide-react";

export default function AgentStatus() {
  return (
<div className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl">
      {/* Header */}

      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-3 shadow-lg shadow-blue-600/30">
            <Bot size={24} />
          </div>

          <div>

            <h2 className="text-xl font-bold">
              LangGraph AI Workflow
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Multi-step AI reasoning pipeline
            </p>

          </div>

        </div>

      </div>

      {/* AI Status */}

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-400">
              AI Engine
            </p>

            <p className="font-semibold">
              LangGraph + Groq
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-green-400">

            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

            Online

          </div>

        </div>

      </div>

      {/* Workflow */}

      <div className="space-y-4 p-5">

        <WorkflowItem
          icon={Search}
          title="User Query"
          value="Natural language received"
          color="text-cyan-400"
        />

        <WorkflowItem
          icon={Brain}
          title="Intent Analysis"
          value="Interaction Logging"
          color="text-violet-400"
        />

        <WorkflowItem
          icon={Sparkles}
          title="Entity Extraction"
          value="Doctor • Hospital • Product"
          color="text-yellow-400"
        />

        <WorkflowItem
          icon={Cpu}
          title="LangGraph Agent"
          value="Tool Selected"
          color="text-blue-400"
        />

        <WorkflowItem
          icon={Database}
          title="Database"
          value="Ready to Save"
          color="text-green-400"
        />

      </div>

      {/* Capabilities */}

      <div className="border-t border-slate-800 bg-slate-950 p-5">

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          AI Capabilities
        </h3>

        <div className="space-y-3">

          <Capability text="Log CRM Interactions" />

          <Capability text="Search Previous Meetings" />

          <Capability text="Generate Summaries" />

          <Capability text="Recommend Next Best Action" />

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 bg-slate-900 px-5 py-4">

        <div className="flex items-center justify-between text-sm">

          <div className="flex items-center gap-2 text-green-400">

            <Server size={16} />

            Backend Connected

          </div>

          <div className="text-slate-400">

            AI Ready

          </div>

        </div>

      </div>

    </div>
  );
}

interface WorkflowItemProps {
  icon: any;
  title: string;
  value: string;
  color: string;
}

function WorkflowItem({
  icon: Icon,
  title,
  value,
  color,
}: WorkflowItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-800/60 p-4 transition hover:border-blue-500 hover:bg-slate-800">

      <div className="rounded-lg bg-slate-700 p-2">
        <Icon className={color} size={18} />
      </div>

      <div className="flex-1">

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <p className="mt-1 font-medium">
          {value}
        </p>

      </div>

      <CheckCircle2
        size={18}
        className="text-green-400"
      />

    </div>
  );
}

function Capability({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={18}
        className="text-green-400"
      />

      <span className="text-sm">
        {text}
      </span>

    </div>
  );
}