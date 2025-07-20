# Software Requirements Specification (SRS) for Gujarat Info New

## 1. Introduction

This document outlines the software requirements for the "Gujarat Info New" application. It aims to provide a clear understanding of the functionalities, features, and constraints of the system.

## 2. Overall Description

"Gujarat Info New" appears to be a comprehensive Angular web application designed to provide information, potentially related to Gujarat. It includes features for user authentication, content management (implied by SEO and file manager), and a focus on user experience with loading indicators and animations.

## 3. Functional Requirements

### 3.1 User Management
*   **User Authentication:** The system shall allow users to log in and out, managing their authentication state and storing user information and JWT tokens in cookies. Authentication involves GraphQL queries for token validation.
*   **Session Management:** The system shall manage user sessions, including saving and clearing session data. It shall validate user sessions by communicating with a backend GraphQL endpoint (`VALIDATE_TOKEN` query) and redirect users based on session validity and email verification status.
*   **User Data Management:** The system shall store and retrieve user public information (id, firstname, middlename, lastname, number, number_verified, role_id, email, email_verified, username), including the ability to update user image URLs.
*   **Email Verification:** The system shall support email verification for authenticated users, redirecting them to a verification page if their email is not verified.
*   **Role-Based Access Control:** The system shall support checking user roles via GraphQL queries (`HAS_ROLE` query) to manage access to certain features or content.

### 3.2 Content Management
*   **SEO Integration:** The system shall dynamically update page titles and meta tags (description, keywords, robots, Open Graph image, Twitter image) based on route data to optimize for search engines and social media sharing.
*   **File Management:** The system shall include a file manager module, with specific handling for `/file-manager/folders/` and `/file-manager/details/` routes.

### 3.3 User Interface & Experience
*   **Loading Indicators:** The system shall display a loading indicator during navigation, with specific exceptions for file manager sub-routes.
*   **Animations:** The system shall incorporate animations for visual transitions (e.g., `fadeInOut`).

## 4. Non-Functional Requirements

### 4.1 Performance
*   The system shall provide a responsive user interface, indicated by the use of loading indicators during navigation.

### 4.2 Security
*   The system shall handle user authentication and session management securely, utilizing cookies for token and user data storage and validating sessions via a backend API.

### 4.3 Maintainability
*   The application is built with Angular, promoting a modular and maintainable codebase.

### 4.4 Usability
*   The application aims for a good user experience through loading indicators and animations.

## 5. System Architecture (High-Level)

The application is a client-side rendered (CSR) Angular application, interacting with a backend GraphQL API for data persistence and authentication. The presence of `server.ts` and `netlify-functions/ssr.js` suggests potential for Server-Side Rendering (SSR) or API functions.

## 6. Technologies Used

*   **Frontend:** Angular (TypeScript, HTML, SCSS)
*   **Build Tools:** npm/yarn (based on `package.json`)
*   **SEO:** Custom `SEOService` utilizing `@angular/platform-browser`'s `Title` and `Meta` services.
*   **Routing:** Angular Router
*   **State Management:** Implied by services like `SessionService`, `AuthenticationService` (using `BehaviorSubject`)
*   **Animations:** Angular Animations
*   **Cookie Management:** `ngx-cookie-service`
*   **API Communication:** Apollo Client for GraphQL queries (e.g., `VALIDATE_TOKEN`, `HAS_ROLE`)

## 7. Future Considerations

*   Further analysis of backend interactions and API specifications is required.
*   Detailed requirements for specific content types and their management within the file manager.
