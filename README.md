# VectorShift Pipeline Builder — Technical Assessment

An interactive, node-based workflow builder built with **ReactFlow** and **FastAPI**, featuring node abstraction, dynamic variable handles, and backend DAG cycle detection.

---

## 🚀 Key Implementations

### 1. Node Abstraction (`BaseNode`)
- Abstracted common layout, glassmorphic styling, headers, and ReactFlow handle rendering into a single reusable `BaseNode` component (`frontend/src/nodes/baseNode.js`).
- Refactored all starter nodes (`InputNode`, `LLMNode`, `OutputNode`, `TextNode`) to extend `BaseNode`.
- Created **5 new custom nodes** demonstrating flexibility:
  - **ApiNode:** HTTP request endpoint connector.
  - **TransformNode:** Data transformation step.
  - **DatabaseNode:** Collection / database query mock.
  - **FilterNode:** Stream filtering node.
  - **ConditionNode:** If/Else conditional routing with dual outputs (True/False).

### 2. Dynamic Text Node Logic
- Replaced static input with an **auto-resizing `<textarea>`** that recalculates bounds dynamically based on scrollHeight.
- Implemented real-time regex parsing (`/{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g`) to extract template variables.
- Dynamically mounts left-side input handles for each parsed unique variable on the fly with calculated vertical offsets.

### 3. Backend Pipeline Parsing & DAG Cycle Detection
- Connected frontend Zustand state store (`store.js`) to `submit.js`, sending nodes and edges to `/pipelines/parse`.
- FastAPI backend converts graph payload into an adjacency list and executes a **Depth-First Search (DFS) with recursion stack** to detect back-edges (cycles) and verify whether the graph is a Directed Acyclic Graph (DAG).
- Clean alert UI displays node count, edge count, and DAG validity upon submission.

### 4. Modern Glassmorphic Dark Styling
- High-contrast, translucent glassmorphism with backdrop blur.
- Vibrant purple/indigo gradients and interactive hover micro-animations.

---

## 🛠️ Getting Started

### Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt # or: pip install fastapi uvicorn
uvicorn main:app --reload
```
Runs at `http://localhost:8000`.

### Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```
Runs at `http://localhost:3000`.
