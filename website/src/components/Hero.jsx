import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { logo } from '../assets';

const Hero = () => {
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states
    gsap.set(logoRef.current, { y: -50, opacity: 0 });
    gsap.set(headingRef.current.children, { y: 50, opacity: 0 });
    gsap.set(descriptionRef.current, { y: 20, opacity: 0 });

    // Animate logo
    tl.to(logoRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1 
    });

    // Animate heading
    tl.to(headingRef.current.children, { 
      y: 0, 
      opacity: 1, 
      stagger: 0.2, 
      duration: 0.8 
    }, "-=0.5");

    // Animate description
    tl.to(descriptionRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8 
    }, "-=0.3");

    // Add hover animation to logo
    const logoHoverAnimation = gsap.to(logoRef.current, {
      rotation: 360,
      duration: 2,
      ease: 'elastic.out(1, 0.3)',
      paused: true,
    });

    logoRef.current.addEventListener('mouseenter', () => {
      gsap.to(logoRef.current, { scale: 1.1, duration: 0.3 });
    });

    logoRef.current.addEventListener('mouseleave', () => {
      gsap.to(logoRef.current, { scale: 1, duration: 0.3 });
    });

    logoRef.current.addEventListener('click', () => {
      logoHoverAnimation.restart();
    });

  }, []);

  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img 
          ref={logoRef}
          src={logo} 
          alt="Music_logo"
          className='w-16 sm:w-20 md:w-28 object-contain cursor-pointer' 
        />
      </nav>
      <h1 ref={headingRef} className='head_text'>
        <span>Summarize Music with</span> <br className='max-md:hidden' />
        <span className='blue_gradient'>Sonata AI</span>
      </h1>
      <h2 ref={descriptionRef} className='desc font-medium text-lg'>
        Know what kind of music you are listening to!
        Just drag and drop the file below, let <span className='blue_gradient'>Sonata AI</span> do the rest!
      </h2>
    </header>
  )
}

export default Hero;