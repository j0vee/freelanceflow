# 🧠 Dev Journal

## ✅ Day 1

### 📌 What I built/accomplished  
I set up my environment (GitHub, file structure, and database) and built a working backend API using Express, Prisma, and SQLite. I also successfully tested API routes using `curl`.

---

### ⚙️ Challenges  
I’m running Fedora Silverblue, and working inside a Toolbox container. Supabase wouldn't connect properly from the container, so I temporarily switched to SQLite for local development.

I also hadn’t yet connected GitHub to my local dev environment, so I had to troubleshoot SSH keys and Git config.  

Coming back to code after a break made today extra challenging — there was a lot I had to relearn. But asking the right questions helped me get through every roadblock.

---

### 🐛 Bugs / Roadblocks  
- Prisma couldn’t reach Supabase from inside Toolbox (`P1001` error)
- The generated Prisma client was in the wrong location due to an automatic config override (`output = "./generated/prisma"`)
- Forgot to include a `.gitignore` initially, but fixed it before pushing
- GitHub SSH wasn’t configured at first

---

### 🧠 What I Learned  
- How to build routes with Express and structure them cleanly  
- How to set up and switch between databases (PostgreSQL → SQLite)
- How to use Prisma CLI (`db push`, `generate`)
- How to test APIs with `curl`
- How to debug common Prisma setup errors (`MODULE_NOT_FOUND`, `P1001`)
- How to connect GitHub over SSH on Silverblue

---

### 🚀 Tomorrow (Day 2)  
- Scaffold the `client/` folder with React + Vite  
- Connect the frontend to the Express backend  
- Display the list of leads from the database  
- Add new leads through a frontend form









## ✅ Day 2

### 📌 What I Built/Accomplished  
Today I built a portion of the frontend for **FreelanceFlow** and connected it to the backend I built yesterday. The frontend was created using Vite + React. I can now fetch and display leads from the database, and also submit new leads using a form. The app updates in real time as expected — no page reloads needed.

---

### ⚙️ Challenges  
Today’s challenges were mostly beginner mistakes — I forgot to start up the backend when testing my frontend requests 😅. I’m also working inside a **Toolbox container** on Fedora Silverblue, which has its pros and cons. 

The upside is that it’s fast and isolated, so if I break something, I can easily rebuild. The downside is that I’m missing some development conveniences I’m used to, like code formatting and better error highlighting inside a full IDE like VS Code. I didn’t realize how much I relied on those until now.

---

### 🐛 Bugs / Roadblocks  
I hit a Prisma error when trying to submit a lead through the form — specifically when sending the `budget` field. Prisma expected an `Int`, but the server was sending a string (because form input values are strings by default).

This caused a 500 error and returned HTML instead of JSON. Once I checked the server logs, I saw that the error was coming from the `budget` value. I fixed it by converting it using `parseInt`, and I also added a ternary operator to make sure invalid values don’t crash the app. Additionally, I updated the Prisma schema to make `budget` optional to avoid future issues.

---

### 🧠 What I Learned  
I refreshed my understanding of React hooks, especially `useEffect` and `useState`, and how to loop through data to render lists. This is only my second day back coding after some time away, but I’m already getting back into the rhythm. 

Prisma is new to me, so I'm learning how it fits into a real-world stack — how to use it, how it expects data, and how it handles schema validation. Connecting the frontend to the backend was a great way to reinforce the full request lifecycle.

Also, I'm aiming to build more attention to detail through my writing — especially in documenting bugs and process clearly.

---

### 🚀 Tomorrow (Day 3)  
**Goals for Day 3:**
- [ ] Add basic styles to the frontend to improve visual clarity  
- [ ] Add visual confirmation when a lead is successfully added (reset form + success message)  
- [ ] Allow users to delete a lead from the UI (bonus: add backend route for DELETE)  
- [ ] Continue building attention to detail through writing and code clarity  
- [ ] Journal and push changes to GitHub by the end of the day  
