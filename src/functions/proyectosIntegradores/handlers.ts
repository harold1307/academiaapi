import { app } from "@azure/functions";
import { ProyectoIntegradorController } from "../../Core/ProyectoIntegrador/Application/Controller";

const controller = new ProyectoIntegradorController();

app.get("proyectosIntegradoresGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.proyectosIntegradoresGetAll(req, ctx),
	route: "proyectos-integradores",
});

app.get("proyectosIntegradoresGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.proyectosIntegradoresGetById(req, ctx),
	route: "proyectos-integradores/{proyectoIntegradorId}",
});

app.post("proyectosIntegradoresCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.proyectosIntegradoresCreate(req, ctx),
	route: "proyectos-integradores",
});

app.deleteRequest("proyectosIntegradoresDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.proyectosIntegradoresDeleteById(req, ctx),
	route: "proyectos-integradores/{proyectoIntegradorId}",
});

app.patch("proyectosIntegradoresUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.proyectosIntegradoresUpdateById(req, ctx),
	route: "proyectos-integradores/{proyectoIntegradorId}",
});

// campos
app.post("proyectosIntegradoresCreateCampo", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.proyectosIntegradoresCreateCampo(req, ctx),
	route: "proyectos-integradores/{proyectoIntegradorId}/campos",
});
