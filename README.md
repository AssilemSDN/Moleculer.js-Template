# Moleculer Starter - Generate CRUD Microservices

An extensible Node.js **microservices** template using **Moleculer.js**. Includes a CLI tool to automatically generate CRUD microservices and corresponding **MongoDB** models for a **Moleculer-based project**, using **Mustache templates**. It also updates the API routes configuration and Docker Compose override to seamlessly integrate the new service into your project.

## Features

- **Moleculer.js Framework**  
  Built on the powerful and scalable Moleculer microservices framework, enabling easy development and maintenance of distributed services.

- **CLI Tool: CRUD Service Generation**  
  - Generate a fully functional Moleculer CRUD service using built-in Moleculer DB actions (`create`, `list`, `get`, `update`, `remove`)  
  - Generate a **Mongoose model** with schema based on provided field definitions  
  - Automatically update **API Gateway** routes configuration (`src/config/routes.config.js`) to expose your new service endpoints via **moleculer-web**  
  - **Docker Compose Automation**: Automatically update `docker-compose.override.yaml` to include the new service in your Docker Compose setup  
  - Uses simple **JSON configuration files** to customize service and model generation  
  - Employs **Mustache templates** for flexible and easy-to-maintain code generation  

- **MongoDB Integration**  
  Integrates MongoDB through the Moleculer DB adapter and Mongoose for smooth data persistence, schema validation, and querying.

- **Service Discovery & Load Balancing**  
  Uses **Traefik** reverse proxy for efficient routing and load balancing.