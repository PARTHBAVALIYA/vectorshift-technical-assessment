// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Pipeline metrics:
Nodes: ${result.num_nodes}
Edges: ${result.num_edges}
Is DAG: ${result.is_dag}`);
            } else {
                alert('Server returned an error.');
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to connect to backend.');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
