// transformNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TransformNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} label="Transform" handles={handles}>
      <div>Apply data transformations here.</div>
    </BaseNode>
  );
}
