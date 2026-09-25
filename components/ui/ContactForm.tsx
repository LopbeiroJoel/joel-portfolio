"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useState, type FormEvent } from "react";
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
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#contact-${firstInvalid.name}`)?.focus();
      return;
    }
    form.reset();
    setSubmitted(true);
  }
  return (
    <form
      className="card contact-form"
      onSubmit={submit}
      noValidate
      aria-describedby="form-notice"
    >
      <p id="form-notice" className="form-notice">{t("Formulaire de démonstration : aucun email ne sera envoyé. Pour me joindre, utilisez directement mon adresse email ou mon téléphone. Tous les champs sont obligatoires.")}</p>
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
      <button type="submit" className="button">{t("Simuler l’envoi")}</button>
      <div role="status" aria-live="polite">
        {submitted && (
          <p className="success">{t("Simulation réussie pour cette V1. Aucun email n’a été envoyé et aucune donnée n’a été enregistrée.")}</p>
        )}
      </div>
    </form>
  );
}
