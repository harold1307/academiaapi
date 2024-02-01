import { app } from "@azure/functions";

import { ProgramaController } from "../../Core/Programa/Application/Controller";

const controller = new ProgramaController();

app.get("programasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasGetAll(req, ctx),
	route: "programas",
});

app.get("programasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasGetById(req, ctx),
	route: "programas/{programaId}",
});

app.post("programasCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasCreate(req, ctx),
	route: "programas",
});

app.deleteRequest("programasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasDeleteById(req, ctx),
	route: "programas/{programaId}",
});

app.patch("programasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasUpdateById(req, ctx),
	route: "programas/{programaId}",
});
