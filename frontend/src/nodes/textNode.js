// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Extract variables
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    setVariables(matches);

    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((v, i) => ({
      type: 'target', 
      position: Position.Left, 
      id: `${id}-${v}`,
      style: { top: `${((i + 1) * 100) / (variables.length + 1)}%` }
    }))
  ];

  return (
    <BaseNode id={id} label="Text" handles={handles} style={{ height: 'auto', minHeight: 80, minWidth: 200, width: Math.max(200, currText.length * 8 + 40) }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        Text:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          style={{ 
            overflow: 'hidden', 
            resize: 'none', 
            width: '100%', 
            boxSizing: 'border-box',
            fontFamily: 'inherit'
          }}
        />
      </label>
    </BaseNode>
  );
}
