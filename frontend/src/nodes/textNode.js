// textNode.js

import { useState, useRef, useEffect, useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Debounce variable extraction to avoid canvas handle flickering on fast keystrokes
    const timeoutId = setTimeout(() => {
      const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
      const matches = [];
      let match;
      while ((match = regex.exec(currText)) !== null) {
        if (!matches.includes(match[1])) {
          matches.push(match[1]);
        }
      }
      // Only update state if variable list actually changed
      setVariables((prev) => {
        if (prev.length === matches.length && prev.every((v, idx) => v === matches[idx])) {
          return prev;
        }
        return matches;
      });
    }, 150);

    // Auto-resize immediately for smooth text typing feel
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    return () => clearTimeout(timeoutId);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Memoize handle configurations to prevent unnecessary ReactFlow handle re-renders
  const handles = useMemo(() => [
    { type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((v, i) => ({
      type: 'target', 
      position: Position.Left, 
      id: `${id}-${v}`,
      style: { top: `${((i + 1) * 100) / (variables.length + 1)}%` }
    }))
  ], [id, variables]);

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
};
