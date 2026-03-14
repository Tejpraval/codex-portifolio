const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "tejpraval32@gmail.com";

export function validateContactForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export async function submitContactForm(values) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      _subject: "New portfolio contact message",
      _replyto: values.email.trim(),
      _captcha: "false",
      _template: "table",
      _honey: "",
    }),
  });

  const result = await response.json();

  if (!response.ok || result.success === "false") {
    throw new Error(result.message || "Unable to send your message right now.");
  }

  return result;
}
