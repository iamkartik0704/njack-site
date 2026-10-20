'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Trash2, ExternalLink, X, MapPin } from 'lucide-react';

export interface EventData {
  id: string;
  title: string;
  slug: string;
  description: string;
  poster: string;
  startsAt: string;
  venue: string;
  registerUrl: string | null;
  status: string;
  department: string | null;
}

interface AdminEventsManagerProps {
  initialEvents: EventData[];
}

export default function AdminEventsManager({ initialEvents }: AdminEventsManagerProps) {
  const [events, setEvents] = useState<EventData[]>(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    poster: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    venue: 'Computer Science Lab 1, IIT Patna',
    registerUrl: 'https://unstop.com',
    status: 'upcoming',
    department: 'Competitive Programming',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.event) {
        setEvents([
          {
            ...data.event,
            startsAt: new Date(data.event.startsAt).toISOString(),
          },
          ...events,
        ]);
        setShowAddModal(false);
      } else {
        alert(data.error || 'Failed to create event.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating event.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEvents(events.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-cyan-400 font-bold">{events.length}</span> club events
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Event Title & Venue</th>
              <th className="px-5 py-3.5">Department</th>
              <th className="px-5 py-3.5">Date & Time</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {events.map((ev) => {
              const dateStr = new Date(ev.startsAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              });

              return (
                <tr key={ev.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white">{ev.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{ev.venue}</div>
                  </td>
                  <td className="px-5 py-4 font-medium text-cyan-300">
                    {ev.department || 'All Divisions'}
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-300">
                    {dateStr}
                  </td>
                  <td className="px-5 py-4 uppercase">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                        ev.status === 'upcoming'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-white/5 text-slate-400 border border-white/5'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {ev.registerUrl && (
                        <a
                          href={ev.registerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/5"
                          title="Register Link"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(ev.id)}
                        className="rounded-lg p-1 text-slate-400 hover:text-rose-400 hover:bg-white/5"
                        title="Delete Event"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Create Club Event</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)+/g, '');
                    setFormData({ ...formData, title, slug });
                  }}
                  placeholder="e.g. ByteRace 2026: Speed Coding Sprint"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Date & Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.startsAt}
                    onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Competitive Programming">Competitive Programming</option>
                    <option value="Development & Open Source">Development & Open Source</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="All Divisions">All Divisions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Venue *</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g. Tutorial Block Room 102 & Online"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Registration URL</label>
                <input
                  type="url"
                  value={formData.registerUrl}
                  onChange={(e) => setFormData({ ...formData, registerUrl: e.target.value })}
                  placeholder="https://unstop.com/hackathons/..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Rules, format, prizes..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-white focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan hover:bg-cyan-400"
                >
                  {loading ? 'Creating...' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
