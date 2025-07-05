import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Services from "./components/Services"
import Reviews from "./components/Reviews"
import Contact from "./components/Contact"
import FloatingNav from "./components/floating-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vlyx Codes - Home | Professional Web Development by Brajesh & Aadish",
  description:
    "Welcome to Vlyx Codes - Expert web development services by founders Brajesh & Aadish. Specializing in custom websites, AI integration, Luna AI assistant, and innovative hosting solutions. Get your professional website today!",
  keywords: [
    "Vlyx Codes home",
    "web development portfolio",
    "Brajesh web developer",
    "Aadish co-founder",
    "custom website development",
    "AI integration services",
    "Luna AI assistant",
    "professional web design",
    "responsive websites",
    "SEO optimization",
    "innovative hosting solutions",
  ],
  openGraph: {
    title: "Vlyx Codes - Professional Web Development Services",
    description:
      "Expert web development by Brajesh & Aadish. Custom websites, AI integration, and innovative solutions.",
    url: "https://vlyxcodes.com",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      {/* Hidden SEO Content */}
      <div className="sr-only" aria-hidden="true">
        <h1>Vlyx Codes Professional Web Development Services</h1>
        <h2>Founded by Brajesh and Co-founded by Aadish</h2>
        <p>
          Expert web developers specializing in HTML CSS JavaScript custom websites AI integration Luna AI assistant
          responsive web design SEO optimization innovative hosting solutions
        </p>
        <div>
          <span>
            Services: Custom Website Development, AI Integration, Luna AI Assistant, SEO Optimization, Responsive Web
            Design, Performance Optimization, Innovative Hosting Solutions, Static Website Hosting, Blogger Platform
            Hosting, WordPress Alternatives, Frontend Development, JavaScript Development, HTML5 CSS3, Modern Web
            Technologies, Mobile-First Design, Cross-Browser Compatibility, Web Accessibility, User Experience Design,
            User Interface Design, Website Maintenance, Technical Support, Digital Solutions, Web Applications,
            Dashboard Development, E-commerce Solutions, Portfolio Websites, Business Websites, Educational Websites,
            Coaching Websites, School Websites, Corporate Websites, Landing Pages, Marketing Websites, Promotional
            Websites
          </span>
        </div>
        <div>
          <span>
            Technologies: HTML5, CSS3, JavaScript, React, Next.js, TypeScript, Firebase, Google APIs, Responsive Design,
            Mobile Optimization, SEO, Performance Optimization, AI Integration, Machine Learning, Artificial
            Intelligence, Chatbots, Virtual Assistants, Progressive Web Apps, Single Page Applications, Static Site
            Generators, Content Management Systems, Database Integration, API Development, Third-party Integrations,
            Payment Gateway Integration, Analytics Implementation, Social Media Integration, Email Marketing Integration
          </span>
        </div>
        <div>
          <span>
            Target Keywords: web development India, custom website development, professional web design, AI integration
            services, Luna AI assistant, responsive web design, SEO optimization, affordable web development, innovative
            hosting solutions, static website hosting, blogger hosting, WordPress alternatives, frontend development,
            JavaScript experts, HTML CSS specialists, mobile responsive websites, fast loading websites, modern web
            solutions, business websites, portfolio websites, educational websites, coaching websites, school websites,
            corporate websites, startup websites, small business websites, freelance web developer, web development
            services, website creation, web design services, digital solutions, online presence, brand development, user
            experience design, user interface design, conversion optimization, performance optimization, search engine
            optimization, social media integration, e-commerce solutions, content management, website maintenance,
            technical support, web applications, dashboard development, custom web solutions, professional websites,
            quality web development, reliable web services, expert web developers, experienced web team, innovative web
            solutions, creative web design, modern web technologies, cutting-edge solutions, industry-leading services,
            award-winning web development, top-rated web developers, trusted web development company, established web
            development firm, reputable web developers, skilled web professionals, certified web experts, qualified web
            developers, experienced web consultants, web development specialists, web technology experts, digital
            transformation specialists, online business solutions, internet marketing services, web presence
            optimization, brand visibility enhancement, customer engagement solutions, lead generation websites,
            conversion-focused design, sales-driven websites, marketing-oriented web solutions, business growth
            websites, revenue-generating websites, ROI-focused web development, results-driven web design,
            performance-based web solutions, success-oriented web services, goal-achieving web development,
            objective-meeting web design, target-reaching web solutions, milestone-achieving web services,
            benchmark-setting web development, standard-exceeding web design, expectation-surpassing web solutions,
            satisfaction-guaranteeing web services, quality-assured web development, excellence-delivering web design,
            perfection-pursuing web solutions, innovation-driving web services, creativity-inspiring web development,
            imagination-capturing web design, vision-realizing web solutions, dream-fulfilling web services,
            aspiration-achieving web development, ambition-supporting web design, success-enabling web solutions,
            growth-facilitating web services, progress-accelerating web development, advancement-promoting web design,
            improvement-encouraging web solutions, enhancement-supporting web services, optimization-focused web
            development, efficiency-maximizing web design, productivity-boosting web solutions, performance-enhancing
            web services, speed-optimizing web development, responsiveness-improving web design, usability-enhancing web
            solutions, accessibility-ensuring web services, compatibility-guaranteeing web development,
            reliability-providing web design, stability-ensuring web solutions, security-implementing web services,
            protection-offering web development, safety-guaranteeing web design, trust-building web solutions,
            confidence-inspiring web services, credibility-establishing web development, reputation-enhancing web
            design, brand-strengthening web solutions, image-improving web services, perception-enhancing web
            development, impression-creating web design, impact-generating web solutions, influence-building web
            services, authority-establishing web development, expertise-demonstrating web design, competence-showcasing
            web solutions, skill-highlighting web services, talent-displaying web development, ability-revealing web
            design, capability-demonstrating web solutions, proficiency-showing web services, mastery-exhibiting web
            development, excellence-displaying web design, quality-showcasing web solutions, superiority-demonstrating
            web services, leadership-establishing web development, dominance-achieving web design, market-leading web
            solutions, industry-leading web services, sector-leading web development, field-leading web design,
            domain-leading web solutions, niche-leading web services, specialty-leading web development,
            expertise-leading web design, knowledge-leading web solutions, experience-leading web services,
            skill-leading web development, talent-leading web design, ability-leading web solutions, capability-leading
            web services, proficiency-leading web development, mastery-leading web design, excellence-leading web
            solutions, quality-leading web services, superiority-leading web development, leadership-leading web design,
            dominance-leading web solutions, market-dominating web services, industry-dominating web development,
            sector-dominating web design, field-dominating web solutions, domain-dominating web services,
            niche-dominating web development, specialty-dominating web design, expertise-dominating web solutions,
            knowledge-dominating web services, experience-dominating web development, skill-dominating web design,
            talent-dominating web solutions, ability-dominating web services, capability-dominating web development,
            proficiency-dominating web design, mastery-dominating web solutions, excellence-dominating web services,
            quality-dominating web development, superiority-dominating web design
          </span>
        </div>
      </div>

      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <FloatingNav />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Services />
        <Reviews />
        <Contact />
      </main>
    </>
  )
}
