// apiNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-request` },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  return (
    <BaseNode id={id} label="API Request" handles={handles}>
      <label>
        Endpoint:
        <input type="text" defaultValue="https://api.example.com" />
      </label>
    </BaseNode>
  );
}
