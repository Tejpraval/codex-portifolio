import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { submitContactForm, validateContactForm } from "../../lib/contactForm";

const INITIAL_VALUES = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) return current;

      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      await submitContactForm(values);
      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus("success");
      setFeedback("Message sent successfully. You will receive a reply on your email.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your message right now.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Get In Touch</p>
          <h3 className="mt-4 max-w-sm text-2xl font-semibold text-white">
            Send a direct message from the portfolio.
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
            Submit your name, email, and message. Valid requests can be forwarded to
            {" "}
            tejpraval32@gmail.com.
          </p>
        </div>
        <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-emerald-200 md:block">
          Live inbox
        </div>
      </div>

      <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-200">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            className="contact-input"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 text-xs text-rose-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            autoComplete="email"
            className="contact-input"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 text-xs text-rose-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-200">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows="6"
            className="contact-input min-h-[170px] resize-y"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-xs text-rose-300">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#2563eb_0%,#4f46e5_48%,#7c3aed_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(79,70,229,0.24)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>

        {feedback ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-emerald-200" : "text-slate-300"
            }`}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
