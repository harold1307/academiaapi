import { app } from "@azure/functions";

import { GrupoController } from "../../Core/Grupo/Application/Controller";

const controller = new GrupoController();

app.get("gruposGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.gruposGetAll(req, ctx),
	route: "grupos",
});

app.get("gruposGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.gruposGetById(req, ctx),
	route: "grupos/{grupoId}",
});

app.post("gruposCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.gruposCreate(req, ctx),
	route: "grupos",
});

app.deleteRequest("gruposDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.gruposDeleteById(req, ctx),
	route: "grupos/{grupoId}",
});

app.patch("gruposUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.gruposUpdateById(req, ctx),
	route: "grupos/{grupoId}",
});
