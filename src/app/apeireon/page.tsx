import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Trophy,
  Flame,
  Binary,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  Calendar,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const revalidate = 300;

export default function ApeireonPage() {
  const events = [
    {
      title: 'King of the Hills',
      division: 'Competitive Programming',
      icon: Binary,
      color: 'text-[#FF8A00]',
      badge: 'border-[#FF8A00]/30 bg-[#FF8A00]/10 text-[#FF8A00]',
      desc: 'Knockout CP sprint where the bottom 15% of the scoreboard is eliminated every 20 minutes until one ultimate champion remains standing.',
      prize: '₹25,000 Pool',
    },
    {
      title: 'Forecast Frenzy',
      division: 'Machine Learning',
      icon: Brain,
      color: 'text-[#FF8A00]',
      badge: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF8A00]',
      desc: 'Kaggle-style live data science sprint. Train, tune, and submit predictive models on hidden test splits within a 24-hour window.',
      prize: '₹20,000 Pool',
    },
    {
      title: 'CACTUS: The Algorithmic Duel',
      division: 'Algorithms',
      icon: Flame,
      color: 'text-rose-400',
      badge: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
      desc: 'The flagship team contest following strict ICPC penalty scoring and balloon-awarding rules. Challenging dynamic programming, trees, and math problems.',
      prize: '₹35,000 Pool',
    },
    {
      title: 'SpeedRun Syntax Blitz',
      division: 'Development',
      icon: Zap,
      color: 'text-[#FF8A00]',
      badge: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF8A00]',
      desc: 'Test your pure coding speed. 15 miniature problems that must be written and submitted in record time with zero compilation errors.',
      prize: '₹15,000 Pool',
    },
    {
      title: 'BidWars: Algorithmic Auction',
      division: 'Game Theory & Math',
      icon: Trophy,
      color: 'text-[#FF5722]',
      badge: 'border-[#FF5722]/30 bg-[#FF5722]/10 text-[#FF5722]',
      desc: 'Formulate bidding strategies, outplay rival bots in simulated markets, and maximize utility under bounded budget constraints.',
      prize: '₹20,000 Pool',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6]"> {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1A1714]/10 bg-bone text-bone-ink py-16 sm:py-24"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div className="max-w-3xl space-y-4"> <div className="inline-flex items-center gap-2 rounded-full border border-[#1A1714]/20 bg-[#1A1714]/[0.04] px-3 py-1 text-xs font-mono text-[#B23A14]"> <Sparkles className="h-3.5 w-3.5" /> <span>Flagship Annual CS Fest</span> </div> <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-[#1A1714] leading-none"> APEIREON 2026 </h1> <p className="max-w-prose text-base text-[#1A1714]/75 leading-relaxed"> The grand celebration of algorithms, neural intelligence, cyber supremacy, and systems engineering at IIT Patna.
            </p> <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#8A8F98]"> <span className="flex items-center gap-1.5 text-[#FF8A00]"> <Calendar className="h-4 w-4" /> Annual Spring Edition
              </span> <span>•</span> <span className="flex items-center gap-1.5 text-[#FF8A00]"> <MapPin className="h-4 w-4" /> IIT Patna Campus & Online
              </span> <span>•</span> <span className="flex items-center gap-1.5 text-[#FF8A00] font-bold"> <Trophy className="h-4 w-4" /> ₹1,15,000 Total Prize Pool
              </span> </div> </div> </div> </section> {/* Flagship Competitions Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12"> <div className="max-w-prose"> <h2 className="text-2xl sm:text-4xl font-semibold text-[#F3F4F6]"> Battleground Arenas
          </h2> <p className="mt-2 text-xs sm:text-sm text-[#8A8F98]"> 5 flagship contests testing algorithms, ML heuristics, pure speed, and game theory.
          </p> </div> <div className="grid grid-cols-1 md:grid-cols-5 [&>*]:md:col-span-2 [&>*:first-child]:md:col-span-3 [&>*:nth-child(4)]:md:col-span-3 gap-6"> {events.map((ev, i) => {
            const Icon = ev.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col justify-between rounded-lg border border-white/[0.10] bg-[#0E1016]/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#FF5722]/40 hover:bg-[#0E1016]/70 hover:shadow-2xl hover:shadow-[#FF5722]/5" > <div> <div className="flex items-center justify-between gap-2 mb-4"> <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border ${ev.badge}`}> {ev.division}
                    </span> <span className="text-xs font-mono font-bold text-[#FF8A00]"> {ev.prize}
                    </span> </div> <div className="flex items-center gap-3 mb-3"> <div className={`flex h-10 w-10 items-center justify-center rounded-sm bg-white/5 border border-white/[0.10] ${ev.color}`}> <Icon className="h-5 w-5" /> </div> <h3 className="font-bold text-white text-lg group-hover:text-[#FF8A00] transition-colors"> {ev.title}
                    </h3> </div> <p className="text-xs text-neutral-300 leading-relaxed"> {ev.desc}
                  </p> </div> <div className="mt-6 border-t border-white/[0.06] pt-4"> <Link
                    href="/events" className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8A00] hover:text-white transition-colors" > <span>View Schedule & Rules</span> <ArrowRight className="h-3.5 w-3.5" /> </Link> </div> </div> );
          })}
        </div> </main> </div> );
}
