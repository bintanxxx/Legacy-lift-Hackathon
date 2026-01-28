// src/components/core/CodeEditor.tsx
"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
  label?: string;
}

export default function CodeEditor({ 
  code, 
  onChange, 
  language = "javascript", 
  readOnly = false,
  label 
}: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header Kecil di atas Editor */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
          {label || "Editor"}
        </span>
        <div className="flex gap-1.5">
          {/* Hiasan tombol mac os look */}
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>

      {/* Area Coding - Monaco Editor */}
      <div className="flex-grow min-h-[400px]">
        <Editor
          height="100%"
          language={language.toLowerCase()}
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            readOnly: readOnly,
            minimap: { enabled: false }, // Matikan minimap biar bersih
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            lineNumbers: "on",
            renderLineHighlight: "all",
          }}
        />
      </div>
    </div>
  );
}