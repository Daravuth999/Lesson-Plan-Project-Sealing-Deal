import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eraser, MessageSquare, Pointer, Pencil, Type, X, Send } from "lucide-react";

/**
 * PresenterTools — Zoom-native instructor superpowers.
 * - Laser Pointer (L)      : gold cursor dot + trail, students always see where you point
 * - Ink Mode (I)           : draw gold annotations directly on the slide, Ctrl+Z undo, E erase
 * - Chat Wall (C)          : glass panel to display student chat responses
 * - Zoom-Safe Scale (Z)    : +15% type scale, thicker strokes, higher contrast for shared-screen legibility
 *
 * Also exposes a small floating toolbelt so instructor can toggle by click, not just keyboard.
 */
export default function PresenterTools({ zoomSafe, setZoomSafe }) {
  const [laserOn, setLaserOn] = useState(false);
  const [inkOn, setInkOn] = useState(false);
  const [chatOn, setChatOn] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [strokes, setStrokes] = useState([]); // array of [{x,y},...] for ink
  const currentStrokeRef = useRef(null);
  const canvasRef = useRef(null);
  const [chatItems, setChatItems] = useState([]);
  const [chatDraft, setChatDraft] = useState("");
  const [chatName, setChatName] = useState("");

  /* ---------- Keyboard bindings ---------- */
  useEffect(() => {
    const onKey = (e) => {
      // Ignore when typing in form fields
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;

      if (e.key === "l" || e.key === "L") {
        setLaserOn((v) => !v);
      } else if (e.key === "i" || e.key === "I") {
        setInkOn((v) => !v);
      } else if (e.key === "c" || e.key === "C") {
        setChatOn((v) => !v);
      } else if (e.key === "z" || e.key === "Z") {
        if (!(e.ctrlKey || e.metaKey)) setZoomSafe((v) => !v);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z")) {
        // Undo last stroke
        e.preventDefault();
        setStrokes((s) => s.slice(0, -1));
      } else if (e.key === "e" || e.key === "E") {
        setStrokes([]);
      } else if (e.key === "Escape") {
        setLaserOn(false);
        setInkOn(false);
        setChatOn(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setZoomSafe]);

  /* ---------- Laser cursor tracking ---------- */
  useEffect(() => {
    if (!laserOn) return;
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      setTrail((tr) => {
        const next = [...tr, { x: e.clientX, y: e.clientY, t: Date.now() }];
        return next.slice(-14);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [laserOn]);

  useEffect(() => {
    if (!laserOn) return;
    const iv = setInterval(() => {
      const now = Date.now();
      setTrail((tr) => tr.filter((p) => now - p.t < 400));
    }, 60);
    return () => clearInterval(iv);
  }, [laserOn]);

  /* ---------- Ink drawing on canvas ---------- */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
      redraw();
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redraw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#E6B863";
    ctx.shadowColor = "rgba(230,184,99,0.6)";
    ctx.shadowBlur = 8;
    ctx.lineWidth = 3.5;
    strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  }, [strokes]);

  useEffect(() => {
    redraw();
  }, [strokes, redraw]);

  const inkDown = (e) => {
    if (!inkOn) return;
    currentStrokeRef.current = [{ x: e.clientX, y: e.clientY }];
    setStrokes((s) => [...s, currentStrokeRef.current]);
  };
  const inkMove = (e) => {
    if (!inkOn || !currentStrokeRef.current) return;
    currentStrokeRef.current.push({ x: e.clientX, y: e.clientY });
    setStrokes((s) => [...s.slice(0, -1), [...currentStrokeRef.current]]);
  };
  const inkUp = () => {
    currentStrokeRef.current = null;
  };

  /* ---------- Chat wall ---------- */
  const postChat = () => {
    if (!chatDraft.trim()) return;
    setChatItems((c) => [
      ...c,
      { id: Date.now(), text: chatDraft.trim(), name: chatName.trim() || "Student" },
    ]);
    setChatDraft("");
  };

  return (
    <>
      {/* ---- Global cursor rules ---- */}
      <style>{`
        ${laserOn || inkOn ? "body { cursor: none !important; }" : ""}
        ${zoomSafe ? ".zoom-safe { font-size: 115%; }" : ""}
      `}</style>

      {/* ---- Ink canvas overlay ---- */}
      <canvas
        ref={canvasRef}
        onMouseDown={inkDown}
        onMouseMove={inkMove}
        onMouseUp={inkUp}
        onMouseLeave={inkUp}
        className={`fixed inset-0 z-[70] ${
          inkOn ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ touchAction: "none" }}
        data-testid="ink-canvas"
      />

      {/* ---- Laser pointer ---- */}
      {laserOn && (
        <>
          <svg
            className="fixed inset-0 z-[80] pointer-events-none w-screen h-screen"
            data-testid="laser-overlay"
          >
            {trail.map((p, i) => {
              const age = (Date.now() - p.t) / 400;
              const r = 5 + (1 - age) * 10;
              return (
                <circle
                  key={p.t + "-" + i}
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill="rgba(230,184,99,0.18)"
                />
              );
            })}
            <circle
              cx={cursor.x}
              cy={cursor.y}
              r={22}
              fill="rgba(230,184,99,0.12)"
            />
            <circle cx={cursor.x} cy={cursor.y} r={9} fill="#E6B863" />
            <circle cx={cursor.x} cy={cursor.y} r={9} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
          </svg>
        </>
      )}

      {/* ---- Toolbelt ---- */}
      <div
        className="fixed top-1/2 -translate-y-1/2 right-3 z-[60] flex flex-col gap-2 pointer-events-auto"
        data-testid="presenter-toolbelt"
      >
        <ToolButton active={laserOn} onClick={() => setLaserOn((v) => !v)} label="Laser · L" testId="tool-laser">
          <Pointer size={16} />
        </ToolButton>
        <ToolButton active={inkOn} onClick={() => setInkOn((v) => !v)} label="Ink · I" testId="tool-ink">
          <Pencil size={16} />
        </ToolButton>
        <ToolButton active={strokes.length > 0} onClick={() => setStrokes([])} label="Erase · E" testId="tool-erase">
          <Eraser size={16} />
        </ToolButton>
        <ToolButton active={chatOn} onClick={() => setChatOn((v) => !v)} label="Chat Wall · C" testId="tool-chat">
          <MessageSquare size={16} />
        </ToolButton>
        <ToolButton active={zoomSafe} onClick={() => setZoomSafe((v) => !v)} label="Zoom-Safe · Z" testId="tool-zoom">
          <Type size={16} />
        </ToolButton>
      </div>

      {/* ---- Chat Wall panel ---- */}
      <AnimatePresence>
        {chatOn && (
          <motion.aside
            initial={{ x: 460, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 460, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-screen w-[420px] z-[65] bg-ink-950/95 backdrop-blur-2xl border-l border-gold-300/25 shadow-stage flex flex-col"
            data-testid="chat-wall"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold-300/20">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.32em] text-gold-300">
                  Chat Wall
                </div>
                <div className="heading-serif text-2xl text-gold-50">
                  Student voices
                </div>
              </div>
              <button
                onClick={() => setChatOn(false)}
                className="p-1.5 rounded-full text-gold-100 hover:bg-gold-300/15"
                aria-label="Close chat wall"
                data-testid="chat-wall-close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto scroll-elegant p-5 space-y-3">
              <AnimatePresence>
                {chatItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mono text-xs uppercase tracking-widest text-gray-500 text-center py-10"
                  >
                    Ask students to reply in Zoom chat.<br />Paste responses below to display them here.
                  </motion.div>
                )}
                {chatItems.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20, rotate: (i % 2 ? -0.6 : 0.6) }}
                    animate={{ opacity: 1, y: 0, rotate: (i % 2 ? -0.6 : 0.6) }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-lg border border-gold-300/35 bg-gold-300/5 px-4 py-3"
                    data-testid="chat-card"
                  >
                    <div className="mono text-[10px] uppercase tracking-widest text-gold-300 mb-1">
                      {c.name}
                    </div>
                    <div className="text-gold-50 text-sm leading-snug">{c.text}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="border-t border-gold-300/20 p-4 space-y-2">
              <input
                data-testid="chat-name"
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Student name (optional)"
                className="w-full bg-ink-800/70 border border-gold-300/20 rounded-md px-3 py-2 text-sm text-gold-50 mono placeholder:text-gray-500 focus:border-gold-300/60 outline-none"
              />
              <div className="flex gap-2">
                <textarea
                  data-testid="chat-input"
                  value={chatDraft}
                  onChange={(e) => setChatDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) postChat();
                  }}
                  placeholder="Paste student answer…  (Ctrl+Enter to post)"
                  rows={2}
                  className="flex-1 bg-ink-800/70 border border-gold-300/20 rounded-md px-3 py-2 text-sm text-gold-50 placeholder:text-gray-500 focus:border-gold-300/60 outline-none resize-none"
                />
                <button
                  data-testid="chat-post"
                  onClick={postChat}
                  className="shrink-0 px-3 rounded-md border border-gold-300 bg-gold-300/15 hover:bg-gold-300/25 text-gold-50"
                  aria-label="Post"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ---- Status HUD (top-left, instructor-only, subtle) ---- */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[55] flex gap-1.5 mono text-[9px] uppercase tracking-[0.32em] pointer-events-none">
        {laserOn && <HudChip color="#E6B863" label="Laser" />}
        {inkOn && <HudChip color="#E6B863" label="Ink" />}
        {zoomSafe && <HudChip color="#6BA8E8" label="Zoom-Safe" />}
      </div>
    </>
  );
}

function ToolButton({ active, onClick, label, children, testId }) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      title={label}
      className={`group relative w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
        active
          ? "border-gold-300 bg-gold-300/25 text-gold-50 shadow-[0_0_16px_rgba(230,184,99,0.35)]"
          : "border-gold-300/25 bg-ink-900/70 text-gold-100 hover:border-gold-300/60 hover:bg-ink-800"
      }`}
    >
      {children}
      <span className="absolute right-full mr-2 whitespace-nowrap mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-ink-900/95 border border-gold-300/25 text-gold-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </button>
  );
}

function HudChip({ color, label }) {
  return (
    <div
      className="rounded-full px-2.5 py-1 border backdrop-blur"
      style={{
        borderColor: `${color}55`,
        background: `${color}18`,
        color: color,
      }}
    >
      ● {label}
    </div>
  );
}
