import React, { useEffect, useRef } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { vallabh, sudha } from '../assets';

gsap.registerPlugin(ScrollTrigger);

const TeamMember = ({ name, role, image, links }) => {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="relative w-64 h-64 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
        <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
        <img src={image} alt={name} className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-xl font-semibold text-gray-400 mb-4">{role}</p>
      <div className="flex space-x-6">
        {links.linkedin && (
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
            <FaLinkedin size={28} />
          </a>
        )}
        {links.instagram && (
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
            <FaInstagram size={28} />
          </a>
        )}
        {links.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
            <FaGithub size={28} />
          </a>
        )}
      </div>
    </div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const membersRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const members = membersRef.current;

    gsap.set([title, members], { autoAlpha: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, { autoAlpha: 1, y: 0, duration: 0.7 })
      .to(members, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  const teamMembers = [
    {
      name: 'Vallabh Dasari',
      role: 'Backend Developer & ML Engineer',
      image: vallabh,
      links: {
        linkedin: 'https://www.linkedin.com/in/vallabh-dasari-22b5b92a6/',
        instagram: 'https://www.instagram.com/renaissance_0ne/',
        github: 'https://github.com/renaissance0ne/',
      },
    },
    {
      name: 'Sudhanva Padki',
      role: 'Frontend Developer',
      image: sudha,
      links: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://www.instagram.com/sudhanvapadki/profilecard/?igsh=a29xcXFleDlpcmxt',
        github: 'https://github.com/sudhanvapadki',
      },
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 ref={titleRef} className="text-center text-5xl font-bold mb-12 text-white blue_gradient">
          Our Team
        </h2>
        <div ref={membersRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;