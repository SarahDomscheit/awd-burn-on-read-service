import express from "express";
import {
  showForm,
  createMessage,
  readMessage,
} from "../controller/indexController";

const router = express.Router();

router.get("/", showForm);
router.post("/create", createMessage);
router.get("/message/:id", readMessage);

export default router;
