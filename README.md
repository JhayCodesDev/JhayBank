# 🏦 JhayBank – Digital Banking Simulation

JhayBank is an interactive digital banking simulation built with HTML, CSS, and JavaScript, designed to replicate real-world financial workflows through a dynamic and responsive user interface.

The application demonstrates advanced frontend concepts including client-side authentication, class-based architecture, and private data handling using modern JavaScript features. Core account data such as movements, PIN, transaction dates, and outgoing totals are encapsulated using private class fields (`#`), ensuring better structure and data integrity.

It also integrates Local Storage for persistence, Intersection Observer API for optimized animations, and timing functions like `setTimeout` and `setInterval` for real-time interactions.

---

## 🚀 Live Demo
👉 [View Project](https://jhaycodesdev.github.io/JhayBank/)

---

## ✨ Features

### 🔐 Account Creation & Authentication
- Create accounts with validated input fields  
- Login verification using Local Storage  
- Real-time success and error alerts  
- Account deletion with complete data removal  

---

### 📊 Interactive Dashboard
- Personalized greeting based on time of day  
- Real-time balance display with local date & time  
- Transaction history with relative dates (e.g., "Today", "1 day ago")  
- Sort transactions (ascending / descending)  
- Instant feedback on login and account creation  

---

### 💸 Transaction System
- Initial balance of 1,000,000 (local currency) 
- Transfers simulate withdrawals with processing feedback  
- Loan requests act as deposits:
- Approved if ≤ 3% of balance
- Rejected if above threshold  
- Dynamic balance updates after every transaction  
- All data stored and updated in Local Storage  

---

### 🎨 UI Enhancements & Animations
- Intersection Observer API for blur-to-clear image reveal on scroll  
- Sticky navigation with hover effects  
- Animated login and account creation forms  
- Feature tabs and testimonial carousel  
- Fully responsive design (mobile & desktop)  
- Password show/hide toggle  

---

### ⏳ Session Management
- 5-minute automatic session timer  
- Warning notification at 1 minute remaining  
- Auto logout on timeout with re-login required  

---

## 🛠️ Technologies Used

- HTML5 & CSS3 – layout and styling  
- JavaScript (ES6+) – logic, DOM manipulation, state management  
- Local Storage API – client-side data persistence  
- Intersection Observer API – scroll-based animations  

---

## ⚠️ Limitations

- No backend or database (data stored locally)  
- No real user-to-user transfers  
- Data tied to browser storage  

---

## 🔮 Future Improvements

- Backend integration (Node.js, database)  
- Multi-user transfer functionality  
- Data visualization (charts & analytics)  
- Secure authentication (hashed credentials)  

---

## 📸 Screenshots

> ![Mobile Dashboard View](./Screenshot%202026-03-20%20at%2003-22-49%20Transaction%20Page.png)
 ![Desktop Dashboard View](./Screenshot%202026-03-20%20at%2003-22-37%20Transaction%20Page.png)


---

## 🧠 What I Learned

- Structuring applications using class-based architecture 
- Managing state and UI updates dynamically  
- Implementing private fields for data security  
- Using browser APIs like Intersection Observer  
- Handling time-based logic with timers  

---

## 🙌 Author

JhayCodes  
Frontend Developer | JavaScript Developer | Aspiring Full-Stack Engineer

GitHub- [@JhayCodesDev](https://github.com/JhayCodesDev)

Twitter - [@JhayCode](https://www.twitter.com/JhayCodes)

Instagram - [@jhaycodes\_](https://www.instagram.com/jhaycodes_?igsh=MW45Nzg3anVjbjV0ZQ==)

LinkedIn - [Joshua Odusanya](https://www.linkedin.com/in/joshua-odusanya-9b67aa292/)

---

## 🙏 Acknowledgements

This project was inspired by concepts from Jonas Schmedtmann’s JavaScript course.

While the core idea of a banking application was influenced by his teaching, this project was independently extended with additional features, custom logic, UI improvements, and enhanced functionality to create a more interactive and personalized experience.

The project reflects my own understanding and implementation of JavaScript concepts learned throughout the course.

