import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  text: string;
}

type ChatMode = "lead" | "ai";
type ViewState = "welcome" | "chat";

// Lead capture question flow
const LEAD_QUESTIONS = [
  { key: "name", text: "What's your name?", placeholder: "Your name" },
  {
    key: "email",
    text: "Great! What's your email so I can send you info?",
    placeholder: "you@company.com",
  },
  {
    key: "business",
    text: "What's your business or niche?",
    placeholder: "e.g. Real Estate, Coaching",
  },
  {
    key: "goal",
    text: "What's the #1 thing you want to achieve in the next 30-60 days?",
    placeholder: "e.g. Get more leads",
  },
  {
    key: "budget",
    text: "Do you have a budget range in mind?",
    placeholder: "e.g. $1,500-$2,500",
  },
  {
    key: "timeline",
    text: "When do you need this done?",
    placeholder: "e.g. ASAP, Next month",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("welcome");
  const [mode, setMode] = useState<ChatMode>("lead");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadStep, setLeadStep] = useState(0);
  const [leadAnswers, setLeadAnswers] = useState<Record<string, string>>({});
  const [isReady, setIsReady] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for external events to open the chatbot
  useEffect(() => {
    const handleOpenArchibot = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-archibot", handleOpenArchibot);
    return () => {
      window.removeEventListener("open-archibot", handleOpenArchibot);
    };
  }, []);

  const addMessage = (role: "user" | "assistant", text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const startMode = (newMode: ChatMode) => {
    setMode(newMode);
    setViewState("chat");
    setMessages([]);
    setLeadStep(0);
    setLeadAnswers({});
    setIsReady(false);

    if (newMode === "lead") {
      addMessage("assistant", LEAD_QUESTIONS[0].text);
    } else {
      addMessage(
        "assistant",
        "Hey! 👋 Ask me anything about branding, automation, or AI systems.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    addMessage("user", text);
    setInput("");

    if (mode === "lead") {
      await handleLeadCapture(text);
    } else {
      await handleAIChat(text);
    }
  };

  const handleLeadCapture = async (text: string) => {
    const step = leadStep;
    const question = LEAD_QUESTIONS[step];

    // Store answer
    setLeadAnswers((prev) => ({ ...prev, [question.key]: text }));

    // Next question or submit
    if (step < LEAD_QUESTIONS.length - 1) {
      setLeadStep(step + 1);
      setTimeout(() => {
        addMessage("assistant", LEAD_QUESTIONS[step + 1].text);
      }, 500);
    } else {
      // Submit lead
      setIsLoading(true);
      const answers = { ...leadAnswers, [question.key]: text };

      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "archibot-lead",
            answers,
            meta: { ts: new Date().toISOString() },
          }),
        });

        if (res.ok) {
          addMessage(
            "assistant",
            "Thanks! 🚀 Your brief has been sent to P. James. He'll reach out within 24 hours. Feel free to ask me anything else!",
          );
          setIsReady(true);
        } else {
          addMessage(
            "assistant",
            "Hmm, something went wrong. Try refreshing or email pjames1643@gmail.com directly.",
          );
        }
      } catch (err) {
        addMessage(
          "assistant",
          "Couldn't send. Email pjames1643@gmail.com directly.",
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAIChat = async (text: string) => {
    setIsLoading(true);

    // Build conversation history for context
    const history = messages
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.text }));

    history.push({ role: "user", content: text });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (res.ok) {
        const data = await res.json();
        addMessage(
          "assistant",
          data.text || "I didn't get a response. Try again?",
        );
      } else if (res.status === 501) {
        addMessage(
          "assistant",
          "AI chat isn't configured on this server. Switch to Lead Capture to submit your project details.",
        );
      } else if (res.status === 429) {
        addMessage(
          "assistant",
          "You've sent a lot of messages! Take a breather and try again in a few minutes.",
        );
      } else {
        addMessage(
          "assistant",
          "AI Server is offline. Try again later or start a project instead!",
        );
      }
    } catch (err) {
      addMessage(
        "assistant",
        "Couldn't reach AI. Try again or start a project!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlaceholder = () => {
    if (mode === "lead" && leadStep < LEAD_QUESTIONS.length) {
      return LEAD_QUESTIONS[leadStep].placeholder;
    }
    return "Type your message...";
  };

  const resetToWelcome = () => {
    setViewState("welcome");
    setMessages([]);
    setLeadStep(0);
    setLeadAnswers({});
    setIsReady(false);
  };

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#ff7300] text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center"
            aria-label="Open chat">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-96px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#ff7300] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 3.502a1.125 1.125 0 01-1.006 1.541L15 21.5M5 14.5l-1.202 3.502a1.125 1.125 0 001.006 1.541L10 21.5m5-1v-7.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Archibot</h3>
                  <p className="text-xs text-slate-400">AI Brand Associate</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {viewState === "chat" && (
                  <button
                    onClick={resetToWelcome}
                    className="text-slate-400 hover:text-white transition p-1"
                    aria-label="Back to menu">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition p-1"
                  aria-label="Close chat">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
              {viewState === "welcome" ? (
                /* Welcome View */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-[#ff7300]/20 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-[#ff7300]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold text-lg mb-2">
                    Hey there! 👋
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 max-w-[280px]">
                    I'm Archibot, your AI Brand Associate. How can I help you
                    today?
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-[260px]">
                    <button
                      onClick={() => startMode("lead")}
                      className="w-full py-3 px-4 rounded-xl bg-[#ff7300] text-white font-medium text-sm hover:brightness-110 transition flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                      </svg>
                      Start a Project
                    </button>
                    <button
                      onClick={() => startMode("ai")}
                      className="w-full py-3 px-4 rounded-xl bg-slate-800 text-white font-medium text-sm hover:bg-slate-700 transition flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                        />
                      </svg>
                      Ask a Question
                    </button>
                  </div>
                </div>
              ) : (
                /* Chat View */
                <>
                  {/* Mode Indicator */}
                  <div className="px-4 py-2 border-b border-slate-800">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                        mode === "lead"
                          ? "bg-[#ff7300]/20 text-[#ff7300]"
                          : "bg-slate-800 text-slate-300"
                      }`}>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          mode === "lead" ? "bg-[#ff7300]" : "bg-green-500"
                        }`}></span>
                      {mode === "lead" ? "Lead Capture" : "AI Chat"}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.role === "user"
                            ? "ml-auto bg-[#ff7300] text-white"
                            : "bg-slate-800 text-slate-100"
                        }`}>
                        {msg.text}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-slate-800 text-slate-400">
                        <span className="inline-flex gap-1">
                          <span
                            className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}></span>
                          <span
                            className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}></span>
                          <span
                            className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}></span>
                        </span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form
                    onSubmit={handleSubmit}
                    className="p-3 border-t border-slate-800">
                    <div className="flex gap-2">
                      <input
                        id="archibot-input"
                        type="text"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={currentPlaceholder()}
                        disabled={isLoading || isReady}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#ff7300]/50 disabled:opacity-50 transition"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !input.trim() || isReady}
                        className="px-4 py-2.5 rounded-xl bg-[#ff7300] text-white font-medium text-sm hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
