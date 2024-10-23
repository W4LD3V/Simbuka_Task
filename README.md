#### Project Instructions:

1. Ensure you have Node and React installed on your system.
2. Clone the project repository to your local machine.
3. Open a terminal and navigate to the project directory.
4. Run `npm install` to install the necesarry dependencies.
5. IMPORTANT: In order to login create .env file in the root project directory with the following variables, for example: `VITE_ADMIN_USERNAME=admin && VITE_ADMIN_PASSWORD=admin123`
6. Run the project with the following command `npm run dev`.
7. Access the application by navigating to http://localhost:5173 in your web browser.
8. Log in with the credentials you specified in the .env file.

#### Project Task Fulfillment

1. Created a react-powered table using the data fetched from Simbuka API. For details, see the 'src/Table.jsx' and 'src/services/api.jsx' files. Sorting, filtering and searching logic is defined in 'App.jsx'.

2. Implemented pagination and custom row count logic.

3. Added 'Show more information' dialog element in a new column.

4. Added styling with responsive and dark mode design.

5. Wrote some simple tests.

6. Saved user token to localstorage with an expiration date.

7. Added login form where a user can login using the credentials provided in .env file.

TO DO:
Modified API calling using requests parameters - page, size.
Dark mode integration
Manual and timeout logout.
