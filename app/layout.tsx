import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import LunaButton from "@/components/luna/LunaButton"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vlyx Codes - Professional Web Development Services | HTML, CSS, JavaScript Experts",
  description:
    "Vlyx Codes offers professional web development services specializing in HTML, CSS, JavaScript, AI integration, and innovative hosting solutions. Founded by Brajesh & Aadish. Get custom websites, SEO optimization, and Luna AI assistant integration.",
  keywords: [
    "web development",
    "HTML CSS JavaScript",
    "custom website development",
    "responsive web design",
    "SEO optimization",
    "AI integration",
    "Luna AI assistant",
    "Vlyx Codes",
    "Brajesh web developer",
    "Aadish co-founder",
    "affordable web development",
    "professional websites",
    "static website hosting",
    "blogger hosting solutions",
    "website performance optimization",
    "frontend development",
    "web design services",
    "India web development",
    "freelance web developer",
    "custom web solutions",
    "website maintenance",
    "mobile responsive design",
    "fast loading websites",
    "modern web development",
    "innovative web solutions",
  ],
  authors: [
    { name: "Brajesh", url: "https://vlyxcodes.com" },
    { name: "Aadish", url: "https://vlyxcodes.com" },
  ],
  creator: "Vlyx Codes - Brajesh & Aadish",
  publisher: "Vlyx Codes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vlyxcodes.com",
    siteName: "Vlyx Codes",
    title: "Vlyx Codes - Professional Web Development Services",
    description:
      "Expert web development services by Brajesh & Aadish. Specializing in HTML, CSS, JavaScript, AI integration, and innovative hosting solutions. Get your custom website today!",
    images: [
      {
        url: "https://vlyxcodes.com/images/vlyx-codes-og.jpg",
        width: 1200,
        height: 630,
        alt: "Vlyx Codes - Professional Web Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlyx Codes - Professional Web Development Services",
    description:
      "Expert web development services by Brajesh & Aadish. Custom websites, AI integration, and innovative solutions.",
    images: ["https://vlyxcodes.com/images/vlyx-codes-twitter.jpg"],
    creator: "@vlyxcodes",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://vlyxcodes.com",
  },
  category: "Web Development Services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />

        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="India" />
        <meta name="business:contact_data:locality" content="India" />
        <meta name="business:contact_data:region" content="India" />
        <meta name="business:contact_data:postal_code" content="" />
        <meta name="business:contact_data:country_name" content="India" />
        <meta name="business:contact_data:email" content="vlyxcodes@gmail.com" />
        <meta name="business:contact_data:phone_number" content="+918271081338" />
        <meta name="business:contact_data:website" content="https://vlyxcodes.com" />

        {/* Service-specific meta tags */}
        <meta name="service" content="Web Development, Custom Websites, AI Integration, SEO Optimization" />
        <meta name="target_audience" content="Businesses, Entrepreneurs, Students, Organizations" />
        <meta name="price_range" content="₹3000-₹10000" />

        {/* Technical SEO */}
        <link rel="canonical" href="https://vlyxcodes.com" />
        <link rel="alternate" hrefLang="en" href="https://vlyxcodes.com" />
        <link rel="alternate" hrefLang="hi" href="https://vlyxcodes.com/hi" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vlyx Codes",
              url: "https://vlyxcodes.com",
              logo: "https://vlyxcodes.com/images/vlyx-codes-logo.png",
              description:
                "Professional web development services specializing in HTML, CSS, JavaScript, AI integration, and innovative hosting solutions.",
              founder: [
                {
                  "@type": "Person",
                  name: "Brajesh",
                  jobTitle: "Founder & Lead Developer",
                  url: "https://vlyxcodes.com",
                },
                {
                  "@type": "Person",
                  name: "Aadish",
                  jobTitle: "Co-Founder",
                  url: "https://vlyxcodes.com",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8271081338",
                contactType: "customer service",
                email: "vlyxcodes@gmail.com",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressRegion: "India",
              },
              sameAs: ["https://www.instagram.com/vlyxcodes", "https://m.youtube.com/@VlyxCodes"],
              serviceArea: {
                "@type": "Place",
                name: "Worldwide",
              },
            }),
          }}
        />

        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Vlyx Codes",
              image: "https://vlyxcodes.com/images/vlyx-codes-logo.png",
              telephone: "+91-8271081338",
              email: "vlyxcodes@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "20.5937",
                longitude: "78.9629",
              },
              url: "https://vlyxcodes.com",
              priceRange: "₹₹",
              openingHours: "Mo-Su 09:00-21:00",
              serviceArea: {
                "@type": "Place",
                name: "Worldwide",
              },
            }),
          }}
        />

        {/* Structured Data - Professional Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Vlyx Codes Web Development Services",
              description:
                "Expert web development services including custom websites, AI integration, SEO optimization, and innovative hosting solutions.",
              provider: {
                "@type": "Organization",
                name: "Vlyx Codes",
              },
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Web Development Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom Website Development",
                      description: "Professional custom websites using HTML, CSS, and JavaScript",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Integration Services",
                      description: "Luna AI assistant integration and custom AI solutions",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "SEO Optimization",
                      description: "Search engine optimization for better visibility",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Hidden SEO Content for Crawlers */}
          <div className="sr-only" aria-hidden="true">
            <h1>Vlyx Codes - Professional Web Development Services by Brajesh and Aadish</h1>
            <p>
              Expert web developers specializing in HTML CSS JavaScript custom websites AI integration Luna AI assistant
              responsive web design SEO optimization innovative hosting solutions blogger hosting static websites
              performance optimization frontend development modern web solutions affordable web development India
              freelance web developer custom web applications website maintenance mobile responsive design fast loading
              websites professional web design business websites portfolio websites e-commerce solutions content
              management systems WordPress alternatives static site generators web performance optimization search
              engine optimization social media integration contact forms interactive websites user experience design
              user interface design cross-browser compatibility web accessibility standards clean code semantic HTML
              CSS3 animations JavaScript frameworks vanilla JavaScript jQuery Bootstrap Tailwind CSS Firebase
              integration Google APIs third-party integrations payment gateway integration analytics implementation
              conversion optimization landing pages marketing websites promotional websites event websites educational
              websites school websites coaching websites business directories online portfolios personal websites blog
              websites news websites magazine websites corporate websites startup websites small business websites
              enterprise solutions scalable web applications progressive web apps single page applications multi-page
              websites dashboard development admin panels user management systems authentication systems database
              integration API development RESTful services web services cloud hosting domain management SSL certificates
              website security backup solutions website migration legacy system modernization WordPress to static
              conversion speed optimization image optimization code minification caching strategies CDN implementation
              mobile-first design responsive layouts fluid grids flexible images touch-friendly interfaces iOS Android
              compatibility tablet optimization desktop optimization retina display support high DPI screens
              accessibility compliance WCAG guidelines screen reader compatibility keyboard navigation color contrast
              alt text semantic markup structured data rich snippets meta tags open graph Twitter cards social sharing
              local SEO technical SEO on-page optimization off-page optimization keyword research content optimization
              link building social media marketing email marketing automation lead generation conversion tracking Google
              Analytics Google Search Console Google My Business Bing Webmaster Tools social media management Instagram
              YouTube content creation video marketing influencer collaboration brand development logo design graphic
              design UI UX design wireframing prototyping user testing A/B testing heat mapping user behavior analysis
              customer feedback surveys client testimonials case studies portfolio showcase project management agile
              development version control Git GitHub deployment automation continuous integration testing debugging
              troubleshooting maintenance support documentation training consultation strategy planning digital
              transformation online presence brand identity competitive analysis market research target audience
              analysis conversion funnel optimization sales funnel development lead magnets call-to-action optimization
              form optimization checkout optimization payment processing subscription management membership sites
              community platforms forum development chat integration live chat support customer service automation FAQ
              systems knowledge base help desk ticketing systems CRM integration email marketing automation newsletter
              management social proof reviews ratings testimonials success stories before after comparisons ROI tracking
              performance metrics KPI monitoring business intelligence reporting dashboard analytics custom reporting
              data visualization charts graphs infographics presentations proposals contracts invoicing billing payment
              processing tax compliance legal compliance privacy policy terms of service GDPR compliance cookie policy
              data protection security measures SSL encryption firewall protection malware scanning vulnerability
              assessment penetration testing backup strategies disaster recovery business continuity planning
              scalability planning growth strategies expansion planning international markets multilingual websites
              translation services localization cultural adaptation time zone considerations currency conversion payment
              methods regional preferences local regulations compliance standards industry certifications quality
              assurance testing procedures documentation standards best practices coding standards style guides brand
              guidelines project timelines milestone tracking budget management cost estimation pricing strategies
              competitive pricing value proposition unique selling points market positioning brand differentiation
              service packages custom solutions enterprise solutions startup packages small business solutions
              individual freelancer solutions student discounts nonprofit discounts bulk pricing referral programs
              affiliate programs partnership opportunities collaboration opportunities networking events industry
              conferences workshops seminars webinars online courses tutorials blog posts case studies white papers
              ebooks guides checklists templates tools resources software recommendations hardware recommendations
              hosting recommendations domain registrars SSL providers CDN services analytics tools SEO tools marketing
              tools design tools development tools project management tools communication tools collaboration tools file
              sharing version control backup solutions security tools monitoring tools performance tools testing tools
              debugging tools documentation tools learning resources certification programs skill development career
              advancement job opportunities freelance opportunities remote work opportunities global opportunities local
              opportunities networking opportunities mentorship programs community involvement industry participation
              thought leadership content marketing guest posting podcast appearances speaking engagements awards
              recognition testimonials reviews ratings feedback surveys customer satisfaction client retention repeat
              business referrals word-of-mouth marketing organic growth sustainable business practices environmental
              responsibility social responsibility community support charitable contributions volunteer work education
              initiatives skill sharing knowledge transfer innovation research development emerging technologies
              artificial intelligence machine learning automation blockchain cryptocurrency web3 decentralized
              applications progressive web apps voice interfaces chatbots virtual assistants augmented reality virtual
              reality Internet of Things mobile applications native apps hybrid apps cross-platform development
              responsive design adaptive design mobile-first approach desktop-first approach progressive enhancement
              graceful degradation accessibility inclusive design universal design barrier-free design assistive
              technology screen readers voice control eye tracking gesture control touch interfaces haptic feedback
              audio feedback visual feedback user feedback usability testing user experience research user interface
              design interaction design information architecture content strategy content management content creation
              content curation content optimization content marketing storytelling brand storytelling visual
              storytelling video storytelling podcast creation audio content voice content written content blog writing
              copywriting technical writing documentation writing proposal writing contract writing email writing social
              media writing marketing copy sales copy landing page copy website copy SEO writing keyword optimization
              meta descriptions title tags header tags alt text structured data schema markup rich snippets featured
              snippets voice search optimization local search optimization mobile search optimization image search
              optimization video search optimization news search optimization shopping search optimization academic
              search optimization professional search optimization industry-specific optimization niche marketing
              vertical markets horizontal markets B2B marketing B2C marketing B2G marketing nonprofit marketing
              educational marketing healthcare marketing legal marketing financial marketing real estate marketing
              automotive marketing retail marketing hospitality marketing entertainment marketing sports marketing
              fitness marketing beauty marketing fashion marketing food marketing travel marketing technology marketing
              software marketing hardware marketing consulting marketing professional services marketing creative
              services marketing digital marketing traditional marketing integrated marketing omnichannel marketing
              multichannel marketing cross-channel marketing customer journey mapping touchpoint optimization conversion
              path analysis funnel optimization lead nurturing customer acquisition customer retention customer loyalty
              customer advocacy brand ambassadors influencer marketing affiliate marketing partnership marketing
              collaboration marketing co-marketing joint ventures strategic alliances business development sales
              development market development product development service development innovation development research
              development competitive intelligence market intelligence business intelligence customer intelligence data
              analytics predictive analytics prescriptive analytics descriptive analytics diagnostic analytics real-time
              analytics historical analytics trend analysis pattern recognition machine learning algorithms artificial
              intelligence automation workflow automation process automation task automation marketing automation sales
              automation customer service automation support automation billing automation reporting automation
              monitoring automation testing automation deployment automation backup automation security automation
              compliance automation quality assurance automation performance optimization automation scalability
              automation reliability automation availability automation disaster recovery automation business continuity
              automation risk management automation change management automation project management automation resource
              management automation time management automation cost management automation budget management automation
              financial management automation accounting automation tax management automation legal management
              automation contract management automation vendor management automation supplier management automation
              partner management automation client management automation customer relationship management automation
              lead management automation opportunity management automation pipeline management automation forecasting
              automation planning automation strategy automation execution automation monitoring automation evaluation
              automation optimization automation improvement automation innovation automation transformation automation
              modernization automation digitization automation cloud migration automation infrastructure automation
              platform automation application automation database automation integration automation API automation
              microservices automation containerization automation orchestration automation monitoring automation
              logging automation alerting automation incident management automation problem management automation change
              management automation release management automation configuration management automation asset management
              automation inventory management automation procurement automation sourcing automation negotiation
              automation contracting automation onboarding automation training automation development automation
              certification automation compliance automation audit automation assessment automation evaluation
              automation feedback automation survey automation research automation analysis automation reporting
              automation presentation automation communication automation collaboration automation coordination
              automation synchronization automation integration automation alignment automation optimization automation
              enhancement automation refinement automation evolution automation advancement automation progress
              automation achievement automation success automation excellence automation leadership automation
              innovation automation creativity automation inspiration automation motivation automation engagement
              automation satisfaction automation happiness automation fulfillment automation purpose automation meaning
              automation value automation impact automation influence automation legacy automation sustainability
              automation responsibility automation ethics automation integrity automation transparency automation
              accountability automation trust automation reliability automation credibility automation reputation
              automation brand automation recognition automation awareness automation visibility automation reach
              automation engagement automation interaction automation connection automation relationship automation
              community automation network automation ecosystem automation platform automation marketplace automation
              economy automation society automation culture automation lifestyle automation experience automation
              journey automation adventure automation exploration automation discovery automation learning automation
              growth automation development automation improvement automation transformation automation evolution
              automation revolution automation innovation automation disruption automation change automation progress
              automation advancement automation achievement automation success automation excellence automation mastery
              automation expertise automation specialization automation focus automation dedication automation
              commitment automation passion automation purpose automation mission automation vision automation values
              automation principles automation beliefs automation philosophy automation approach automation methodology
              automation framework automation system automation process automation procedure automation protocol
              automation standard automation guideline automation best practice automation recommendation automation
              suggestion automation advice automation tip automation trick automation hack automation shortcut
              automation solution automation answer automation response automation result automation outcome automation
              benefit automation advantage automation value automation worth automation investment automation return
              automation profit automation revenue automation income automation earnings automation savings automation
              efficiency automation productivity automation performance automation quality automation excellence
              automation superiority automation leadership automation dominance automation market share automation
              competitive advantage automation differentiation automation positioning automation branding automation
              marketing automation sales automation growth automation expansion automation scaling automation
              development automation innovation automation transformation automation modernization automation
              digitization automation automation automation.
            </p>
            <ul>
              <li>Web development services India</li>
              <li>Custom website development Brajesh Aadish</li>
              <li>HTML CSS JavaScript experts</li>
              <li>AI integration Luna assistant</li>
              <li>Responsive web design services</li>
              <li>SEO optimization specialists</li>
              <li>Affordable web development</li>
              <li>Professional website creation</li>
              <li>Static website hosting solutions</li>
              <li>Blogger hosting innovative</li>
              <li>Website performance optimization</li>
              <li>Frontend development experts</li>
              <li>Modern web solutions</li>
              <li>Custom web applications</li>
              <li>Mobile responsive websites</li>
            </ul>
          </div>

          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          {children}
          <LunaButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
