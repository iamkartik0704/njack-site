'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  BookOpen
} from 'lucide-react';

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string; // JSON array of options
  correctIndex: number;
  explanation: string;
  order: number;
}

interface QuizPlayerProps {
  quizTitle: string;
  quizTopic: string;
  departmentName: string;
  questions: QuizQuestionItem[];
}

export default function QuizPlayer({
  quizTitle,
  quizTopic,
  departmentName,
  questions,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ selected: number; correct: boolean }[]>([]);

  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-8 text-center text-[#8A8F98]">
        <HelpCircle className="mx-auto h-12 w-12 text-[#8A8F98]/50 mb-3" />
        <h3 className="text-lg font-semibold text-white">No questions available</h3>
        <p className="mt-1 text-xs text-[#8A8F98]">Questions are currently being added for this topic.</p>
        <Link
          href="/quizzes"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FF5722]/15 px-4 py-2 text-xs font-semibold text-[#FF5722] border border-[#FF5722]/30 hover:bg-[#FF5722]/25"
        >
          Back to Quizzes
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  let parsedOptions: string[] = [];
  try {
    parsedOptions = JSON.parse(currentQ.options);
  } catch {
    parsedOptions = currentQ.options.split(',').map((o) => o.trim());
  }

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [...prev, { selected: selectedOption, correct: isCorrect }]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  // Score Screen
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let gradeMsg = 'Keep Practicing!';
    let gradeDesc = 'Review the topics in our Resource Catalog and attempt the quiz again to cement your understanding.';
    if (percentage === 100) {
      gradeMsg = 'Flawless Mastery! 🎯';
      gradeDesc = 'Outstanding! You demonstrated complete conceptual and algorithmic precision.';
    } else if (percentage >= 75) {
      gradeMsg = 'Great Performance! 🚀';
      gradeDesc = 'Solid foundation! You demonstrated clear command over key systems and concepts.';
    }

    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 sm:p-10 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] text-center space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF5722]/15 border border-[#FF5722]/30 text-[#FF5722] shadow-[0_0_25px_rgba(255,87,34,0.35)]">
          <Trophy className="h-10 w-10 animate-bounce" />
        </div>

        <div>
          <span className="rounded-full bg-[#FF5722]/10 px-3 py-1 text-xs font-mono font-semibold text-[#FF5722] border border-[#FF5722]/20">
            {departmentName} • {quizTopic}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-display font-black text-white">{gradeMsg}</h2>
          <p className="mt-2 text-sm text-[#8A8F98]">{gradeDesc}</p>
        </div>

        {/* Score Badge */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#07080A]/60 p-6 flex items-center justify-around">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#FF8A00] font-mono">
              {score}/{questions.length}
            </div>
            <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mt-1">
              Correct Answers
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#FF5722] font-mono">
              {percentage}%
            </div>
            <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mt-1">
              Accuracy
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRestart}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/[0.08] transition-all border border-white/[0.08]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Quiz</span>
          </button>

          <Link
            href="/resources"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#FF5722] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,87,34,0.35)] transition-all hover:bg-[#FF3D00]"
          >
            <BookOpen className="h-4 w-4" />
            <span>Explore Resources</span>
          </Link>
        </div>
      </div>
    );
  }

  // Active Quiz Question
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Progress Bar & Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#8A8F98]">
        <span className="text-[#FF5722] font-semibold">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span>{progressPercent}% Complete</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full bg-gradient-to-r from-[#FF8A00] to-[#FF5722] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0E1016]/80 p-6 sm:p-8 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] space-y-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF8A00]">
            {departmentName} • {quizTopic}
          </span>
          <h2 className="mt-2 text-lg sm:text-xl font-display font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {parsedOptions.map((opt, idx) => {
            let optionStyles = 'border-white/[0.08] bg-[#07080A]/60 text-neutral-200 hover:border-[#FF5722]/50 hover:bg-white/[0.03]';
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            if (isAnswerSubmitted) {
              if (isCorrect) {
                optionStyles = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-medium';
              } else if (isSelected) {
                optionStyles = 'border-rose-500/50 bg-rose-500/15 text-rose-300 font-medium';
              } else {
                optionStyles = 'border-white/[0.04] bg-black/20 text-[#8A8F98] opacity-50';
              }
            } else if (isSelected) {
              optionStyles = 'border-[#FF5722] bg-[#FF5722]/15 text-white font-medium shadow-[0_0_15px_rgba(255,87,34,0.35)]';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswerSubmitted}
                className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left text-sm transition-all duration-200 ${optionStyles}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/10 font-mono text-xs font-semibold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 self-center" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-rose-400 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Pedagogical Explanation Card */}
        {isAnswerSubmitted && (
          <div className="rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10 p-4 sm:p-5 backdrop-blur-md animate-fadeIn">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-[#FF5722] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FF5722]">
                  Concept Explanation
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card Actions */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="text-xs font-mono text-[#8A8F98]">
            {isAnswerSubmitted ? (
              selectedOption === currentQ.correctIndex ? (
                <span className="text-emerald-400 font-semibold">✓ Correct answer!</span>
              ) : (
                <span className="text-rose-400 font-semibold">✗ Not quite right</span>
              )
            ) : (
              <span>Select an option to evaluate</span>
            )}
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`rounded-xl px-5 py-2.5 text-xs font-semibold transition-all ${
                selectedOption !== null
                  ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.35)] hover:bg-[#FF3D00]'
                  : 'bg-white/[0.04] text-[#8A8F98] cursor-not-allowed border border-white/[0.06]'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF5722] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,87,34,0.35)] hover:bg-[#FF3D00] transition-all"
            >
              <span>{currentIndex + 1 === questions.length ? 'View Score' : 'Next Question'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
