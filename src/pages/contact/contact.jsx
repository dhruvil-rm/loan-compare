import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LastUpdated, LegalFooterLine } from "../legal/legal.jsx";
import "../legal/legal.css";
import "./contact.css";

const empty = { name: "", email: "", subject: "", message: "", website: "" };

function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  useEffect(() => {
    document.title = "Contact Us — ON-TAP SOLUTION";
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // "website" is a honeypot field: real visitors never see or fill it.
    if (form.website) return;
    setStatus("sending");
    // No backend yet: simulate the send so the flow works end to end.
    // Replace this timeout with a real fetch() to your form endpoint.
    setTimeout(() => {
      setStatus("sent");
      setForm(empty);
    }, 700);
  }

  return (
    <article className="legal">
      <div className="container legal__container">
        <h1 className="legal__title">Contact Us</h1>
        <LastUpdated />

        {status === "sent" ? (
          <div className="contact__success" role="status">
            <h2>Message Sent</h2>
            <p>
              Thank you for reaching out. Your message has been received and our team will
              review it shortly. If your inquiry requires a response, we will get back to you
              at the email address you provided.
            </p>
            <p>
              Return to <Link to="/">ON-TAP SOLUTION</Link>.
            </p>
          </div>
        ) : (
          <>
            <p>
              Have a question, correction, or feedback? We'd love to hear from you. Fill out
              the form below and our team will get back to you as soon as possible.
            </p>
            <p>
              You can also email us directly at{" "}
                <a href="mailto:admin@jitendrasureshbhaipaghdar.com">admin@jitendrasureshbhaipaghdar.com</a>.
            </p>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>

              <label htmlFor="name">Name *</label>
              <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />

              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />

              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} />

              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows={6} required value={form.message} onChange={handleChange} />

              <button type="submit" className="btn-primary contact__submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}

        <p className="contact__more">For more information about our platform, please visit:</p>
        <ul className="contact__links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Use</Link></li>
          <li><Link to="/disclosure">Disclosure</Link></li>
          <li><Link to="/editorial">Editorial Policy</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <hr className="legal__rule" />
        <LegalFooterLine />
      </div>
    </article>
  );
}

export default Contact;
