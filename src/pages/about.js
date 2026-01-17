import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LogoLoop from '../components/ui/logoloop';
import { SiReact, SiNodedotjs, SiJavascript, SiTailwindcss, SiMongodb, SiLinkedin, SiGithub, SiHtml5, SiCss3} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNodedotjs />, title: "Next.js", href: "https://nodejs.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiJavascript />, title: "JavaScript"},
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com/"},
  { node: <SiLinkedin />, title: "LinkedIn", href: "https://www.linkedin.com/in/solaimanzinger65/"},
  { node: <SiGithub />, title: "GitHub", href: "https://github.com/szinger65"},
  { node: <SiHtml5 />, title: "HTML5"},
  { node: <SiCss3 />, title: "CSS3"}
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-xl">
        {}
        <Link to="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
        </Link>
        {}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
          About TickedOff
        </h1>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            TickedOff isn't just another to-do list. It is a philosophy of productivity designed 
            to bridge the gap between your daily grind and your life's biggest ambitions.
          </p>
          <p>
            I believe that small daily taks should directly 
            contribute to your long term goals. When you can see the progress bar move 
            on a life goal just by checking off a daily chore, motivation becomes automatic.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 pt-4">Why I built this</h2>
          <p>
            Traditional productivity tools are lists of endless obligations. TickedOff is a 
            game where you are the protagonist. Earn points, build streaks, and watch 
            your profile grow as you conquer your day.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400">© 2026 TickedOff Inc.</p>
        </div>
      </div>
      <div style={{ height: '200px', position: 'absolute', overflow: 'hidden', bottom: '20px'}}>
        {}
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
        
        {}
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="up"
          logoHeight={48}
          gap={40}
          hoverSpeed={20}
          fadeOut
        />
      </div>
    </div>
  );
}

