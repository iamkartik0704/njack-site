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
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] py-14 sm:py-20"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12"> {/* Header */}
        <div className="max-w-2xl"> <h1 className="font-display text-[1.75rem] sm:text-4xl font-semibold tracking-[-0.03em] text-[#F3F4F6]"> Contact NJACK </h1> <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed"> Have questions about club events, workshop collaborations, sponsorship for Apeireon, or joining our technical divisions? Drop us a line below.
          </p> </div> {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10"> {/* Left: Contact Info Cards */}
          <div className="space-y-6"> <div className="rounded-lg border border-white/[0.10] bg-[#0E1016]/40 p-6 backdrop-blur-md space-y-4"> <div className="flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#FF5722]/20 border border-[#FF5722]/40 text-[#FF8A00]"> <MapPin className="h-5 w-5" /> </div> <div> <h3 className="font-bold text-white text-sm">Club Headquarters</h3> <p className="text-xs text-[#8A8F98]">Gymkhana IIT Patna</p> </div> </div> <p className="text-xs text-neutral-300 leading-relaxed pl-13"> NJACK Room, Students' Activity Center (SAC),<br /> Indian Institute of Technology Patna,<br /> Bihta, Patna, Bihar 801106
              </p> </div> <div className="rounded-lg border border-white/[0.10] bg-[#0E1016]/40 p-6 backdrop-blur-md space-y-4"> <div className="flex items-center gap-3"> <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#FF5722]/20 border border-[#FF5722]/40 text-[#FF8A00]"> <Mail className="h-5 w-5" /> </div> <div> <h3 className="font-bold text-white text-sm">Direct Email</h3> <p className="text-xs text-[#8A8F98]">Official inquiries</p> </div> </div> <div className="space-y-1 text-xs font-mono text-[#FF8A00]"> <div>njack@iitp.ac.in</div> <div className="text-[#8A8F98]">gymkhana_tech@iitp.ac.in</div> </div> </div> <div className="rounded-lg border border-white/[0.10] bg-gradient-to-br from-[#2A0F06]/30 to-[#0E1016]/50 p-6 backdrop-blur-md space-y-2"> <div className="flex items-center gap-2 text-xs font-mono text-[#FF8A00]"> <Terminal className="h-4 w-4" /> <span>Notice for CP Contest Plagiarism</span> </div> <p className="text-xs text-neutral-300 leading-relaxed"> To report Codeforces contest cheating confidentially, please use our dedicated anonymous portal.
              </p> <a
                href="/report-cheating" className="mt-2 inline-flex items-center text-xs font-semibold text-[#FF8A00] hover:underline" > Go to Anonymous CF Report Form →
              </a> </div> </div> {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-2 rounded-lg border border-white/[0.10] bg-[#0E1016]/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl"> {success ? (
              <div className="text-center py-12 space-y-4"> <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-[#FF5722]/20 border border-[#FF5722]/40 text-[#FF5722]"> <CheckCircle2 className="h-8 w-8" /> </div> <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3> <p className="text-sm text-neutral-300 max-w-md mx-auto"> Thank you for reaching out to NJACK. Your message has been logged in our council inbox. We typically reply within two working days.
                </p> <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 rounded-sm bg-[#FF5722]/20 px-5 py-2.5 text-xs font-semibold text-[#FF8A00] border border-[#FF5722]/30 hover:bg-[#FF5722] hover:text-white transition-all" > Send Another Inquiry
                </button> </div> ) : (
              <form onSubmit={handleSubmit} className="space-y-6"> <div> <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2> <p className="text-xs text-[#8A8F98] mt-1"> Fill in the form below and the respective division coordinators will get in touch.
                  </p> </div> {error && (
                  <div className="flex items-center gap-2 rounded-sm border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300"> <AlertCircle className="h-4 w-4 shrink-0" /> <span>{error}</span> </div> )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> <div> <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2"> Full Name *
                    </label> <input
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priyanshu Sharma" className="w-full rounded-sm border border-white/[0.10] bg-[#07080A]/40 px-4 py-3 text-sm text-white placeholder-[#5A5F68] focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]" /> </div> <div> <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2"> Email Address *
                    </label> <input
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@iitp.ac.in" className="w-full rounded-sm border border-white/[0.10] bg-[#07080A]/40 px-4 py-3 text-sm text-white placeholder-[#5A5F68] focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]" /> </div> </div> <div> <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2"> Subject / Topic
                  </label> <input
                    type="text" value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Workshop Collaboration, Fest Sponsorship, Club Inquiry" className="w-full rounded-sm border border-white/[0.10] bg-[#07080A]/40 px-4 py-3 text-sm text-white placeholder-[#5A5F68] focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722]" /> </div> <div> <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2"> Message Details *
                  </label> <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or proposal..." className="w-full rounded-sm border border-white/[0.10] bg-[#07080A]/40 px-4 py-3 text-sm text-white placeholder-[#5A5F68] focus:border-[#FF5722] focus:outline-none focus:ring-1 focus:ring-[#FF5722] resize-none" /> </div> <button
                  type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#FF5722] to-[#D9381E] px-6 py-3.5 text-xs font-semibold text-[#F3F4F6] shadow-lift transition-all hover:scale-[1.01] disabled:opacity-50" > <Send className="h-4 w-4" /> <span>{loading ? 'Submitting Message...' : 'Send Message to Council'}</span> </button> </form> )}
          </div> </div> </div> </div> );
}
