"use client";

import { useState } from "react";
import { ArrowDown, Loader2 } from "lucide-react";

import Header from "@/components/layout/header";
import ControlBar from "@/components/layout/control-bar";
import CodeEditor from "@/components/core/code-editor";
import { REFACTOR_OPTIONS } from "@/lib/constant";

export default function Home() {
  const [inputCode, setInputCode] = useState(
    `// Paste code here...\nfunction example() {\n  console.log("Legacy Code");\n}`,
  );
  const [outputCode, setOutputCode] = useState(
    "// AI Result will appear here...",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("refactor");
  const [target, setTarget] = useState("modular");
  const [sourceLang, setSourceLang] = useState("javascript");

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    const newOptions = REFACTOR_OPTIONS.find((opt) => opt.id === newMode);
    if (newOptions && newOptions.targets.length > 0) {
      setTarget(newOptions.targets[0].value);
    }
  };

  const handleRefactor = async () => {
    setIsLoading(true);
    // setOutputCode("// Analyzing code structure..."); // Opsional: Hapus ini biar user gak liat kedip
    try {
      const response = await fetch("/api/refactor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: inputCode,
          language: sourceLang,
          mode: mode,
          target: target,
        }),
      });

      // --- BAGIAN YANG DIUBAH MULAI DARI SINI ---

      const result = await response.json(); // 1. Kita namakan 'result' (bukan data)

      // 2. Kita cek apakah ada object 'data' di dalamnya
      if (result.success && result.data) {
        // 3. Ambil refactoredCode dari DALAM object 'data'
        setOutputCode(result.data.refactoredCode);
      } else {
        // Handle jika error dari backend
        setOutputCode(result.error || "// Error: Failed to get response.");
      }

      // --- BATAS PERUBAHAN ---
    } catch (error) {
      console.error(error);
      setOutputCode("// Error: Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // FIX 1: Gunakan min-h-screen dan BIARKAN scroll (jangan overflow-hidden)
    <main className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-purple-500/30 pb-10">
      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Header Section */}
        <div>
          <Header />
          <ControlBar
            mode={mode}
            setMode={setMode}
            target={target}
            setTarget={setTarget}
            sourceLang={sourceLang}
            setSourceLang={setSourceLang}
            onRefactor={handleRefactor}
            isLoading={isLoading}
            handleModeChange={handleModeChange}
          />
        </div>

        {/* CODE WORKSPACE */}
        {/* FIX 2: Kita set tinggi editor fix (min-h-[600px]). 
            Jika konten lebih panjang dari layar, browser akan otomatis scroll ke bawah. 
        */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px] lg:h-[75vh]">
          {/* Input Editor */}
          <div className="flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 h-[500px] lg:h-full shadow-2xl">
            <CodeEditor
              label="Original Source Code"
              code={inputCode}
              onChange={(val) => setInputCode(val || "")}
              language={sourceLang}
            />
          </div>

          {/* Mobile Arrow */}
          <div className="flex lg:hidden justify-center -my-3 z-10">
            <div className="bg-zinc-800 p-2 rounded-full border border-zinc-700 shadow-xl">
              <ArrowDown className="text-purple-400 w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Output Editor */}
          <div className="flex flex-col relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 h-[500px] lg:h-full shadow-2xl">
            <CodeEditor
              label="Gemini Evolution Result"
              code={outputCode}
              readOnly={true}
              language={
                mode === "migrate" && target !== "typescript"
                  ? target
                  : sourceLang
              }
            />

            {isLoading && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-3" />
                  <p className="text-zinc-300 font-mono text-sm animate-pulse">
                    Thinking...
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
