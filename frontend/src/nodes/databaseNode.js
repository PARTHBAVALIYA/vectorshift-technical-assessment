// databaseNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DatabaseNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-query` },
    { type: 'source', position: Position.Right, id: `${id}-result` }
  ];

  return (
    <BaseNode id={id} label="Database" handles={handles}>
      <label>
        Collection:
        <input type="text" defaultValue="users" />
      </label>
    </BaseNode>
  );
}
