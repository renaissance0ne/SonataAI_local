import React from 'react';
import Hero from './components/Hero';
import Demo from './components/Demo';
import AboutUS from './components/AboutUs';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import './App.css';
const App = () => {
    return (
        <main>
            <div className='main'>
                <div className='gradient' />
            </div>
            <div className ='app'>
                <Hero />
                <Demo />
                <AboutUS />
                <TeamSection />
                <Footer />
            </div>
    
        </main>
    )
}

export default App