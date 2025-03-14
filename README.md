# 📁 Files Upload Backend

🚀 A simple upload to R2 API, using Fastify, Swagger, Result Pattern & Zod.

## 📖 About
This project is designed to provide a simple backend service for uploading files to the R2 API. It uses Fastify for the server, Swagger for API documentation, the Result Pattern for error handling, and Zod for schema validation.

## 🚀 Getting Started
### Prerequisites
- Node.js
- PNPM

### Installation

```bash
# Clone the repository
git clone https://github.com/caiolandgraf/files-upload-backend.git

# Navigate to the project directory
cd files-upload-backend

# Install dependencies
pnpm install
```

### Running the Server

```bash
# Start the development server
pnpm run dev

# Build the project
pnpm run build
```

## 📦 Usage
Once the server is running, you can access the API documentation at http://localhost:3000/docs.

#### API Endpoints
- Upload File: POST `/upload`
- Get File: GET `/files/:id`

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📜 License
This project is licensed under the ISC License.

---

Made with 💻, ☕, and a bit of 🪄 by [@caiolandgraf](https://github.com/caiolandgraf)
