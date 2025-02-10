# event
# Project Setup

## Prerequisites
Make sure you have the following installed on your system:
- Node.js (Latest LTS version recommended)
- MongoDB (For database management)

## Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your `.env` file in the backend with MongoDB connection URI:
   ```sh
   MONGO_URI=mongodb://localhost:27017/your-database-name
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

## Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Database Setup
1. Ensure MongoDB is installed and running locally or use a cloud-based MongoDB service.
2. Create a new database in MongoDB.
3. Update your `.env` file with the correct MongoDB URI.

## Additional Notes
- Ensure both backend and frontend are running simultaneously for proper functionality.
- Modify configurations in `.env` files as per your requirements.

Happy Coding!

