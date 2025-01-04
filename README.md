# PollitosLeague- Francisco
## Overview
This project is a complete League Management Application with a backend API and a frontend user interface. The backend automatically populates the database with sample data, while the frontend allows users to view league information and interact with it.
## Getting Started

### Backend API Setup

1. Clone the backend repository:
   ```bash
   git clone: https://github.com/fjpgtt/pollitos-league-manager/tree/Francisco-repository-implementation
   cd <BACKEND_REPO_DIRECTORY>
   ```

2. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The backend service will start on `http://localhost:8080`. The database will be automatically populated with sample data during initialization.

### Frontend Application Setup

1. Clone the frontend repository:
   ```bash
   git clone: https://github.com/andrei-hernandez/pollitos-league-manager-ui/tree/francisco
   cd <FRONTEND_REPO_DIRECTORY>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the frontend application:
   ```bash
   ng serve
   ```

4. The frontend application will be available at `http://localhost:4200`.

---

## Usage Instructions

### Selecting a League

- Navigate to the main page where the list of leagues is displayed.
- Click on the name of the desired league.
- A message will appear showing the selected league.

### Viewing League Details

- League details, including players, matches, and teams, are displayed in the respective sections.

---

## Notes and Troubleshooting

- Ensure that both the backend and frontend applications are running concurrently for full functionality.
- If port `8080` or `4200` is already in use, stop any processes using these ports or configure alternative ports.
- Use `npm cache clean --force` if dependency installation fails.
- Use `mvn clean install` to rebuild the backend if necessary.

---

## Dependencies

### Backend
- Java 17
- Spring Boot


### Frontend
- Angular CLI
- Node.js and npm

##



