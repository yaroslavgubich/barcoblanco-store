from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/")
async def get():
    return JSONResponse(content={"message": "Hello, World!", "code": 200})

