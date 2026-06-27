import express from "express";
import FurinasController from "../controllers/furinas.js";

const router = express.Router();

router.get("/", FurinasController.getFurinas);
router.get("/:id", FurinasController.getFurinaById);
router.post("/", FurinasController.createFurina);
router.put("/:id", FurinasController.updateFurina);
router.delete("/:id", FurinasController.deleteFurina);

export default router;
