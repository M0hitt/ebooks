# Angular 19 E-Book Project

## Project Overview
This project is an Angular 19-based e-book platform where users can sign up, log in, purchase books, and read them interactively. Key features include:
- **User Authentication**: Users must sign up and log in to access the platform.
- **Book Purchase**: Users can purchase books from the available collection.
- **Book Reading Progress**: As users read, their progress is automatically saved.
- **Auto-Resume Feature**: When a user reopens a book, it automatically navigates to the last read section with a marker indicating where they left off.

## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (Recommended: v18+)
- **Angular CLI** (Recommended: v19)

## Installation Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/M0hitt/ebooks.git
   cd ebooks
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Development Server**
   ```sh
   ng serve
   ```
   The application will be accessible at `http://localhost:4200/`.

## Features in Detail
1. **User Registration & Login**
   - New users must register through the signup page.
   - Once registered, they can log in with their credentials.

2. **Book Purchasing**
   - Users can browse and purchase available books.
   - Purchased books are stored in their account using local storage.

3. **Reading Progress Tracking**
   - Users can click on any paragraph, and progress will be saved in local storage.
   - When revisiting the book, they will be taken to the last read position.
   - A visual marker will indicate where they last left off.

## Running in Production
To build for production, use:
```sh
ng build --prod
```
Deploy the generated `dist/` folder to a web server of your choice.

## Additional Commands
- **Run Unit Tests**: `ng test`
- **Run End-to-End Tests**: `ng e2e`
- **Linting**: `ng lint`

## Contact
For any issues or contributions, create an issue in the repository or contact @mohitthakurrishu@gmail.com.

Happy Coding! 🚀

