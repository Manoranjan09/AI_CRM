import json
import re

from app.state import AgentState
from app.services.groq_service import llm
from app.database import SessionLocal
from app.services.interaction_service import search_interactions


def search_interaction(state: AgentState):

    prompt = f"""
Extract ONLY the search keyword.

Return JSON only.

Example:

{{
    "query":"Dr Sharma"
}}

User:

{state["user_input"]}
"""

    response = llm.invoke(prompt)

    try:

        content = response.content.strip()

        content = re.sub(r"^```json", "", content)
        content = re.sub(r"^```", "", content)
        content = re.sub(r"```$", "", content)

        data = json.loads(content)

    except Exception:

        state["response"] = "Unable to understand search."

        return state

    query = data["query"]

    db = SessionLocal()

    results = search_interactions(
        db,
        query,
    )

    db.close()

    if len(results) == 0:

        state["response"] = "No interactions found."

        return state

    interactions = []

    for interaction in results:

        interactions.append(
            {
                "id": interaction.id,
                "hcp_name": interaction.hcp_name,
                "hospital": interaction.hospital,
                "products": interaction.products,
                "summary": interaction.summary,
                "follow_up_date": interaction.follow_up_date,
            }
        )

    state["tool_result"] = interactions

    state["response"] = f"Found {len(interactions)} interaction(s)."

    return state