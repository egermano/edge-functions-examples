import { ImageMagick } from "@imagemagick/magick-wasm";
import { Hono } from "hono";

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

  const sourceBytes = new Uint8Array(await file.arrayBuffer());

  let result = ImageMagick.read(sourceBytes, (img): Uint8Array => {
    // resize the image
    img.resize(500, 500);
    // add a blur of 60x5
    img.blur(60, 5);

    return img.write((data) => data);
  });

  return c.body(result, 200, {
    "Content-Type": "image/png",
    "Content-Disposition": `attachment; filename="${file.name}"`,
  });
});

export { app };
