'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

export interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  topic: string;
  tags: string;
  difficulty: string;
  featured: boolean;
  departmentId: string;
  department: {
    name: string;
    slug: string;
  };
}

interface AdminResourcesManagerProps {
  initialResources: ResourceData[];
  departments: { id: string; name: string }[];
}

export default function AdminResourcesManager({
  initialResources,
  departments,
}: AdminResourcesManagerProps) {
  const [resources, setResources] = useState<ResourceData[]>(initialResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'note',
    url: '',
    departmentId: departments[0]?.id || '',
    topic: '',
    tags: '',
    difficulty: 'beginner',
    featured: false,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.resource) {
        const dept = departments.find((d) => d.id === formData.departmentId);
        const created: ResourceData = {
          ...data.resource,
          department: { name: dept?.name || '', slug: '' },
        };
        setResources([created, ...resources]);
        setShowAddModal(false);
        setFormData({
          title: '',
          description: '',
          type: 'note',
          url: '',
          departmentId: departments[0]?.id || '',
          topic: '',
          tags: '',
          difficulty: 'beginner',
          featured: false,
        });
      } else {
        alert(data.error || 'Failed to create resource.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating resource.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const res = await fetch(`/api/admin/resources?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setResources(resources.filter((r) => r.id !== id));
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
          Showing <span className="text-cyan-400 font-bold">{resources.length}</span> curated resources
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-glow-cyan transition-all hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Resource</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Title & Topic</th>
              <th className="px-5 py-3.5">Department</th>
              <th className="px-5 py-3.5">Type</th>
              <th className="px-5 py-3.5">Difficulty</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {resources.map((r) => (
              <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-white">{r.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{r.topic}</div>
                </td>
                <td className="px-5 py-4 font-medium text-cyan-300">
                  {r.department.name}
                </td>
                <td className="px-5 py-4 uppercase font-mono text-slate-400">
                  {r.type}
                </td>
                <td className="px-5 py-4 capitalize">
                  <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-white/5">
                    {r.difficulty}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/5"
                      title="Open Link"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="rounded-lg p-1 text-slate-400 hover:text-rose-400 hover:bg-white/5"
                      title="Delete Resource"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Add Learning Resource</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Dynamic Programming Cheat Sheet"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Department *</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="note">Note / PDF</option>
                    <option value="article">Article</option>
                    <option value="youtube">YouTube</option>
                    <option value="repo">GitHub Repo</option>
                    <option value="slides">Slides</option>
                    <option value="link">Official Docs / Link</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Topic *</label>
                  <input
                    type="text"
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g. Graph Theory"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Resource URL *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short summary of what students will gain..."
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-white focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-white/20 bg-black/50 text-cyan-500"
                />
                <label htmlFor="featured" className="text-slate-300 font-mono">
                  Feature on Homepage and top of Hub
                </label>
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
                  {loading ? 'Saving...' : 'Add Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
