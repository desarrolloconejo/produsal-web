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
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO_EMAIL || "infoprodusal@grupomimesa.com";
  const contactFrom = process.env.CONTACT_FROM_EMAIL || `"Produsal Web" <${smtpUser || "no-reply@produsal.com"}>`;

  // Modo desarrollo / simulación si no se han provisto credenciales reales
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn(
      "Produsal Server Action: Credenciales SMTP no detectadas en .env. Simulación de envío exitoso."
    );
    return { success: true, message: t.devSuccess };
  }

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
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: contactFrom,
      to: contactTo,
      replyTo: email,
      subject: singleLine(
        product
          ? `Requerimiento [${product}]: ${name} (${company})`
          : `Nuevo mensaje de contacto web: ${name} (${company})`
      ),
      text: `Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\nProducto / Formato: ${product || "General"}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #183c6b;">
          <h2 style="color: #02aeaa;">Nuevo Requerimiento desde Sitio Web Produsal</h2>
          <p><strong>Nombre:</strong> ${safe.name}</p>
          <p><strong>Empresa:</strong> ${safe.company}</p>
          <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          ${safe.product ? `<p><strong>Producto / Presentación de Interés:</strong> <span style="color: #02aeaa; font-weight: bold;">${safe.product}</span></p>` : ""}
          <div style="margin-top: 15px; padding: 15px; background: #f8fafc; border-left: 4px solid #02aeaa; border-radius: 4px;">
            <strong>Mensaje o Requerimiento:</strong>
            <p style="white-space: pre-line;">${safe.message}</p>
          </div>
          <hr style="margin-top: 25px; border: none; border-top: 1px solid #e2e8f0;" />
          <small style="color: #64748b;">Notificación automática de Produsal Web</small>
        </div>
      `,
    });

    return { success: true, message: t.success };
  } catch (error) {
    console.error("Error al despachar correo con Nodemailer:", error);
    return { success: false, message: t.error };
  }
}
