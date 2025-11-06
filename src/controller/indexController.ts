import { Request, Response } from "express";
import { sanitizeMessage } from "../utils/sanitize";
import * as path from "node:path";
import { readFile, unlink, writeFile } from "node:fs/promises";

export async function showForm(req: Request, res: Response) {
  res.render("form.html", { title: "Burn-on-read" });
}

export async function createMessage(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { message } = req.body;
    const santitizedMessage = sanitizeMessage(message);
    const messageId = crypto.randomUUID();
    const filePath = path.join(__dirname, "../messages", `${messageId}.txt`);
    await writeFile(filePath, santitizedMessage, { encoding: "utf-8" });
    const shareLink = `${req.protocol}://${req.get("host")}/message/${messageId}`;

    res.render("link.html", { title: "Share your message", shareLink });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).send("Error saving your message");
  }
}

export async function readMessage(req: Request, res: Response) {
  try {
    const messageId = req.params.id;
    const filePath = path.join(__dirname, "../messages", `${messageId}.txt`);
    const message = await readFile(filePath, "utf-8");

    await unlink(filePath);

    res.render("message.html", {
      title: "Message",
      message,
    });
  } catch (error) {
    console.error("Error reading message:", error);
    res
      .status(404)
      .render("error.html", {
        title: "Message not found",
        message: "This message has already been read or destroyed",
      });
  }
}
