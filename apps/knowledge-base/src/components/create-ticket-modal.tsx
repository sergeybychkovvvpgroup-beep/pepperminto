"use client";

import { useState } from "react";

type CreateTicketModalProps = {
  buttonClassName?: string;
};

type FormState = {
  name: string;
  email: string;
  detail: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  detail: "",
};

export default function CreateTicketModal({
  buttonClassName,
}: CreateTicketModalProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialState);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessId(null);

    try {
      const res = await fetch("/api/v1/ticket/public/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          title: `Ticket for ${form.name}`,
          detail: form.detail,
          priority: "low",
          type: "support",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to create ticket.");
      }

      setSuccessId(data.id);
      setForm(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  function closeModal() {
    setOpen(false);
    setError(null);
    setSuccessId(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          buttonClassName ??
          "mt-4 inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-400 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        }
      >
        Create ticket
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
          <div
            className="absolute inset-0 bg-slate-950/50"
            onClick={closeModal}
          />
          <div className="fade-in-up relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-teal-700 dark:text-teal-300">
                  New ticket
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Tell us what you need
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              Details
              <textarea
                required
                rows={4}
                value={form.detail}
                onChange={(event) =>
                  updateField("detail", event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
              />
            </label>

              {error ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              ) : null}

              {successId ? (
                <p className="text-sm text-teal-700 dark:text-teal-300">
                  Ticket created! Reference: {successId}
                </p>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
                >
                  {saving ? "Creating..." : "Create ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
