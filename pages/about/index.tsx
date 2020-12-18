import React, { useRef } from 'react';
import { HTMLAttributes } from 'react';
import img from '../../public/assets/img/mostafa.jpg';

export default function About() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.style.opacity = '.5';
    ref.current.style.background = 'red';
  }

  return (
    <div ref={ref} style={{ background: '#000' }}>
      <h1>About you</h1>
      <img src={img} alt=""/>
      <button onClick={() => handleClick()}> Click Me!</button>
    </div>
  )
}