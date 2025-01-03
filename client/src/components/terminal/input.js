import React from 'react';

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      {...props}
    />
  );
});

export default Input;