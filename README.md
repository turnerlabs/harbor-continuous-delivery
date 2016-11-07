### harbor-continuous-delivery

Continuously deploys harbor builds.  This is a lightweight stopgap solution if you're using buildit and want to automatically deploy every successful build.

**Usage**

- create a shipment based on this image and configure it by adding the following environment variables:

```
BUILD_PLAN=my-build
BRANCH=develop
SHIPMENT=my-app
SHIPMENT_ENVIRONMENT=dev
CONTAINER=my-app
BUILD_TOKEN=
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
```

- OR, use the [compose files in the compose directory](compose) and run  `harbor-compose up`

- then, after triggering the shipment, your builds for the specified branch will be deployed.  In the example above, every git push to the develop branch will be deployed to the my-app dev environment.

- also included is a realtime UI that shows the configuration and deployment logs.