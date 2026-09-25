"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useRef, useState, type FormEvent } from "react";
import { contactEndpoint } from "@/data/contact";
const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(contactEndpoint);
type Field = "name" | "email" | "subject" | "message";
const fields: { name: Field; label: string; maxLength: number }[] = [
  { name: "name", label: "Nom", maxLength: 120 },
  { name: "email", label: "Email", maxLength: 254 },
  { name: "subject", label: "Sujet", maxLength: 200 },
  { name: "message", label: "Message", maxLength: 5000 },
];
export default function ContactForm() {
  const { t } = useLocale();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const inFlight = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !configured) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Partial<Record<Field, string>> = {};
    for (const field of fields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (!value)
        nextErrors[field.name] =
          `Veuillez renseigner le champ ${field.label.toLowerCase()}.`;
      else if (
        field.name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        nextErrors.email = "Veuillez saisir une adresse email valide.";
    }
    setErrors(nextErrors);
    setSubmitted(false);
    setSendError("");
    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#contact-${firstInvalid.name}`)?.focus();
      return;
    }
    inFlight.current = true;
    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) {
        setSendError(response.status === 429
          ? "Le formulaire est temporairement indisponible. Contactez-moi directement par email."
          : "Votre message n’a pas pu être envoyé. Réessayez ou contactez-moi directement par email.");
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch {
      setSendError("L’envoi n’a pas pu être confirmé. Vos informations sont conservées dans le formulaire. Vous pouvez me contacter directement par email.");
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setSending(false);
    }
  }
  return (
    <form
      className="card contact-form"
      onSubmit={submit}
      noValidate
      aria-describedby="form-notice"
      aria-busy={sending}
    >
      <p id="form-notice" className="form-notice">{t(configured
        ? "Tous les champs sont obligatoires. Votre message sera transmis via Formspree pour me permettre de vous répondre."
        : "Le formulaire n’est pas encore disponible. Pour me joindre, utilisez directement mon adresse email ou mon téléphone.")}</p>
      {fields.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={`contact-${field.name}`}>{t(field.label)}</label>
          {field.name === "message" ? (
            <textarea
              id={`contact-${field.name}`}
              name={field.name}
              rows={5}
              maxLength={field.maxLength}
              required
              readOnly={sending}
              aria-invalid={!!errors[field.name]}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
            />
          ) : (
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.name === "email" ? "email" : "text"}
              autoComplete={
                field.name === "name"
                  ? "name"
                  : field.name === "email"
                    ? "email"
                    : undefined
              }
              maxLength={field.maxLength}
              required
              readOnly={sending}
              aria-invalid={!!errors[field.name]}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
            />
          )}
          {errors[field.name] && (
            <p className="error" id={`${field.name}-error`}>
              {t(errors[field.name] ?? "")}
            </p>
          )}
        </div>
      ))}
      <button type="submit" className="button" disabled={sending || !configured}>{t(sending ? "Envoi en cours…" : "Envoyer le message")}</button>
      {sendError && <p className="error" role="alert">{t(sendError)}</p>}
      <div role="status" aria-live="polite">
        {submitted && (
          <p className="success">{t("Votre message a bien été envoyé. Merci de m’avoir contacté.")}</p>
        )}
      </div>
    </form>
  );
}
