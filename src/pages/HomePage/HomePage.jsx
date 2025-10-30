import React from "react";
import Navbar from "../../components/Navbar.jsx";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />

      {/* Hero Section (subtle gradient, soft borders, centered) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur rounded-2xl p-8 sm:p-12 text-center shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="size-16 sm:size-20 rounded-full border border-neutral-200 dark:border-neutral-800 grid place-items-center">
                <span className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  AI
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Welcome to <span className="text-indigo-600 dark:text-indigo-400">CollabStudy</span>
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Your AI-powered learning companion for efficient studying and collaborative learning
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Get Started
              </button>
              <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-lg font-medium border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-semibold text-neutral-900 dark:text-neutral-100">
              Why Choose CollabStudy?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              We combine the power of AI with collaborative learning to make studying more effective, engaging, and social.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-14">
            {/* AI Teacher/Assistant Feature */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="size-14 sm:size-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white grid place-items-center text-lg font-semibold">
                  AI
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    AI Teacher/Assistant
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Your personalized learning companion</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-indigo-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Document Summarization</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Upload PDFs, DOCX, PPTs and get AI-powered summaries</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-purple-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Gamified Learning</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Interactive levels, badges, and achievements for motivation</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-green-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Auto-Generated Quizzes</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">MCQs and subjective questions based on your study materials</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-orange-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Smart Revision Tracking</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">AI suggests when and what to revise based on your progress</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Community Feature */}
            <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="size-14 sm:size-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 text-white grid place-items-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Student Community</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Connect, share, and learn together</p>
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-sky-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Study Groups</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Create or join subject-specific study groups</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-emerald-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Material Sharing</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Share notes, summaries, and study materials with peers</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-purple-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Group Discussions</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Engage in Q&A sessions and topic discussions</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 size-6 grid place-items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-orange-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Achievement Sharing</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Share quiz scores and learning milestones with your groups</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action (toned-down gradient) */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white p-8 sm:p-12 text-center shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">Ready to Transform Your Learning?</h3>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-6">
              Join thousands of students who are already using CollabStudy to make their learning more efficient and collaborative.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-indigo-700 bg-white hover:bg-neutral-100">
                Start Learning Now
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium border border-white/70 hover:bg-white hover:text-indigo-700">
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
