"use server";

import nodemailer from "nodemailer";

export interface ContactState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function sendContactEmail(
  prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const company = formData.get("company")?.toString().trim() || "No especificada";
  const message = formData.get("message")?.toString().trim();

  // Validación básica
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Por favor completa todos los campos requeridos.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Por favor ingresa un correo electrónico válido.",
    };
  }

  // Comprobar si las credenciales de correo están configuradas en el entorno
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO_EMAIL || "contacto@produsal.com";
  const contactFrom = process.env.CONTACT_FROM_EMAIL || `"Produsal Web" <${smtpUser || "no-reply@produsal.com"}>`;

  // Modo desarrollo / simulación si no se han provisto credenciales reales
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn(
      "Produsal Server Action: Credenciales SMTP no detectadas en .env. Simulación de envío exitoso."
    );
    return {
      success: true,
      message: "¡Mensaje recibido con éxito! En modo de desarrollo tu mensaje fue registrado.",
    };
  }

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
      subject: `Nuevo mensaje de contacto web: ${name} (${company})`,
      text: `Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #082846;">
          <h2 style="color: #02afab;">Nuevo Contacto desde Sitio Web Produsal</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 15px; padding: 15px; background: #f8fafc; border-left: 4px solid #02afab; border-radius: 4px;">
            <strong>Mensaje:</strong>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <hr style="margin-top: 25px; border: none; border-top: 1px solid #e2e8f0;" />
          <small style="color: #64748b;">Notificación automática de Produsal Web</small>
        </div>
      `,
    });

    return {
      success: true,
      message: "¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente a nuestro equipo.",
    };
  } catch (error) {
    console.error("Error al despachar correo con Nodemailer:", error);
    return {
      success: false,
      message: "Ocurrió un error al enviar tu mensaje. Por favor intenta más tarde o contáctanos por teléfono.",
    };
  }
}
