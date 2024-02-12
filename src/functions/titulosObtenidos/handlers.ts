import { app } from "@azure/functions";

import { TituloObtenidoController } from "../../Core/TituloObtenido/Application/Controller";

const controller = new TituloObtenidoController();

app.get("titulosObtenidosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.titulosObtenidosGetAll(req, ctx),
	route: "titulos-obtenidos",
});

app.get("titulosObtenidosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.titulosObtenidosGetById(req, ctx),
	route: "titulos-obtenidos/{tituloObtenidoId}",
});

app.deleteRequest("titulosObtenidosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.titulosObtenidosDeleteById(req, ctx),
	route: "titulos-obtenidos/{tituloObtenidoId}",
});

app.patch("titulosObtenidosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.titulosObtenidosUpdateById(req, ctx),
	route: "titulos-obtenidos/{tituloObtenidoId}",
});
