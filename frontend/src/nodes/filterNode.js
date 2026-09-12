// filterNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} label="Filter" handles={handles}>
      <div>Filter data passing through.</div>
    </BaseNode>
  );
}
