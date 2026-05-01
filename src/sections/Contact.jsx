import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useInView } from "motion/react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const contactEmail = "rosnifarook@gmail.com";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      // Keep name input clean: letters, spaces, apostrophes, dots, and hyphens only.
      const sanitizedName = value.replace(/[^A-Za-z\s'.-]/g, "");
      setFormData({ ...formData, [name]: sanitizedName });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      showAlertMessage("danger", "Could not copy email.");
    }
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error(
          "Email service is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file."
        );
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          to_name: "Rosni",
          from_email: formData.email.trim(),
          to_email: contactEmail,
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      const reason = error?.text || error?.message || "Unknown error";
      showAlertMessage("danger", `Message failed: ${reason}`);
    }
  };
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        active={isInView}
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <div className="flex items-center justify-between w-full gap-3">
            <h2 className="text-heading">Let's Talk</h2>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3 py-2 text-xs border rounded-full cursor-pointer border-white/20 bg-white/5 hover:bg-white/10"
            >
              {emailCopied ? "Email copied!" : "Copy Email"}
            </button>
          </div>
          <p className="font-normal text-neutral-400">
            Whether you're loking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            <a href={`mailto:${contactEmail}`} className="hover:text-white">
              {contactEmail}
            </a>
            <a
              href="https://www.linkedin.com/in/rosni-farook/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rosnifarook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={60}
              pattern="^[A-Za-z][A-Za-z\s'.-]{1,59}$"
              title="Please enter a valid name (2-60 characters)."
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
              title="Please enter a valid email address."
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={1000}
              title="Message must be between 10 and 1000 characters."
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
          <p className="mt-3 text-xs text-center text-white/60">
            I usually reply within 24 hours.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
