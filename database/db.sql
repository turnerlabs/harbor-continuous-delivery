CREATE TABLE deploymentlogs
(
    id serial primary key,
    buildPlan character varying(255),
    branch character varying(255),
    data json    
)