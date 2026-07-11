from langgraph.graph import StateGraph, END

from app.state import AgentState
from app.services.groq_service import llm

from app.tools.log_interaction import log_interaction
from app.tools.edit_interaction import edit_interaction
from app.tools.search_interaction import search_interaction
from app.tools.summarize_interaction import summarize_interaction
from app.tools.next_best_action import next_best_action


def detect_intent(state: AgentState):

    prompt = f"""
You are an AI CRM Assistant.

Determine which tool should be called.

Available tools:

1. log_interaction
2. edit_interaction
3. search_interaction
4. summarize_interaction
5. next_best_action

Return ONLY one of these tool names.

User:

{state["user_input"]}
"""

    response = llm.invoke(prompt)

    state["intent"] = response.content.strip().lower()

    return state


workflow = StateGraph(AgentState)

# Nodes
workflow.add_node("detect_intent", detect_intent)
workflow.add_node("log_interaction", log_interaction)
workflow.add_node("edit_interaction", edit_interaction)
workflow.add_node("search_interaction", search_interaction)
workflow.add_node("summarize_interaction", summarize_interaction)
workflow.add_node("next_best_action", next_best_action)

workflow.set_entry_point("detect_intent")


def route(state: AgentState):

    intent = state["intent"]

    if intent == "log_interaction":
        return "log_interaction"

    if intent == "edit_interaction":
        return "edit_interaction"

    if intent == "search_interaction":
        return "search_interaction"

    if intent == "summarize_interaction":
        return "summarize_interaction"

    if intent == "next_best_action":
        return "next_best_action"

    return END


workflow.add_conditional_edges(
    "detect_intent",
    route,
)

workflow.add_edge("log_interaction", END)
workflow.add_edge("edit_interaction", END)
workflow.add_edge("search_interaction", END)
workflow.add_edge("summarize_interaction", END)
workflow.add_edge("next_best_action", END)

graph = workflow.compile()