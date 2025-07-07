import { handleRequest } from "./function/index";
import type { CustomEvent } from "./types/event";


export default async function main(event: CustomEvent) {
  return handleRequest({ request: event.request, args: event.args });
}
