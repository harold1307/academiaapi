import { app } from "@azure/functions";

import { AsignaturaController } from "../../Core/Asignatura/Application/Controller";

const controller = new AsignaturaController();

app.get("asignaturasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasGetAll(req, ctx),
	route: "asignaturas",
});

app.get("asignaturasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasGetById(req, ctx),
	route: "asignaturas/{asignaturaId}",
});

app.post("asignaturasCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasCreate(req, ctx),
	route: "asignaturas",
});

app.patch("asignaturasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasUpdateById(req, ctx),
	route: "asignaturas/{asignaturaId}",
});

app.deleteRequest("asignaturasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasDeleteById(req, ctx),
	route: "asignaturas/{asignaturaId}",
});
