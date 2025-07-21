
# Migrating from `auth` to `authentication`

This document outlines the process of removing the old `auth` module and migrating to the new `authentication` module.

## Analysis

An analysis of the codebase revealed that the `auth` module is an older, deprecated module that is no longer being actively developed. The `authentication` module is the newer, more feature-complete module that should be used instead.

The following is a summary of the findings from the analysis:

*   The `authentication` module includes a `verify-email` component that is missing from the `auth` module.
*   The `authentication` module imports the `FormsModule` and `ReactiveFormsModule`, which are essential for handling forms in Angular. The `auth` module lacks these imports.
*   The `AuthGuard` and `RolesGuard` are tied to the `auth` module's routing, while the `NewAuthGuard` and `RoleGuard` are aligned with the `authentication` module.
*   The `header.component.ts` is tightly coupled to the `auth` module and its associated services, while the `admin-header.component.ts` is aligned with the newer `authentication` module.

## Task List

The following is a comprehensive task list for removing the `auth` module:

1.  **Verify `authentication` Module Functionality**:
    *   Confirm that the `authentication` module correctly implements all the features present in the `auth` module (login, registration, forgot password, reset password).
    *   Ensure that the `authentication` module correctly uses the `AuthService`, `UserService`, and `ToastService`.
    *   Verify that the `authentication` module correctly handles Google and Facebook authentication (or that this functionality is no longer needed).

2.  **Update `header.component.ts`**:
    *   Modify `header.component.ts` to use `AuthenticationService` instead of `AuthService` and `UserService`.
    *   Update the `logout()` method to call the `logout()` method on the `AuthenticationService`.
    *   Update the role-checking methods (`isAdmin()`, `isMaster()`, `isUser()`) to use the `AuthenticationService` to get the user's roles.
    *   Update the `validateImage()` method to use the correct backend endpoint for fetching profile images, which is likely associated with the `authentication` module.

3.  **Update Application Routing and Guards**:
    *   In `src/app/app-routing.module.ts`, replace all instances of `AuthGuard` with `NewAuthGuard`.
    *   In `src/app/app-routing.module.ts`, replace all instances of `RolesGuard` with `RoleGuard`.
    *   Review the route data for the routes that were using `RolesGuard` and ensure that the `roleCode` property is correctly configured for the `RoleGuard`.

4.  **Update `app-routing.module.ts`**:
    *   In `src/app/app-routing.module.ts`, remove the route definition for the `auth` module.

5.  **Delete the `auth` module directory**:
    *   Remove the entire `src/app/module/auth` directory.

6.  **Delete Old Guard Files**:
    *   Delete `src/app/common/guards/auth.guard.ts`.
    *   Delete `src/app/common/guards/roles.guard.ts`.

7.  **Verify the application**:
    *   Thoroughly test the entire authentication and authorization flow, including login, registration, password reset, and role-based access control.
    *   Pay close attention to the functionality of the main header and the admin header to ensure that they are working correctly.
    *   Check the browser console for any errors related to the removal of the `auth` module and the old guards.
    *   Perform a full regression test of the application to ensure that the changes have not introduced any unexpected side effects.
