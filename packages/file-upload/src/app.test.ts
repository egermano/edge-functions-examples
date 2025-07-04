import { createObject } from "azion/storage";
import { app } from "./app";

// Mock the azion/storage module
jest.mock("azion/storage", () => ({
  createObject: jest.fn(),
}));

describe("File Upload API", () => {
  it("should return 400 if no file is provided", async () => {
    const req = new Request("http://localhost/upload", {
      method: "POST",
    });
    const res = await app.request(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ message: "Invalid file" });
  });

  it("should return 413 if file size exceeds 2MB limit", async () => {
    const largeBuffer = Buffer.alloc(3 * 1024 * 1024); // 3MB
    const formData = new FormData();
    formData.append("file", new File([largeBuffer], "largefile.txt"));

    const req = new Request("http://localhost/upload", {
      method: "POST",
      body: formData,
    });
    const res = await app.request(req);
    expect(res.status).toBe(413);
    expect(await res.json()).toEqual({
      message: "File size exceeds 2MB limit",
    });
  });

  it("should return 500 if there is an error during upload", async () => {
    (createObject as jest.Mock).mockResolvedValue({
      error: { message: "Upload failed" },
    });

    const buffer = Buffer.from("test file content");
    const formData = new FormData();
    formData.append("file", new File([buffer], "test.txt"));

    const req = new Request("http://localhost/upload", {
      method: "POST",
      body: formData,
    });
    const res = await app.request(req);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ message: "Error uploading file" });
  });

  it("should return 200 for successful upload", async () => {
    (createObject as jest.Mock).mockResolvedValue({
      data: { key: "test.txt" },
    });

    const buffer = Buffer.from("test file content");
    const formData = new FormData();
    formData.append("file", new File([buffer], "test.txt"));

    const req = new Request("http://localhost/upload", {
      method: "POST",
      body: formData,
    });
    const res = await app.request(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "File uploaded successfully" });
  });
});
