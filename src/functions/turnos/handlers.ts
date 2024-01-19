import { app } from "@azure/functions";
import { TurnoController } from "../../Core/Turno/Application/Controller";

const controller = new TurnoController();

app.get("turnosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.turnosGetAll(req, ctx),
	route: "turnos",
});

app.get("turnosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.turnosGetById(req, ctx),
	route: "turnos/{turnoId}",
});

app.deleteRequest("turnosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.turnosDeleteById(req, ctx),
	route: "turnos/{turnoId}",
});

// app.patch("turnosUpdateById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.turnosUpdateById(req, ctx),
// 	route: "turnos/{turnoId}",
// });
