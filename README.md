# M233 Abschlussarbeit

This is a Spring Boot application for managing room reservations.

## Prerequisites

- Java 17
- Docker

## Build and Run

1. **Build the project:**
   - On Windows: `mvnw.cmd clean install`
   - On Linux/macOS: `./mvnw clean install`

2. **Start the database:**
   `docker-compose up -d`

3. **Run the application:**
   Run the `M233AbschlussarbeitApplication` class from your IDE.

The application will be available at `http://localhost:8080`.

## API Endpoints

- `POST /api/reservations`: Create a new reservation.
- `GET /api/reservations`: Get all reservations.
- `GET /api/reservations/{publicKey}`: Get a reservation by its public key.
- `PUT /api/reservations/{privateKey}`: Update a reservation by its private key.
- `DELETE /api/reservations/{privateKey}`: Delete a reservation by its private key.

## Documentation

The documentation is located in the `Doku` folder:
- `class-diagram.md`: UML class diagram
- `erd-diagram.md`: ERD diagram
- `state-diagram.md`: State diagram
