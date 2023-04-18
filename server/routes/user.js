import express from "express";
import {createStats ,updateStats, getStats} from "../controllers/userStats.js"

const Routes = express.Router();

/* User Stats Routes */
Routes.post("/stats",createStats);
Routes.patch("/:Id/stats",updateStats);
Routes.get("/:Id/stats",getStats);



export default Routes;