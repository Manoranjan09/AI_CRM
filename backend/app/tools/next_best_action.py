import json
import re

from app.state import AgentState
from app.services.groq_service import llm
from app.database import SessionLocal
from app.models.interaction import Interaction
from app.services.interaction_service import get_doctor_history


def next_best_action(state: AgentState):

    extract_prompt = f"""
Extract the doctor's name.

If no doctor is mentioned return:

{{
    "hcp_name":""
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

        state["response"] = "Unable to understand request."
        return state

    doctor = data.get("hcp_name", "").strip()

    db = SessionLocal()

    if doctor == "":
        interactions = (
            db.query(Interaction)
            .order_by(Interaction.created_at.desc())
            .all()
        )
    else:
        interactions = get_doctor_history(db, doctor)

    db.close()

    if not interactions:

        state["response"] = "No interaction history found."
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

    recommendation_prompt = f"""
You are an experienced Pharmaceutical CRM AI Assistant.

Analyze the interaction history and provide the next best actions.

Return:

1. Relationship overview
2. Doctors requiring attention
3. Upcoming follow-ups
4. Recommended next action
5. Talking points for the next meeting

Interaction History:

{history}
"""

    recommendation = llm.invoke(recommendation_prompt)

    state["tool_result"] = history
    state["response"] = recommendation.content

    return state