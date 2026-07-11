import json
import re
import dateparser
from app.state import AgentState
from app.services.groq_service import llm
from app.database import SessionLocal
from app.services.interaction_service import create_interaction


def log_interaction(state: AgentState):

    prompt = f"""
You are an AI Healthcare CRM assistant.

Extract the interaction into VALID JSON.

IMPORTANT RULES:
- Return ONLY valid JSON.
- Do NOT wrap the JSON inside ```json
- Do NOT add explanations.
- Do NOT add any text before or after the JSON.
- Use null if information is missing.

Return JSON exactly in this format:

{{
    "hcp_name": "",
    "hospital": "",
    "speciality": "",
    "interaction_type": "",
    "products": "",
    "notes": "",
    "summary": "",
    "follow_up_date": "Natural language date if mentioned, otherwise null"
}}

Conversation:
{state["user_input"]}
"""

    response = llm.invoke(prompt)

    try:
        # Remove markdown if model accidentally returns it
        content = response.content.strip()

        content = re.sub(r"^```json", "", content)
        content = re.sub(r"^```", "", content)
        content = re.sub(r"```$", "", content)

        content = content.strip()

        data = json.loads(content)
        # Convert follow-up date into ISO format
        follow_up = data.get("follow_up_date")

        if follow_up:
            parsed_date = dateparser.parse(follow_up)

            if parsed_date:
                data["follow_up_date"] = parsed_date.date()
            else:
                data["follow_up_date"] = None
        else:
            data["follow_up_date"] = None

    except Exception as e:
        state["response"] = "Unable to extract interaction."
        return state

    try:
        db = SessionLocal()

        interaction = create_interaction(db, data)

        db.close()

    except Exception as e:
        state["response"] = "Failed to save interaction."
        return state

    state["extracted_data"] = data

    state["tool_result"] = {
        "id": interaction.id,
        "hcp_name": interaction.hcp_name,
        "hospital": interaction.hospital,
        "summary": interaction.summary,
        "follow_up_date": interaction.follow_up_date,
    }

    state["response"] = "Interaction logged successfully."

    return state