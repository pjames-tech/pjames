import { createSignal, createEffect, For, Show } from "solid-js";

interface Message {
  role: "user" | "assistant";
  text: string;
}

type ChatMode = "lead" | "ai";

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
  const [mode, setMode] = createSignal<ChatMode>("lead");
  const [messages, setMessages] = createSignal<Message[]>([
    {
      role: "assistant",
      text: "Hey! 👋 I'm ARCHIBOT. Click 'AI Chat' to ask me about services, or answer a few quick questions in Lead Capture mode so P. James can review your project.",
    },
  ]);
  const [input, setInput] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  const [leadStep, setLeadStep] = createSignal(0);
  const [leadAnswers, setLeadAnswers] = createSignal<Record<string, string>>(
    {}
  );
  const [isReady, setIsReady] = createSignal(false);

  let messagesContainer: HTMLDivElement | undefined;

  // Scroll to bottom on new messages
  createEffect(() => {
    messages(); // Track messages
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  const addMessage = (role: "user" | "assistant", text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const handleModeSwitch = (newMode: ChatMode) => {
    setMode(newMode);
    setMessages([]);
    setLeadStep(0);
    setLeadAnswers({});

    if (newMode === "lead") {
      addMessage("assistant", LEAD_QUESTIONS[0].text);
    } else {
      addMessage("assistant", "AI Mode. Ask me about branding or automation.");
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const text = input().trim();
    if (!text || isLoading()) return;

    addMessage("user", text);
    setInput("");

    if (mode() === "lead") {
      await handleLeadCapture(text);
    } else {
      await handleAIChat(text);
    }
  };

  const handleLeadCapture = async (text: string) => {
    const step = leadStep();
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
      const answers = { ...leadAnswers(), [question.key]: text };

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
            "Thanks! 🚀 Your brief has been sent to P. James. He'll reach out within 24 hours. In the meantime, feel free to switch to AI Chat to ask any questions!"
          );
          setIsReady(true);
        } else {
          addMessage(
            "assistant",
            "Hmm, something went wrong. Try refreshing or email pjames1643@gmail.com directly."
          );
        }
      } catch (err) {
        addMessage(
          "assistant",
          "Couldn't send. Email pjames1643@gmail.com directly."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAIChat = async (text: string) => {
    setIsLoading(true);

    // Build conversation history for context
    const history = messages()
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
          data.text || "I didn't get a response. Try again?"
        );
      } else if (res.status === 501) {
        addMessage(
          "assistant",
          "AI chat isn't configured on this server. Switch to Lead Capture to submit your project details."
        );
      } else if (res.status === 429) {
        addMessage(
          "assistant",
          "You've sent a lot of messages! Take a breather and try again in a few minutes."
        );
      } else {
        // Offer fallback to lead capture
        addMessage(
          "assistant",
          "AI Server is offline. Switch to Lead Capture?"
        );
      }
    } catch (err) {
      addMessage(
        "assistant",
        "Couldn't reach AI. Switch to Lead Capture to submit your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlaceholder = () => {
    if (mode() === "lead" && leadStep() < LEAD_QUESTIONS.length) {
      return LEAD_QUESTIONS[leadStep()].placeholder;
    }
    return "Type...";
  };

  return (
    <div class="rounded-[var(--radius-lg)] bg-panel soft-border shadow-lg p-[var(--space-3)] flex flex-col h-[400px]">
      {/* Header */}
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-display font-bold text-lg text-text">ARCHIBOT</h3>
          <p class="text-xs text-muted">Assistant</p>
        </div>
        <div class="flex gap-1">
          <button
            onClick={() => handleModeSwitch("lead")}
            class={`px-3 py-1 text-xs rounded-full transition ${
              mode() === "lead"
                ? "bg-[rgb(var(--accent)/0.2)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.3)]"
                : "bg-[rgb(var(--text)/0.05)] text-muted hover:bg-[rgb(var(--text)/0.1)]"
            }`}>
            Lead Capture
          </button>
          <button
            onClick={() => handleModeSwitch("ai")}
            class={`px-3 py-1 text-xs rounded-full transition ${
              mode() === "ai"
                ? "bg-[rgb(var(--accent)/0.2)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.3)]"
                : "bg-[rgb(var(--text)/0.05)] text-muted hover:bg-[rgb(var(--text)/0.1)]"
            }`}>
            AI Chat
          </button>
          <span class="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
            Ready
          </span>
        </div>
      </div>

      {/* Mode indicator */}
      <p class="text-xs text-muted mb-3">
        {mode() === "ai"
          ? "AI Mode. Ask me about branding or automation."
          : "Lead Capture. Answer a few quick questions."}
      </p>

      {/* Messages */}
      <div
        ref={messagesContainer}
        class="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        <For each={messages()}>
          {(msg) => (
            <div
              class={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "ml-auto bg-[rgb(var(--accent))] text-white"
                  : "bg-[rgb(var(--text)/0.08)] text-text"
              }`}>
              {msg.text}
            </div>
          )}
        </For>
        <Show when={isLoading()}>
          <div class="bg-[rgb(var(--text)/0.08)] text-muted max-w-[85%] rounded-2xl px-4 py-2 text-sm">
            <span class="animate-pulse">Thinking...</span>
          </div>
        </Show>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} class="flex gap-2">
        <input
          type="text"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          placeholder={currentPlaceholder()}
          disabled={isLoading() || isReady()}
          class="flex-1 rounded-full bg-bg border border-[rgb(var(--border)/0.15)] px-4 py-2 text-sm text-text placeholder:text-muted outline-none focus:border-[rgb(var(--accent)/0.5)] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading() || !input().trim() || isReady()}
          class="px-4 py-2 rounded-full bg-[rgb(var(--accent))] text-white font-medium text-sm hover:brightness-110 transition disabled:opacity-50">
          Send
        </button>
      </form>
    </div>
  );
}
