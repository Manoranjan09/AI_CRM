from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.graph.graph import graph

router = APIRouter(
    prefix="/api/chat",
    tags=["AI Agent"],
)


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest):

    result = graph.invoke(
        {
            "user_input": request.message,
            "intent": None,
            "extracted_data": {},
            "tool_result": {},
            "response": "",
            "messages": [],
        }
    )

    return ChatResponse(
        response=result["response"]
    )