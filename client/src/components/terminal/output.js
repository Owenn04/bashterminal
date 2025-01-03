// src/components/terminal/output.js
import React, { useRef, useState } from 'react';
import Input from './input.js';
import './terminal.css';

const Output = () => {
    const inputRef = useRef(null);
    const [inputWidth, setInputWidth] = useState('50%'); 
    const [inputValue, setInputValue] = useState('');
    const [outputText, setOutputText] = useState([]);
    const [pathName, setPathName] = useState('C:\\Users\\owens\\saved\\projects\\bashterminal>');

    const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.focus(); 
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        
        // Calculate new width based on the input length
        const baseWidth = 50; 
        const newWidth = Math.max(baseWidth, e.target.value.length * 10); 
        setInputWidth(`${newWidth}px`); 
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          setOutputText(prev => [
              ...prev,
              `${pathName}>`,
              'default text',
              <br key={`${prev.length}-br1`} />, // Add a line break after the default text
          ]);
          setInputValue(''); 
      }
    };


    return (
      <div onClick={handleClick} className = 'scroll-stuff' style={{ 
        color: 'white', 
        marginTop: '40px', 
        marginLeft: '10px', 
        position: 'relative', 
        width: 'calc(100% - 20px)', 
        boxSizing: 'border-box',
        lineHeight: '1.5', 
        height: 'calc(100% - 20px)', 
        overflowY: 'auto',
        overflowX: 'auto', 
        display: 'flex', 
        flexDirection: 'column', // Use column direction
      }}>
        <pre style={{ 
                whiteSpace: 'pre-wrap', 
                margin: 0,
                width: 'calc(100% - 20px)',
                boxSizing: 'border-box',
            }}>
                <div className="output" style={{ 
                  overflowY: 'auto', // Enable vertical scrolling for the output
                  overflowX: 'auto', // Prevent horizontal scrolling
                  height: 'calc(100% - 40px)', // Adjust height to fit the terminal
                  margin: 0, // Removes default margin
                }}>
                    {outputText.map((line, index) => (
                        <div key={index}>{line}</div> // Render each line
                    ))}
                </div>
                {pathName}&nbsp;
                <span style={{ marginRight: '3px' }} /> 
                <Input 
                    ref={inputRef} 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    onKeyPress={handleKeyPress}
                    style={{ width: inputWidth, 
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        outline: 'none',
                    }} 
                />
            </pre>
      </div>
    );
  };

export default Output;

//&gt replaces >