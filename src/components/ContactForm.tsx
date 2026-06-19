"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatTypography } from "@/lib/utils";
import { HighlightHover } from "./HighlightHover";

const SERVICES_OPTIONS = [
  "Дизайн сайта",
  "Сайт на Tilda",
  "Брендинг",
  "Логотип",
  "Полиграфия",
  "Дизайн-поддержка",
  "Другое",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [task, setTask] = useState("");
  const [consent, setConsent] = useState(false);

  // Focus states
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    service: false,
    consent: false,
  });

  // Transient shake animation states
  const [shakeFields, setShakeFields] = useState({
    name: false,
    phone: false,
    service: false,
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Format phone input as mask: +7 XXX XXX XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      setPhone("");
      setErrors((prev) => ({ ...prev, phone: false }));
      return;
    }

    // Get digits only
    let digits = val.replace(/\D/g, "");

    // If starts with 7 or 8 (Russia/Kazakhstan country codes), strip it for formatting
    if (digits.startsWith("7") || digits.startsWith("8")) {
      digits = digits.substring(1);
    }

    // Limit to 10 digits
    digits = digits.substring(0, 10);

    let formatted = "+7";
    if (digits.length > 0) {
      formatted += " " + digits.substring(0, 3);
    }
    if (digits.length > 3) {
      formatted += " " + digits.substring(3, 6);
    }
    if (digits.length > 6) {
      formatted += " " + digits.substring(6, 10);
    }

    setPhone(formatted);

    // Clear error on input
    if (digits.length === 10) {
      setErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Check errors
    const nameValid = name.trim().length > 0;
    const phoneValid = phone.replace(/\D/g, "").length === 11; // 7 + 10 digits
    const serviceValid = service.length > 0;
    const consentValid = consent;

    const newErrors = {
      name: !nameValid,
      phone: !phoneValid,
      service: !serviceValid,
      consent: !consentValid,
    };

    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((val) => val);

    if (hasAnyError) {
      // Trigger transient shake
      setShakeFields({
        name: newErrors.name,
        phone: newErrors.phone,
        service: newErrors.service,
        consent: newErrors.consent,
      });

      // Reset shake state after animation ends
      setTimeout(() => {
        setShakeFields({
          name: false,
          phone: false,
          service: false,
          consent: false,
        });
      }, 400);
      return;
    }

    // Submit form
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          task,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        console.error("Ошибка при отправке формы");
      }
    } catch (error) {
      console.error("Исключение при отправке формы:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <span className="section-label">{formatTypography("Обсудить проект")}</span>
      
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "w-full flex flex-col gap-8 transition-opacity duration-300",
              submitting && "opacity-60 pointer-events-none"
            )}
          >
            {/* Grid container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Name field */}
              <div className="relative w-full pb-1">
                <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--fg-muted)] mb-3">
                  {formatTypography("Имя *")}
                </span>
                <input
                  type="text"
                  placeholder={formatTypography("Введите ваше имя")}
                  disabled={submitting}
                  className="w-full bg-transparent border-none outline-none py-2 text-[15px] font-normal tracking-tight text-[var(--fg)] placeholder-[var(--fg-muted)] placeholder-opacity-30"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
                  }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  animate={{
                    backgroundColor: errors.name
                      ? "var(--accent)"
                      : focusedField === "name"
                      ? "var(--accent)"
                      : "var(--border)",
                    x: shakeFields.name ? [-4, 4, -4, 4, 0] : 0,
                  }}
                  transition={{
                    backgroundColor: { duration: 0.2 },
                    x: { duration: 0.4 },
                  }}
                />
              </div>

              {/* Phone field */}
              <div className="relative w-full pb-1">
                <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--fg-muted)] mb-3">
                  {formatTypography("Телефон *")}
                </span>
                <input
                  type="tel"
                  placeholder={formatTypography("+7 708 843 6197")}
                  disabled={submitting}
                  className="w-full bg-transparent border-none outline-none py-2 text-[15px] font-normal tracking-tight text-[var(--fg)] placeholder-[var(--fg-muted)] placeholder-opacity-30"
                  value={phone}
                  onChange={handlePhoneChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  animate={{
                    backgroundColor: errors.phone
                      ? "var(--accent)"
                      : focusedField === "phone"
                      ? "var(--accent)"
                      : "var(--border)",
                    x: shakeFields.phone ? [-4, 4, -4, 4, 0] : 0,
                  }}
                  transition={{
                    backgroundColor: { duration: 0.2 },
                    x: { duration: 0.4 },
                  }}
                />
              </div>

              {/* Service custom checkboxes */}
              <div className="relative w-full pb-1 flex flex-col h-full">
                <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--fg-muted)] mb-3">
                  {formatTypography("Вид услуги *")}
                </span>
                <div className="flex flex-col gap-2 mt-0.5 flex-grow">
                  {SERVICES_OPTIONS.map((opt) => {
                    const isSelected = service === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => {
                          if (submitting) return;
                          setService(opt);
                          if (errors.service)
                            setErrors((prev) => ({ ...prev, service: false }));
                        }}
                        className="flex items-center gap-2.5 cursor-pointer py-1 select-none group"
                      >
                        {/* Custom checkbox box */}
                        <div
                          className={cn(
                            "w-3.5 h-3.5 border flex items-center justify-center rounded-[2px] transition-colors",
                            isSelected ? "border-[var(--accent)]" : "border-[var(--border)] group-hover:border-[var(--fg-muted)]"
                          )}
                          style={{
                            borderColor: errors.service ? "var(--accent)" : undefined
                          }}
                        >
                          {isSelected && (
                            <motion.div
                              className="w-2 h-2 bg-[var(--accent)] rounded-[1px]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                          )}
                        </div>
                        <span className={cn(
                          "text-[13px] transition-colors leading-[1.1]",
                          isSelected ? "text-[var(--fg)] font-medium" : "text-[var(--fg-muted)] group-hover:text-[var(--fg)]"
                        )}>
                          {formatTypography(opt)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  animate={{
                    backgroundColor: errors.service ? "var(--accent)" : "transparent",
                    x: shakeFields.service ? [-4, 4, -4, 4, 0] : 0,
                  }}
                  transition={{
                    backgroundColor: { duration: 0.2 },
                    x: { duration: 0.4 },
                  }}
                />
              </div>

              {/* Task field */}
              <div className="relative w-full pb-1 flex flex-col h-full">
                <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-[var(--fg-muted)] mb-3">
                  {formatTypography("Задача")}
                </span>
                <div className="relative w-full flex-grow flex">
                  <textarea
                    placeholder={formatTypography("Опишите ваш проект и задачи")}
                    disabled={submitting}
                    className="w-full bg-transparent border-none outline-none py-2 text-[15px] font-normal tracking-tight text-[var(--fg)] placeholder-[var(--fg-muted)] placeholder-opacity-30 resize-none min-h-[140px] h-full flex-grow"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onFocus={() => setFocusedField("task")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  animate={{
                    backgroundColor:
                      focusedField === "task" ? "var(--accent)" : "var(--border)",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>

            </div>

            {/* Checkbox consent */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={consent}
                    disabled={submitting}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent)
                        setErrors((prev) => ({ ...prev, consent: false }));
                    }}
                  />
                  <motion.div
                    className="w-3.5 h-3.5 border border-[var(--border)] flex items-center justify-center rounded-[2px]"
                    animate={{
                      borderColor: errors.consent ? "var(--accent)" : "var(--border)",
                      x: shakeFields.consent ? [-4, 4, -4, 4, 0] : 0,
                    }}
                    transition={{
                      borderColor: { duration: 0.2 },
                      x: { duration: 0.4 },
                    }}
                  >
                    {consent && (
                      <motion.div
                        className="w-2 h-2 bg-[var(--accent)] rounded-[1px]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.div>
                </div>
                <span className="text-[13px] leading-[1.1] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
                  {formatTypography("Согласен на обработку персональных данных *")}
                </span>
              </label>
            </div>

            {/* Submit button */}
            <div className="mt-2 w-full md:w-auto md:self-start">
              <HighlightHover
                as="button"
                type="submit"
                disabled={submitting}
                highlightColor="var(--accent)"
                hoverTextColor="#fff"
                className="submit-btn"
              >
                {submitting ? formatTypography("Отправка...") : formatTypography("Отправить")}
              </HighlightHover>
            </div>

          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="py-12 flex flex-col items-center justify-center text-center gap-2 border border-dashed border-[var(--border)] rounded-[2px]"
          >
            <p className="text-[15px] leading-[1.1] font-normal tracking-tight text-[var(--fg)]">
              {formatTypography("Спасибо. Проект принят в работу.")}
            </p>
            <span className="text-[11px] leading-[1.1] text-[var(--fg-muted)] uppercase tracking-widest">
              {formatTypography("Мы свяжемся с вами в ближайшее время")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
