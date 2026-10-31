'use client';

import React, { useState } from 'react';
import { Trophy, Plus, Trash2, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export interface QuizData {
  id: string;
  title: string;
  slug: string;
  topic: string;
  description: string;
  departmentId: string | null;
  department: { name: string } | null;
  questions: { id: string }[];
}

interface AdminQuizzesManagerProps {
  initialQuizzes: QuizData[];
  departments: { id: string; name: string }[];
}

export default function AdminQuizzesManager({
  initialQuizzes,
  departments,
}: AdminQuizzesManagerProps) {
  const [quizzes, setQuizzes] = useState<QuizData[]>(initialQuizzes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    departmentId: departments[0]?.id || '',
    topic: '',
    description: '',
    questionText: '',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    correctIndex: 0,
    explanation: '',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const questionsPayload = formData.questionText.trim()
      ? [
          {
            question: formData.questionText.trim(),
            options: [formData.optA, formData.optB, formData.optC, formData.optD],
            correctIndex: Number(formData.correctIndex),
            explanation: formData.explanation.trim(),
          },
        ]
      : [];

    try {
      const res = await fetch('/api/admin/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          departmentId: formData.departmentId,
          topic: formData.topic,
          description: formData.description,
          questions: questionsPayload,
        }),
      });

      const data = await res.json();
      if (res.ok && data.quiz) {
        const dept = departments.find((d) => d.id === formData.departmentId);
        const created: QuizData = {
          ...data.quiz,
          department: { name: dept?.name || 'NJACK' },
          questions: questionsPayload.map((_, i) => ({ id: `q-${i}` })),
        };
        setQuizzes([created, ...quizzes]);
        setShowAddModal(false);
      } else {
        alert(data.error || 'Failed to create quiz.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;

    try {
      const res = await fetch(`/api/admin/quizzes?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setQuizzes(quizzes.filter((q) => q.id !== id));
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
          Showing <span className="text-amber-400 font-bold">{quizzes.length}</span> active self-check quizzes
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-glow-amber transition-all hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Author New Quiz</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-black/40 text-[11px] font-mono uppercase text-slate-400">
            <tr>
              <th className="px-5 py-3.5">Quiz Title & Topic</th>
              <th className="px-5 py-3.5">Department</th>
              <th className="px-5 py-3.5">Questions Count</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-white">{quiz.title}</div>
                  <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">{quiz.topic}</div>
                </td>
                <td className="px-5 py-4 font-medium text-slate-300">
                  {quiz.department?.name || 'NJACK General'}
                </td>
                <td className="px-5 py-4 font-mono text-cyan-400 font-semibold">
                  {quiz.questions.length} Questions
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/quizzes/${quiz.slug}`}
                      target="_blank"
                      className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/5"
                      title="Preview Quiz"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="rounded-lg p-1 text-slate-400 hover:text-rose-400 hover:bg-white/5"
                      title="Delete Quiz"
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

      {/* Author Quiz Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Author New Quiz</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Quiz Title *</label>
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
                  placeholder="e.g. Graph Algorithms Mastery Quiz"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none"
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
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Department *</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Topic Name *</label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g. Trees, DSU, Shortest Paths"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What concepts does this quiz evaluate?"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-white focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              {/* Sample Question 1 */}
              <div className="border-t border-white/10 pt-3 space-y-3">
                <div className="font-mono text-amber-400 font-semibold uppercase tracking-wider text-[11px]">
                  Starter Question & Explanation
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1">Question Prompt</label>
                  <input
                    type="text"
                    value={formData.questionText}
                    onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                    placeholder="e.g. What is the time complexity of Dijkstra with binary heap?"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.optA}
                    onChange={(e) => setFormData({ ...formData, optA: e.target.value })}
                    placeholder="Option A"
                    className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    value={formData.optB}
                    onChange={(e) => setFormData({ ...formData, optB: e.target.value })}
                    placeholder="Option B"
                    className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    value={formData.optC}
                    onChange={(e) => setFormData({ ...formData, optC: e.target.value })}
                    placeholder="Option C"
                    className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    value={formData.optD}
                    onChange={(e) => setFormData({ ...formData, optD: e.target.value })}
                    placeholder="Option D"
                    className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-mono mb-1">Correct Option</label>
                    <select
                      value={formData.correctIndex}
                      onChange={(e) => setFormData({ ...formData, correctIndex: Number(e.target.value) })}
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-white"
                    >
                      <option value={0}>Option A</option>
                      <option value={1}>Option B</option>
                      <option value={2}>Option C</option>
                      <option value={3}>Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-mono mb-1">Explanation</label>
                    <input
                      type="text"
                      value={formData.explanation}
                      onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                      placeholder="Why this answer is correct..."
                      className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
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
                  className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-glow-amber hover:bg-amber-400"
                >
                  {loading ? 'Creating...' : 'Publish Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
