import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  aboutContent,
  company,
  contactContent,
  homeContent,
  industriesContent,
  metaByPath,
  navigation,
  servicesContent,
} from "./siteContent";

function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

function usePageEffects(pathname) {
  useEffect(() => {
    const currentPath = normalizePath(pathname);
    const pageMeta = metaByPath[currentPath] ?? metaByPath["/"];
    const description = document.querySelector('meta[name="description"]');

    document.title = pageMeta.title;

    if (description) {
      description.setAttribute("content", pageMeta.description);
    }
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const elements = [...document.querySelectorAll(".reveal")];

    if (!elements.length) {
      return undefined;
    }

    elements.forEach((element) => element.classList.remove("is-visible"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);
}

function SectionHeading({ eyebrow, title, centered = false }) {
  return (
    <div className={`section-heading reveal${centered ? " section-heading-centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function HeroVisual({ visual }) {
  return (
    <div className="hero-visual reveal">
      <div className="photo-grid">
        <article className={`photo-card photo-card-feature photo-scene--${visual.featured.scene}`}>
          <div className="photo-card__frame"></div>
          <div className="photo-card__content">
            <span className="photo-chip">{visual.featured.chip}</span>
            <strong>{visual.featured.title}</strong>
            <span>{visual.featured.text}</span>
          </div>
        </article>
        <div className="photo-subgrid">
          {visual.secondary.map((card) => (
            <article
              className={`photo-card photo-card-support photo-scene--${card.scene}`}
              key={`${card.scene}-${card.title}`}
            >
              <div className="photo-card__frame"></div>
              <div className="photo-card__content">
                <span className="photo-chip">{card.chip}</span>
                <strong>{card.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
      <article className="signal-card">
        <p className="eyebrow">{visual.callout.eyebrow}</p>
        <ul className="signal-list">
          {visual.callout.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function CardMedia({ scene, label }) {
  return (
    <div className={`card-media photo-scene--${scene}`}>
      <div className="card-media__frame"></div>
      <span className="card-media__label">{label}</span>
    </div>
  );
}

function ImpactStrip({ items }) {
  return (
    <section className="section section-light impact-section">
      <div className="container impact-grid">
        {items.map((item) => (
          <article className="impact-card reveal" key={item.title}>
            <span>{item.eyebrow}</span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureSplit({ eyebrow, title, text, points, visual, sectionClassName = "section-light" }) {
  return (
    <section className={`section ${sectionClassName}`}>
      <div className="container visual-split">
        <div className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="section-text section-text-body">{text}</p>
          <ul className="checklist">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <article className={`photo-card photo-card-tall photo-scene--${visual.scene}`}>
            <div className="photo-card__frame"></div>
            <div className="photo-card__content">
              <span className="photo-chip">{visual.chip}</span>
              <strong>{visual.title}</strong>
              <span>{visual.text}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Timeline({ items }) {
  return (
    <div className="timeline-grid">
      {items.map((item, index) => (
        <article className="timeline-card reveal" key={item.title}>
          <span className="timeline-step">{`0${index + 1}`}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar" aria-label="Primary">
          <Link className="brand" to="/">
            <span className="brand-mark">{company.shortMark}</span>
            <span className="brand-copy">
              <strong>{company.name}</strong>
              <span>{company.tagline}</span>
            </span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `button button-small${isActive ? " is-active" : ""}`
              }
            >
              Contact
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand brand-footer" to="/">
            <span className="brand-mark">{company.shortMark}</span>
            <span className="brand-copy">
              <strong>{company.name}</strong>
              <span>{company.footerTagline}</span>
            </span>
          </Link>
        </div>
        <div className="footer-links">
          {navigation.slice(1).map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-contact">
          <a href={company.phoneHref}>{company.phoneDisplay}</a>
          <a href={company.emailHref}>{company.emailDisplay}</a>
          <span>{company.serviceArea}</span>
        </div>
      </div>
    </footer>
  );
}

function PageHero({ pageClassName, eyebrow, title, lead, visual }) {
  return (
    <section className={`page-hero ${pageClassName}`}>
      <div className="container page-hero-grid">
        <div className="reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        <HeroVisual visual={visual} />
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">{homeContent.eyebrow}</p>
            <h1>{homeContent.title}</h1>
            <p className="lead">{homeContent.lead}</p>
            <div className="hero-actions">
              <Link className="button" to="/contact">
                Request a Service Call
              </Link>
              <Link className="button button-secondary" to="/services">
                Explore Services
              </Link>
            </div>
            <ul className="hero-points" aria-label="Core service highlights">
              {homeContent.heroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="hero-panel">
            <HeroVisual visual={homeContent.visual} />
            <div className="stats-grid reveal">
              {homeContent.stats.map((item) => (
                <article className="stat-card" key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ImpactStrip items={homeContent.impact} />

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow={homeContent.servicesHeading.eyebrow}
            title={homeContent.servicesHeading.title}
          />
          <div className="cards-grid cards-grid-three">
            {homeContent.services.map((service) => (
              <article className="info-card reveal" key={service.title}>
                <CardMedia scene={service.scene} label={service.title} />
                <div className="card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeatureSplit
        eyebrow={homeContent.feature.eyebrow}
        title={homeContent.feature.title}
        text={homeContent.feature.text}
        points={homeContent.feature.points}
        visual={homeContent.feature.visual}
      />

      <section className="section section-dark">
        <div className="container split-layout">
          <div className="reveal">
            <p className="eyebrow">{homeContent.industries.eyebrow}</p>
            <h2>{homeContent.industries.title}</h2>
            <p className="section-text">{homeContent.industries.text}</p>
          </div>
          <div className="industry-list reveal">
            {homeContent.industries.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-accent">
        <div className="container">
          <SectionHeading
            eyebrow={homeContent.reasonsHeading.eyebrow}
            title={homeContent.reasonsHeading.title}
          />
          <div className="feature-grid">
            {homeContent.reasons.map((reason) => (
              <article className="feature-card reveal" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light cta-section">
        <div className="container cta-card reveal">
          <div>
            <p className="eyebrow">{homeContent.cta.eyebrow}</p>
            <h2>{homeContent.cta.title}</h2>
          </div>
          <Link className="button" to="/contact">
            Contact {company.name}
          </Link>
        </div>
      </section>
    </main>
  );
}

function ServicesPage() {
  return (
    <main>
      <PageHero
        pageClassName="page-hero-services"
        eyebrow={servicesContent.hero.eyebrow}
        title={servicesContent.hero.title}
        lead={servicesContent.hero.lead}
        visual={servicesContent.hero.visual}
      />

      <section className="section section-light">
        <div className="container">
          <div className="service-stack">
            {servicesContent.services.map((service) => (
              <article className="service-card reveal" key={service.number}>
                <div className="service-number">{service.number}</div>
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-accent">
        <div className="container">
          <SectionHeading
            eyebrow={servicesContent.modesHeading.eyebrow}
            title={servicesContent.modesHeading.title}
          />
          <div className="impact-grid impact-grid-wide">
            {servicesContent.modes.map((mode, index) => (
              <article className="impact-card reveal" key={mode.title}>
                <span>{`0${index + 1}`}</span>
                <strong>{mode.title}</strong>
                <p>{mode.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-column-grid">
          <div className="panel reveal">
            <p className="eyebrow">{servicesContent.processHeading.eyebrow}</p>
            <h2>{servicesContent.processHeading.title}</h2>
          </div>
          <div className="process-list reveal">
            {servicesContent.process.map((step) => (
              <div key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function IndustriesPage() {
  return (
    <main>
      <PageHero
        pageClassName="page-hero-industries"
        eyebrow={industriesContent.hero.eyebrow}
        title={industriesContent.hero.title}
        lead={industriesContent.hero.lead}
        visual={industriesContent.hero.visual}
      />

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow={industriesContent.heading.eyebrow}
            title={industriesContent.heading.title}
          />
          <div className="cards-grid cards-grid-three">
            {industriesContent.cards.map((card) => (
              <article className="industry-card reveal" key={card.title}>
                <CardMedia scene={card.scene} label={card.title} />
                <div className="card-copy">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeatureSplit
        eyebrow={industriesContent.showcase.eyebrow}
        title={industriesContent.showcase.title}
        text={industriesContent.showcase.text}
        points={industriesContent.showcase.points}
        visual={industriesContent.showcase.visual}
        sectionClassName="section-accent"
      />

      <section className="section section-dark">
        <div className="container split-layout">
          <div className="reveal">
            <p className="eyebrow">Regional fit</p>
            <h2>{industriesContent.showcase.title}</h2>
            <p className="section-text">{industriesContent.showcase.text}</p>
          </div>
          <div className="panel-list reveal">
            {industriesContent.regionRows.map((row) => (
              <div className="panel-row" key={row.title}>
                <strong>{row.title}</strong>
                <span>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main>
      <PageHero
        pageClassName="page-hero-about"
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        lead={aboutContent.hero.lead}
        visual={aboutContent.hero.visual}
      />

      <section className="section section-light">
        <div className="container about-grid">
          {aboutContent.panels.map((panel) => (
            <article className="panel reveal" key={panel.title}>
              <p className="eyebrow">{panel.eyebrow}</p>
              <h2>{panel.title}</h2>
              <p>{panel.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-accent">
        <div className="container">
          <SectionHeading
            eyebrow={aboutContent.featuresHeading.eyebrow}
            title={aboutContent.featuresHeading.title}
          />
          <div className="feature-grid">
            {aboutContent.features.map((feature) => (
              <article className="feature-card reveal" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <SectionHeading
            eyebrow={aboutContent.timelineHeading.eyebrow}
            title={aboutContent.timelineHeading.title}
          />
          <Timeline items={aboutContent.timeline} />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container two-column-grid">
          <div className="reveal">
            <p className="eyebrow">{aboutContent.serviceAreaHeading.eyebrow}</p>
            <h2>{aboutContent.serviceAreaHeading.title}</h2>
          </div>
          <div className="process-list reveal">
            {aboutContent.serviceArea.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const companyName = formData.get("company")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const service = formData.get("service")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !service || !message) {
      setStatus("Please complete the required fields before sending.");
      return;
    }

    const subject = encodeURIComponent(`Service Request: ${service}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Company: ${companyName || "N/A"}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Service needed: ${service}`,
        "",
        "Project details:",
        message,
      ].join("\n")
    );

    setStatus("Opening your email app with the request prefilled.");
    window.location.href = `${company.emailHref}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="form-row">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" placeholder="Company name" />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="form-row">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" placeholder="(519) 555-0147" />
      </div>
      <div className="form-row">
        <label htmlFor="service">Service needed</label>
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {contactContent.services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="message">Project details</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Tell us about the machine, issue, or project."
          required
        ></textarea>
      </div>
      <button className="button" type="submit">
        Send Request
      </button>
      <p className="form-note">
        This form opens your email app with the message prefilled so you can send it right away.
      </p>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHero
        pageClassName="page-hero-contact"
        eyebrow={contactContent.hero.eyebrow}
        title={contactContent.hero.title}
        lead={contactContent.hero.lead}
        visual={contactContent.hero.visual}
      />

      <section className="section section-light">
        <div className="container contact-grid">
          <div className="contact-details reveal">
            <article className="contact-card">
              <p className="eyebrow">Phone</p>
              <a href={company.phoneHref}>{company.phoneDisplay}</a>
            </article>
            <article className="contact-card">
              <p className="eyebrow">Email</p>
              <a href={company.emailHref}>{company.emailDisplay}</a>
            </article>
            <article className="contact-card">
              <p className="eyebrow">Service area</p>
              <span>Windsor, Essex County, Detroit area</span>
            </article>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section section-accent">
        <div className="container">
          <SectionHeading
            eyebrow={contactContent.responseHeading.eyebrow}
            title={contactContent.responseHeading.title}
          />
          <div className="impact-grid impact-grid-wide">
            {contactContent.response.map((item, index) => (
              <article className="impact-card reveal" key={item.title}>
                <span>{`0${index + 1}`}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const location = useLocation();

  usePageEffects(location.pathname);

  return (
    <div className="site-shell">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}
