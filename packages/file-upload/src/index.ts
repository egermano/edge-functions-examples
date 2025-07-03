import type { AzionBucketObject, AzionStorageResponse } from "azion/storage";
import { createObject } from "azion/storage";
import dotenv from "dotenv";
import { Hono } from "hono";
import { fire } from "hono/service-worker";

dotenv.config();

const app = new Hono();

app.post("/upload", async (c) => {
  const body = await c.req.parseBody();
  const file = body["file"]; // File | string

  if (
    !file ||
    typeof file !== "object" ||
    typeof file.arrayBuffer !== "function"
  ) {
    return c.json({ message: "Invalid file" }, 400);
  }

  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    return c.json({ message: "File size exceeds 2MB limit" }, 413);
  }

  if (!file) {
    return c.json({ message: "File not found" }, 400);
  }

  try {
    const { data: newObject, error }: AzionStorageResponse<AzionBucketObject> =
      await createObject({
        bucket: process.env.BUCKET_NAME!,
        key: file.name,
        // @ts-ignore
        content: await file.arrayBuffer(),
      });

    if (error) {
      throw new Error(error.message);
    }

    if (newObject) {
      console.log(`Object created with key: ${newObject.key}`);
      console.log(`Object content: ${newObject.content}`);
    } else {
      console.error("Failed to create object", error);
    }

    return c.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return c.json({ message: "Error uploading file" }, 500);
  }
});

fire(app);
