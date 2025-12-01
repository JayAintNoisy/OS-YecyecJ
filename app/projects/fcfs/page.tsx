"use client";

import React, { useState } from "react";
import Link from "next/link"; // Link is not used but kept in imports list for completeness if future navigation is added

const MAX_TIME_UNIT = 500;

// --- THEME CONFIGURATION (Dark / Blacky Light Theme) ---

// Base Theme
const BACKGROUND_COLOR = "bg-gray-950"; // Very Dark Gray/Off-Black (Main Background)
const CARD_BG_COLOR = "bg-gray-800";     // Dark Gray (Card/Section Background)
const INPUT_BG_COLOR = "bg-gray-900";    // Slightly darker for inputs/fields
const TEXT_COLOR = "text-gray-100";      // Light Gray (General text color)
const LIGHT_TEXT_COLOR = "text-gray-400"; // Muted text for descriptions/labels
const BORDER_COLOR = "border-gray-700";   // Subtle border color
const DIVIDER_COLOR = "border-gray-700"; // For hr and table dividers

// Primary Accent: Calm Blue
const PRIMARY_BLUE_CLASS = "text-blue-400"; 
const PRIMARY_BG_BLUE = "bg-blue-600";
const PRIMARY_HOVER_BLUE_BG = "hover:bg-blue-500";
const PRIMARY_SHADOW = "shadow-lg shadow-black/50"; // Prominent shadow for depth

// Secondary Accent: Warm Orange
const SECONDARY_ORANGE_CLASS = "text-orange-400"; 
const SECONDARY_BG_ORANGE = "bg-orange-600";
const SECONDARY_HOVER_ORANGE_BG = "hover:bg-orange-500";

// Interfaces
interface Process {
  pid: string;
  arrival: number | "";
  burst: number | "";
}

interface ProcessResult extends Omit<Process, "arrival" | "burst"> {
  arrival: number;
  burst: number;
  completion: number;
  waiting: number;
  turnaround: number;
  remaining?: number;
}

interface GanttBlock {
  process: string | "IDLE";
  start: number;
  end: number;
}
interface GanttData {
    ganttBlocks: GanttBlock[];
    timeMarkers: number[];
    totalTime: number;
}


const DEFAULT_PROCESS_DATA: Omit<Process, "pid"> = { arrival: "", burst: "" };

const getInitialProcesses = () => [
  { pid: "P1", ...DEFAULT_PROCESS_DATA },
  { pid: "P2", ...DEFAULT_PROCESS_DATA },
  { pid: "P3", ...DEFAULT_PROCESS_DATA },
  { pid: "P4", ...DEFAULT_PROCESS_DATA },
  { pid: "P5", ...DEFAULT_PROCESS_DATA },
];

/**
 * Executes the First-Come, First-Served (FCFS) scheduling algorithm.
 * @param processes Array of processes with arrival and burst times.
 * @returns Results including metrics and Gantt chart data.
 */
function fcfs(processes: { pid: string; arrival: number; burst: number }[]) {
  // Sort processes primarily by arrival time, secondarily by PID (for stable tie-breaking)
  const procs = processes
    .map((p) => ({ ...p }))
    .sort((a, b) => a.arrival - b.arrival || a.pid.localeCompare(b.pid));

  const done: ProcessResult[] = [];
  let time = 0;
  const uncompressedTimeline: (string | "IDLE")[] = [];

  for (const current of procs) {
    let startTime = time;

    // 1. Check for IDLE time (CPU waiting for the next process to arrive)
    if (current.arrival > time) {
      const idleDuration = current.arrival - time;
      for (let i = 0; i < idleDuration; i++) {
        uncompressedTimeline.push("IDLE");
      }
      startTime = current.arrival;
    }

    // 2. Process Execution (FCFS is non-preemptive)
    const completionTime = startTime + current.burst;
    for (let i = 0; i < current.burst; i++) {
      uncompressedTimeline.push(current.pid);
    }

    // 3. Update time and record results
    time = completionTime;

    done.push({
      ...current,
      completion: completionTime,
      turnaround: completionTime - current.arrival,
      waiting: completionTime - current.arrival - current.burst,
    });
  }

  // Generate structured Gantt Blocks from the uncompressed timeline (compressing consecutive blocks)
  const ganttBlocks: GanttBlock[] = [];
  let blockStart = 0;
  for (let t = 0; t < uncompressedTimeline.length; t++) {
      const currentProcess = uncompressedTimeline[t];

      // Check if this is the last unit or if the next unit is a different process/IDLE
      if (t === uncompressedTimeline.length - 1 || uncompressedTimeline[t + 1] !== currentProcess) {
          ganttBlocks.push({
              process: currentProcess,
              start: blockStart,
              end: t + 1,
          });
          blockStart = t + 1;
      }
  }
  
  // Generate unique time markers for the chart's axis
  const timeMarkers = Array.from(new Set(ganttBlocks.map(b => b.start).concat(ganttBlocks.map(b => b.end)))).sort((a, b) => a - b);
  const totalTime = timeMarkers[timeMarkers.length - 1] || 0;

  return { 
      ganttBlocks, 
      timeMarkers,
      totalTime,
      results: done 
  };
}

// Separate component for Simulation Output
interface OutputProps {
  results: ProcessResult[];
  ganttData: GanttData;
  avgW: number;
  avgT: number;
}

/**
 * Provides a distinct color class for each process for the Gantt Chart.
 * @param pid Process ID or "IDLE".
 * @returns Tailwind CSS class string.
 */
function getProcessColor(pid: string | "IDLE"): string {
    if (pid === "IDLE") return "bg-gray-700 text-gray-400 border border-dashed border-gray-600";
    
    // Consistent color mapping based on PID index
    const index = parseInt(pid.replace('P', '')) % 6;
    switch (index) {
        case 1: return "bg-blue-600 text-white shadow-sm shadow-blue-900";
        case 2: return "bg-green-600 text-white shadow-sm shadow-green-900";
        case 3: return "bg-purple-600 text-white shadow-sm shadow-purple-900";
        case 4: return "bg-yellow-500 text-gray-900 shadow-sm shadow-yellow-900";
        case 5: return "bg-pink-600 text-white shadow-sm shadow-pink-900";
        default: return "bg-teal-600 text-white shadow-sm shadow-teal-900";
    }
}

function SimulationOutput({ results, ganttData, avgW, avgT }: OutputProps) {
    const { ganttBlocks, timeMarkers, totalTime } = ganttData;

    // Theme Constants
    const CARD_BG_COLOR = "bg-gray-800";
    const PRIMARY_BLUE_CLASS = "text-blue-400"; 
    const SECONDARY_ORANGE_CLASS = "text-orange-400"; 
    const PRIMARY_BG_BLUE = "bg-blue-600";
    const TEXT_COLOR = "text-gray-100";
    const LIGHT_TEXT_COLOR = "text-gray-400";
    const BORDER_COLOR = "border-gray-700";
    const DIVIDER_COLOR = "border-gray-700";

    return (
      <section className={`p-8 md:p-10 ${CARD_BG_COLOR} rounded-2xl shadow-xl border ${BORDER_COLOR} ${TEXT_COLOR}`}>
        <div className={`flex items-center border-b ${DIVIDER_COLOR} pb-4 mb-8`}>
          <h2 className={`text-3xl font-bold ${PRIMARY_BLUE_CLASS} flex items-center`}>
            <span className="mr-3 text-4xl">📊</span> Simulation Output
          </h2>
          
        </div>

        {/* Gantt Chart/Timeline */}
        {ganttBlocks.length > 0 && (
          <>
            <h3 className={`text-xl font-semibold mb-5 ${TEXT_COLOR} flex items-center`}>
                <span className={`text-2xl mr-3 ${PRIMARY_BLUE_CLASS}`}>⏱️</span> Gantt Chart (CPU Timeline)
            </h3>
            
            {/* The Gantt Chart Container */}
            <div className={`p-5 mb-10 border ${BORDER_COLOR} rounded-lg bg-gray-900 overflow-x-auto shadow-inner shadow-black/20`}>
                <div className="relative" style={{ minWidth: `${Math.max(400, totalTime * 40)}px` }}>
                    <div 
                        className={`flex w-full rounded-md overflow-hidden border ${BORDER_COLOR}`} 
                        style={{ height: '60px' }}
                    >
                        {ganttBlocks.map((block, index) => {
                            const duration = block.end - block.start;
                            const widthPx = duration * 40; 
                            const blockColorClass = getProcessColor(block.process);

                            return (
                                <div 
                                    key={index} 
                                    className={`h-full flex items-center justify-center border-r ${BORDER_COLOR} transition-all duration-300 ${blockColorClass}`}
                                    style={{ width: `${widthPx}px` }}
                                    title={`${block.process} (${duration}ms)`}
                                >
                                    <span className="text-sm font-semibold p-1 select-none whitespace-nowrap">
                                        {block.process}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Time Markers */}
                    <div className="relative w-full h-4 mt-3">
                        {timeMarkers.map((time, index) => {
                            const positionPx = time * 40; 
                            return (
                                <div 
                                    key={index} 
                                    className="absolute top-0 text-xs text-gray-400 transform -translate-x-1/2" 
                                    style={{ left: `${positionPx}px` }}
                                >
                                    <span className={`h-2 w-px inline-block ${PRIMARY_BLUE_CLASS} absolute bottom-full left-1/2 -translate-x-1/2`}></span>
                                    {time}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p className={`mt-8 ${LIGHT_TEXT_COLOR} italic text-sm border-t ${DIVIDER_COLOR} pt-3`}>
                    Execution Order (FCFS Rule: Sorted by Arrival Time): <span className={`${TEXT_COLOR} font-mono`}>{results.map(r => r.pid).join(" → ")}</span>
                </p>
          </div>
          </>
        )}
        
        <hr className={`${DIVIDER_COLOR} my-8`} />

        {/* Process Metrics Table */}
        <h3 className={`text-xl font-semibold mb-5 ${TEXT_COLOR} flex items-center`}>
            <span className={`text-2xl mr-3 ${PRIMARY_BLUE_CLASS}`}>📋</span> Process Metrics
        </h3>

        <div className={`overflow-x-auto rounded-lg border ${BORDER_COLOR} shadow-sm`}>
          <table className="min-w-full border-collapse rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className={`bg-gray-700 border-b ${DIVIDER_COLOR}`}>
                <th className={`px-4 py-3 border-r ${DIVIDER_COLOR} ${TEXT_COLOR}`}>P</th>
                <th className={`px-4 py-3 border-r ${DIVIDER_COLOR} ${TEXT_COLOR}`}>Arrival (AT)</th>
                <th className={`px-4 py-3 border-r ${DIVIDER_COLOR} ${TEXT_COLOR}`}>Burst (BT)</th>
                <th className={`px-4 py-3 border-r ${DIVIDER_COLOR} ${TEXT_COLOR}`}>Completion (CT)</th>
                
                {/* Turnaround column header: Secondary Orange */}
                <th className={`px-4 py-3 border-r ${DIVIDER_COLOR} ${SECONDARY_BG_ORANGE} text-white`}>
                  Turnaround (TAT = CT - AT)
                </th>
                
                {/* Waiting column header: Primary Blue */}
                <th className={`px-4 py-3 ${DIVIDER_COLOR} ${PRIMARY_BG_BLUE} text-white`}>
                  Waiting (WT = TAT - BT)
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((p) => (
                <tr key={p.pid} className={`bg-gray-800 border-t ${DIVIDER_COLOR} hover:bg-gray-700 transition-colors`}>
                  <td className={`p-3 border-r ${DIVIDER_COLOR} text-center font-semibold text-lg ${PRIMARY_BLUE_CLASS}`}>
                    {p.pid}
                  </td>
                  <td className={`p-3 border-r ${DIVIDER_COLOR} text-center ${TEXT_COLOR} font-mono`}>
                    {p.arrival}
                  </td>
                  <td className={`p-3 border-r ${DIVIDER_COLOR} text-center ${TEXT_COLOR} font-mono`}>
                    {p.burst}
                  </td>
                  <td className={`p-3 border-r ${DIVIDER_COLOR} text-center ${TEXT_COLOR} font-mono`}>
                    {p.completion}
                  </td>
                  
                  {/* Turnaround data: Secondary Orange highlight */}
                  <td className={`p-3 border-r ${DIVIDER_COLOR} text-center bg-orange-900/40 text-orange-400 font-bold`}>
                    {p.turnaround.toFixed(2)}
                  </td>
                  
                  {/* Waiting data: Primary Blue highlight */}
                  <td className={`p-3 ${DIVIDER_COLOR} text-center bg-blue-900/40 text-blue-400 font-bold`}>
                    {p.waiting.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`mt-12 p-6 border ${BORDER_COLOR} bg-blue-900/30 rounded-lg flex flex-col sm:flex-row justify-around text-lg font-semibold space-y-4 sm:space-y-0 shadow-md shadow-black/30`}>
          <p className={`${TEXT_COLOR}`}>
            Avg Waiting Time:{" "}
            <span className={`${PRIMARY_BLUE_CLASS} font-bold text-2xl`}>{avgW.toFixed(2)} ms</span>
          </p>
          <p className={`${TEXT_COLOR}`}>
            Avg Turnaround Time:{" "}
            <span className={`${SECONDARY_ORANGE_CLASS} font-bold text-2xl`}>{avgT.toFixed(2)} ms</span>
          </p>
        </div>
      </section>
    );
}


export default function FCFSSimulator() {
  const [processes, setProcesses] = useState<Process[]>(getInitialProcesses());
  const [results, setResults] = useState<ProcessResult[] | null>(null);
  const [ganttData, setGanttData] = useState<GanttData | null>(null); // State for structured Gantt data
  const [error, setError] = useState("");

  const updateField = (i: number, field: keyof Process, value: string) => {
    const updated = [...processes];
    setError("");

    if (field === "pid") {
      updated[i].pid = value;
    } else {
      // Ensure only non-negative integers are entered
      if (!/^\d*$/.test(value)) return;
      updated[i][field] = value === "" ? "" : parseInt(value);
    }

    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { pid: `P${processes.length + 1}`, arrival: "", burst: "" },
    ]);
    setResults(null);
    setGanttData(null);
  };

  const removeProcess = (i: number) => {
    const copy = [...processes];
    copy.splice(i, 1);

    const renumbered = copy.map((p, index) => ({ ...p, pid: `P${index + 1}` }));
    setProcesses(renumbered);
    setResults(null); 
    setGanttData(null); 
  }; 

  const calculateFCFS = () => {
    // Validation
    const validProcesses = processes.filter((p) => p.arrival !== "" && p.burst !== "");
    if (validProcesses.length === 0) {
      setError("Please enter valid Arrival and Burst times for at least one process.");
      setResults(null);
      setGanttData(null);
      return;
    }

    if (validProcesses.some((p) => p.arrival! < 0 || p.burst! <= 0 || p.burst! > MAX_TIME_UNIT)) {
      setError("Arrival Time must be non-negative, and Burst Time must be positive (max 500).");
      setResults(null);
      setGanttData(null);
      return;
    }

    const numericProcesses = validProcesses.map((p) => ({
      pid: p.pid,
      arrival: p.arrival as number,
      burst: p.burst as number,
    }));

    try {
      const { results, ganttBlocks, timeMarkers, totalTime } = fcfs(numericProcesses);
      setResults(results);
      setGanttData({ ganttBlocks, timeMarkers, totalTime });
      setError("");
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred during calculation.");
    }
  };


  return (
    <div className={`min-h-screen p-4 md:p-8 ${BACKGROUND_COLOR} font-sans transition-colors duration-300`}>
      <header className="mb-10 text-center">
        <h1 className={`text-4xl font-extrabold ${PRIMARY_BLUE_CLASS} mb-2`}>
          FCFS Scheduling Simulator
        </h1>
        <p className={`text-lg ${LIGHT_TEXT_COLOR}`}>
          First-Come, First-Served (Non-Preemptive)
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* Input Card */}
        <section className={`p-6 md:p-8 ${CARD_BG_COLOR} rounded-2xl shadow-xl border ${BORDER_COLOR}`}>
          <h2 className={`text-2xl font-bold ${TEXT_COLOR} mb-6 flex items-center border-b ${DIVIDER_COLOR} pb-3`}>
            <span className="mr-3 text-3xl text-orange-400">⚙️</span> Process Input
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              {/* Table Header */}
              <thead className="bg-gray-700">
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${LIGHT_TEXT_COLOR} uppercase tracking-wider`}>
                    Process ID
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${LIGHT_TEXT_COLOR} uppercase tracking-wider`}>
                    Arrival Time (AT)
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${LIGHT_TEXT_COLOR} uppercase tracking-wider`}>
                    Burst Time (BT)
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-medium ${LIGHT_TEXT_COLOR} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-700">
                {processes.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-700 transition-colors bg-gray-800">
                    {/* PID Column (Static for now) */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-100">
                      {p.pid}
                    </td>

                    {/* Arrival Time Input */}
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={p.arrival}
                        onChange={(e) => updateField(i, "arrival", e.target.value)}
                        placeholder="e.g., 0"
                        className={`w-32 p-2 border ${BORDER_COLOR} rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow ${INPUT_BG_COLOR} text-white`}
                      />
                    </td>

                    {/* Burst Time Input */}
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        min="1"
                        value={p.burst}
                        onChange={(e) => updateField(i, "burst", e.target.value)}
                        placeholder="e.g., 5"
                        className={`w-32 p-2 border ${BORDER_COLOR} rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 transition-shadow ${INPUT_BG_COLOR} text-white`}
                      />
                    </td>

                    {/* Actions Column */}
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      {processes.length > 1 && (
                        <button
                          onClick={() => removeProcess(i)}
                          className="text-red-500 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-900/40"
                          title="Remove Process"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <button
              onClick={addProcess}
              className={`px-4 py-2 text-sm font-medium rounded-full text-blue-400 bg-gray-900 border border-blue-600 hover:bg-gray-700 transition-all ${PRIMARY_SHADOW}`}
            >
              <span className="text-xl inline-block mr-1 align-bottom">+</span> Add Process
            </button>

            <button
              onClick={calculateFCFS}
              className={`px-8 py-3 text-lg font-bold text-white rounded-full ${PRIMARY_BG_BLUE} ${PRIMARY_HOVER_BLUE_BG} transition-transform transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-900/50`}
            >
              Calculate FCFS 🚀
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg" role="alert">
              <p className="font-semibold">Input Error:</p>
              <p>{error}</p>
            </div>
          )}
        </section>

        {/* Output Card */}
        {results && ganttData && (
          <SimulationOutput 
            results={results} 
            ganttData={ganttData}
            avgW={results.reduce((sum, p) => sum + p.waiting, 0) / results.length}
            avgT={results.reduce((sum, p) => sum + p.turnaround, 0) / results.length}
          />
        )}
      </main>
    </div>
  );
}