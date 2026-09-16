# Railway infrastructure

`.railway/railway.ts` manages both existing services in the swyx-podcaster production project. It replaces the former root `railway.json` and retains its effective build and deployment settings. The worker deliberately keeps the deployed `gunicorn web:app` command; the former file also applied that command to the worker, overriding its dashboard Celery command.

Railway stops reading the former Config as Code files on December 1, 2026. See [Railway migration documentation](https://docs.railway.com/infrastructure-as-code#migrating-from-config-as-code).

The existing Railway defaults are `ON_FAILURE` with 10 retries and sleeping disabled. Railway normalizes those values out of its raw configuration, so the authoring file omits them to keep subsequent plans empty. Live service and deployment readback verified those defaults after migration.

Secrets stay on Railway through `preserve()` references. Do not import decrypted variable values into this file.

Install the pinned SDK and preview configuration changes:

```sh
pnpm --dir .railway install --ignore-workspace --frozen-lockfile
railway link --project 65c05fb9-9755-4db7-9b4a-edd47d918f9b --environment production
railway config plan
```

After reviewing the complete project plan, apply it with `railway config apply`. Source pushes to `main` deploy the connected services; `.railway` changes require a reviewed config apply.
