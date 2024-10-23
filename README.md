#### Project Instructions:

1. Ensure you have Node and React installed on your system.
2. Clone the project repository to your local machine.
3. Open a terminal and navigate to the project directory.
4. Run `npm install` to install the necesarry dependencies.
5. IMPORTANT: In order to login create .env file in the root project directory with the following variables, for example: `VITE_ADMIN_USERNAME=admin && VITE_ADMIN_PASSWORD=admin123`. Also you need to insert the api link using this variable inside .env file: `VITE_API_URL`.
6. Run the project with the following command `npm run dev`.
7. Access the application by navigating to http://localhost:5173 in your web browser.
8. Log in with the credentials you specified in the .env file.

#### Project Task Fulfillment

1. React Table: A dynamic table displaying employee data with sorting (by first/last name), filtering (by gender), and searching functionality.

2. Pagination and Row Count: Includes pagination controls for navigating through pages and selecting the number of rows displayed per page (5, 10, 20, 50).

3. More Information Dialog: A "More Information" button opens a dialog showing additional details about the employee.

4. Dark Mode and Responsive Design: A dark mode toggle and fully responsive design for optimal viewing on various devices.

5. Authentication: Login functionality using credentials from the `.env` file, managing user sessions via localStorage.

6. Caching: API data is cached in localStorage with a 10-minute expiration to improve performance.

7. Playwright Testing: Includes automated tests for login functionality and searching employee data using Playwright.
