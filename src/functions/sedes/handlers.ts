import { app } from "@azure/functions";

import { SedeController } from "../../Core/Sede/Application/Controller";

const controller = new SedeController();

app.get("sedesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sedesGetAll(req, ctx),
	route: "sedes",
});

app.get("sedesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sedesGetById(req, ctx),
	route: "sedes/{sedeId}",
});

app.post("sedesCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sedesCreate(req, ctx),
	route: "sedes",
});

app.deleteRequest("sedesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sedesDeleteById(req, ctx),
	route: "sedes/{sedeId}",
});

app.patch("sedesUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.sedesUpdateById(req, ctx),
	route: "sedes/{sedeId}",
});
