import React, { useState, useEffect } from 'react';
import './App.css';
import { Window, WindowHeader, WindowContent, Button, Panel } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { AnimatedList } from './animated-list';
import { motion } from 'framer-motion';
import { cn } from './lib/utils';

let notifications = [
  {
    name: "FBI",
    description: "we need gremoli",
    time: "now",
    icon: "fbi.png",
    color: "#FFFFFF",
  },
  {
    name: "OBAMAS",
    description: "we just need to talk to him",
    time: "1m ago",
    icon: "mi.png",
    color: "#FFFFFF",
  },
  {
    name: "CIA",
    description: "gremoli might be in danger",
    time: "5m ago",
    icon: "cia.png",
    color: "#FFFFFF",
  },
];

notifications = Array.from({ length: 1 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-12 items-center justify-center rounded-2xl overflow-hidden"
          style={{
            backgroundColor: color,
          }}
        >
          <img src={icon} alt="Icon" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

function App() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const redditUrl = "https://www.reddit.com/r/HelpMeFind/comments/1cglhms/help_me_find_the_origin_of_this_image_or_what/";

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 2500);

    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 3500);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(popupTimeout);
    };
  }, []);

  return (
    <ThemeProvider theme={original}>
      <div className="h-screen w-screen relative overflow-hidden">
        {/* Background Video */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Floating u.gif */}
        <img src="u.gif" alt="floating" className="random-float w-40 h-40" />

        {/* Content on top of video */}
        <div className="relative flex flex-col items-center justify-center h-screen gap-4 z-10">
          <Window className="w-80">
            <WindowHeader className="flex justify-between items-center">
              <span>gremoli</span>
              <Button size="sm" square>
                <span className="text-lg">×</span>
              </Button>
            </WindowHeader>
            <div className='flex justify-center'>
              <div className="flex items-center z-[50] py-1 space-x-2">
                <a href="https://x.com/" className="transition ease-in-out duration-150 underline">
                  Twitter
                </a>
                <a href="https://t.me/" className="transition ease-in-out duration-150 underline">
                  TG
                </a>
              </div>
            </div>
            <div className='text-[10px] text-center'>CA: XXXXXXXXX</div>
            <WindowContent>
              <div variant="well" className="mb-4">
                <img
                  src={isGlitching ? "grem1.png" : "grem.png"}
                  alt="gremoli"
                  className="w-full h-full object-cover"
                />
              </div>
            </WindowContent>
          </Window>
          <a 
            href={redditUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#FF4500] text-white hover:bg-[#FF5700] transition-colors duration-300 font-bold"
          >
            find gremoli
          </a>
        </div>

        {/* Popup Video Player */}
        {showPopup && (
          <div className="fixed top-[15%] left-[15%] z-50">
            <Window className="w-[275px] md:w-96">
              <WindowHeader className="flex justify-between items-center">
                <span>gremoli.mp4</span>
                <Button size="sm" square onClick={() => setShowPopup(false)}>
                  <span className="text-lg">×</span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <div variant="well" className="md:mb-3">
                  <video 
                    className="w-full h-full"
                    autoPlay
                    controls
                  >
                    <source src="b.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </WindowContent>
            </Window>
          </div>
        )}

        <div className='absolute top-5 left-5 right-5 z-20'>
          <AnimatedList>
            {notifications.map((item, idx) => (
              <Notification {...item} key={idx} />
            ))}
          </AnimatedList>
        </div>

        {/* Overlay (optional, for contrast) */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="pulse-container">
          <div className="pulse-circle"></div>
          &nbsp;&nbsp;systems live
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;