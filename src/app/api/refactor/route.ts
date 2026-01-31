import { NextResponse } from "next/server";
import { aiClient } from "@/lib/gemini";

// Definisi Model
const PRIMARY_MODEL = "gemini-2.5-flash"; // Si Jenius (Utama)
const BACKUP_MODEL = "gemini-2.0  -flash"; // Si Stabil (Cadangan)

// Helper function untuk memanggil AI
async function generateRefactor(modelName: string, prompt: string) {
  console.log(`🤖 Mencoba generate menggunakan model: ${modelName}...`);

  const response = await aiClient.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json", // Wajib JSON
      temperature: 0.1, // Fokus coding presisi
    },
  });

  // Di SDK baru @google/genai, response.text langsung string (atau null)
  const text = response.text;
  if (!text) throw new Error("AI memberikan respons kosong.");

  return text;
}

export async function POST(req: Request) {
  try {
    const { code, mode, target } = await req.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Code cannot be empty" },
        { status: 400 },
      );
    }

    // --- 1. Logic Switch Case (Instruction) ---
    let specificInstruction = "";
    switch (target) {
      // Refactor
      case "modular":
        specificInstruction =
          "Split large functions into smaller, single-responsibility functions.";
        break;
      case "readability":
        specificInstruction =
          "Rename variables to be descriptive and simplify logic.";
        break;
      case "error-handling":
        specificInstruction = "Add robust try-catch blocks and error checks.";
        break;
      // Modernize
      case "js-async":
        specificInstruction =
          "Convert Callback/Promise to modern async/await syntax.";
        break;
      case "react-hooks":
        specificInstruction = "Convert Class Components to Functional Hooks.";
        break;
      case "php-oop":
        specificInstruction =
          "Convert procedural PHP to strict Object-Oriented PHP 8.";
        break;
      // Migrate
      case "typescript":
        specificInstruction =
          "Rewrite in TypeScript with strict interfaces/types.";
        break;
      case "go":
        specificInstruction =
          "Rewrite in Go (Golang) using idiomatic patterns.";
        break;
      case "python":
        specificInstruction = "Rewrite in Python 3 following PEP 8.";
        break;
      default:
        specificInstruction =
          "Refactor code for better quality and maintainability.";
    }

    // --- 2. Prompt Assembly ---
    const prompt = `
      ROLE: You are an Elite Software Architect using ${mode} mode.
      GOAL: ${specificInstruction}

      INPUT CODE:
      ---
      ${code}
      ---

      INSTRUCTIONS:
      1. Analyze the logic deepy.
      2. Refactor/Migrate strictly based on the GOAL.
      3. Return ONLY valid JSON. 
      4. DO NOT use markdown code blocks (like \`\`\`json) inside the JSON string values.

      OUTPUT JSON STRUCTURE:
      {
        "explanation": "Markdown string (concise)",
        "refactoredCode": "String (full code)",
        "detectedLanguage": "String (e.g. 'python')"
      }
    `;

    // --- 3. EXECUTION WITH FALLBACK ---
    let resultText = "";
    let usedModel = PRIMARY_MODEL;

    try {
      // Usaha Pertama: Pakai Gemini 3 Pro
      resultText = await generateRefactor(PRIMARY_MODEL, prompt);
    } catch (primaryError: any) {
      console.warn(
        `⚠️ Gemini 3 Gagal: ${primaryError.message}. Mengalihkan ke Backup...`,
      );

      try {
        // Usaha Kedua: Pakai Gemini Flash (Backup)
        usedModel = BACKUP_MODEL;
        resultText = await generateRefactor(BACKUP_MODEL, prompt);
      } catch (backupError: any) {
        // Kalau dua-duanya gagal, baru kita nyerah
        throw new Error(
          `Semua model sibuk/error. Primary: ${primaryError.message}, Backup: ${backupError.message}`,
        );
      }
    }

    // --- 4. Parsing & Response ---
    const jsonResponse = JSON.parse(resultText);

    return NextResponse.json({
      success: true,
      data: {
        ...jsonResponse,
        usedModel: usedModel, // Info tambahan buat Frontend (Bisa buat pamer badge)
      },
    });
  } catch (error: any) {
    console.error("🔥 Server Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
