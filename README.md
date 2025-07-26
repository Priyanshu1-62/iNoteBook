# iNoteBook
Update: check out the live app [here](https://i-note-book-two.vercel.app) 🚀
---

### 🧰 Tech Stack
- [![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
- [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
- [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
- [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
- [![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#)
- [![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#)
---

### 🗺️ Overview
- iNoteBook is a fully responsive, Vite powered MERN-stack project designed to be your everyday companion for jotting down insights, to recollect inspirations, to reflect on stored Eureka moments, or to preserve hot teas for future gossips !!
- The project follows modular file structure, organized React-components, maintainable and scalable flow of state variables using Context-API, thoughtful user interactions, lucid icons, and comes with Dark mode.
---

### 🧠 State Management
- The project required certain vaiables to be accessible across all React-components. While this can be technically achieved by prop drilling, it would lead to cluttered folder structure and reduced scalability. It would be combursome to add a few more such accessible variables.
- To tacle this, context API is used. Based on the responsibilities, 3 context providers are created - for Authorization, Notes management, Alert management. These contexts envelpoes rest of the app tree to make the necessary variables and functions easily accessible throughout the app.
- The state variables are responsible for authorized entry, restricted notes manipulation, loading spinner management, and to show visually informative Alerts.
---

### 📡 API Integration and Routing
- Fetch-API is used for all Client-to-server communication. Authentication and authorization management routing funcitons include: Signup, Login, Remember me, Logout, Refreshing the session token. Notes management routing functions include: Create, Read, Update, Delete (CRUD) notes.
- To handle expired sessions seamlessly, without need of Logout and re-Login, a refresh mechanism is used in notes management routing functions. This mechanism catches server response status before updating user interface. If the status implies "Session expired", then it tries to renew the session and retries the original request.
- Dynamic routing is incoorporated to include Notes ID into route params for Updating and Deleting notes.
- All routes include structured response handling with consistent and clear Alert messeges for meaningful UI feedback.
- Session tokens are stored in Local storage to persist user sessions across page reloads. The token is later retrived and integrated in request body by routing functions. Since data in local storage is vulnerable to XSS attacks, a system of access and refresh token is used. Access tokens are responsible for authorization and have short life-span, thus reducing the damange window if stolen. Refresh tokens, with longer validity period, are responsible for renewing access tokens periodically and are securely kept in HTTP-only cookies. Read more about it in Authentication and Security section present in Backend repository of this project.
---

### 🪝 React Hooks

---

### 💅 Styling & UX

---

### 🌍 Deployment
- Frontend: [Vercel](https://i-note-book-two.vercel.app)
- Backend: [Render](https://inotebook-server-8i8l.onrender.com)
---

### 📎 Related Repositories
- Frontend: [iNoteBook Backend](https://github.com/Priyanshu1-62/iNoteBook-Server.git)
---

## 📛 Badges Credit
- [shields.io](https://shields.io) for dynamic badge generation  
- [inttter/md-badges](https://github.com/inttter/md-badges) for curated badge styles and inspirations

