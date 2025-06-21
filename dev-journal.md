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
