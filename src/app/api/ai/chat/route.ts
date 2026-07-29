/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PERSONA = `You are Nexus AI, an Enterprise Industrial AI Copilot for Plant 042 (Sector G-7).
You behave like an experienced, highly intelligent industrial operations expert and AI technical advisor (similar in performance and tone to ChatGPT, Gemini, or Claude).

Core Persona Guidelines:
1. Natural & Conversational: Sound articulate, professional, analytical, and confident. Never sound like a robotic template. Avoid repetitive phrases like "I have analyzed your query" or "Plant operations are normal".
2. Intent Detection & Formatting: Adapt your response layout dynamically. Use bolding, bullet points, numbered steps, short summaries, or code blocks where appropriate.
3. General Intelligence: For general inquiries (mathematics, programming, science, general reasoning, definitions, greetings), provide direct, accurate, and comprehensive responses without mentioning factory context unless requested.
4. Factory Intelligence: For plant, machinery, inventory, or operational inquiries, use the live plant context below to provide actionable recommendations, root-cause analysis, and preventative steps—do not simply recite raw telemetry data.
5. Contextual Memory: Build naturally upon prior conversation turns when follow-up questions are asked.

Live Plant CRM Context:
- Overall Equipment Effectiveness (OEE): 98.2% (Availability: 99.1%, Quality Yield: 99.6%)
- Equipment Status:
  * CNC Lathe G7: Spindle Temp 88°C (+14% thermal variance - Warning), Bearing Vibration 4.2mm/s (Elevated).
  * Hydraulic Press G7: Operating Temp 42°C (Normal), Pressure 2,400 PSI (Stable).
  * Robotic Arm Welder 04: Cycle time 42s/unit (Optimal).
- Inventory Stock:
  * SKU-8842 (Tungsten Carbide Blades): 12 units remaining (CRITICAL: Low stock alert, burn rate: 3 units/day, vendor lead time: 6 days).
  * SKU-1049 (Hydraulic Fluid ISO 46): 450 Liters (Optimal).
- Financial Margins: Billed Revenue $312,000.00 | Overhead $63,500.00 | Net Margin $248,500.00 (79.6%)
- Roster & Staff: Lead CNC Operator (Marcus Vance), Quality Inspector (Elena Rostova), Maintenance Engineer (David Miller).
- Work Orders: 3 open tasks (High Priority: Calibrate thermal sensor on Lathe G7).`;

export async function POST(req: Request) {
  try {
    const { prompt, history = [] } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt string is required." },
        { status: 400 }
      );
    }

    const userPrompt = prompt.trim();
    const chatHistory: ChatMessage[] = Array.isArray(history) ? history : [];

    // 1. Check Gemini API Key
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (geminiKey) {
      try {
        const contents = [
          { role: "user", parts: [{ text: SYSTEM_PERSONA }] },
          ...chatHistory.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: userPrompt }] },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling to OpenAI or fallback engine", err);
      }
    }

    // 2. Check OpenAI API Key
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      try {
        const messages = [
          { role: "system", content: SYSTEM_PERSONA },
          ...chatHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          { role: "user", content: userPrompt },
        ];

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.4,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.warn("OpenAI API call failed", err);
      }
    }

    // 3. High-Intelligence Local Fallback Engine (Handles Math, Code, CRM Context, & Memory)
    const reply = generateLocalIntelligenceResponse(userPrompt, chatHistory);
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process AI request" },
      { status: 500 }
    );
  }
}

/**
 * Enterprise Local Intelligence Engine with Intent Classification and History Awareness
 */
function generateLocalIntelligenceResponse(
  input: string,
  history: ChatMessage[]
): string {
  const cleanInput = input.trim();
  const normalized = cleanInput.replace(/[\uFFFD\u00D7\u2715\u2716\u2717\u2718]/g, "*");
  const lower = normalized.toLowerCase();

  // Combine recent history context to resolve follow-ups
  const lastUserMsg = history.slice(-2).find((m) => m.role === "user")?.content.toLowerCase() || "";

  // -------------------------------------------------------------
  // INTENT 1: Math & Quantitative Reasoning
  // -------------------------------------------------------------
  const mathMatch = normalized.match(
    /(?:what\s+is\s+)?(\d+(?:\.\d+)?)\s*([\+\-\*\/×xX÷]|(?:\s*x\s*))\s*(\d+(?:\.\d+)?)/i
  ) || lower.match(/(\d+(?:\.\d+)?)\s*(?:\*|x|by)\s*(\d+(?:\.\d+)?)/i);

  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const op = mathMatch[2] ? mathMatch[2].trim().toLowerCase() : "*";
    const num2 = parseFloat(mathMatch[3] || mathMatch[2]);
    let result = 0;

    if (op === "+") result = num1 + num2;
    else if (op === "-") result = num1 - num2;
    else if (op === "/" || op === "÷") result = num2 !== 0 ? num1 / num2 : 0;
    else result = num1 * (isNaN(num2) ? parseFloat(mathMatch[2]) : num2);

    return `${result}`;
  }

  if (/^[\d\s\+\-\*\/\(\)\.×xX÷\uFFFD]+$/.test(cleanInput) && /\d/.test(cleanInput)) {
    try {
      const sanitized = cleanInput.replace(/×|x|X|\uFFFD/g, "*").replace(/÷/g, "/");
      const val = Function(`"use strict"; return (${sanitized})`)();
      if (typeof val === "number" && !isNaN(val)) {
        return `${val}`;
      }
    } catch {
      // Ignore
    }
  }

  // -------------------------------------------------------------
  // INTENT 2: Programming & Software Engineering Queries
  // -------------------------------------------------------------
  if (lower.includes("react") || lower.includes("python") || lower.includes("code") || lower.includes("javascript") || lower.includes("function")) {
    if (lower.includes("react")) {
      return `**React** is a popular open-source JavaScript library developed by Meta for building user interfaces based on components.

### Core Concepts:
1. **Component-Based Architecture**: UI is broken down into reusable, self-contained pieces (Functional or Class components).
2. **Virtual DOM**: React keeps an in-memory representation of the UI to efficiently batch and update browser DOM changes.
3. **State & Hooks**: State allows components to store dynamic data, managed via hooks like \`useState\` and \`useEffect\`.

\`\`\`tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

Would you like to explore React Server Components or state management patterns in Factory CRM?`;
    }

    if (lower.includes("python")) {
      return `Here is an example of clean Python code for analyzing machine sensor telemetry:

\`\`\`python
import statistics

def analyze_telemetry(readings):
    avg_temp = statistics.mean(readings)
    max_temp = max(readings)
    status = "WARNING" if max_temp > 85.0 else "NORMAL"
    
    return {
        "average_temp": round(avg_temp, 2),
        "peak_temp": max_temp,
        "status": status
    }

# Example telemetry log for CNC Lathe G7
readings = [82.1, 84.5, 87.8, 88.0, 86.4]
print(analyze_telemetry(readings))
\`\`\`

Let me know if you need specific data processing or machine learning scripts in Python!`;
    }
  }

  // -------------------------------------------------------------
  // INTENT 3: Follow-Up & Memory-Aware Context Resolution
  // -------------------------------------------------------------
  if (lower.includes("what should i do") || lower.includes("how to fix") || lower.includes("recommendation") || lower.includes("next step")) {
    if (lastUserMsg.includes("lathe") || lastUserMsg.includes("machine") || lastUserMsg.includes("g7") || lower.includes("lathe") || lower.includes("machine")) {
      return `### Recommended Preventive Action Plan for CNC Lathe G7:

1. **Immediate Thermal Reduction**: Temporarily reduce spindle speed by 10-15% during the remaining shift.
2. **Lubricant Audit**: Task Maintenance Engineer **David Miller** to check bearing fluid pressure and inspect for thermal degradation.
3. **Sensor Recalibration**: Execute a zero-point calibration on thermal sensor G7-S4 to rule out telemetry drift.
4. **Maintenance Scheduling**: Schedule a 45-minute overhaul during the scheduled maintenance window at 02:00 AM.`;
    }

    if (lastUserMsg.includes("stock") || lastUserMsg.includes("inventory") || lastUserMsg.includes("blade") || lower.includes("stock") || lower.includes("inventory")) {
      return `### Recommended Action Plan for Stock Depletion (SKU-8842):

1. **Issue Purchase Order**: Expedite PO for 50 units of **Tungsten Carbide Blades** to vendor *Titanium & Alloy Steel Global*.
2. **Request Air Freight**: Request priority express shipping to cover the 6-day lead time window.
3. **Tool Reuse Optimization**: Instruct CNC operators to rotate secondary cutting inserts to preserve remaining 12 units.`;
    }
  }

  // -------------------------------------------------------------
  // INTENT 4: Machine Diagnostics & Equipment Telemetry
  // -------------------------------------------------------------
  if (lower.includes("machine") || lower.includes("lathe") || lower.includes("cnc") || lower.includes("temp") || lower.includes("press") || lower.includes("welder")) {
    return `### Equipment Health & Telemetry Summary — Sector G-7

- **CNC Lathe G7**: ⚠️ **WARNING**
  - **Spindle Temperature**: 88°C (*+14% elevated above baseline*)
  - **Vibration Amplitude**: 4.2 mm/s (*elevated harmonic signature*)
  - **Analysis**: High probability of bearing lubrication breakdown.

- **Hydraulic Press G7**: ✅ **OPERATIONAL**
  - **Operating Temperature**: 42°C (*Normal*)
  - **Hydraulic Pressure**: 2,400 PSI (*Stable*)

- **Robotic Arm Welder 04**: ✅ **OPTIMAL**
  - **Cycle Time**: 42 seconds/unit

**Recommendation**: Schedule preventive maintenance for CNC Lathe G7 prior to the upcoming night production cycle to prevent thermal trip downtime.`;
  }

  // -------------------------------------------------------------
  // INTENT 5: Inventory & Supply Chain Forecasting
  // -------------------------------------------------------------
  if (lower.includes("stock") || lower.includes("inventory") || lower.includes("sku") || lower.includes("blade") || lower.includes("parts")) {
    return `### Stock & Tooling Inventory Forecast

- **Critical Alert**: **SKU-8842 (Tungsten Carbide Blades)**
  - **Current Stock**: 12 units
  - **Daily Consumption**: ~3 units/day
  - **Estimated Exhaustion**: 4 calendar days
  - **Vendor Lead Time**: 6 days from *Titanium & Alloy Steel Global*

- **Optimal Stock**: **SKU-1049 (Hydraulic Fluid ISO 46)**
  - **Current Stock**: 450 Liters (*Sufficient for 60+ days*)

**Suggested Action**: Auto-generate Purchase Order for 50 units of SKU-8842 today to avoid production bottleneck on Sector B-3.`;
  }

  // -------------------------------------------------------------
  // INTENT 6: Financials, Overhead & Margins
  // -------------------------------------------------------------
  if (lower.includes("finance") || lower.includes("margin") || lower.includes("revenue") || lower.includes("cost") || lower.includes("overhead")) {
    return `### Plant Fiscal Efficiency & Financial Summary

- **Quarterly Billed Revenue**: **$312,000.00**
- **Operational Overhead**: **$63,500.00**
- **Net Contribution Margin**: **$248,500.00** (*79.6% Efficiency Ratio*)

**Executive Insight**: Net margin has expanded by **+4.2% YoY**. Raw material procurement optimizations on Sector B-3 sheet metal orders could yield an additional **$12,400** in quarterly profit.`;
  }

  // -------------------------------------------------------------
  // INTENT 7: Greetings & Conversational Assistance
  // -------------------------------------------------------------
  if (/^(hi|hello|hey|greetings|good morning|good afternoon)/i.test(lower)) {
    return "Hello! I am **Nexus AI**, your Enterprise Industrial Copilot. How can I assist you with machine diagnostics, inventory forecasting, work order delegation, or technical inquiries today?";
  }

  // -------------------------------------------------------------
  // DEFAULT: Dynamic General AI Response
  // -------------------------------------------------------------
  return `### Nexus AI Operational Overview

I am ready to assist with your request regarding: **"${cleanInput}"**.

- **Plant OEE**: Currently running at **98.2%** overall efficiency.
- **Active Assets**: 24 machines monitored across 4 sectors.
- **System Status**: All telemetry parameters online.

Feel free to ask for specific machine diagnostics, code examples, calculations, or financial audits.`;
}
