import { app } from "@azure/functions";

import { PerfilPracticaController } from "../../Core/PerfilPractica/Application/Controller";

const controller = new PerfilPracticaController();

app.get("perfilesPracticaGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.perfilesPracticaGetAll(req, ctx),
	route: "perfiles-practica",
});

app.get("perfilesPracticaGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.perfilesPracticaGetById(req, ctx),
	route: "perfiles-practica/{perfilPracticaId}",
});

app.post("perfilesPracticaCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.perfilesPracticaCreate(req, ctx),
	route: "perfiles-practica",
});

app.deleteRequest("perfilesPracticaDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.perfilesPracticaDeleteById(req, ctx),
	route: "perfiles-practica/{perfilPracticaId}",
});

app.patch("perfilesPracticaUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.perfilesPracticaUpdateById(req, ctx),
	route: "perfiles-practica/{perfilPracticaId}",
});
