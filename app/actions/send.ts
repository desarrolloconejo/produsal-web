"use server";

import nodemailer from "nodemailer";
import { getDictionary } from "@/dictionaries/get-dictionary";

export interface ContactState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const MAX_LENGTH = {
  name: 120,
  email: 254,
  company: 160,
  product: 200,
  message: 5000,
};

// Evita que el contenido del formulario se interprete como HTML en el correo
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Quita saltos de línea para que no se puedan inyectar cabeceras en el asunto
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

export async function sendContactEmail(
  prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const lang = formData.get("lang")?.toString() ?? "es";
  const { formMessages: t } = (await getDictionary(lang)).contact;

  // Honeypot: los bots rellenan el campo oculto, las personas no lo ven
  if (formData.get("website")?.toString()) {
    return { success: true, message: t.success };
  }

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const company = formData.get("company")?.toString().trim() || t.companyFallback;
  const product = formData.get("product")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Validación básica
  if (!name || !email || !message) {
    return { success: false, message: t.required };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: t.invalidEmail };
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    company.length > MAX_LENGTH.company ||
    (product?.length ?? 0) > MAX_LENGTH.product ||
    message.length > MAX_LENGTH.message
  ) {
    return { success: false, message: t.tooLong };
  }

  // Comprobar si las credenciales de correo están configuradas en el entorno
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, "");
  const contactTo = process.env.CONTACT_TO_EMAIL || "infoprodusal@grupomimesa.com";
  const contactFrom = process.env.CONTACT_FROM_EMAIL || `"Produsal Web" <${smtpUser || "no-reply@produsal.com"}>`;

  // Sin credenciales nunca se informa de un envío que no ocurrió.
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn(
      "Produsal: envío no disponible; faltan credenciales SMTP."
    );
    return { success: false, message: t.error };
  }

  const sentAt = new Intl.DateTimeFormat("es-VE", {
    timeZone: "America/Caracas",
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date()) + " (hora de Venezuela)";

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    company: escapeHtml(company),
    product: product ? escapeHtml(product) : "",
    message: escapeHtml(message),
  };

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === "true",
      requireTLS: process.env.SMTP_SECURE !== "true",
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const notification = await transporter.sendMail({
      from: contactFrom,
      to: contactTo,
      replyTo: email,
      subject: singleLine(`Solicitud web: ${name}`),
      text: `Solicitud desde la web de Produsal\n\nAutor: ${name}\nCorreo: ${email}\nEmpresa: ${company}\nProducto / presentación: ${product || "General"}\nFecha: ${sentAt}\n\nMensaje:\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#183c6b"><h2>Solicitud desde la web de Produsal</h2><p><strong>Autor:</strong> ${safe.name}</p><p><strong>Correo:</strong> ${safe.email}</p><p><strong>Empresa:</strong> ${safe.company}</p><p><strong>Producto / presentación:</strong> ${safe.product || "General"}</p><p><strong>Fecha:</strong> ${escapeHtml(sentAt)}</p><p><strong>Mensaje:</strong></p><p style="white-space:pre-line">${safe.message}</p></div>`,
    });

    if (!notification.accepted.length) {
      throw new Error("El servidor SMTP no aceptó el destinatario de la solicitud.");
    }

    // La solicitud ya fue enviada. Si falla solo la confirmación, no pedir
    // reenviarla al usuario: eso duplicaría el requerimiento en Produsal.
    try {
      const confirmation = await transporter.sendMail({
        from: contactFrom,
        to: email,
        replyTo: contactTo,
        subject: t.confirmationSubject,
        headers: { "Auto-Submitted": "auto-generated" },
        text: `${t.confirmationGreeting} ${name},\n\n${t.confirmationBody}`,
        html: `<div style="font-family:Arial,sans-serif;padding:24px;color:#183c6b"><h2 style="color:#02aeaa">${escapeHtml(t.confirmationTitle)}</h2><p>${escapeHtml(t.confirmationGreeting)} ${safe.name},</p><p>${escapeHtml(t.confirmationBody)}</p></div>`,
      });
      if (!confirmation.accepted.length) throw new Error("Confirmación no aceptada.");
    } catch {
      console.error("Produsal: solicitud enviada; no se pudo enviar la confirmación al visitante.");
      return { success: true, message: t.confirmationPending };
    }

    return { success: true, message: t.success };
  } catch (error) {
    console.error("Error al despachar correo con Nodemailer:", error);
    return { success: false, message: t.error };
  }
}
