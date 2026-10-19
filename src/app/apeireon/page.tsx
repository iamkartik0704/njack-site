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
      wing: 'Competitive Programming',
      icon: Binary,
      color: 'text-amber-400',
      badge: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
      desc: 'Knockout CP sprint where the bottom 15% of the scoreboard is eliminated every 20 minutes until one ultimate champion remains standing.',
      prize: '₹25,000 Pool',
    },
    {
      title: 'Forecast Frenzy',
      wing: 'Machine Learning',
      icon: Brain,
      color: 'text-purple-400',
      badge: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      desc: 'Kaggle-style live data science sprint. Train, tune, and submit predictive models on hidden test splits within a 24-hour window.',
      prize: '₹20,000 Pool',
    },
    {
      title: 'CACTUS: The Algorithmic Duel',
      wing: 'Algorithms',
      icon: Flame,
      color: 'text-rose-400',
      badge: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
      desc: 'The flagship team contest following strict ICPC penalty scoring and balloon-awarding rules. Challenging dynamic programming, trees, and math problems.',
      prize: '₹35,000 Pool',
    },
    {
      title: 'SpeedRun Syntax Blitz',
      wing: 'Development',
      icon: Zap,
      color: 'text-cyan-400',
      badge: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
      desc: 'Test your pure coding speed. 15 miniature problems that must be written and submitted in record time with zero compilation errors.',
      prize: '₹15,000 Pool',
    },
    {
      title: 'BidWars: Algorithmic Auction',
      wing: 'Game Theory & Math',
      icon: Trophy,
      color: 'text-emerald-400',
      badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      desc: 'Formulate bidding strategies, outplay rival bots in simulated markets, and maximize utility under bounded budget constraints.',
      prize: '₹20,000 Pool',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-purple-950/25 via-slate-900/40 to-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Flagship Annual CS Fest</span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-none">
              APEIREON <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">2026</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              The grand celebration of algorithms, neural intelligence, cyber supremacy, and systems engineering at IIT Patna.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Calendar className="h-4 w-4" />
                Annual Spring Edition
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <MapPin className="h-4 w-4" />
                IIT Patna Campus & Online
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Trophy className="h-4 w-4" />
                ₹1,15,000 Total Prize Pool
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Competitions Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Battleground Arenas
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            5 flagship contests testing algorithms, ML heuristics, pure speed, and game theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, i) => {
            const Icon = ev.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-purple-500/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold border ${ev.badge}`}>
                      {ev.wing}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {ev.prize}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${ev.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                      {ev.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-white transition-colors"
                  >
                    <span>View Schedule & Rules</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
