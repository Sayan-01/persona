import React from "react";
import "./sdxplan.css"

const page = () => {
  return (
    <div className="light bg-white text-black">
      <header className="gradient-bg text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4">🎯 ULTIMATE 38-DAY BATTLE PLAN</h1>
          <p className="text-2xl md:text-3xl font-bold mb-6">24 November - 31 December 2025</p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold">432 Total Hours</span>
            <span className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold">LeetCode 150 → 300</span>
            <span className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold">4 Exams Aced</span>
            <span className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold">Dream Internship Ready</span>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto py-12 px-4 bg-white text-black">
        <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">📊 WEEKLY LOAD DISTRIBUTION</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Week</th>
                <th className="px-6 py-4 text-left font-bold">Dates</th>
                <th className="px-6 py-4 text-left font-bold">Exam Load</th>
                <th className="px-6 py-4 text-left font-bold">Prep Load</th>
                <th className="px-6 py-4 text-left font-bold">Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-purple-50 transition">
                <td className="px-6 py-4 font-bold">Week 1</td>
                <td className="px-6 py-4">24-30 Nov</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-bold">50%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">50%</span>
                </td>
                <td className="px-6 py-4">DSA Heavy + Exam Start</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="px-6 py-4 font-bold">Week 2</td>
                <td className="px-6 py-4">1-8 Dec</td>
                <td className="px-6 py-4">
                  <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-bold">70%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">30%</span>
                </td>
                <td className="px-6 py-4">Exam Priority + DSA Maintenance</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="px-6 py-4 font-bold">Week 3</td>
                <td className="px-6 py-4">9-14 Dec</td>
                <td className="px-6 py-4">
                  <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-bold">70%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">30%</span>
                </td>
                <td className="px-6 py-4">Exam Priority + Project Push</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="px-6 py-4 font-bold">Week 4</td>
                <td className="px-6 py-4">15-22 Dec</td>
                <td className="px-6 py-4">
                  <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full font-bold">90%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">10%</span>
                </td>
                <td className="px-6 py-4 font-bold">EXAM BEAST MODE</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="px-6 py-4 font-bold">Week 5</td>
                <td className="px-6 py-4">23-31 Dec</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-bold">0%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">100%</span>
                </td>
                <td className="px-6 py-4 font-bold">POST-EXAM DSA SPRINT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">🔥 DAILY TIME-BLOCK BLUEPRINT</h2>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">📘 TYPE A: COLLEGE DAY (Only Mondays)</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-bold text-blue-600 w-48">08:00 AM - 06:00 PM</span>
                <span>→ College + Travel</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-blue-600 w-48">06:30 PM - 07:00 PM</span>
                <span>→ Refresh + Snacks</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-blue-600 w-48">07:00 PM - 09:30 PM</span>
                <span>→ DSA (2.5hr) - 1 topic deep dive</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-blue-600 w-48">09:30 PM - 10:00 PM</span>
                <span>→ Dinner Break</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-blue-600 w-48">10:00 PM - 11:30 PM</span>
                <span>→ Exam Prep (1.5hr) - 1 subject only</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-blue-600 w-48">11:30 PM - 12:00 AM</span>
                <span>→ LeetCode Daily + Revision</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-blue-800">Total Productive: 4 hours</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold text-green-600 mb-4">📗 TYPE B: WEEKDAY - Phase 1 (Week 1: 50% Exam)</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">08:00 AM - 09:00 AM</span>
                <span>→ Wake + Routine</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">09:00 AM - 12:00 PM</span>
                <span>→ EXAM PREP (3hr) - 1 Subject Deep</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">12:00 PM - 02:00 PM</span>
                <span>→ Lunch + Rest</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">02:00 PM - 05:00 PM</span>
                <span>→ DSA SESSION 1 (3hr) - Theory + Practice</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">05:00 PM - 06:00 PM</span>
                <span>→ Play/Walk/Refresh</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">06:00 PM - 08:30 PM</span>
                <span>→ DSA SESSION 2 (2.5hr) - LeetCode Pattern</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">08:30 PM - 09:00 PM</span>
                <span>→ Light Snack</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">09:00 PM - 11:00 PM</span>
                <span>→ EXAM PREP (2hr) - 2nd Subject</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">11:00 PM - 11:30 PM</span>
                <span>→ Communication (English Speaking/Mock)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-green-600 w-48">11:30 PM - 12:00 AM</span>
                <span>→ Daily Review + Tomorrow Prep</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-green-800">Total: 10.5 hours (Exam: 5hr | DSA: 5.5hr)</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">📗 TYPE B: WEEKDAY - Phase 2 (Week 2-3: 70% Exam)</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">08:00 AM - 09:00 AM</span>
                <span>→ Wake + Routine</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">09:00 AM - 01:00 PM</span>
                <span>→ EXAM PREP (4hr) - Primary Subject</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">01:00 PM - 02:00 PM</span>
                <span>→ Lunch</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">02:00 PM - 03:00 PM</span>
                <span>→ Rest/Nap</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">03:00 PM - 05:30 PM</span>
                <span>→ DSA Focus (2.5hr) - New Topic</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">05:30 PM - 06:00 PM</span>
                <span>→ Break</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">06:00 PM - 08:00 PM</span>
                <span>→ EXAM PREP (2hr) - Secondary Subject</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">08:00 PM - 09:00 PM</span>
                <span>→ Dinner</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">09:00 PM - 10:30 PM</span>
                <span>→ LeetCode (1.5hr) - Pattern Practice</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">10:30 PM - 11:30 PM</span>
                <span>→ Project/Aptitude/WebDev (1hr)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-orange-600 w-48">11:30 PM - 12:00 AM</span>
                <span>→ Revision</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-orange-800">Total: 11 hours (Exam: 6hr | Prep: 5hr)</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold text-red-600 mb-4">📗 TYPE B: WEEKDAY - Phase 3 (Week 4: 90% Exam)</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">08:00 AM - 09:00 AM</span>
                <span>→ Wake + Routine</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">09:00 AM - 01:30 PM</span>
                <span>→ EXAM PREP (4.5hr) - Subject 1</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">01:30 PM - 02:30 PM</span>
                <span>→ Lunch</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">02:30 PM - 06:00 PM</span>
                <span>→ EXAM PREP (3.5hr) - Subject 2</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">06:00 PM - 07:00 PM</span>
                <span>→ Break/Walk</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">07:00 PM - 09:00 PM</span>
                <span>→ EXAM REVISION (2hr) - Weak Topics</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">09:00 PM - 10:00 PM</span>
                <span>→ Dinner</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">10:00 PM - 11:00 PM</span>
                <span>→ DSA Maintenance (1hr) - Easy problems</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-red-600 w-48">11:00 PM - 12:00 AM</span>
                <span>→ Theory Revision</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-red-800">Total: 11.5 hours (Exam: 10hr | DSA: 1hr)</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">📙 TYPE C: WEEKEND - Phase 1 (Week 1: 50% Exam)</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">08:00 AM - 09:00 AM</span>
                <span>→ Wake + Routine</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">09:00 AM - 12:30 PM</span>
                <span>→ DSA DEEP DIVE (3.5hr) - Complete 1 Topic</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">12:30 PM - 02:00 PM</span>
                <span>→ Lunch + Rest</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">02:00 PM - 05:00 PM</span>
                <span>→ PROJECT WORK (3hr) - Features/Testing</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">05:00 PM - 06:00 PM</span>
                <span>→ Break</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">06:00 PM - 09:00 PM</span>
                <span>→ EXAM PREP (3hr) - Theory Consolidation</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">09:00 PM - 10:00 PM</span>
                <span>→ Dinner</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">10:00 PM - 11:30 PM</span>
                <span>→ Mock Interview/Aptitude (1.5hr)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-purple-600 w-48">11:30 PM - 12:00 AM</span>
                <span>→ Weekly Review</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-purple-800">Total: 11 hours (DSA: 3.5hr | Exam: 3hr | Project: 3hr | Mock: 1.5hr)</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">📙 TYPE C: WEEKEND - Phase 2 (Week 2-3: 70% Exam)</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">08:00 AM - 09:00 AM</span>
                <span>→ Wake + Routine</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">09:00 AM - 01:00 PM</span>
                <span>→ EXAM MARATHON (4hr) - Past Papers/Notes</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">01:00 PM - 02:00 PM</span>
                <span>→ Lunch</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">02:00 PM - 05:00 PM</span>
                <span>→ DSA SESSION (3hr) - LeetCode Contest Style</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">05:00 PM - 06:00 PM</span>
                <span>→ Break</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">06:00 PM - 09:00 PM</span>
                <span>→ EXAM REVISION (3hr) - Important Topics</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">09:00 PM - 10:00 PM</span>
                <span>→ Dinner</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">10:00 PM - 11:30 PM</span>
                <span>→ WebDev Interview Prep/Aptitude (1.5hr)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold text-indigo-600 w-48">11:30 PM - 12:00 AM</span>
                <span>→ Reflection</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold text-indigo-800">Total: 11.5 hours (Exam: 7hr | DSA: 3hr | Others: 1.5hr)</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-xl p-8 card-hover transition duration-300">
            <h3 className="text-2xl font-bold mb-4">📙 TYPE C: POST-EXAM WEEKEND (Week 5)</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="font-bold w-48">08:00 AM - 09:00 AM</span>
                <span>→ Wake + Routine</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">09:00 AM - 01:00 PM</span>
                <span>→ DSA BEAST MODE (4hr) - Advanced Topics</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">01:00 PM - 02:00 PM</span>
                <span>→ Lunch</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">02:00 PM - 05:30 PM</span>
                <span>→ LeetCode Marathon (3.5hr) - Hard Problems</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">05:30 PM - 06:00 PM</span>
                <span>→ Break</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">06:00 PM - 08:30 PM</span>
                <span>→ System Design (2.5hr) - Case Studies</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">08:30 PM - 09:30 PM</span>
                <span>→ Dinner</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">09:30 PM - 11:30 PM</span>
                <span>→ MOCK INTERVIEW (2hr) - Full Stack</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold w-48">11:30 PM - 12:00 AM</span>
                <span>→ Day Review</span>
              </div>
            </div>
            <p className="mt-4 text-xl font-bold">Total: 12 hours (Pure Interview Prep)</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">📅 WEEK-BY-WEEK DETAILED ROADMAP</h2>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-black text-blue-800">🔵 WEEK 1: Nov 24-30 (Foundation Phase)</h3>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm">50% Exam</span>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Goals:</h4>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Complete DP (Advanced patterns)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Stack 100% done
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Queue 100% done
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> DBMS 2 chapters
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> AI Chapter 2
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> LeetCode +20 problems
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Project: UI fixes done
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 1: Sun, 24 Nov ⚡ BATTLE START</h5>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Weekend</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • 09:00-12:30 → <strong>DP Deep Dive</strong> (Partition DP, DP on Trees)
                </li>
                <li>
                  • 02:00-05:00 → <strong>Project</strong>: UI fixes + testing plan
                </li>
                <li>
                  • 06:00-09:00 → <strong>DBMS Ch1</strong>: ER Model, Normalization
                </li>
                <li>
                  • 10:00-11:30 → <strong>Aptitude</strong>: Quantitative basics
                </li>
                <li>• ✅ LeetCode: 3 DP problems</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 2: Mon, 25 Nov 🏫 COLLEGE DAY</h5>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">College</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• 08:00-06:00 → College</li>
                <li>
                  • 07:00-09:30 → <strong>DP Practice</strong> (5 problems)
                </li>
                <li>
                  • 10:00-11:30 → <strong>AI Ch2</strong>: Search Algorithms
                </li>
                <li>• 11:30-12:00 → LeetCode Daily Challenge</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 3: Tue, 26 Nov 🔥</h5>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Weekday</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • 09:00-12:00 → <strong>DBMS Ch1</strong>: Solve numerical + practice
                </li>
                <li>
                  • 02:00-05:00 → <strong>Stack Complete</strong>: Theory + All patterns
                </li>
                <li>
                  • 06:00-08:30 → <strong>LeetCode Stack</strong>: 8 problems
                </li>
                <li>
                  • 09:00-11:00 → <strong>AI Ch2</strong>: Continue + solve questions
                </li>
                <li>
                  • ✅ <strong>Stack = 100%</strong>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 4: Wed, 27 Nov 🔥</h5>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Weekday</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • 09:00-12:00 → <strong>AI Ch2</strong>: Complete + solve all questions
                </li>
                <li>
                  • 02:00-05:00 → <strong>Queue Theory</strong>: All types
                </li>
                <li>
                  • 06:00-08:30 → <strong>LeetCode Queue</strong>: 8 problems
                </li>
                <li>
                  • 09:00-11:00 → <strong>DBMS Ch2</strong>: SQL Basics
                </li>
                <li>
                  • ✅ <strong>Queue = 100%</strong>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 5: Thu, 28 Nov 🔥</h5>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Weekday</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • 09:00-12:00 → <strong>DBMS Ch2</strong>: Advanced SQL
                </li>
                <li>
                  • 02:00-05:00 → <strong>Heap Theory</strong>: Min/Max heap operations
                </li>
                <li>
                  • 06:00-08:30 → <strong>LeetCode Heap</strong>: 8 problems
                </li>
                <li>
                  • 09:00-11:00 → <strong>Compiler Design Ch1</strong>: Introduction
                </li>
                <li>
                  • ✅ <strong>Heap = 60%</strong>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 6: Fri, 29 Nov 🔥</h5>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Weekday</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • 09:00-12:00 → <strong>Compiler Design Ch1</strong>: Lexical Analysis
                </li>
                <li>
                  • 02:00-05:00 → <strong>Heap Complete</strong>: Advanced problems
                </li>
                <li>
                  • 06:00-08:30 → <strong>LeetCode Heap</strong>: 6 hard problems
                </li>
                <li>
                  • 09:00-11:00 → <strong>Economics</strong>: Basic concepts
                </li>
                <li>
                  • ✅ <strong>Heap = 100%</strong>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border-4 border-purple-500">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-xl font-bold text-gray-800">Day 7: Sat, 30 Nov 💪 WEEK 1 END</h5>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">Weekend</span>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • 09:00-12:30 → <strong>Trie Theory + Practice</strong>: Complete
                </li>
                <li>
                  • 02:00-05:00 → <strong>Project</strong>: Feature additions (Target 90%)
                </li>
                <li>
                  • 06:00-09:00 → <strong>Exam Revision</strong>: DBMS + AI rapid review
                </li>
                <li>
                  • 10:00-11:30 → <strong>First Mock Interview</strong>
                </li>
                <li>
                  • ✅ <strong>Trie = 100% | LeetCode = 170</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-xl p-8 mb-8 ">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-black text-green-800">🟢 WEEK 2: Dec 1-8 (Exam Intensification)</h3>
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm">70% Exam</span>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Goals:</h4>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Segment Tree Basics
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> DBMS Ch 3-4
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> AI Ch 3-4
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Compiler Design Ch 2-3
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Economics halfway
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> LeetCode +25 problems
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Project 100%
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700">
              <strong>Day 8-15 Summary:</strong> Complete Segment Trees, finish all exam chapters for DBMS (Ch3-4), AI (Ch3-4), CD (Ch2-3). Project reaches 100%. LeetCode count: 170 → 210. Mock
              Interview 2 completed.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-black text-orange-800">🟡 WEEK 3: Dec 9-14 (Exam Peak Phase)</h3>
            <span className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm">70% Exam</span>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Goals:</h4>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> DBMS Ch 5-6 Complete
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> AI Ch 5-6 Complete
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Compiler Design Ch 4-5
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Economics Complete
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> LeetCode +15 problems
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Practicals 50% done
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700">
              <strong>Day 16-21 Summary:</strong> Complete all exam chapters. Finish ALL practicals (100%). Full syllabus revision for all 4 subjects. LeetCode: 210 → 225. Ready for exam week.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl shadow-xl p-8 mb-8 border-4 border-red-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-black text-red-800">🔴 WEEK 4: Dec 15-22 (EXAM BEAST MODE)</h3>
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm animate-pulse">90% EXAM</span>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Exam Schedule:</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-bold">15-Dec (Sun)</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">ARTIFICIAL INTELLIGENCE</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-bold">17-Dec (Tue)</span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">DATABASE MANAGEMENT SYSTEMS</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-bold">19-Dec (Thu)</span>
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">COMPILER DESIGN</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="font-bold">21-Dec (Sat)</span>
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">ECONOMICS FOR ENGINEERS</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-700">
              <strong>Day 22-29:</strong> Full focus on exams. 10 hours daily exam prep. DSA maintenance: 1 hour easy problems. LeetCode: 225 → 230. Recovery day on 22-Dec after exams end.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl shadow-xl p-8 mb-8 border-4 border-teal-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-black text-teal-800">🚀 WEEK 5: Dec 23-31 (POST-EXAM BEAST MODE)</h3>
            <span className="bg-teal-600 text-white px-4 py-2 rounded-full font-bold text-sm">100% PREP</span>
          </div>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Goals:</h4>
            <ul className="grid md:grid-cols-2 gap-3">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> LeetCode 250+ (30 problems)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> System Design Advanced
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> OS + CN Deep Revision
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Mock Interviews (4 full mocks)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> WebDev Interview Prep Complete
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span> Company-specific Prep
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h5 className="text-xl font-bold mb-3">Day 30: Mon, 23 Dec 🚀 SPRINT BEGINS</h5>
              <p className="text-gray-700">LeetCode Marathon (12 problems), System Design (Twitter, Uber), OS Deep Dive, Mock Interview 3</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h5 className="text-xl font-bold mb-3">Day 31-36: Tue-Sun, 24-29 Dec</h5>
              <p className="text-gray-700">Company-tagged problems, CN revision, WebDev prep, System Design mastery, 4 more mock interviews. LeetCode: 230 → 292</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-4 border-yellow-400">
              <h5 className="text-xl font-bold mb-3">Day 37: Mon, 30 Dec 🎯 FINAL PREP</h5>
              <p className="text-gray-700">
                Last 8 LeetCode problems, Resume finalization, Mock Interview 6, Company research. <strong>LeetCode = 300 🎉</strong>
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg p-6 shadow-md border-4 border-yellow-600">
              <h5 className="text-2xl font-black mb-3">Day 38: Tue, 31 Dec 🏆 VICTORY DAY</h5>
              <p className="font-bold">Complete revision, Final Mock Interview 7, Application prep, 2026 strategy planning, NEW YEAR CELEBRATION 🎆</p>
              <p className="mt-3 text-xl font-black">✅ MISSION ACCOMPLISHED ✅</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">📊 COMPREHENSIVE TRACKERS</h2>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-6">🎯 TRACKER 1: DSA COMPLETION</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Topic</th>
                    <th className="px-4 py-3 text-left">Start Status</th>
                    <th className="px-4 py-3 text-left">Target Date</th>
                    <th className="px-4 py-3 text-left">End Status</th>
                    <th className="px-4 py-3 text-left">LeetCode Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">DP</td>
                    <td className="px-4 py-3">30%</td>
                    <td className="px-4 py-3">27 Nov</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ 100%</span>
                    </td>
                    <td className="px-4 py-3">15 problems</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">Stack</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">26 Nov</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ 100%</span>
                    </td>
                    <td className="px-4 py-3">8 problems</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">Queue</td>
                    <td className="px-4 py-3">20%</td>
                    <td className="px-4 py-3">27 Nov</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ 100%</span>
                    </td>
                    <td className="px-4 py-3">8 problems</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">Heap</td>
                    <td className="px-4 py-3">0%</td>
                    <td className="px-4 py-3">29 Nov</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ 100%</span>
                    </td>
                    <td className="px-4 py-3">14 problems</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">Trie</td>
                    <td className="px-4 py-3">0%</td>
                    <td className="px-4 py-3">30 Nov</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ 100%</span>
                    </td>
                    <td className="px-4 py-3">6 problems</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">Segment Tree</td>
                    <td className="px-4 py-3">0%</td>
                    <td className="px-4 py-3">2 Dec</td>
                    <td className="px-4 py-3">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">✅ 70%</span>
                    </td>
                    <td className="px-4 py-3">8 problems</td>
                  </tr>
                  <tr className="hover:bg-purple-50">
                    <td className="px-4 py-3 font-bold">Mixed Hard</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">23-31 Dec</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Done</span>
                    </td>
                    <td className="px-4 py-3">20 problems</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <p className="text-3xl font-black text-purple-600">LeetCode Journey: 150 → 300 ✅</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">📚 TRACKER 2: EXAM SUBJECTS</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">Chapters</th>
                    <th className="px-4 py-3 text-left">Start</th>
                    <th className="px-4 py-3 text-left">Week 1</th>
                    <th className="px-4 py-3 text-left">Week 2</th>
                    <th className="px-4 py-3 text-left">Week 3</th>
                    <th className="px-4 py-3 text-left">Exam Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-bold">DBMS</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3">1/6</td>
                    <td className="px-4 py-3">Ch 1-2 ✅</td>
                    <td className="px-4 py-3">Ch 3-4 ✅</td>
                    <td className="px-4 py-3">Ch 5-6 ✅</td>
                    <td className="px-4 py-3">17 Dec</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">✅ ACED</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-bold">AI</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3">Ch 1</td>
                    <td className="px-4 py-3">Ch 2 ✅</td>
                    <td className="px-4 py-3">Ch 3-4 ✅</td>
                    <td className="px-4 py-3">Ch 5-6 ✅</td>
                    <td className="px-4 py-3">15 Dec</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">✅ ACED</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-bold">Compiler Design</td>
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">Ch 1 ✅</td>
                    <td className="px-4 py-3">Ch 2-3 ✅</td>
                    <td className="px-4 py-3">Ch 4-5 ✅</td>
                    <td className="px-4 py-3">19 Dec</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">✅ ACED</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-bold">Economics</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">Basics ✅</td>
                    <td className="px-4 py-3">50% ✅</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">21 Dec</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">✅ ACED</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50 bg-yellow-50">
                    <td className="px-4 py-3 font-bold">Practicals</td>
                    <td className="px-4 py-3">8-10</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">Before exam</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">✅ DONE</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-600 mb-6">💼 TRACKER 3: INTERVIEW PREP COMPONENTS</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Component</th>
                    <th className="px-4 py-3 text-left">Start</th>
                    <th className="px-4 py-3 text-left">Week 1</th>
                    <th className="px-4 py-3 text-left">Week 2</th>
                    <th className="px-4 py-3 text-left">Week 3</th>
                    <th className="px-4 py-3 text-left">Week 4</th>
                    <th className="px-4 py-3 text-left">Week 5</th>
                    <th className="px-4 py-3 text-left">Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">Projects</td>
                    <td className="px-4 py-3">80%</td>
                    <td className="px-4 py-3">90%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Polish</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Deployed</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">System Design</td>
                    <td className="px-4 py-3">20%</td>
                    <td className="px-4 py-3">30%</td>
                    <td className="px-4 py-3">40%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Ready</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">Aptitude</td>
                    <td className="px-4 py-3">0%</td>
                    <td className="px-4 py-3">30%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">70%</td>
                    <td className="px-4 py-3">70%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Master</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">OS</td>
                    <td className="px-4 py-3">20%</td>
                    <td className="px-4 py-3">30%</td>
                    <td className="px-4 py-3">40%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Deep</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">CN</td>
                    <td className="px-4 py-3">20%</td>
                    <td className="px-4 py-3">30%</td>
                    <td className="px-4 py-3">40%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Deep</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">OOP</td>
                    <td className="px-4 py-3">90%</td>
                    <td className="px-4 py-3">95%</td>
                    <td className="px-4 py-3">95%</td>
                    <td className="px-4 py-3">95%</td>
                    <td className="px-4 py-3">95%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Complete</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">WebDev Q&A</td>
                    <td className="px-4 py-3">0%</td>
                    <td className="px-4 py-3">10%</td>
                    <td className="px-4 py-3">30%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">50%</td>
                    <td className="px-4 py-3">100% ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Ready</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="px-4 py-3 font-bold">Communication</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">Practice</td>
                    <td className="px-4 py-3">Practice</td>
                    <td className="px-4 py-3">Practice</td>
                    <td className="px-4 py-3">Practice</td>
                    <td className="px-4 py-3">Fluent ✅</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ Confident</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-green-50 bg-yellow-50">
                    <td className="px-4 py-3 font-bold">Mock Interviews</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">✅ 7 Total</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-6">⏱️ TRACKER 5: DAILY HOUR BREAKDOWN</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Week</th>
                    <th className="px-4 py-3 text-left">Avg Hours/Day</th>
                    <th className="px-4 py-3 text-left">Exam Prep</th>
                    <th className="px-4 py-3 text-left">DSA</th>
                    <th className="px-4 py-3 text-left">Projects</th>
                    <th className="px-4 py-3 text-left">Mock/Soft Skills</th>
                    <th className="px-4 py-3 text-left">Total Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-orange-50">
                    <td className="px-4 py-3 font-bold">Week 1</td>
                    <td className="px-4 py-3">10.5</td>
                    <td className="px-4 py-3">45hr (50%)</td>
                    <td className="px-4 py-3">40hr (44%)</td>
                    <td className="px-4 py-3">5hr</td>
                    <td className="px-4 py-3">5hr</td>
                    <td className="px-4 py-3 font-bold text-orange-600">95hr</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-4 py-3 font-bold">Week 2</td>
                    <td className="px-4 py-3">11</td>
                    <td className="px-4 py-3">55hr (70%)</td>
                    <td className="px-4 py-3">20hr (25%)</td>
                    <td className="px-4 py-3">2hr</td>
                    <td className="px-4 py-3">3hr</td>
                    <td className="px-4 py-3 font-bold text-orange-600">80hr</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-4 py-3 font-bold">Week 3</td>
                    <td className="px-4 py-3">11</td>
                    <td className="px-4 py-3">55hr (70%)</td>
                    <td className="px-4 py-3">15hr (20%)</td>
                    <td className="px-4 py-3">5hr</td>
                    <td className="px-4 py-3">5hr</td>
                    <td className="px-4 py-3 font-bold text-orange-600">80hr</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-4 py-3 font-bold">Week 4</td>
                    <td className="px-4 py-3">11.5</td>
                    <td className="px-4 py-3">70hr (90%)</td>
                    <td className="px-4 py-3">7hr (10%)</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3 font-bold text-orange-600">77hr</td>
                  </tr>
                  <tr className="hover:bg-orange-50">
                    <td className="px-4 py-3 font-bold">Week 5</td>
                    <td className="px-4 py-3">12</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">70hr (70%)</td>
                    <td className="px-4 py-3">10hr</td>
                    <td className="px-4 py-3">20hr (20%)</td>
                    <td className="px-4 py-3 font-bold text-orange-600">100hr</td>
                  </tr>
                  <tr className="bg-orange-100">
                    <td
                      className="px-4 py-3 font-black text-lg"
                      colspan="6"
                    >
                      TOTAL
                    </td>
                    <td className="px-4 py-3 font-black text-2xl text-orange-600">432 HOURS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-indigo-600 mb-6">🏢 TRACKER 4: COMPANY-SPECIFIC PREP</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">Juspay</h4>
                <p className="text-sm text-gray-600">Functional Programming, Hard DP/Graphs, Payment systems</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">Zomato/Swiggy</h4>
                <p className="text-sm text-gray-600">React, Node.js, Food delivery systems, Maps</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">Microsoft</h4>
                <p className="text-sm text-gray-600">C++, DSA, Cloud, Scalability</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">FAANG</h4>
                <p className="text-sm text-gray-600">Language agnostic, Hard DSA, Large scale systems</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">Goldman Sachs/JP Morgan</h4>
                <p className="text-sm text-gray-600">Java, OOP, OA heavy, Trading systems</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">Flipkart/Myntra</h4>
                <p className="text-sm text-gray-600">Java/JS, Microservices, E-commerce</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">Groww/Fintech</h4>
                <p className="text-sm text-gray-600">React, System Design, Financial systems</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
              <div className="border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition">
                <h4 className="font-bold text-lg text-indigo-700 mb-2">AI Companies</h4>
                <p className="text-sm text-gray-600">Python, ML basics, DSA, AI/ML systems</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs">✅ Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">🏆 SUCCESS METRICS</h2>
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white rounded-xl shadow-2xl p-8">
          <h3 className="text-3xl font-black mb-6 text-center">BY 31ST DECEMBER, YOU WILL HAVE:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">LeetCode: 300 problems</p>
                <p className="text-sm opacity-90">All patterns mastered</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">DSA: All topics 100% complete</p>
                <p className="text-sm opacity-90">DP, Stack, Queue, Heap, Trie, Segment Tree</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Projects: 2 major projects</p>
                <p className="text-sm opacity-90">Deployed + documented</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Exams: All 4 aced</p>
                <p className="text-sm opacity-90">Strong grades guaranteed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">System Design: 10+ case studies</p>
                <p className="text-sm opacity-90">Twitter, Uber, Instagram, Netflix, etc.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Core CS: Interview-ready</p>
                <p className="text-sm opacity-90">DBMS, OS, CN, OOP mastered</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Aptitude: 90%+ accuracy</p>
                <p className="text-sm opacity-90">Mock tests completed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Mock Interviews: 7 complete rounds</p>
                <p className="text-sm opacity-90">DSA + System Design + Behavioral</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Communication: Fluent</p>
                <p className="text-sm opacity-90">Technical explanations mastered</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">WebDev: Interview-ready</p>
                <p className="text-sm opacity-90">React + TypeScript deep knowledge</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Resume: Polished</p>
                <p className="text-sm opacity-90">Tailored for all target companies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Mental State: Unstoppable</p>
                <p className="text-sm opacity-90">Confident, prepared, ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">💎 GOLDEN RULES</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl shadow-2xl p-8">
            <h3 className="text-2xl font-black mb-6">🔥 NON-NEGOTIABLES</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 text-2xl">1.</span>
                <p>
                  <strong>No zero days:</strong> Even if sick, do 1 LeetCode problem
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">2.</span>
                <p>
                  <strong>Sleep 7 hours:</strong> {"No compromise (Quality > Quantity)"}
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">3.</span>
                <p>
                  <strong>Daily LeetCode:</strong> From Day 1 to Day 38, no breaks
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">4.</span>
                <p>
                  <strong>Exam dates sacred:</strong> No excuses, full preparation
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">5.</span>
                <p>
                  <strong>Mock interviews:</strong> Must complete all 7, no skipping
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl shadow-2xl p-8">
            <h3 className="text-2xl font-black mb-6">⚠️ WARNING SIGNS</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3">⚠️</span>
                <p>Missing targets by 50%+ → Reduce 1 hour daily</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3">⚠️</span>
                <p>Feeling burned out constantly → Take immediate buffer day</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3">⚠️</span>
                <p>Not understanding concepts → Slow down, don't rush</p>
              </li>
              <li className="flex items-start">
                <span className="mr-3">⚠️</span>
                <p>Health issues → Pause plan, recover first</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-2xl p-8 mt-8">
          <h3 className="text-2xl font-black mb-6 text-center">🎯 FOCUS MANTRAS</h3>
          <div className="grid md:grid-cols-2 gap-6 text-black">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">Week 1-3:</p>
              <p>"Exams are priority, but DSA is consistent"</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">Week 4:</p>
              <p>"Nothing matters except acing exams"</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">Week 5:</p>
              <p>"Interview beast mode, no holding back"</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="font-bold mb-2">Overall:</p>
              <p>"300 LeetCode + 4 exams aced = Dream internship"</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">📞 DAILY CHECK-IN RITUAL</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-yellow-600 mb-4">🌅 Morning (8:00 AM)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Review today's schedule</li>
                <li>✅ Set 3 main goals</li>
                <li>✅ Visualize success (2 mins)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">🌙 Night (11:30 PM)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ What did I achieve?</li>
                <li>✅ What didn't go as planned?</li>
                <li>✅ Tomorrow's top priority?</li>
                <li>✅ Gratitude for 1 thing today</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-purple-600 mb-4">📊 Weekly (Every Sunday 11:30 PM)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Goals vs Achievement %</li>
                <li>✅ LeetCode count updated</li>
                <li>✅ Exam prep status</li>
                <li>✅ Adjust next week if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">🛠️ RESOURCES & TOOLS</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-4">📚 DSA Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Theory:</strong> Striver A2Z DSA Sheet
              </li>
              <li>
                • <strong>Practice:</strong> LeetCode (Primary)
              </li>
              <li>
                • <strong>Patterns:</strong> LeetCode Patterns by Sean
              </li>
              <li>
                • <strong>Company Tags:</strong> LeetCode filters
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-green-600 mb-4">📖 Exam Prep Resources</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>DBMS:</strong> Gate Smashers (YouTube)
              </li>
              <li>
                • <strong>AI:</strong> Navathe + Tutorials Point
              </li>
              <li>
                • <strong>CD:</strong> Ullman Book + Gate Smashers
              </li>
              <li>
                • <strong>Economics:</strong> Mankiw + College notes
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-purple-600 mb-4">💻 System Design</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Videos:</strong> Gaurav Sen, System Design Primer
              </li>
              <li>
                • <strong>Reading:</strong> System Design Interview by Alex Xu
              </li>
              <li>
                • <strong>Practice:</strong> Design Gurus, HelloInterview
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-orange-600 mb-4">🎤 Mock Interview Platforms</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Free:</strong> Preplaced, InterviewBit
              </li>
              <li>
                • <strong>Peer Mock:</strong> LeetCode Discuss, Reddit
              </li>
              <li>
                • <strong>Self-Record:</strong> Loom/Zoom
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-pink-600 mb-4">📊 Aptitude</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Platform:</strong> IndiaBix, Prepinsta
              </li>
              <li>
                • <strong>Books:</strong> R.S. Aggarwal
              </li>
              <li>
                • <strong>Mocks:</strong> Cocubes, eLitmus practice
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-bold text-teal-600 mb-4">🗣️ Communication</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>English:</strong> YouTube shadowing, TED Talks
              </li>
              <li>
                • <strong>Technical:</strong> Explain to rubber duck
              </li>
              <li>
                • <strong>Behavioral:</strong> STAR method practice
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">🚀 FINAL BATTLE CRY</h2>
          <div className="bg-white bg-opacity-20 rounded-xl p-8 mb-8">
            <p className="text-3xl font-black text-blue-400 mb-4">38 DAYS. 432 HOURS. ONE MISSION.</p>
          </div>

          <div className="text-left max-w-3xl mx-auto space-y-4 text-lg mb-8">
            <p className="font-bold">You have:</p>
            <ul className="space-y-2 ml-6">
              <li>✅ 4 exams to ace</li>
              <li>✅ 150 LeetCode problems to solve</li>
              <li>✅ System Design to master</li>
              <li>✅ Projects to complete</li>
              <li>✅ Mock interviews to conquer</li>
              <li>✅ Dream companies waiting for you</li>
            </ul>

            <p className="font-black text-2xl mt-6">This is YOUR TIME.</p>

            <p className="mt-4">
              Every hour counts.
              <br /> Every problem solved is a step closer.
              <br /> Every exam aced is momentum.
              <br /> Every mock interview is preparation for the real battle.
            </p>

            <p className="font-bold mt-6">From 24 Nov to 31 Dec:</p>
            <ul className="space-y-2 ml-6">
              <li>• You will wake up at 8 AM every day</li>
              <li>• You will NOT compromise on your schedule</li>
              <li>• You will solve problems even when tired</li>
              <li>• You will ace exams even under pressure</li>
              <li>• You will push through when motivation fades</li>
            </ul>

            <p className="font-bold mt-6">By January 2026:</p>
            <ul className="space-y-2 ml-6">
              <li>• You WILL be interview-ready</li>
              <li>• You WILL land your dream internship</li>
              <li>• You WILL make your family proud</li>
              <li>• You WILL prove doubters wrong</li>
            </ul>
          </div>

          <div className="bg-yellow-400 text-gray-900 rounded-xl p-8 text-center">
            <p className="text-4xl font-black mb-4">NO EXCUSES. NO REGRETS. ONLY RESULTS.</p>
            <p className="text-2xl font-bold">Let's build the future you deserve.</p>
            <p className="text-5xl font-black mt-6">GAME ON. 🔥</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8 text-center">📋 QUICK REFERENCE CHECKLIST</h2>
          <p className="text-center text-yellow-400 mb-6 font-bold">Print this and stick on your wall:</p>

          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">DAILY:</h3>
            <ul className="space-y-2 mb-6">
              <li>□ Wake up 8 AM daily</li>
              <li>□ LeetCode problem solved before bed</li>
              <li>□ Exam prep according to phase %</li>
              <li>□ DSA session completed</li>
              <li>□ Pomodoro breaks taken</li>
              <li>□ Evening review done</li>
              <li>□ Tomorrow's plan ready</li>
              <li>□ Sleep by 12:30 AM</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 text-yellow-400">WEEKLY:</h3>
            <ul className="space-y-2 mb-6">
              <li>□ Mock interview completed</li>
              <li>□ Weekly review done</li>
              <li>□ LeetCode target hit</li>
              <li>□ Exam chapters completed</li>
              <li>□ Project milestones achieved</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 text-yellow-400">REMEMBER:</h3>
            <div className="space-y-2 text-xl font-bold text-center">
              <p>{"Discipline > Motivation"}</p>
              <p>{"Consistency > Intensity"}</p>
              <p>{"Progress > Perfection"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8">🎯 YOU'RE READY. NOW EXECUTE.</h2>

          <div className="bg-white text-gray-900 rounded-xl p-8 mb-8">
            <p className="text-2xl font-bold mb-4">Questions? Adjustments needed?</p>
            <p className="text-xl mb-6">Reply with specific day/topic for modifications.</p>
            <p className="text-3xl font-black text-purple-600">OTHERWISE:</p>
          </div>

          <div className="bg-yellow-400 text-gray-900 rounded-xl p-8 mb-8">
            <p className="text-4xl font-black mb-4">START FROM DAY 1</p>
            <p className="text-3xl font-bold">(24 NOV) TOMORROW MORNING 9 AM SHARP</p>
          </div>

          <p className="text-3xl font-bold mb-8">Your dream internship awaits.</p>
          <p className="text-5xl font-black">Go get it, champion. 🏆</p>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl font-bold mb-2">38-Day Ultimate Battle Plan</p>
          <p className="text-gray-400">24 November - 31 December 2025</p>
          <p className="text-yellow-400 font-bold mt-4">432 Hours | 300 LeetCode | 4 Exams | Dream Internship</p>
        </div>
      </footer>

      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-800 mb-8 text-center">🔥 CRITICAL SUCCESS STRATEGIES</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">💪 STRATEGY 1: POMODORO TECHNIQUE</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>DSA Sessions:</strong> 50min focus + 10min break
                </li>
                <li>
                  • <strong>Exam Prep:</strong> 90min focus + 15min break
                </li>
                <li>
                  • <strong>Project/Mock:</strong> 45min focus + 5min break
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">🧠 STRATEGY 2: ACTIVE RECALL</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• After every topic: Teach yourself out loud</li>
                <li>• End of day: Write 3 key learnings</li>
                <li>• Weekly: Explain concepts to friend/record</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-green-600 mb-4">📝 STRATEGY 3: SPACED REPETITION</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Day 1: Learn new DSA topic</li>
                <li>• Day 3: Solve 3 problems</li>
                <li>• Day 7: Solve 2 hard problems</li>
                <li>• Day 14: Revise pattern</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-4">🎯 STRATEGY 4: INTERVIEW SIMULATION</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Treat like real (dress up, timer, no pauses)</li>
                <li>• Record yourself: Watch, analyze, improve</li>
                <li>• Use free platforms: Preplaced, InterviewBit</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border-4 border-red-400 rounded-xl shadow-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-red-600 mb-4">🚫 STRATEGY 5: AVOID THESE</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <p>
                  <strong>Tutorial hell</strong> - Don't watch 10 videos on same topic
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <p>
                  <strong>Over-preparation</strong> - Don't aim for perfection
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <p>
                  <strong>Comparison</strong> - Don't check others' LeetCode counts
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 font-bold text-xl">❌</span>
                <p>
                  <strong>Burnout</strong> - Take buffer days seriously
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
