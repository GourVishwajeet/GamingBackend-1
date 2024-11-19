import { Router } from "express";
import { LiveEvents,LiveMatchInnings,LiveEventsBySportName, UpcomingAll } from "../controllers/liveEvents.controllers.js";
import {SportsByName,TournamentsBySports,FetchAllClasses} from '../controllers/Endpoints.controllers.js'

const routerSportEvents = Router()
        
routerSportEvents.route("/home").post(LiveEvents)
routerSportEvents.route("/home/innings").post(LiveMatchInnings)
routerSportEvents.route("/live/:sportName").get(LiveEventsBySportName)
routerSportEvents.route("/home/upcoming").get(UpcomingAll)
routerSportEvents.route("/:sportName").get(SportsByName)
routerSportEvents.route("/tournament").post(TournamentsBySports)
routerSportEvents.route("/classes").post(FetchAllClasses)





export default routerSportEvents