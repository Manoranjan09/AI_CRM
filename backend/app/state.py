from typing import TypedDict, List, Optional


class AgentState(TypedDict):
    user_input: str
    intent: Optional[str]

    extracted_data: dict

    tool_result: dict

    response: str

    messages: List[str]