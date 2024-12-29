# Admin Next.js Application

## **Project Description**

This is an admin dashboard application built with **Next.js**. The project utilizes **Redux Toolkit** for state management. It is structured for scalability and maintainability, ensuring ease of development as the application grows.

---

## **Features**

- Dark and Light Theme Toggle using Redux Toolkit
- Modular and scalable folder structure
- Optimized for server-side rendering with Next.js
- Middleware support for custom request handling

---

## **Current Folder Structure**

```
src/
├── app/                   # Next.js app directory
│   ├── api/               # API routes (server-side logic)
│   ├── components/        # Shared React components
│   ├── features/          # Specific features of the app (e.g., auth, theme)
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components
│   ├── pages/             # Static and dynamic pages
│   ├── styles/            # Global and module CSS/SCSS files
│   ├── store/             # Redux store and slices
│   ├── themes/            # Theme-related configurations
│   └── middleware.js      # Middleware logic
├── public/                # Public assets (images, fonts, etc.)
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration file
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration (optional)
└── README.md              # Project documentation
```

---

## **Components**

### **1. ThemeToggle Component**

- Displays the current theme (dark or light).
- Provides a button to toggle between themes.

### **2. Middleware**

- Handles custom request processing for the application.

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd admin-nextjs
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Run the Development Server**

```bash
npm run dev
```

- Local: [http://localhost:3000](http://localhost:3000)
- Network: Check the console for the network-accessible URL.

### **4. Build for Production**

```bash
npm run build
```

### **5. Start the Production Server**

```bash
npm start
```

---

## **Current Issues and Fixes**

1. **Middleware Export Error**

   - Ensure the `middleware.js` file exports a valid `middleware` function.

   ```javascript
   import { NextResponse } from 'next/server'

   export function middleware(req) {
     return NextResponse.next()
   }
   ```

2. **themeReducer Reference Error**
   - Ensure the reducer is correctly imported in `store/index.js`.
   ```javascript
   import themeReducer from '../features/theme/themeSlice'
   ```

---

## **Technologies Used**

- Next.js
- Redux Toolkit
- React
- JavaScript (ES6+)
- Middleware for request handling

---

## **Contributing**

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to your branch: `git push origin feature-name`.
5. Create a Pull Request.

---

## **License**

This project is licensed under the MIT License.
