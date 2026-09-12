from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        data = json.loads(pipeline)
        nodes = data.get('nodes', [])
        edges = data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        adj = {node['id']: [] for node in nodes}
        for edge in edges:
            src = edge.get('source')
            tgt = edge.get('target')
            if src in adj and tgt in adj:
                adj[src].append(tgt)
                
        visited = set()
        rec_stack = set()
        is_dag = True
        
        def has_cycle(v):
            visited.add(v)
            rec_stack.add(v)
            for neighbor in adj.get(v, []):
                if neighbor not in visited:
                    if has_cycle(neighbor):
                        return True
                elif neighbor in rec_stack:
                    return True
            rec_stack.remove(v)
            return False
            
        for node in adj:
            if node not in visited:
                if has_cycle(node):
                    is_dag = False
                    break
                    
        return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
    except Exception as e:
        return {'error': str(e)}
