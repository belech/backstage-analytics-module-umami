# Backstage Analytics Module: Umami Analytics

This plugin provides an opinionated implementation of the Backstage Analytics API for [umami](https://umami.is/).

## Installation

1. Install the plugin package in your Backstage app:

```sh
# From your Backstage root directory

yarn add --cwd packages/app @belech/plugin-analytics-module-umami
```

2. Wire up the API implementation to your App:

```tsx
// packages/app/src/apis.ts
import {
  analyticsApiRef,
  configApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { UmamiAnalytics } from '@backstage/plugin-analytics-module-umami';

export const apis: AnyApiFactory[] = [
  // Instantiate and register the GA Analytics API Implementation.
  createApiFactory({
    api: analyticsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) =>
      UmamiAnalytics.fromConfig(configApi),
    }),
];
```

3. Configure the plugin in your `app-config.yaml`:

```yaml
  analytics:
    umami:
      enabled: true
      url: http://localhost:4000
      authToken: GENERATED_UMAMI_AUTH_TOKEN
      websiteId: SOME_WEBSITE_ID
```

The websiteId can be retrieved in the umami Dashboard.

For generating the API token, see the [umami documentation](https://umami.is/docs/api).


## Caveats

The event tracking is very rudemantary, as the original purpose of this plugin was just to get a feeling how users navigate through Backstage, as well as umami does not have much options for this.

## Local development

For testing / local development an umami instance needs to be started like described in the [umami documentation](https://umami.is/docs/install). 

A very easy setup would be through docker-compose:

```yaml
---
version: '3'
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      DATABASE_TYPE: postgresql
      HASH_SALT: replace-me-with-a-random-string
    depends_on:
      - db
    restart: always
  db:
    image: postgres:12-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    volumes:
      - ./sql/schema.postgresql.sql:/docker-entrypoint-initdb.d/schema.postgresql.sql:ro
      - umami-db-data:/var/lib/postgresql/data
    restart: always
volumes:
  umami-db-data:
```
