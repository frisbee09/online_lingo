import * as express from "express";
import * as http from "http";
import WebSocket from "ws";

export const app = express();
app.use(express.static("dist/public"));

export const server = http.createServer(app);

// EngineIO options are passed through, but not typed and declared
export const wss = new WebSocket.Server({ server });
