import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  History, 
  LayoutTemplate, 
  Code2, 
  Settings, 
  ChevronLeft,
  Send,
  Loader2,
  Copy,
  Download
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { optimizePromptStream } from "../lib/gemini";
import type { OptimizationMode } from "../lib/gemini";

interface PromptHistoryItem {
  id: string;
  timestamp: number;
  mode: OptimizationMode;
  input: string;
  output: string;
}

const MODES: OptimizationMode[] = [
  "Beginner", 
  "Developer", 
  "Startup Founder", 
  "AI Engineer", 
  "Creative Writer"
];

export default function OptimizerPage() {
  const [mode, setMode] = useState<OptimizationMode>("Developer");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"new" | "history" | "settings">("new");

  const outputEndRef = useRef<HTMLDivElement>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("PROMPTPILOT_HISTORY");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    localStorage.setItem("PROMPTPILOT_HISTORY", JSON.stringify(history));
  }, [history]);

  // Scroll to bottom of output during streaming
  useEffect(() => {
    if (isStreaming) {
      outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [output, isStreaming]);

  const handleOptimize = async () => {
    if (!input.trim()) {
      return;
    }

    setIsStreaming(true);
    setOutput("");
    setActiveTab("new");

    let fullResult = "";

    try {
      await optimizePromptStream(input, mode, (chunk) => {
        fullResult += chunk;
        setOutput(fullResult);
      });

      // Save to history once complete
      const newItem: PromptHistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        mode,
        input,
        output: fullResult,
      };
      setHistory(prev => [newItem, ...prev]);

    } catch (error: any) {
      setOutput(`**Error:** Failed to generate optimization.\n\n${error.message || 'Check your API key and try again.'}`);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([output], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "optimized-prompt.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const loadHistoryItem = (item: PromptHistoryItem) => {
    setInput(item.input);
    setMode(item.mode);
    setOutput(item.output);
    setActiveTab("new");
  };

  return (
    <div className="w-full h-[75vh] bg-black/30 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl text-text-primary font-body flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-stroke bg-surface/50 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-stroke flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-4 h-4 text-muted group-hover:text-text-primary transition-colors" />
            <span className="font-display italic text-xl">PromptPilot</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => { setActiveTab("new"); setOutput(""); setInput(""); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "new" ? "bg-white text-black font-medium" : "text-muted hover:bg-white/5 hover:text-text-primary"}`}
          >
            <Sparkles className="w-4 h-4" />
            New Optimization
          </button>
          
          <button 
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "history" ? "bg-white/10 text-text-primary font-medium" : "text-muted hover:bg-white/5 hover:text-text-primary"}`}
          >
            <History className="w-4 h-4" />
            Prompt History
            {history.length > 0 && (
              <span className="ml-auto bg-white/10 text-xs px-2 py-0.5 rounded-full">{history.length}</span>
            )}
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-white/5 hover:text-text-primary transition-all">
            <LayoutTemplate className="w-4 h-4" />
            Templates
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-white/5 hover:text-text-primary transition-all">
            <Code2 className="w-4 h-4" />
            Developer API
          </button>
        </nav>

        <div className="p-4 border-t border-stroke">
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "settings" ? "bg-white/10 text-text-primary font-medium" : "text-muted hover:bg-white/5 hover:text-text-primary"}`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="mt-4 px-4 flex items-center gap-2 text-xs text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-emerald-400">API Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-stroke flex items-center justify-between px-6 shrink-0 bg-transparent z-10">
          <h1 className="text-lg font-medium">
            {activeTab === "new" && "AI Prompt Optimizer"}
            {activeTab === "history" && "Prompt History"}
            {activeTab === "settings" && "Settings"}
          </h1>
          
          {activeTab === "new" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted hidden sm:inline-block">Mode:</span>
              <select 
                value={mode}
                onChange={(e) => setMode(e.target.value as OptimizationMode)}
                className="bg-surface border border-stroke text-sm rounded-lg px-3 py-1.5 outline-none focus:border-white/30 transition-colors"
              >
                {MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          
          {/* 1. NEW OPTIMIZATION TAB */}
          {activeTab === "new" && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Input Card */}
              <div className="bg-black/20 border border-stroke rounded-2xl p-4 md:p-6 flex flex-col focus-within:border-white/20 transition-colors">
                <label className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center justify-between">
                  Raw Prompt Input
                </label>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. Build me a food delivery app..."
                  className="w-full bg-transparent resize-none text-lg outline-none min-h-[120px] placeholder:text-muted/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.metaKey) {
                      handleOptimize();
                    }
                  }}
                />
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-stroke/50">
                  <span className="text-xs text-muted">Tokens: ~{Math.round(input.length / 4)} (Estimated)</span>
                  <button 
                    onClick={handleOptimize}
                    disabled={isStreaming || !input.trim()}
                    className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isStreaming ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Analyze & Optimize</>
                    )}
                  </button>
                </div>
              </div>

              {/* Output / Results Area */}
              {output && (
                <div className="bg-black/40 border border-stroke rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-md">
                  <div className="bg-black/20 border-b border-stroke px-6 py-3 flex items-center justify-between">
                    <span className="text-xs text-muted uppercase tracking-wider">Optimized Result</span>
                    
                    {!isStreaming && (
                      <div className="flex items-center gap-2">
                        <button onClick={handleCopy} className="p-2 hover:bg-white/5 rounded-md text-muted hover:text-text-primary transition-colors tooltip" title="Copy">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={handleExport} className="p-2 hover:bg-white/5 rounded-md text-muted hover:text-text-primary transition-colors tooltip" title="Export Markdown">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="overflow-y-auto max-h-[50vh] custom-scrollbar">
                    <div className="p-6 prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-stroke prose-headings:font-medium prose-headings:text-white prose-a:text-blue-400">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {output}
                      </ReactMarkdown>
                      {isStreaming && (
                        <span className="inline-block w-2 h-4 bg-white/80 animate-pulse ml-1 align-middle" />
                      )}
                      <div ref={outputEndRef} />
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!output && !isStreaming && (
                <div className="h-48 border border-stroke border-dashed rounded-2xl flex flex-col items-center justify-center text-muted">
                  <Send className="w-8 h-8 mb-4 opacity-50" />
                  <p>Awaiting Input</p>
                  <p className="text-sm opacity-50 max-w-sm text-center mt-2">Enter a simple prompt above and the Gemini API will structure, enhance, and optimize it.</p>
                </div>
              )}
            </div>
          )}

          {/* 2. HISTORY TAB */}
          {activeTab === "history" && (
            <div className="max-w-4xl mx-auto space-y-4">
              {history.length === 0 ? (
                <div className="text-center text-muted py-20">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No prompt history yet.</p>
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="bg-surface border border-stroke rounded-xl p-5 hover:border-white/20 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-muted">{item.mode}</span>
                      <span className="text-xs text-muted">{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-text-primary font-medium line-clamp-1 mb-2">{item.input}</p>
                    <p className="text-sm text-muted line-clamp-2 mb-4">{item.output.replace(/[#*`]/g, '')}</p>
                    <button 
                      onClick={() => loadHistoryItem(item)}
                      className="text-sm text-white/70 hover:text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Load into Editor <ChevronLeft className="w-3 h-3 rotate-180" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 3. SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/20 border border-stroke rounded-2xl p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  API Settings
                </h3>
                <p className="text-sm text-muted mb-6">
                  API Key is now hardcoded globally.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
