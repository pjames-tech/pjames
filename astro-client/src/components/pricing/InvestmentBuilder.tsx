import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, animate, motion } from "framer-motion";
import { investmentCategories } from "./investmentData";
import type { InvestmentItem } from "./investmentData";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatInvestment(value: number) {
  return `From ${currencyFormatter.format(value)}`;
}

interface DetailModalProps {
  service: InvestmentItem;
  onClose: () => void;
}

function DetailModal({ service, onClose }: DetailModalProps) {
  const headingId = `service-detail-${service.id}`;

  return (
    <>
      <motion.button
        key="overlay"
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
        aria-label="Close details modal"
      />
      <motion.aside
        key="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl border-l border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel))] p-6 md:p-8 overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[rgb(var(--accent))] mb-2">
              Implementation Brief
            </p>
            <h3 id={headingId} className="font-display text-[var(--step-1)] text-text font-bold">
              {service.title}
            </h3>
            <p className="font-mono text-xs text-muted mt-2">{formatInvestment(service.investmentFrom)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md border border-[rgb(var(--border)/0.16)] bg-[rgb(var(--panel2)/0.55)] px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-text hover:border-[rgb(var(--accent)/0.32)] transition"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel2)/0.3)] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2">Business Impact</p>
            <p className="text-sm text-text/90 leading-relaxed">{service.details.businessImpact}</p>
          </section>

          <section className="rounded-xl border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel2)/0.3)] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2">Implementation</p>
            <p className="text-sm text-text/85 leading-relaxed">{service.details.implementation}</p>
          </section>

          <section className="rounded-xl border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel2)/0.3)] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-2">Deployment</p>
            <p className="text-sm text-text/85 leading-relaxed">{service.details.deployment}</p>
          </section>

          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted mb-3">Deliverables</p>
            <ul className="space-y-2">
              {service.details.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="rounded-lg border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel2)/0.25)] px-3 py-2 text-sm text-text/85"
                >
                  {deliverable}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </motion.aside>
    </>
  );
}

export default function InvestmentBuilder() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isGridDocked, setIsGridDocked] = useState(false);
  const previousTotalRef = useRef(0);
  const floatingBarRef = useRef<HTMLDivElement>(null);
  const gridEndRef = useRef<HTMLDivElement>(null);
  const floatingBarHeightRef = useRef(120);

  const servicesById = useMemo(() => {
    const index = new Map<string, InvestmentItem>();
    for (const category of investmentCategories) {
      for (const service of category.services) {
        index.set(service.id, service);
      }
    }
    return index;
  }, []);

  const selectedCount = selectedIds.length;

  const totalInvestment = useMemo(() => {
    return selectedIds.reduce((sum, id) => {
      return sum + (servicesById.get(id)?.investmentFrom ?? 0);
    }, 0);
  }, [selectedIds, servicesById]);

  const selectedServiceTitles = useMemo(() => {
    return selectedIds
      .map((id) => servicesById.get(id)?.title)
      .filter((value): value is string => Boolean(value));
  }, [selectedIds, servicesById]);

  const activeService = activeServiceId ? servicesById.get(activeServiceId) ?? null : null;

  useEffect(() => {
    const controls = animate(previousTotalRef.current, totalInvestment, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimatedTotal(Math.round(latest)),
    });

    previousTotalRef.current = totalInvestment;
    return () => controls.stop();
  }, [totalInvestment]);

  useEffect(() => {
    if (!activeServiceId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveServiceId(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeServiceId]);

  useEffect(() => {
    let rafId = 0;

    const syncGridDock = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        const sentinel = gridEndRef.current;

        if (!sentinel) {
          setIsGridDocked(false);
          return;
        }

        const measuredHeight = floatingBarRef.current?.offsetHeight;
        if (measuredHeight) {
          floatingBarHeightRef.current = measuredHeight;
        }

        const floatingBottomOffset = 16;
        const dockBuffer = 8;
        const triggerLine = window.innerHeight - (floatingBarHeightRef.current + floatingBottomOffset + dockBuffer);
        const shouldDock = sentinel.getBoundingClientRect().top <= triggerLine;

        setIsGridDocked(shouldDock);
      });
    };

    syncGridDock();
    window.addEventListener("scroll", syncGridDock, { passive: true });
    window.addEventListener("resize", syncGridDock);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncGridDock);
      window.removeEventListener("resize", syncGridDock);
    };
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((itemId) => itemId !== id);
      }
      return [...previous, id];
    });
  };

  const clearSelection = () => setSelectedIds([]);
  const summaryBarContent = (
    <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-1">
          Total Estimated Investment
        </p>
        <motion.p layout className="font-display text-[var(--step-1)] font-bold text-text">
          {currencyFormatter.format(animatedTotal)}
        </motion.p>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {selectedCount} item{selectedCount === 1 ? "" : "s"} selected
        </span>
        <button
          type="button"
          onClick={clearSelection}
          disabled={selectedCount === 0}
          className="rounded-md border border-[rgb(var(--border)/0.14)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:border-[rgb(var(--accent)/0.3)] hover:text-text transition"
        >
          Clear
        </button>
        <button
          type="button"
          className="action-book rounded-md border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.16)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[rgb(var(--accent2))] hover:bg-[rgb(var(--accent)/0.22)] transition"
          data-package={selectedCount > 0 ? `A La Carte Deployment Stack (${selectedCount} Modules)` : undefined}
          data-price={selectedCount > 0 ? currencyFormatter.format(totalInvestment) : undefined}
          data-features={selectedCount > 0 ? selectedServiceTitles.join("|") : undefined}
        >
          Request Deployment Plan
        </button>
      </div>
    </div>
  );

  return (
    <div className={`relative ${isGridDocked ? "pb-6 md:pb-8" : "pb-32 lg:pb-36"}`}>
      <LayoutGroup>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {investmentCategories.map((category) => (
            <motion.section
              layout
              key={category.id}
              className="rounded-2xl border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.72)] backdrop-blur-md p-5 md:p-6"
            >
              <header className="mb-5 pb-4 border-b border-[rgb(var(--border)/0.1)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[rgb(var(--accent))] mb-2">
                  Category
                </p>
                <h3 className="font-display text-[var(--step-1)] font-bold text-text mb-2">{category.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{category.summary}</p>
              </header>

              <div className="space-y-3">
                {category.services.map((service) => {
                  const isSelected = selectedIds.includes(service.id);

                  return (
                    <motion.article
                      layout
                      key={service.id}
                      className={`rounded-xl border p-4 transition-colors duration-300 ${
                        isSelected
                          ? "border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.07)]"
                          : "border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel2)/0.35)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <label className="inline-flex items-start gap-3 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelection(service.id)}
                            className="mt-1 h-4 w-4 rounded border-[rgb(var(--border)/0.3)] bg-transparent accent-[rgb(var(--accent))]"
                          />
                          <span>
                            <span className="block font-display text-base leading-tight text-text">{service.title}</span>
                            <span className="block mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[rgb(var(--accent))]">
                              {formatInvestment(service.investmentFrom)}
                            </span>
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setActiveServiceId(service.id)}
                          className="shrink-0 rounded-md border border-[rgb(var(--border)/0.14)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.11em] text-muted hover:text-text hover:border-[rgb(var(--accent)/0.35)] transition"
                        >
                          Details
                        </button>
                      </div>

                      <p className="text-sm text-muted leading-relaxed mb-3">{service.valueProp}</p>

                      <div className="inline-flex rounded-md border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel2)/0.45)] px-2.5 py-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-muted">
                          {service.techBadge}
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </LayoutGroup>

      <div ref={gridEndRef} aria-hidden="true" className="h-px w-full" />

      <AnimatePresence initial={false}>
        {!isGridDocked && (
          <motion.div
            key="floating-investment-summary"
            ref={floatingBarRef}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 left-1/2 z-30 w-[min(1120px,calc(100%-1rem))] -translate-x-1/2 rounded-2xl border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--panel)/0.92)] backdrop-blur-xl shadow-[0_20px_45px_-22px_rgb(var(--accent)/0.55)]"
          >
            {summaryBarContent}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isGridDocked && (
          <motion.div
            key="docked-investment-summary"
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 rounded-2xl border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--panel)/0.92)] backdrop-blur-xl shadow-[0_14px_36px_-24px_rgb(var(--accent)/0.35)]"
          >
            {summaryBarContent}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeService && <DetailModal service={activeService} onClose={() => setActiveServiceId(null)} />}
      </AnimatePresence>
    </div>
  );
}
