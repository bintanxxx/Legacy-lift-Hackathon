"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2, Sparkles, Languages } from "lucide-react";
import { REFACTOR_OPTIONS } from "@/lib/constant";

interface ControlBarProps {
  mode: string;
  setMode: (val: string) => void;
  target: string;
  setTarget: (val: string) => void;
  sourceLang: string;
  setSourceLang: (val: string) => void;
  onRefactor: () => void;
  isLoading: boolean;
  handleModeChange: (val: string) => void;
}

export default function ControlBar({
  mode,
  target,
  setTarget,
  sourceLang,
  setSourceLang,
  onRefactor,
  isLoading,
  handleModeChange,
}: ControlBarProps) {
  const currentTargets =
    REFACTOR_OPTIONS.find((opt) => opt.id === mode)?.targets || [];

  // Style Class untuk Dropdown agar konsisten dan KONTRAS
  const dropdownContentClass =
    "bg-zinc-950 border border-zinc-700 text-zinc-100 shadow-2xl z-50 ring-1 ring-white/10";
  const dropdownItemClass =
    "focus:bg-zinc-800 focus:text-white text-zinc-300 cursor-pointer py-2";

  return (
    <section className="bg-zinc-900/40 border border-zinc-800/60 p-3 md:p-4 rounded-xl backdrop-blur-sm shrink-0 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
        {/* GROUP INPUTS */}
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 flex-1">
          {/* 1. Source Language */}
          <div className="space-y-1.5 col-span-1 w-full lg:w-auto">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold ml-1">
              Original
            </label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="w-full lg:w-[160px] bg-black/40 border-zinc-700 hover:border-zinc-500 h-10 text-xs focus:ring-purple-500/20 text-zinc-200">
                <div className="flex items-center gap-2 truncate">
                  <Languages className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <SelectValue placeholder="Lang" />
                </div>
              </SelectTrigger>
              <SelectContent className={dropdownContentClass}>
                <SelectItem className={dropdownItemClass} value="javascript">
                  JS / Node
                </SelectItem>
                <SelectItem className={dropdownItemClass} value="python">
                  Python
                </SelectItem>
                <SelectItem className={dropdownItemClass} value="php">
                  PHP
                </SelectItem>
                <SelectItem className={dropdownItemClass} value="go">
                  Go
                </SelectItem>
                <SelectItem className={dropdownItemClass} value="java">
                  Java
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. Mode */}
          <div className="space-y-1.5 col-span-1 w-full lg:w-auto">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold ml-1">
              Goal
            </label>
            <Select value={mode} onValueChange={handleModeChange}>
              <SelectTrigger className="w-full lg:w-[200px] bg-black/40 border-zinc-700 hover:border-zinc-500 h-10 text-xs focus:ring-purple-500/20 font-medium text-white">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent className={dropdownContentClass}>
                {REFACTOR_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    className={dropdownItemClass}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. Target */}
          <div className="space-y-1.5 col-span-2 lg:col-span-1 w-full lg:w-auto">
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold ml-1">
              Specific Target
            </label>
            <Select value={target} onValueChange={setTarget}>
              <SelectTrigger className="w-full lg:w-[240px] bg-black/40 border-zinc-700 hover:border-zinc-500 h-10 text-xs focus:ring-purple-500/20 text-purple-300">
                <div className="flex items-center gap-2 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <SelectValue placeholder="Target" />
                </div>
              </SelectTrigger>
              <SelectContent className={dropdownContentClass}>
                {currentTargets.map((t) => (
                  <SelectItem
                    key={t.value}
                    value={t.value}
                    className={dropdownItemClass}
                  >
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TOMBOL ACTION */}
        <div className="pt-2 lg:pt-0">
          <Button
            onClick={onRefactor}
            disabled={isLoading}
            className="w-full lg:w-auto h-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-purple-900/20 border-0 transition-all active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                RUN REFACTOR
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
