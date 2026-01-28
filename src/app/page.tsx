// src/app/page.tsx
"use client";

import { useState } from "react";
import CodeEditor from "@/components/core/code-editor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2, ArrowRightLeft, Code2 } from "lucide-react";

export default function Home() {
  // State untuk data coding
  const [inputCode, setInputCode] = useState(
    `// Paste code here...\nfunction example() {\n  console.log("Legacy Code");\n}`,
  );
  const [outputCode, setOutputCode] = useState(
    "// AI Result will appear here...",
  );
  const [isLoading, setIsLoading] = useState(false);

  // State untuk konfigurasi
  const [mode, setMode] = useState("clean");
  const [language, setLanguage] = useState("javascript");

  // Fungsi pura-pura (Mock) untuk test UI dulu
  const handleRefactor = async () => {
    setIsLoading(true);
    setOutputCode("// AI is thinking...");

    // Simulasi delay 2 detik
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOutputCode(
      `// Refactored by Gemini 3 ✨\n\nconst modernized = () => {\n  console.log("This is Clean Architecture!");\n  return true;\n};`,
    );
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      {/* 1. HEADER SECTION */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              LegacyLift AI
            </h1>
            <p className="text-zinc-500 text-sm">
              Refactor. Modernize. Migrate.
            </p>
          </div>
        </div>

        {/* Badge Status */}
        <Badge
          variant="outline"
          className="border-blue-900 text-blue-400 bg-blue-950/30 px-4 py-1"
        >
          Powered by Gemini 3 Pro
        </Badge>
      </header>

      {/* 2. CONTROL BAR (Panel Pengendali) */}
      <section className="max-w-7xl mx-auto mb-6">
        <Card className="p-4 bg-zinc-900/50 border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Kiri: Konfigurasi */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px] bg-zinc-950 border-zinc-800 text-zinc-300">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                <SelectItem value="javascript">JavaScript / Node</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="php">PHP Legacy</SelectItem>
                <SelectItem value="go">Go (Golang)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-[200px] bg-zinc-950 border-zinc-800 text-zinc-300">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                <SelectItem value="clean">🧹 Clean Code Refactor</SelectItem>
                <SelectItem value="modernize">🚀 Modernize Syntax</SelectItem>
                <SelectItem value="migrate">🌐 Migrate Language</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Kanan: Tombol Action */}
          <Button
            onClick={handleRefactor}
            disabled={isLoading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gemini is Thinking...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Refactor Code
              </>
            )}
          </Button>
        </Card>
      </section>

      {/* 3. BATTLE ARENA (Split View Editor) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
        {/* Kolom Kiri: Input */}
        <div className="h-full">
          <CodeEditor
            label="Original Source Code"
            code={inputCode}
            // Kita bungkus fungsi setInputCode.
            // Kalau 'value' undefined, paksa jadi string kosong ("")
            onChange={(value) => setInputCode(value || "")}
            language={language}
          />
        </div>

        {/* Tengah (Icon Panah di Mobile) */}
        <div className="flex lg:hidden justify-center py-2">
          <ArrowRightLeft className="text-zinc-600 rotate-90" />
        </div>

        {/* Kolom Kanan: Output */}
        <div className="h-full relative">
          <CodeEditor
            label="Gemini Evolution Result"
            code={outputCode}
            readOnly={true} // Gabisa diedit user
            language={language} // Nanti diganti logic targetLanguage
          />

          {/* Overlay loading effect (Opsional biar keren) */}
          {isLoading && (
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10 border border-zinc-800">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto mb-4" />
                <p className="text-zinc-400 font-mono text-sm animate-pulse">
                  Analyzing logic structure...
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
