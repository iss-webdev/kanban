🗂️ Sales Pipeline / Kanban CRM Board
A React-based CRM Kanban board for managing sales leads across pipeline stages with drag and drop support.
Features

📋 Pipeline Columns — Leads, Contacted, In Progress, Proposal Sent, Closed
➕ Add Leads — Form with name, title, company, deal value, priority, due date and assignee
🔀 Drag & Drop — Move cards between columns using dnd-kit
✏️ Edit Leads — Edit existing cards via modal
🗑️ Delete Leads — Remove leads from the pipeline
🔍 Search — Filter leads by priority
📊 Pipeline Stats — Total leads, total pipeline value, win rate
💾 Persistent Storage — All data saved to localStorage

Tech Stack

React
dnd-kit
localStorage
CSS
Vite

Getting Started
bashgit clone https://github.com/iss-webbb/kanban.git
cd kanban-crm
npm install
npm run dev
Hardest Challenges

Wiring drag and drop with column-based state updates
Building a clean custom hook with action functions instead of raw setters
Managing modal state and editingId across multiple components
Fixing prop drilling after component splitting during Refactor 2

Lessons Learned

Custom hooks should expose actions not raw setters
useMemo and useCallback prevent unnecessary re-renders
Refactoring reveals problems that were always hidden in the original code

Live Demo: 
https://kanban-j0undcrab-iss-webdevs-projects.vercel.app/
