# Microservices

- Microservices are small, independent and loosely coupled service that can work together.
- Each service is a separate codebase.
- Microservice communicate with each other by defined APIs.
- Can be deployed independently.
- Has its own database and is not shared with other service.

# Microservices Architecture
- Approach to develop a single application as a collection of small servies, each running in its own process and communication with each other with certain mechanism like http.
- Microservice architecture decomposes an application into smmall indepentednt service that communicate with each other over a well defined APIs.
- Service composed of loosely coupled, independently deployable smaller component

# Miroservice Characteristics
- Componentanization
- Decentralized Governance
- Smart endpoint and dumb pipes
- Decentralized Data managements

# Benefit of microservice architecture
- Easier to scale, faster to develop
- Scalable idependently
- Small and seperate code base
  
# Challanges of microservice architecture
- Complexity
- Latency
- Data consistency (transaction operation can be challenging)

# When to use microservice architecture
- Check if application can do without microservice.
- Required to independenly deploy new functionality with zero downtime
- Required to independently scale a portion of application

# When not to use microservice architecture
- Don't do distributed monolith
- Don't do without DevOps or cloud service

# Monolithic vs Microservice
- Monolith simple straight forward struutre of one undivided unit. Microservice has a complex structure that consists of various service and database.
- Monolith app is scaled as whole single unit. Microservice can be scaled unevenly, encourages company to migrate their applications to microservice.
- Monolitic app is fast and easy to deploy. Microservice provied zero downtime deployment and CI/CD automation.

# Database-per-Service Pattern
- Seperate database per service, they function independently, accessed by Rest Api.