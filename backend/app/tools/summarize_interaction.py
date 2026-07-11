import json
import re

from app.state import AgentState
from app.services.groq_service import llm
from app.database import SessionLocal
from app.models.interaction import Interaction
from app.services.interaction_service import get_interactions_by_query


def summarize_interaction(state: AgentState):

    extract_prompt = f"""
Extract the doctor, hospital or product that the user wants summarized.

If the user does NOT mention any specific doctor, hospital or product,
return:

{{
    "query": ""
}}

Return JSON only.

User:

{state["user_input"]}
"""

    response = llm.invoke(extract_prompt)

    try:
        content = response.content.strip()

        content = re.sub(r"^```json", "", content)
        content = re.sub(r"^```", "", content)
        content = re.sub(r"```$", "", content)

        data = json.loads(content)

    except Exception:

        state["response"] = "Unable to understand summary request."
        return state

    query = data.get("query", "").strip()

    db = SessionLocal()

    if query == "":
        interactions = (
            db.query(Interaction)
            .order_by(Interaction.created_at.desc())
            .all()
        )
    else:
        interactions = get_interactions_by_query(db, query)

    db.close()

    if not interactions:
        state["response"] = "No interactions found."
        return state

    history = ""

    for interaction in interactions:

        history += f"""
Doctor: {interaction.hcp_name}
Hospital: {interaction.hospital}
Products: {interaction.products}
Summary: {interaction.summary}
Notes: {interaction.notes}
Follow Up: {interaction.follow_up_date}

"""

    summary_prompt = f"""
You are an AI Healthcare CRM Assistant.

Summarize these CRM interactions professionally.

Include:

• Overall activity
• Doctors involved
• Frequently discussed products
• Important follow-ups
• Key observations

Interaction History:

{history}
"""

    summary = llm.invoke(summary_prompt)

    state["tool_result"] = history
    state["response"] = summary.content

    return state