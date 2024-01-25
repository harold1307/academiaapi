import { app } from "@azure/functions";
import { CampoProyectoIntegradorController } from "../../Core/CampoProyectoIntegrador/Application/Controller";

const controller = new CampoProyectoIntegradorController();

app.get("camposProyectoIntegradorGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposProyectoIntegradorGetAll(req, ctx),
	route: "campos-proyectos-integradores",
});

app.get("camposProyectoIntegradorGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposProyectoIntegradorGetById(req, ctx),
	route: "campos-proyectos-integradores/{campoProyectoIntegradorId}",
});

app.deleteRequest("camposProyectoIntegradorDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.camposProyectoIntegradorDeleteById(req, ctx),
	route: "campos-proyectos-integradores/{campoProyectoIntegradorId}",
});

app.patch("camposProyectoIntegradorUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.camposProyectoIntegradorUpdateById(req, ctx),
	route: "campos-proyectos-integradores/{campoProyectoIntegradorId}",
});
