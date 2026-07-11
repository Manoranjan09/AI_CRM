import json
import re
import dateparser

from app.state import AgentState
from app.services.groq_service import llm
from app.database import SessionLocal
from app.services.interaction_service import update_interaction


def edit_interaction(state: AgentState):

    prompt = f"""
You are an AI Healthcare CRM assistant.

Your job is to understand a user's request to update an existing interaction.

Return ONLY valid JSON.

No markdown.
No explanation.
No extra text.

IMPORTANT RULES

1. "hcp_name" is the EXISTING doctor's name used to find the interaction.

2. If the user wants to rename the doctor, include the NEW doctor name inside updates.hcp_name.

Example:

User:
Change doctor name from Yash Raj to Dr Yash

Return:

{{
    "hcp_name": "Yash Raj",
    "updates": {{
        "hcp_name": "Dr Yash"
    }}
}}

Another Example:

User:
Update hospital of Dr Sharma to Apollo Hospital

Return:

{{
    "hcp_name": "Dr Sharma",
    "updates": {{
        "hospital": "Apollo Hospital"
    }}
}}

Only include fields that are actually changing.

Allowed update fields:

- hcp_name
- hospital
- speciality
- interaction_type
- products
- notes
- summary
- follow_up_date

User Request:

{state["user_input"]}
"""

    response = llm.invoke(prompt)

    try:

        content = response.content.strip()

        content = re.sub(r"^```json", "", content)
        content = re.sub(r"^```", "", content)
        content = re.sub(r"```$", "", content)

        content = content.strip()

        data = json.loads(content)

       

    except Exception as e:

        print(e)

        state["response"] = "Unable to understand update request."

        return state

    hcp_name = data.get("hcp_name")

    updates = data.get("updates", {})

    # Parse follow-up date if provided
    if "follow_up_date" in updates:

        follow_up = updates.get("follow_up_date")

        if follow_up:

            parsed = dateparser.parse(follow_up)

            if parsed:
                updates["follow_up_date"] = parsed.date()
            else:
                updates["follow_up_date"] = None

    db = SessionLocal()

    interaction = update_interaction(
        db=db,
        hcp_name=hcp_name,
        updates=updates,
    )

    db.close()

    if interaction is None:

        state["response"] = "Interaction not found."

        return state

    state["tool_result"] = {
        "id": interaction.id,
        "hcp_name": interaction.hcp_name,
        "summary": interaction.summary,
    }

    state["response"] = "Interaction updated successfully."

    return state