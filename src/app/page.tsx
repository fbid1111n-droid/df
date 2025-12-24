"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  Camera, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Users, 
  Lock, 
  ChevronRight, 
  Star,
  Play,
  Monitor,
  Smartphone,
  Crown,
  Trophy,
  Coffee,
  Diamond,
  Flame,
  Globe,
  MessageCircle,
  Video,
  Eye,
  Gift,
  CheckCircle2,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Models = [
  { id: 1, name: "Sasha Grey", age: 22, status: "Live", viewers: "4.2k", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=800", category: "Elite", tags: ["Petite", "Brunette", "College"] },
  { id: 2, name: "Elena Sky", age: 24, status: "Live", viewers: "2.1k", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600&h=800", category: "Popular", tags: ["Blonde", "Curvy", "HD"] },
  { id: 3, name: "Mika Luna", age: 21, status: "Busy", viewers: "850", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=800", category: "Gold", tags: ["Asian", "Tattooed", "Wild"] },
  { id: 4, name: "Chloe Rose", age: 23, status: "Live", viewers: "5.6k", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800", category: "Featured", tags: ["Gamer", "Cosplay", "4K"] },
  { id: 5, name: "Isabella V", age: 25, status: "Live", viewers: "1.9k", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600&h=800", category: "Trending", tags: ["Latina", "Mature", "Private"] },
  { id: 6, name: "Zara Fox", age: 20, status: "Live", viewers: "8.4k", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600&h=800", category: "Elite", tags: ["New", "Vibe", "Explicit"] },
  { id: 7, name: "Luna Love", age: 26, status: "Away", viewers: "0", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&h=800", category: "Premium", tags: ["Redhead", "Alt", "Models"] },
  { id: 8, name: "Sofia Ray", age: 22, status: "Live", viewers: "3.2k", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=800", category: "Gold", tags: ["Ebony", "Classic", "Hot"] },
  { id: 9, name: "Ruby Red", age: 23, status: "Live", viewers: "1.5k", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600&h=800", category: "Trending", tags: ["Redhead", "Curvy", "Direct"] },
  { id: 10, name: "Jade Wong", age: 21, status: "Live", viewers: "2.8k", image: "https://images.unsplash.com/photo-1516523653452-4c6762369318?auto=format&fit=crop&q=80&w=600&h=800", category: "Elite", tags: ["Asian", "Tiny", "Active"] },
  { id: 11, name: "Mia Khal", age: 25, status: "Busy", viewers: "4.1k", image: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?auto=format&fit=crop&q=80&w=600&h=800", category: "Gold", tags: ["Arab", "Busty", "Private"] },
  { id: 12, name: "Layla Blue", age: 22, status: "Live", viewers: "900", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=600&h=800", category: "New", tags: ["Ebony", "Blue Hair", "Alt"] },
  { id: 13, name: "Aria Stark", age: 19, status: "Live", viewers: "6.2k", image: "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&q=80&w=600&h=800", category: "Featured", tags: ["College", "Natural", "HD"] },
  { id: 14, name: "Scarlett J", age: 24, status: "Away", viewers: "0", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=600&h=800", category: "Elite", tags: ["Blonde", "Busty", "Movie Star"] },
  { id: 15, name: "Nami Swan", age: 20, status: "Live", viewers: "3.5k", image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&q=80&w=600&h=800", category: "Trending", tags: ["Cosplay", "Ginger", "Fun"] },
    { id: 16, name: "Raven Knight", age: 22, status: "Live", viewers: "1.1k", image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=600&h=800", category: "Gold", tags: ["Goth", "E-Girl", "Tattoo"] },
    { id: 17, name: "Ivy Rose", age: 23, status: "Live", viewers: "2.4k", image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&q=80&w=600&h=800", category: "Elite", tags: ["Petite", "Cute", "4K"] },
    { id: 18, name: "Dahlia V", age: 26, status: "Live", viewers: "1.8k", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=600&h=800", category: "Popular", tags: ["Mature", "Office", "HD"] },
    { id: 19, name: "Stormy D", age: 22, status: "Busy", viewers: "3.1k", image: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=600&h=800", category: "Gold", tags: ["Wild", "Party", "Brunette"] },
    { id: 20, name: "Celeste X", age: 24, status: "Live", viewers: "5.2k", image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=600&h=800", category: "Featured", tags: ["Goddess", "Elite", "VR"] },
    { id: 21, name: "Nikki B", age: 21, status: "Live", viewers: "800", image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=600&h=800", category: "Trending", tags: ["Latina", "Fit", "Tattoo"] },
    { id: 22, name: "Amber L", age: 25, status: "Live", viewers: "2.2k", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600&h=800", category: "New", tags: ["Blonde", "Glamour", "Premium"] },
    { id: 23, name: "Jasmine S", age: 23, status: "Away", viewers: "0", image: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?auto=format&fit=crop&q=80&w=600&h=800", category: "Elite", tags: ["Exotic", "Model", "HD"] },
    { id: 24, name: "Freya G", age: 20, status: "Live", viewers: "4.7k", image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=600&h=800", category: "Gold", tags: ["Natural", "Teen", "Active"] },

];

const TokenPackages = [
  { id: 1, tokens: 500, price: "$24.99", bonus: "10% Extra", popular: false, color: "from-zinc-400 to-zinc-600" },
  { id: 2, tokens: 1500, price: "$59.99", bonus: "25% Extra", popular: true, color: "from-[#D4AF37] to-[#8B7322]" },
  { id: 3, tokens: 5000, price: "$149.99", bonus: "50% Extra", popular: false, color: "from-purple-500 to-blue-600" },
];

const ChatMessages = [
  { user: "Alpha_Male", msg: "She is amazing today!", color: "text-blue-400" },
  { user: "GoldVIP", msg: "Just tipped 500 tokens, wow!", color: "text-[#D4AF37]" },
  { user: "Lover69", msg: "Private show was worth every cent.", color: "text-purple-400" },
  { user: "Anon_King", msg: "Is she going live soon?", color: "text-zinc-400" },
  { user: "TokenMaster", msg: "The 4K quality is insane.", color: "text-green-400" },
];

const OFFER_LINK = "https://t.acrsmartcam.com/379911/2994/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN";

export default function RoyalCamsLanding() {
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(true);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

  const handleExternalRedirect = () => {
    console.log('Redirecting to:', OFFER_LINK);
    console.log('Link length:', OFFER_LINK.length);
    console.log('Link starts with https:', OFFER_LINK.startsWith('https'));
    
    try {
      // Try to open in new tab first
      const newWindow = window.open(OFFER_LINK, '_blank');
      console.log('window.open result:', newWindow);
      
      // If popup was blocked, try direct navigation
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        console.log('Popup blocked, using direct navigation');
        window.location.href = OFFER_LINK;
      }
    } catch (error) {
      console.log('Error opening link, using fallback:', error);
      // Fallback to direct navigation
      window.location.href = OFFER_LINK;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      const names = ["VIP_Lover", "GoldMember", "Anon44", "KingD", "EliteOne"];
      const actions = ["tipped 1000 tokens", "unlocked private show", "started HD stream", "entered VIP Room"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setActiveNotification(`${randomName} ${randomAction}`);
      setTimeout(() => setActiveNotification(null), 4000);
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleVerify = () => {
    setIsVerified(true);
    setShowVerification(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-zinc-100 font-['Inter'] selection:bg-[#D4AF37] selection:text-black">
      {/* Dynamic Glass Notification */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] px-6 py-4 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-yellow-200 flex items-center justify-center">
              <Zap className="w-5 h-5 text-black animate-pulse" />
            </div>
            <div className="text-sm">
              <span className="text-zinc-400 block text-[10px] uppercase font-black tracking-widest">Live Activity</span>
              <span className="font-bold text-white">{activeNotification}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Age Gate */}
      <AnimatePresence>
        {showVerification && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020202] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative w-full max-w-xl p-12 text-center"
            >
              <div className="mb-12 inline-block">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#8B7322] flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)] transform -rotate-12">
                  <ShieldCheck className="w-12 h-12 text-black" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black text-white mb-6">
                Royal <span className="text-[#D4AF37]">Access</span>
              </h1>
              <p className="text-zinc-400 text-xl mb-12 leading-relaxed font-light">
                This destination is reserved for adults only. You must be at least 18 years of age to enter the VIP network.
              </p>
                <div className="flex flex-col gap-6">
                  <Button 
                    onClick={handleVerify}
                    className="h-24 bg-[#D4AF37] hover:bg-white text-black font-black text-2xl rounded-[2rem] transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-95"
                  >
                    I AM 18+ (ENTER SITE)
                  </Button>
                <button 
                  className="text-zinc-600 hover:text-zinc-400 transition-colors text-sm uppercase tracking-[0.3em] font-black"
                  onClick={() => window.location.href = "https://t.acrsmartcam.com/379911/2994/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN"}
                >
                  Exit Site
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={handleExternalRedirect} className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Camera className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">
                Royal<span className="text-[#D4AF37]">Cams</span>
              </span>
            </button>
            
            <div className="hidden lg:flex items-center gap-8">
              {['Live Now', 'VIP Lounge', 'Categories', 'Elite Models'].map((item) => (
                <button key={item} onClick={handleExternalRedirect} className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-[#D4AF37] transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all group-hover:w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('LOG IN clicked (HTML button)');
                handleExternalRedirect();
              }}
              className="hidden sm:flex text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-widest bg-transparent border-none cursor-pointer"
            >
              Log In
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('JOIN FREE clicked (HTML button)');
                handleExternalRedirect();
              }} 
              className="bg-[#D4AF37] hover:bg-white text-black font-black px-8 h-12 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all cursor-pointer border-none"
            >
              JOIN FREE
            </button>
            <Button variant="ghost" className="lg:hidden p-2 text-zinc-400">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="relative min-h-[100vh] flex items-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.15),transparent_40%)]" />
          <Image 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            fill
            className="object-cover opacity-30 blur-[2px]"
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">Premium Adult Entertainment</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-['Playfair_Display'] font-black text-white leading-[0.85] mb-8 tracking-tighter">
              Where <br />
              <span className="italic text-[#D4AF37]">Lust</span> Meets <br />
              Luxury.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-xl font-light leading-relaxed">
              Experience the world's most exclusive live cam network. 4K Ultra-HD streaming, absolute privacy, and the elite stars you've been waiting for.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button onClick={handleExternalRedirect} className="h-20 px-12 bg-[#D4AF37] hover:bg-white text-black font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition-all hover:-translate-y-1">
                ACCESS THE VAULT
                <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
              
              {/* Test button for debugging */}
              <button 
                onClick={() => {
                  console.log('Test button clicked');
                  alert('Test button works! Now trying external redirect...');
                  handleExternalRedirect();
                }}
                style={{
                  background: 'red',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                TEST LINK
              </button>
              <div onClick={handleExternalRedirect} className="flex items-center gap-6 px-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-black text-sm uppercase tracking-widest">12k+ Active</div>
                  <div className="text-zinc-500 text-[10px] font-bold uppercase">Streaming Now</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-yellow-200 rounded-[3rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="Feature Star"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Simulated UI Overlay */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="px-4 py-1.5 bg-red-600 rounded-full flex items-center gap-2 animate-pulse shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Live 4K</span>
                  </div>
                  <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                    <Eye className="w-3 h-3 inline mr-1.5" /> 14.2k Viewers
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 p-8 bg-zinc-950/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tight">Victoria Rose</h3>
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em]">Platinum Elite Member</span>
                      </div>
                    </div>
                    <div onClick={handleExternalRedirect} className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-hidden">
                    {['Brunette', 'HD', 'Tattoo'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-zinc-400 uppercase tracking-widest border border-white/5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h2 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">Live Now</h2>
              </div>
              <h3 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black text-white italic">Featured Stars</h3>
            </div>
            
            <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
              {['Trending', 'Popular', 'New'].map((tab, i) => (
                <button key={tab} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Chat Simulation Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 h-full hidden lg:block"
            >
              <div className="bg-zinc-900/50 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Global Chat</span>
                  </div>
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                </div>
                
                <div className="flex-1 space-y-6 overflow-hidden">
                  {ChatMessages.map((chat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="space-y-1"
                    >
                      <span className={`text-[10px] font-black uppercase tracking-widest ${chat.color}`}>{chat.user}:</span>
                      <p className="text-sm text-zinc-400 font-light">{chat.msg}</p>
                    </motion.div>
                  ))}
                  <div className="pt-4 border-t border-white/5">
                    <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1">System:</div>
                    <p className="text-xs text-zinc-500 italic">User *** joined private room</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37]/50"
                      readOnly
                    />
                    <MessageCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  </div>
                </div>
              </div>
            </motion.div>

            {Models.slice(0, 15).map((model, idx) => (
              <motion.div 
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={handleExternalRedirect}
              >
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                  <Image 
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  {/* Card UI */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${model.status === 'Live' ? 'bg-red-600' : 'bg-zinc-800'} backdrop-blur-md`}>
                        <div className={`w-1.5 h-1.5 rounded-full bg-white ${model.status === 'Live' ? 'animate-pulse' : ''}`} />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">{model.status}</span>
                      </div>
                      <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/5 text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">
                        {model.category}
                      </div>
                    </div>
                    <button onClick={handleExternalRedirect} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/5 text-zinc-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 transition-all duration-500 transform group-hover:translate-y-[-10px]">
                    <div className="mb-4">
                      <div className="text-2xl font-black text-white tracking-tight mb-1">{model.name}, {model.age}</div>
                      <div className="flex items-center gap-3 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                        <Users className="w-3 h-3 text-[#D4AF37]" /> {model.viewers} Viewers
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {model.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] font-black text-zinc-500 uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5">{tag}</span>
                      ))}
                    </div>

                    <Button onClick={handleExternalRedirect} className="w-full h-14 bg-white/10 hover:bg-[#D4AF37] hover:text-black border border-white/10 backdrop-blur-xl text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all">
                      GO PRIVATE
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Button onClick={handleExternalRedirect} className="h-16 px-12 border border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-black text-sm uppercase tracking-[0.3em] rounded-2xl transition-all">
              Discover 45k+ Elite Models
            </Button>
          </div>
        </div>
      </section>

      {/* Luxury Tokens Section */}
      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-['Playfair_Display'] font-black text-white mb-8 italic">Choose Your <br /> Status</h2>
            <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">Unlock HD private shows, send interactive gifts, and control the room. Exclusive token packages designed for VIP members.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TokenPackages.map((pkg) => (
              <motion.div 
                key={pkg.id}
                whileHover={{ y: -10 }}
                className={`relative p-12 rounded-[3.5rem] bg-zinc-900/50 border ${pkg.popular ? 'border-[#D4AF37]' : 'border-white/5'} backdrop-blur-xl overflow-hidden group`}
              >
                {pkg.popular && (
                  <div className="absolute top-8 right-8">
                    <Badge className="bg-[#D4AF37] text-black font-black px-4 py-1.5 uppercase tracking-widest text-[8px] border-none">Most Popular</Badge>
                  </div>
                )}
                
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Diamond className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-5xl font-black text-white mb-2">{pkg.tokens}</h3>
                <p className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] mb-8">Royal Tokens</p>
                
                <div className="space-y-4 mb-12">
                  <div className="flex items-center gap-3 text-zinc-300 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Ultra HD Unlocked
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Private Room Access
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Interactive Toy Control
                  </div>
                  <div className="text-[#D4AF37] font-black text-xs uppercase tracking-widest pt-4">Bonus: {pkg.bonus}</div>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Price Today</div>
                    <div className="text-3xl font-black text-white">{pkg.price}</div>
                  </div>
                  <Button onClick={handleExternalRedirect} className={`h-16 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${pkg.popular ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-[#D4AF37] hover:text-black border border-white/10'}`}>
                    Buy Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-10 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse" />
            <div className="relative grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 relative group">
                   <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400" alt="Model" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Play className="w-8 h-8 text-white fill-white" /></div>
                </div>
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative group">
                   <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500" alt="Model" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative group">
                   <Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=500" alt="Model" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 relative group">
                   <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400" alt="Model" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 right-4"><Badge className="bg-red-600 text-[8px] font-black border-none px-2 py-0.5">LIVE</Badge></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-none mb-8 px-6 py-2 uppercase tracking-[0.4em] font-black">Elite Standards</Badge>
            <h2 className="text-5xl md:text-8xl font-['Playfair_Display'] font-black text-white leading-none mb-10 tracking-tight">The Royal <br /> <span className="text-[#D4AF37] italic">Experience.</span></h2>
            
            <div className="space-y-12">
              {[
                { 
                  icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />, 
                  title: "Absolute Anonymity", 
                  desc: "Ghost Protocol billing. No adult terms on your statements. We use military-grade encryption for all private sessions." 
                },
                { 
                  icon: <Video className="w-8 h-8 text-[#D4AF37]" />, 
                  title: "4K Cinema Quality", 
                  desc: "Experience zero-latency broadcasting in stunning ultra-high definition. Every detail captured at 60 frames per second." 
                },
                { 
                  icon: <Gift className="w-8 h-8 text-[#D4AF37]" />, 
                  title: "Interactive Pleasure", 
                  desc: "Control interactive toys in real-time. Direct the action and experience truly immersive, responsive entertainment." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white mb-3 uppercase tracking-widest">{item.title}</h4>
                    <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button onClick={handleExternalRedirect} className="mt-16 h-20 px-12 bg-white text-black hover:bg-[#D4AF37] font-black text-lg rounded-2xl transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              JOIN THE ELITE NETWORK
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 border-y border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Elite Models Online", val: "45K+", icon: <Users className="w-4 h-4" /> },
            { label: "Active Members", val: "12.5M", icon: <Globe className="w-4 h-4" /> },
            { label: "Streaming Avg", val: "4K HD", icon: <Monitor className="w-4 h-4" /> },
            { label: "Satisfied Kings", val: "99.9%", icon: <Crown className="w-4 h-4" /> },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default" onClick={handleExternalRedirect}>
              <div className="text-4xl md:text-6xl font-black text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{stat.val}</div>
              <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                {stat.icon} {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto relative rounded-[4rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#8B7322] to-black" />
          <div className="absolute inset-[1px] bg-[#050505] rounded-[3.95rem]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000')] opacity-10 mix-blend-overlay" />
          
          <div className="relative p-16 md:p-32 text-center">
            <h2 className="text-6xl md:text-9xl font-['Playfair_Display'] font-black text-white mb-10 leading-none">Your Private <br /> <span className="text-[#D4AF37] italic">Throne Awaits.</span></h2>
            <p className="text-2xl text-zinc-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Don't settle for average. Join the world's most prestigious adult network and experience entertainment as it was meant to be.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <Button onClick={handleExternalRedirect} className="h-24 px-16 bg-[#D4AF37] hover:bg-white text-black font-black text-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(212,175,55,0.4)] transition-all hover:scale-105">
                START FREE ACCOUNT
              </Button>
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
                  <ShieldCheck className="w-5 h-5 text-green-500" /> Secure Encryption
                </div>
                <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
                  <Lock className="w-5 h-5 text-green-500" /> Discreete Billing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-32">
            <div className="col-span-2">
              <button onClick={handleExternalRedirect} className="flex items-center gap-3 mb-10 cursor-pointer">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                  <Camera className="w-7 h-7 text-black" />
                </div>
                <span className="text-3xl font-black tracking-tight text-white uppercase italic">
                  Royal<span className="text-[#D4AF37]">Cams</span>
                </span>
              </button>
              <p className="text-zinc-600 text-lg leading-relaxed max-w-sm mb-12 font-light">
                Redefining adult entertainment through luxury, technology, and absolute privacy since 2018.
              </p>
              <div className="flex gap-4">
                {[Globe, MessageCircle, Video].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-[#D4AF37] cursor-pointer transition-all hover:bg-white/10" onClick={handleExternalRedirect}>
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            {['The Network', 'Legal', 'Careers'].map((title, i) => (
              <div key={title}>
                <h4 className="font-black mb-10 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">{title}</h4>
                <ul className="space-y-6 text-sm font-bold text-zinc-500">
                  {i === 0 && ['Live Shows', 'Elite Models', 'VR Experience', 'VIP Access'].map(l => <li key={l}><a href="#" onClick={(e) => { e.preventDefault(); handleExternalRedirect(); }} className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{l}</a></li>)}
                  {i === 1 && ['Compliance', 'Privacy Policy', 'Terms of Use', 'Billing'].map(l => <li key={l}><a href="#" onClick={(e) => { e.preventDefault(); handleExternalRedirect(); }} className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{l}</a></li>)}
                  {i === 2 && ['Become a Star', 'Affiliates', 'Studio Portal', 'Support'].map(l => <li key={l}><a href="#" onClick={(e) => { e.preventDefault(); handleExternalRedirect(); }} className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12 opacity-50">
            <div className="text-zinc-600 text-[9px] font-black tracking-[0.5em] uppercase">
              © 2024 Royal Cams Network • Elite Adult Entertainment • 18+ ONLY
            </div>
            <div className="flex flex-wrap justify-center gap-12 grayscale">
              <div className="flex items-center gap-4 cursor-pointer" onClick={handleExternalRedirect}>
                <ShieldCheck className="w-6 h-6 text-zinc-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Secure</span>
              </div>
              <div className="flex items-center gap-4 cursor-pointer" onClick={handleExternalRedirect}>
                <Lock className="w-6 h-6 text-zinc-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
