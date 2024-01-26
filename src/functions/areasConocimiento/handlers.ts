import { app } from "@azure/functions";

import { AreaConocimientoController } from "../../Core/AreaConocimiento/Application/Controller";

const controller = new AreaConocimientoController();

app.get("areasConocimientoGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.areasConocimientoGetAll(req, ctx),
	route: "areas-conocimiento",
});

app.get("areasConocimientoGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.areasConocimientoGetById(req, ctx),
	route: "areas-conocimiento/{asignaturaId}",
});

app.post("areasConocimientoCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.areasConocimientoCreate(req, ctx),
	route: "areas-conocimiento",
});

app.patch("areasConocimientoUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.areasConocimientoUpdateById(req, ctx),
	route: "areas-conocimiento/{asignaturaId}",
});

app.deleteRequest("areasConocimientoDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.areasConocimientoDeleteById(req, ctx),
	route: "areas-conocimiento/{asignaturaId}",
});
