import { defineRailway, github, preserve, project, service } from "railway/iac";

export default defineRailway(() => {
  const smolPodcaster = github("swyxio/smol-podcaster", { checkSuites: false });

  const worker = service("worker", {
    source: smolPodcaster,
    build: { builder: "NIXPACKS" },
    deploy: {
      runtime: "V2",
      sleepApplication: false,
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 10,
    },
    start: "gunicorn web:app",
    replicas: { "us-west2": 1 },
    env: {
      ANTHROPIC_API_KEY: preserve(),
      OPENAI_API_KEY: preserve(),
      REPLICATE_API_TOKEN: preserve(),
    },
  });
  const web = service("web", {
    source: smolPodcaster,
    build: { builder: "NIXPACKS" },
    deploy: {
      runtime: "V2",
      sleepApplication: false,
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 10,
    },
    start: "gunicorn web:app",
    replicas: { "us-west2": 1 },
    env: {
      ANTHROPIC_API_KEY: preserve(),
      OPENAI_API_KEY: preserve(),
      REPLICATE_API_TOKEN: preserve(),
    },
  });

  return project("swyx-podcaster", {
    resources: [worker, web],
  });
});
