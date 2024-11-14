import { App } from ".";
import { Stack } from "./types/stack";

export default function gatherEndpoints() {
  const stack = (App._router.stack as Stack).filter((r) => r.route && r.route.methods);

  const endpoints: Record<string, { path: string; methods: string[] }> = {};

  stack.forEach((r) => {
    const path = r.route.path;
    const methods = Object.keys(r.route.methods);

    if (endpoints[path]) {
      endpoints[path].methods.push(...methods);
    } else {
      endpoints[path] = { path, methods };
    }
  });

  return Object.values(endpoints);
}
