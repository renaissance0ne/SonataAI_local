import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { logo } from '../assets';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const linksRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    const links = linksRef.current;
    const copyright = copyrightRef.current;

    gsap.set([content, links, copyright], { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top bottom-=100',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(content, { autoAlpha: 1, y: 0, duration: 0.6 })
      .to(links, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to(copyright, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="w-full text-white"
      style={{
        background: 'linear-gradient(to right, #3b82f6, #2563eb)', // Tailwind's blue-500 to blue-600
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div ref={contentRef} className="mb-8">
          <img src={logo} alt="SonataAI Logo" className="h-24 mb-4" />
          <p className="text-gray-200 text-lg font-semibold">
            Experience enhanced music discovery with AI that automatically identifies and classifies genres, fostering creativity and better music curation across platforms.
          </p>
        </div>
        <div ref={linksRef} className="flex flex-wrap justify-between mb-8">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-4">
            <h4 className="text-lg font-semibold mb-2 orange_gradient">Connect with us</h4>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/vallabh-dasari-22b5b92a6/" 
                   className="font-semibold text-white hover:orange_gradient transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/renaissance_0ne/" 
                   className="font-semibold text-gray-200 hover:orange_gradient transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://discordapp.com/users/933667492025483264" 
                   className="font-semibold text-gray-200 hover:orange_gradient transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div ref={copyrightRef} className="text-center text-gray-200 text-sm">
          <span className="orange_gradient">
            &copy; {new Date().getFullYear()} SonataAI. Enhancing music discovery through AI.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;