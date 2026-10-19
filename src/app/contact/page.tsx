'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Phone, Terminal, Heart } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 mb-4">
            <Mail className="h-3.5 w-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">NJACK</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Have questions about club events, workshop collaborations, sponsorship for Apeireon, or joining our technical wings? Drop us a line below.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left: Contact Info Cards */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Club Headquarters</h3>
                  <p className="text-xs text-slate-400">Gymkhana IIT Patna</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-13">
                NJACK Room, Students' Activity Center (SAC),<br />
                Indian Institute of Technology Patna,<br />
                Bihta, Patna, Bihar — 801106
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Direct Email</h3>
                  <p className="text-xs text-slate-400">Official inquiries</p>
                </div>
              </div>
              <div className="space-y-1 text-xs font-mono text-cyan-400">
                <div>njack@iitp.ac.in</div>
                <div className="text-slate-400">gymkhana_tech@iitp.ac.in</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-950/30 to-slate-900/50 p-6 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Terminal className="h-4 w-4" />
                <span>Notice for CP Contest Plagiarism</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                To report Codeforces contest cheating confidentially, please use our dedicated anonymous portal.
              </p>
              <a
                href="/report-cheating"
                className="mt-2 inline-flex items-center text-xs font-semibold text-amber-400 hover:underline"
              >
                Go to Anonymous CF Report Form →
              </a>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to NJACK. Your message has been logged in our council inbox. We typically reply within 24–48 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 rounded-xl bg-cyan-500/20 px-5 py-2.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in the form below and the respective wing coordinators will get in touch.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@iitp.ac.in"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Workshop Collaboration, Fest Sponsorship, Club Inquiry"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or proposal..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Submitting Message...' : 'Send Message to Council'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
