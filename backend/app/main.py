from fastapi import FastAPI
from app.routers import dashboard
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
# Import models so SQLAlchemy registers them
from app.models.interaction import Interaction
from app.models.hcp import HCP
from app.routers import search
from app.routers.chat import router as chat_router
from app.routers import hcp
from app.routers import interaction


app = FastAPI(
    title="MediCRM AI",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(chat_router)
app.include_router(hcp.router)
app.include_router(dashboard.router)
app.include_router(search.router)
app.include_router(interaction.router)



@app.get("/")
def home():
    return {
        "message": "MediCRM AI Backend Running"
    }
@app.get("/health")
def health():
    return {
        "status": "ok",
        "ai": "connected"
    }