from fastapi import FastAPI
import uvicorn
from backend.main import app as backend_app

# Vercel Serverless Function entry point
# This effectively mounts the FastAPI app from backend.main
app = backend_app
