import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const genresRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const genres = genresRef.current;

    gsap.set([title, content, genres], { autoAlpha: 0, x: -50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, { autoAlpha: 1, x: 0, duration: 0.6 })
      .to(content, { autoAlpha: 1, x: 0, duration: 0.6 }, '-=0.3')
      .to(genres, { autoAlpha: 1, x: 0, duration: 0.6 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  const genreList = ['Blues', 'Classical', 'Country', 'Disco', 'Hip Hop', 'Jazz', 'Metal', 'Pop', 'Reggae', 'Rock'];

  return (
    <section ref={sectionRef} className="w-full py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 ref={titleRef} className="text-left text-5xl font-bold mb-8 text-white blue_gradient">
          About Us
        </h2>
        <p ref={contentRef} className="text-left text-xl font-semibold mb-8 text-gray-300">
        The primary purpose of this music genre-finding AI-based web application is to enhance music discovery and listening experiences by automatically identifying and classifying the genre of any given audio track. By combining AI with music theory and data analysis, the web application aims to foster creativity, improve music curation, and support the discovery of diverse musical styles across different platforms.
        </p>
        <div ref={genresRef} className="text-left">
          <h3 className="text-2xl font-bold mb-4 text-white">We identify genres including:</h3>
          <div className="flex flex-wrap gap-4">
            {genreList.map((genre, index) => (
              <span 
                key={index} 
                className="text-lg font-semibold orange_gradient"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;