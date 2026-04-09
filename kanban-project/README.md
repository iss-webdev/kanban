Here's a README for your Kanban project:

---

# Kanban CRM Board

A CRM-style Kanban board built with React for managing leads through a sales pipeline.

## Features

- 5-column pipeline: Leads → Contacted → In Progress → Proposal Sent → Closed Won
- Add new leads with title, company, deal value, priority, due date, and assignee
- Drag and drop cards between columns
- Click Edit on any card to update details via modal
- Search and filter cards by priority
- Pipeline summary: Total Leads, Total Pipeline Value, Win Rate
- Data persists with localStorage

## Tech Stack

- React
- dnd-kit (drag and drop)
- localStorage for persistence

## How to Run

```bash
npm install
npm run dev
```

## What I Learned

- Single state object pattern
- Drag and drop with dnd-kit (DndContext, useDraggable, useDroppable)
- Derived state for search filtering
- Modal edit pattern with editingId
- localStorage save/load with loaded flag patterngit