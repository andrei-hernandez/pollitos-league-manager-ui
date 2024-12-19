# Welcome to pollitos-league-manager-ui

We are building a UI for a sports league management system. The application will manage two leagues: **Soccer League** and **Baseball League**. The UI will consume APIs that handle the data for these leagues, including teams, players, and matches.

## Features and Functionality

### Pages to Create

- **Home Page:** A dashboard with links to Teams, Players, and Matches modules.
- **Teams Module:**
  - List Teams: Display all teams in the selected league.
  - Create Team: A form to add a new team.
  - Edit Team: A form to update a team’s information.
  - Delete Players: A button to delete all players from a specific team.
- **Players Module:**
  - List Players: Display all players in a specific team.
  - Create Player: A form to add a new player and assign them to a team.
  - Edit Player: A form to update a player’s information.
- **Matches Module:**
  - Create Match: A form to create a match between two teams with their scores.
  - View Matches: Display all matches for a specific team.
  - Delete Matches: A button to delete all matches.

## UI Requirements

- Allow users to switch between the two leagues (Soccer League and Baseball League).
- **Reusable Components:** Use reusable components for forms and tables.
- **Validation:** Ensure valid inputs, such as the number of teams not exceeding the league's limit (default is 10).
- **Styling:** Students can use any CSS framework, library, or custom styles.

## Criteria to Evaluate

### Implementation Requirements

- Use Angular modules for Teams, Players, and Matches.
- Implement routing with lazy loading for the modules.
- Use Angular services for API interactions.
- Log API responses and handle errors gracefully.

### Extra Points

- **Testing:** Create unit tests for components and services using Jasmine and Karma. Add integration tests with Protractor or Cypress.
- **Reusable Interfaces:** Create TypeScript interfaces for entities like Team, Player, and Match.
- **Documentation:** Provide instructions in the README, including:
  - How to set up the project
  - How to run the app
  - How to run tests
  - How to configure the API endpoints

## Folder Structure

```plaintext
src/
├── app/
│   ├── core/                  # Core services, guards, and shared logic
│   │   ├── services/          # Reusable services (e.g., AuthService, ApiService)
│   │   ├── guards/            # Route guards (e.g., AuthGuard)
│   │   ├── interceptors/      # HTTP interceptors
│   │   ├── models/            # Shared interfaces and types
│   │   └── utils/             # Utility functions (pipes or helpers)
│   ├── features/              # Feature-specific modules
│   │   ├── feature1/          # Example: "users" (one folder per feature/module)
│   │   │   ├── components/    # Components related to this feature
│   │   │   ├── pages/         # Main pages/components for routes
│   │   │   └── services/      # Services specific to this module
│   │   └── feature2/
│   ├── shared/                # Shared components, pipes, and modules
│   │   ├── components/        # Common components (e.g., buttons, modals)
│   │   ├── directives/        # Custom directives
│   │   ├── pipes/             # Shared pipes
│   │   └── modules/           # Reusable secondary modules
│   ├── layout/                # Layout components (e.g., header, footer)
│   └── app-routing.module.ts  # Main routing configuration
├── assets/                    # Static files (images, icons, etc.)
├── environments/              # Environment-specific configuration (dev, prod)
├── styles/                    # Global styles (SCSS or CSS)
└── index.html
```

## Project info

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
