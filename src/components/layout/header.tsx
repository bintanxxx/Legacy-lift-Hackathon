import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-3 mb-2">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg shadow-blue-900/20">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white leading-none">
            LegacyLift <span className="text-purple-500">AI</span>
          </h1>
          {/* Sembunyikan slogan di HP biar header tipis */}
          <p className="text-zinc-500 text-[10px] md:text-xs font-medium hidden md:block mt-0.5">
            Refactor. Modernize. Migrate.
          </p>
        </div>
      </div>

      {/* Badge dipersimpel untuk HP */}
      <Badge
        variant="outline"
        className="border-zinc-800 text-zinc-500 bg-zinc-900/50 px-2.5 py-1 text-[10px] md:text-xs backdrop-blur-sm"
      >
        <span className="hidden md:inline">Powered by</span> Gemini 3 Pro
      </Badge>
    </header>
  );
}
