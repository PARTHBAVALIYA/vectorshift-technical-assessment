// conditionNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ConditionNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%' } }
  ];

  return (
    <BaseNode id={id} label="Condition" handles={handles}>
      <div>If/Else logic gate.</div>
    </BaseNode>
  );
}
