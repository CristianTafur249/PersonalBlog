import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { valentineData } from '../lib/valentine-data';

// --- Components ---

// Custom Sunflower SVG Icon
const SunflowerIcon = ({ className, style }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        style={style}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Petals */}
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(0 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(45 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(90 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(135 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(180 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(225 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(270 50 50)" fill="#FFCA28" />
        <path d="M50 25 C50 10 35 10 35 25 C35 40 50 40 50 25" transform="rotate(315 50 50)" fill="#FFCA28" />

        {/* Center */}
        <circle cx="50" cy="50" r="12" fill="#3E2723" />
    </svg>
);

// Heart filled with Sunflowers (Reverted to pure Sunflowers)
const HeartOfSunflowers = ({ className }) => (
    <div className={`relative ${className}`}>
        {/* Base Heart Outline */}
        <HeartIconOutline className="w-full h-full text-yellow-500 opacity-50" />

        {/* Absolute positioned sunflowers to form/fill the heart */}
        {/* Top Left Lobe */}
        <div className="absolute top-[10%] left-[10%] w-[35%] h-[35%] animate-[spin_10s_linear_infinite]">
            <SunflowerIcon className="w-full h-full" />
        </div>
        {/* Top Right Lobe */}
        <div className="absolute top-[10%] right-[10%] w-[35%] h-[35%] animate-[spin_12s_linear_infinite_reverse]">
            <SunflowerIcon className="w-full h-full" />
        </div>
        {/* Center */}
        <div className="absolute top-[35%] left-[32%] w-[36%] h-[36%] animate-[pulse_3s_infinite]">
            <SunflowerIcon className="w-full h-full" />
        </div>
        {/* Bottom Tip area */}
        <div className="absolute bottom-[15%] left-[35%] w-[30%] h-[30%] animate-[bounce_4s_infinite]">
            <SunflowerIcon className="w-full h-full" />
        </div>
    </div>
);

// Hook for scroll animations
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect(); // Only animate once
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, options]);

    return [ref, isVisible];
};

const FadeInSlide = ({ children, direction = 'up', delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    let transform = 'translateY(30px)';
    if (direction === 'left') transform = 'translateX(-50px)';
    if (direction === 'right') transform = 'translateX(50px)';
    if (direction === 'scale') transform = 'scale(0.8)';

    return (
        <div
            ref={ref}
            style={{
                transition: `opacity 1200ms ease-out ${delay}ms, transform 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? (direction === 'scale' ? 'scale(1)' : 'translate(0)') : transform,
            }}
        >
            {children}
        </div>
    );
};

export default function ParaTi() {
    const [showSurprise, setShowSurprise] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);

    // Load YouTube IFrame API
    useEffect(() => {
        setMounted(true);

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: 'uZKYPdn-dKY',
                playerVars: {
                    'autoplay': 1,
                    'controls': 0,
                    'start': 9,
                    'loop': 1,
                    'playlist': 'uZKYPdn-dKY',
                    'playsinline': 1
                },
                events: {
                    'onReady': onPlayerReady, // Auto-play when ready
                    'onStateChange': onPlayerStateChange
                }
            });
        };
    }, []);

    const onPlayerReady = (event) => {
        event.target.setVolume(20);
        event.target.playVideo();
        setIsPlaying(true);
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
        } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
        }
    };

    const toggleMusic = () => {
        if (playerRef.current && playerRef.current.getPlayerState) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        }
    };

    if (!mounted) return null;

    const { title, hero, letter, timeline, surprise, colors } = valentineData;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div id="youtube-player" style={{ display: 'none' }}></div>

            {/* Floating Music Control */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleMusic}
                    className="p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center bg-white border-2"
                    style={{ borderColor: colors.sunflowerPetal, color: colors.accent }}
                    title={isPlaying ? "Pausar Música" : "Reproducir Música"}
                >
                    {isPlaying ? (
                        <SpeakerWaveIcon className="h-6 w-6 animate-pulse" />
                    ) : (
                        <SpeakerXMarkIcon className="h-6 w-6 text-gray-400" />
                    )}
                </button>
            </div>

            <div className="min-h-screen font-serif transition-colors duration-1000 overflow-x-hidden" style={{ backgroundColor: colors.background, color: colors.text }}>

                {/* --- Hero Section --- */}
                <section className="h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                    {/* Decorative Sunflowers AND Hearts */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-10 left-10 opacity-60 animate-[bounce_4s_infinite]">
                            <SunflowerIcon className="h-24 w-24" />
                        </div>
                        <div className="absolute bottom-20 right-10 opacity-50 animate-[pulse_3s_infinite]">
                            <HeartIcon className="h-32 w-32 text-red-200" />
                        </div>
                        <div className="absolute top-1/3 right-10 opacity-30 animate-spin-slow" style={{ animationDuration: '20s' }}>
                            <SunflowerIcon className="h-16 w-16" />
                        </div>
                        <div className="absolute bottom-1/4 left-20 opacity-40 animate-pulse delay-700">
                            <HeartIcon className="h-20 w-20 text-red-300" />
                        </div>
                    </div>

                    <FadeInSlide direction="scale">
                        <div className="relative z-10 px-6 py-12 bg-white/40 backdrop-blur-sm rounded-3xl border border-white shadow-sm">
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight drop-shadow-sm flex items-center justify-center gap-4" style={{ color: colors.text }}>
                                {hero.heading} <SunflowerIcon className="h-12 w-12 animate-spin-slow" />
                            </h1>
                            <p className="text-xl md:text-2xl mb-12 max-w-lg mx-auto leading-relaxed font-light" style={{ color: colors.secondary }}>
                                {hero.subheading}
                            </p>
                            <button
                                onClick={() => document.getElementById('carta').scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-3 mx-auto font-medium tracking-wide text-lg bg-white border-2"
                                style={{ borderColor: colors.sunflowerPetal, color: colors.text }}
                            >
                                <HeartIcon className="h-6 w-6 text-red-300" />
                                {hero.buttonText}
                            </button>
                        </div>
                    </FadeInSlide>
                </section>

                {/* --- Letter Section --- */}
                <section id="carta" className="min-h-screen flex items-center justify-center p-4 md:p-12" style={{ backgroundColor: colors.neutral }}>
                    <FadeInSlide direction="up">
                        <div className="max-w-3xl w-full p-10 md:p-16 rounded-xl shadow-sm relative border-t-8 bg-white" style={{ borderColor: colors.sunflowerPetal }}>
                            {/* Corner Decoration: Mixed Heart & Sunflower */}
                            <div className="absolute -top-6 -right-6 opacity-80 flex gap-2">
                                <SunflowerIcon className="h-16 w-16 transform rotate-12 drop-shadow-md" />
                                <HeartIcon className="h-10 w-10 text-red-200 mt-8" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center mx-auto w-fit border-b-2 pb-2" style={{ color: colors.text, borderColor: colors.highlight }}>
                                {letter.title}
                            </h2>

                            <div className="prose prose-lg leading-loose space-y-6 text-lg text-justify font-light" style={{ color: colors.text }}>
                                {letter.paragraphs.map((paragraph, index) => (
                                    <div key={index}>{paragraph}</div>
                                ))}
                                <div className="text-right mt-12 font-medium text-xl italic whitespace-pre-line" style={{ color: colors.accent }}>{letter.signature}</div>
                            </div>
                        </div>
                    </FadeInSlide>
                </section>

                {/* --- Timeline Section --- */}
                <section className="py-32" style={{ backgroundColor: colors.background }}>
                    <div className="max-w-6xl mx-auto px-4">
                        <FadeInSlide direction="up">
                            <h2 className="text-4xl font-bold mb-20 text-center flex items-center justify-center gap-3" style={{ color: colors.text }}>
                                <HeartIcon className="h-10 w-10 text-red-200" />
                                {timeline.title}
                                <HeartIcon className="h-10 w-10 text-red-200" />
                            </h2>
                        </FadeInSlide>

                        <div className="relative pl-8 md:pl-0">
                            {/* Vertical Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2" style={{ backgroundColor: colors.secondary }} />

                            <div className="space-y-24">
                                {timeline.items.map((item, index) => (
                                    <div key={index} className={`relative flex items-center ${item.align === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>

                                        {/* Sunflower Bullet */}
                                        <div className="absolute left-8 md:left-1/2 w-8 h-8 transform -translate-x-1/2 z-10 p-1 bg-white rounded-full border border-yellow-100 shadow-sm">
                                            <SunflowerIcon className="w-full h-full" />
                                        </div>

                                        {/* Content Card */}
                                        <div className={`w-full md:w-[calc(50%-4rem)] ml-16 md:ml-0 ${item.align === 'right' ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'}`}>
                                            <FadeInSlide direction={item.align === 'right' ? 'right' : 'left'} delay={index * 150}>
                                                <div
                                                    className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 relative group border-b-4"
                                                    style={{ borderColor: colors.highlight }}
                                                >
                                                    <time className="block mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: colors.secondary }}>{item.date}</time>
                                                    <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>{item.title}</h3>
                                                    <p className="leading-relaxed font-light" style={{ color: colors.text }}>{item.desc}</p>
                                                </div>
                                            </FadeInSlide>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Surprise Section --- */}
                <section className="min-h-[70vh] flex flex-col items-center justify-center p-8 relative overflow-hidden"
                    style={{
                        backgroundColor: colors.highlight // Pale Yellow Background
                    }}>
                    {!showSurprise ? (
                        <FadeInSlide direction="scale">
                            <button
                                onClick={() => setShowSurprise(true)}
                                className="relative z-10 font-bold py-5 px-12 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 text-xl tracking-wider bg-white border-2 animate-pulse flex items-center gap-3"
                                style={{ borderColor: colors.sunflowerPetal, color: colors.text }}
                            >
                                <HeartIcon className="h-6 w-6 text-red-400" />
                                {surprise.buttonText}
                                <SunflowerIcon className="h-6 w-6" />
                            </button>
                        </FadeInSlide>
                    ) : (
                        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                            {/* 
                  Heart of Sunflowers Composition 
               */}
                            <div className="mb-8 flex justify-center">
                                <HeartOfSunflowers className="w-48 h-48 md:w-64 md:h-64 animate-[bounce_3s_infinite]" />
                            </div>

                            <div className="animate-[pulse_4s_infinite]">
                                {/* High Contrast Title */}
                                <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter drop-shadow-sm" style={{ color: colors.sunflowerCenter }}>
                                    {surprise.title}
                                </h2>
                            </div>

                            <div className="transition-opacity duration-1000 opacity-100 bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-lg border-2 relative" style={{ borderColor: colors.sunflowerPetal }}>
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                                    <HeartIcon className="h-12 w-12 text-red-300" />
                                </div>
                                {/* High Contrast Message Text */}
                                <p className="text-2xl md:text-4xl leading-relaxed font-serif whitespace-pre-line font-medium relative z-10" style={{ color: colors.text }}>
                                    {surprise.message}
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
