// Define the supported language codes.
export type LanguageCode = "en" | "es" | "fr" | "de";

// Define the translations for each language.
export const translations: Record<LanguageCode, Record<string, string>> = {

  en: {
    "investment.plan": "Investment Plan",
    "plan" : "Plans",

   // Navbar
    "home" : "Home",
    "about" : "About us", 
    "offers" : "Offers",
    "faq" : "FAQ",
    "terms" : "Terms",
    "contact" : "Contact us",
    "login" : "Login",
    "register" : "Register",

    // Sec1 keys (unchanged)
    "sec1.title": "Sustainable <br /> Investment <br /> Management <br /> Services.",
    "sec1.desc": "Fund Hive Company delivers world-class investment services, <br /> institutional asset management and financial advisory services <br /> under one distinguished banner. We operate thoughtful <br /> innovation across asset classes and global markets.",
    "sec1.desc2": "Fund Hive Company delivers world-class investment services, institutional asset management and financial advisory services under one distinguished banner. We operate thoughtful innovation across asset classes and global markets.",
    "sec1.committed": "Committed to adding value",
    "sec1.resultsTitle": "Achieving Results",
    "sec1.resultsDesc": "Our approach to achieving results is based on our belief that <br /> patient, conservative and disciplined investment is the preferred <br /> route to sustainable growth, providing the greatest value over the <br /> long term to all our investors.",
    "sec1.resultsDesc2": "Our approach to achieving results is based on our belief that patient, conservative and disciplined investment is the preferred route to sustainable growth, providing the greatest value over the long term to all our investors.",
    "sec1.beliefsTitle": "Our Beliefs",
    "sec1.beliefsDesc": "At Fund Hive Company, we prize the stability of our clients, our employees and our financial resources. Placing the needs of our clients first has led to long-lasting relationships. A growing client base has allowed us to consistently hire the best and brightest. And this combination of satisfied clients and exceptional team members is what will allow us to maintain our significant financial strength in the decades to come.",
    "sec1.learnMore": "LEARN MORE",

    // Sec2 keys (unchanged)
    "sec2.header.prefix": "OUR",
    "sec2.header.title": "Investment Plans",
    "sec2.goldPlan.name": "Gold plan",
    "sec2.goldPlan.rate": "36.9% Daily",
    "sec2.goldPlan.duration": "For 1 Day",
    "sec2.goldPlan.features": "Stable Profit\nMinimum Amount - $100\nMaximum Amount - $20,000\nSupport Service - 24/7",
    "sec2.goldPlan.button": "Invest Now",
    "sec2.diamondPlan.badge": "HOT!",
    "sec2.diamondPlan.name": "Diamond plan",
    "sec2.diamondPlan.rate": "40% Daily",
    "sec2.diamondPlan.duration": "For 2 Days",
    "sec2.diamondPlan.features": "Stable Profit\nMinimum Amount - $25,000\nMaximum Amount - $40,000\nSupport Service - 24/7",
    "sec2.diamondPlan.button": "Invest Now",
    "sec2.zonalPlan.name": "Zonal Representative",
    "sec2.zonalPlan.rate": "60% Daily",
    "sec2.zonalPlan.duration": "For 3 Days",
    "sec2.zonalPlan.features": "Stable Profit\nMinimum Amount - $50,000\nMaximum Amount - $1,000,000\nSupport Service - 24/7",
    "sec2.zonalPlan.button": "Invest Now",
    "sec2.ambassadorPlan.name": "Ambassador Plan",
    "sec2.ambassadorPlan.button": "Contact Support",
    "sec2.savingsPlan.name": "Savings/Fixed Deposits <br /> Plan",
    "sec2.savingsPlan.button": "Contact Support",

    // Sec3 keys – new keys for Sec3 text.
    "sec3.header.prefix": "Designed For You",
    "sec3.header.title": "Our Features",
    "sec3.card1.title": "Risk Management",
    "sec3.card1.desc": "We have established a rigorous risk management framework that features dedicated investment and operational risk teams who work to protect client assets.",
    "sec3.card2.title": "Purpose-driven",
    "sec3.card2.desc": "We understand that for many of our clients the impact of their portfolio is an important consideration in conjunction with investment performance.",
    "sec3.card3.title": "Broad Scope",
    "sec3.card3.desc": "We are a passionate, independent investment firm united by our commitment to research-driven investment solutions and client service.",
    "sec3.card4.title": "Stability",
    "sec3.card4.desc": "Our ability to deliver risk-adjusted returns to clients over time is a testament to the prowess of our investment professionals.",
    "sec3.card5.title": "Diversity",
    "sec3.card5.desc": "Our portfolio management professionals are critical, independent thinkers who benefit from being part of a global, diverse investment organization.",
    "sec3.card6.title": "Experienced",
    "sec3.card6.desc": "Our clients benefit from the wisdom of our seasoned professionals, and we are always looking to supplement their ranks with emerging talent.",
    "sec3.affiliate.title": "Affiliate Commission",
    "sec3.affiliate.desc": "We offer a direct referral commission on every invested referral you sign up with your link.",
    "sec3.affiliate.button": "Contact Us To Learn More",
    "sec3.stats.referralLabel": "Referral Commission",
    "sec3.stats.instantLabel": "Payment",
    "sec3.stats.referralValue": "10%",
    "sec3.stats.instantValue": "Instant",


    // Footer texts
    "footer.logoDescription": "Fund Hive Company delivers world-class investment services, institutional asset management, and financial advisory services.",
    "footer.company.title": "Company",
    "footer.company.home": "Home",
    "footer.company.about": "About Us",
    "footer.company.offers": "Offers",
    "footer.company.faq": "Frequently Asked",
    "footer.getInTouch.title": "Get in Touch",
    "footer.getInTouch.terms": "Terms",
    "footer.getInTouch.contact": "Contact Us",
    "footer.getInTouch.login": "Login",
    "footer.getInTouch.register": "Register",
    "footer.reachUs.title": "Reach Us",
    "footer.reachUs.headOffice": " Riddargatan 13A, 114 51 Stockholm, Sweden",
    "footer.reachUs.email": "fundhivecorps@gmail.com",
    "footer.bottom": "© All Rights Reserved 2024 fundhivecorps.com",


    // About page
    "about.header.title": "About Us",
    "about.breadcrumb.home": "Home",
    "about.breadcrumb.about": "About us",
    "about.section1.title": "Built For You",
    "about.section1.desc": "FundHive Corporate delivers world-class investment services, institutional asset management and financial advisory services under one distinguished banner. We operate thoughtful innovation across asset classes and global markets. Through our expertise and dedication, we transform the plans of the world’s most successful individuals, families and institutions into action so that we can help our clients reach their most ambitious goals. Spanning decades and generations, our longevity comes from the recognition that we are more than a financial institution. We’re legal and registered, learn more by clicking the link below.",
    "about.contact.button": "OUR CONTACT",
    "about.section2.title": "Our Vision",
    "about.section2.desc": "FundHive Corporate is committed to creating a global, innovative, and dynamic investment and financial advisory service that empowers individuals, families, and institutions to achieve their financial goals. We strive to create a strong foundation for our clients, enabling them to take control of their own finances and achieve their dreams.",



    // FAQ page keys
    "faq.header.title": "Frequently Asked Questions",
    "faq.breadcrumb.home": "Home",
    "faq.breadcrumb.faq": "FAQ's",
    "faq.section.title": "Frequently Asked Questions",
    // FAQ entries: each question and answer pair.
    "faq.entry.1.question": "How can I invest with fundhivecorps.com?",
    "faq.entry.1.answer": "To make an investment you must first become a registered investor. Once you are signed up, you can make your first deposit.",
    
    "faq.entry.2.question": "I wish to invest with you but I don't have any ecurrency account. What should I do?",
    "faq.entry.2.answer": "You can open a free PM account here: blockchain.com",
    
    "faq.entry.3.question": "How do I open my Account?",
    "faq.entry.3.answer": "It's quite easy and convenient. Follow this link, fill in the registration form and then press 'Register'.",
    
    "faq.entry.4.question": "Which e-currencies do you accept?",
    "faq.entry.4.answer": "We accept Bitcoin, Ethereum and Bitcoin Cash cryptocurrencies.",
    
    "faq.entry.5.question": "How can I withdraw?",
    "faq.entry.5.answer": "Login to your account using your username and password and check the Withdraw section.",
    
    "faq.entry.6.question": "How long does it take for my deposit to be added to my account?",
    "faq.entry.6.answer": "All withdrawals are processed immediately.",
    
    "faq.entry.7.question": "How can I change my e-mail address or password?",
    "faq.entry.7.answer": "Log into your fundhivecorps.com account and click on 'Account Information'. You can change your e-mail address and password there.",
    
    "faq.entry.8.question": "What if I can't log into my account because I forgot my password?",
    "faq.entry.8.answer": "Click the forgot password link, type your username or e-mail and you'll receive your account information.",
    
    "faq.entry.9.question": "How do you calculate the interest on my account?",
    "faq.entry.9.answer": "Depending on your chosen plan. Interest on your account is acquired daily and credited to your available balance at the end of each day.",
    
    "faq.entry.10.question": "Can I do a direct deposit from my account balance?",
    "faq.entry.10.answer": "Yes! To make a deposit from your account balance, simply login into your members area and click on 'Make Deposit' and select 'Deposit from Account Balance'.",
    
    "faq.entry.11.question": "Can I make an additional deposit to my account once it has been opened?",
    "faq.entry.11.answer": "Yes, you can but all transactions are handled separately.",
    
    "faq.entry.12.question": "After I make a withdrawal request, when will the funds be available on my ecurrency account?",
    "faq.entry.12.answer": "Funds are usually available immediately depending on the Blockchain network.",
    
    "faq.entry.13.question": "How can I change my password?",
    "faq.entry.13.answer": "You can change your password directly from your members area by editing it in your personal profile.",
    
    "faq.entry.14.question": "How can I check my account balances?",
    "faq.entry.14.answer": "You can access the account information at any time.",
    
    "faq.entry.15.question": "Who manages the funds?",
    "faq.entry.15.answer": "These funds are managed by our team of investment professionals.",
    
    "faq.entry.16.question": "Do you have an affiliate commission?",
    "faq.entry.16.answer": "Yes, we offer a 10% referral commission on every direct referral you make.",


    // Terms & Conditions page translations
    "terms.header.title": "Terms & Conditions",
    "terms.breadcrumb.home": "Home",
    "terms.breadcrumb.terms": "Terms",
    "terms.section.header": "Terms & Conditions",
    "terms.section.intro": "Please read the following carefully before signing in.",
    "terms.section.p1": "By using our website, and communicating with us via email or other electronic messages (collectively, “Digital Presence”), you consent to: (1) the collection, use, and storage of your personal and non-personal information, and (2) the Terms & Conditions of Use below, which includes our Privacy & Security Statement. We may amend these Terms and Conditions from time to time; if we do, we will post those changes on this page within a reasonable time after the change.",
    "terms.section.p2": "Depending on your interaction with Fundhive Corporate, other privacy policies may apply in addition to these Terms & Conditions.",
    "terms.section.trademarks": "* Trademarks and Copyrights",
    "terms.section.trademarks.desc": "The materials on this Digital Presence are copyrighted and protected by worldwide copyright laws and treaty provisions. Any unauthorized use of these materials may violate copyright, trademark, and other laws.",
    "terms.section.noWarranties": "* No Warranties",
    "terms.section.noWarranties.desc": "Although the Digital Presence host has attempted to provide accurate information, it assumes no responsibility for the accuracy of the information. No representations or warranties are made regarding its product or service offerings.",
    "terms.section.limitation": "* Limitation of Liability",
    "terms.section.limitation.desc": "The Digital Presence host specifically disclaims any liability, whether based in contract, tort, strict liability, or otherwise, for any damages arising out of or connected with the use of this site.",
    "terms.section.content": "* Content of Materials",
    "terms.section.content.desc": "The materials on this Digital Presence are protected and may not be copied, reproduced, modified, or distributed in any way without prior written permission.",
    "terms.section.links": "* Links to Other Websites",
    "terms.section.links.desc": "This site contains links to other affiliated websites, each subject to its own Terms and Conditions. Fundhive Corporate is not responsible for the content or privacy practices of these external sites.",
    "terms.section.privacy": "* Privacy and Security Statement",
    "terms.section.privacy.desc": "The Digital Presence host is committed to protecting your privacy and outlines how we collect and use your information.",
    "terms.section.personal": "* Personal Information and Privacy",
    "terms.section.personal.desc": "Each time you visit our site, our web server automatically collects non-personally identifying information such as your IP address, browser software, operating system, pages viewed, and visit duration. This information is not linked to any personally identifiable data.",
    "terms.section.cookies": "* Cookies",
    "terms.section.cookies.desc": "Some features of this site require the use of cookies, which store information on your hard drive. No personally identifiable information is stored in these cookies.",
    "terms.section.thirdParty": "* Third-Party Links",
    "terms.section.thirdParty.desc": "This site contains links to other websites. Fundhive Corporate is not responsible for the content or privacy practices of these external sites.",
    // "terms.affiliate.desc": "We offer a direct referral commission on every invested referral you make.",
    // "terms.contact.button": "Contact Us To Learn More",    


    // New keys for Contact page
    "contact.header.title": "Contact Us",
    "contact.header.desc": "Send us a message, we'll be sure to get back to you.",
    "contact.form.name.label": "Name",
    "contact.form.name.placeholder": "Your Name",
    "contact.form.email.label": "Email",
    "contact.form.email.placeholder": "Your Email",
    "contact.form.message.label": "Message",
    "contact.form.message.placeholder": "Your Message",
    "contact.form.submit": "Submit",
    "contact.modal.close": "Close",
    "contact.get": "Get in Touch",

    // Login 
    "log.login" : "Login",
    "log.email" : "Email",
    "log.password" : "Password",
    "log.show" : "Show password",
    "log.forgot" : "Forgot Password",
    "log.bottom1" : "Don't have an account?",
    "log.bottom2" : "Create account",
  },

  es: {
    "investment.plan": "Planes de inversión",
    "plan" : "Planes",
    // Navbar
  
    "home": "Inicio",
    "about": "Sobre nosotros",
    "offers": "Ofertas",
    "faq": "FAQ",
    "terms": "Términos",
    "contact": "Contáctanos",
    "login": "Iniciar sesión",
    "register": "Registrarse",


    "sec1.title": "Servicios de Gestión <br /> de Inversiones Sostenibles.",
    "sec1.desc": "Fund Hive Company ofrece servicios de inversión de primer nivel, <br /> gestión de activos institucionales y asesoría financiera <br /> bajo un sello distinguido. Operamos con innovación reflexiva <br /> a través de clases de activos y mercados globales.",
    "sec1.desc2": "Fund Hive Company ofrece servicios de inversión de primer nivel, gestión de activos institucionales y asesoría financiera bajo un sello distinguido. Operamos con innovación reflexiva a través de clases de activos y mercados globales.",
    "sec1.committed": "Comprometidos a aportar valor",
    "sec1.resultsTitle": "Logrando Resultados",
    "sec1.resultsDesc": "Nuestro enfoque para lograr resultados se basa en nuestra creencia de que <br /> la inversión paciente, conservadora y disciplinada es la ruta preferida <br /> hacia un crecimiento sostenible, proporcionando el mayor valor <br /> a todos nuestros inversores a largo plazo.",
    "sec1.resultsDesc2": "Nuestro enfoque para lograr resultados se basa en nuestra creencia de que la inversión paciente, conservadora y disciplinada es el camino preferido hacia un crecimiento sostenible, proporcionando el mayor valor a largo plazo para todos nuestros inversores.",
    "sec1.beliefsTitle": "Nuestras Creencias",
    "sec1.beliefsDesc": "En Fund Hive Company, valoramos la estabilidad de nuestros clientes, empleados y recursos financieros. Poner las necesidades de nuestros clientes en primer lugar ha llevado a relaciones duraderas. Una base de clientes en crecimiento nos ha permitido contratar constantemente a los mejores y más brillantes. Y esta combinación de clientes satisfechos y un equipo excepcional nos permitirá mantener nuestra fortaleza financiera durante las próximas décadas.",
    "sec1.learnMore": "APRENDE MÁS",

    "sec2.header.prefix": "NUESTROS",
    "sec2.header.title": "Planes de Inversión",
    "sec2.goldPlan.name": "Plan Oro",
    "sec2.goldPlan.rate": "36.9% Diario",
    "sec2.goldPlan.duration": "Por 1 Día",
    "sec2.goldPlan.features": "Beneficio Estable\nMonto Mínimo - $100\nMonto Máximo - $20,000\nServicio de Soporte 24/7",
    "sec2.goldPlan.button": "Invertir Ahora",
    "sec2.diamondPlan.badge": "¡HOT!",
    "sec2.diamondPlan.name": "Plan Diamante",
    "sec2.diamondPlan.rate": "40% Diario",
    "sec2.diamondPlan.duration": "Por 2 Días",
    "sec2.diamondPlan.features": "Beneficio Estable\nMonto Mínimo - $25,000\nMonto Máximo - $40,000\nServicio de Soporte 24/7",
    "sec2.diamondPlan.button": "Invertir Ahora",
    "sec2.zonalPlan.name": "Representante Zonal",
    "sec2.zonalPlan.rate": "60% Diario",
    "sec2.zonalPlan.duration": "Por 3 Días",
    "sec2.zonalPlan.features": "Beneficio Estable\nMonto Mínimo - $50,000\nMonto Máximo - $1,000,000\nServicio de Soporte 24/7",
    "sec2.zonalPlan.button": "Invertir Ahora",
    "sec2.ambassadorPlan.name": "Plan Embajador",
    "sec2.ambassadorPlan.button": "Contactar Soporte",
    "sec2.savingsPlan.name": "Plan de Ahorros/Depósitos Fijos <br />",
    "sec2.savingsPlan.button": "Contactar Soporte",

    // Sec3 texts in Spanish
    "sec3.header.prefix": "Diseñado para Ti",
    "sec3.header.title": "Nuestras Funciones",
    "sec3.card1.title": "Gestión de Riesgos",
    "sec3.card1.desc": "Hemos establecido un riguroso marco de gestión de riesgos que cuenta con equipos dedicados de riesgo de inversión y operativo que trabajan para proteger los activos de los clientes.",
    "sec3.card2.title": "Impulsado por el Propósito",
    "sec3.card2.desc": "Entendemos que para muchos de nuestros clientes, el impacto de su cartera es un aspecto importante junto con el rendimiento de la inversión.",
    "sec3.card3.title": "Alcance Amplio",
    "sec3.card3.desc": "Somos una firma de inversión independiente y apasionada, unida por nuestro compromiso con soluciones de inversión basadas en la investigación y el servicio al cliente.",
    "sec3.card4.title": "Estabilidad",
    "sec3.card4.desc": "Nuestra capacidad para ofrecer rendimientos ajustados al riesgo a lo largo del tiempo es un testimonio de la destreza de nuestros profesionales de inversión.",
    "sec3.card5.title": "Diversidad",
    "sec3.card5.desc": "Nuestros profesionales de gestión de carteras son pensadores críticos e independientes que se benefician de ser parte de una organización de inversión global y diversa.",
    "sec3.card6.title": "Experimentados",
    "sec3.card6.desc": "Nuestros clientes se benefician de la sabiduría de nuestros profesionales experimentados, y siempre buscamos complementar sus filas con talento emergente.",
    "sec3.affiliate.title": "Comisión de Afiliados",
    "sec3.affiliate.desc": "Ofrecemos una comisión directa por referencia en cada referido invertido que se registre con tu enlace.",
    "sec3.affiliate.button": "Contáctanos para saber más",
    "sec3.stats.referralLabel": "Comisión por Referencia",
    "sec3.stats.instantLabel": "Pago",
    "sec3.stats.referralValue": "10%",
    "sec3.stats.instantValue": "Instantáneo",

    // Footer
    "footer.logoDescription": "Fund Hive Company ofrece servicios de inversión de clase mundial, gestión de activos institucionales y asesoría financiera.",
    "footer.company.title": "Empresa",
    "footer.company.home": "Inicio",
    "footer.company.about": "Sobre Nosotros",
    "footer.company.offers": "Ofertas",
    "footer.company.faq": "Preguntas Frecuentes",
    "footer.getInTouch.title": "Ponerse en Contacto",
    "footer.getInTouch.terms": "Términos",
    "footer.getInTouch.contact": "Contáctanos",
    "footer.getInTouch.login": "Iniciar Sesión",
    "footer.getInTouch.register": "Registrarse",
    "footer.reachUs.title": "Encuéntranos",
    // Leave these untranslated:
    "footer.reachUs.headOffice": "Riddargatan 13A, 114 51 Stockholm, Sweden",
    "footer.reachUs.email": "fundhivecorps@gmail.com",
    "footer.bottom": "© All Rights Reserved 2024 fundhivecorps.com",

    // About page
    "about.header.title": "Sobre Nosotros",
    "about.breadcrumb.home": "Inicio",
    "about.breadcrumb.about": "Sobre nosotros",
    "about.section1.title": "Construido para Ti",
    "about.section1.desc": "FundHive Corporate ofrece servicios de inversión de clase mundial, gestión de activos institucionales y asesoría financiera bajo un sello distinguido. Operamos con innovación reflexiva en diversas clases de activos y mercados globales. A través de nuestra experiencia y dedicación, transformamos los planes de las personas, familias e instituciones más exitosas del mundo en acción, ayudando a nuestros clientes a alcanzar sus metas más ambiciosas. A lo largo de décadas y generaciones, nuestra longevidad proviene del reconocimiento de que somos más que una institución financiera. Somos legales y registrados, descubre más haciendo clic en el enlace a continuación.",
    "about.contact.button": "CONTÁCTANOS",
    "about.section2.title": "Nuestra Visión",
    "about.section2.desc": "FundHive Corporate se compromete a crear un servicio global, innovador y dinámico de inversión y asesoría financiera que empodere a individuos, familias e instituciones para alcanzar sus metas financieras. Nos esforzamos por crear una base sólida para nuestros clientes, permitiéndoles tomar el control de sus propias finanzas y alcanzar sus sueños.",


    // FAQ page keys for Spanish
    "faq.header.title": "Preguntas Frecuentes",
    "faq.breadcrumb.home": "Inicio",
    "faq.breadcrumb.faq": "FAQ's",
    "faq.section.title": "Preguntas Frecuentes",
    "faq.entry.1.question": "¿Cómo puedo invertir con fundhivecorps.com?",
    "faq.entry.1.answer": "Para invertir, primero debes ser un inversor registrado. Una vez registrado, puedes realizar tu primer depósito.",
    
    "faq.entry.2.question": "Quiero invertir con ustedes pero no tengo cuenta de e-currency. ¿Qué debo hacer?",
    "faq.entry.2.answer": "Puedes abrir una cuenta PM gratuita aquí: blockchain.com",
    
    "faq.entry.3.question": "¿Cómo abro mi cuenta?",
    "faq.entry.3.answer": "Es bastante fácil y conveniente. Sigue este enlace, rellena el formulario de registro y luego presiona 'Registrarse'.",
    
    "faq.entry.4.question": "¿Qué e-currencies aceptan?",
    "faq.entry.4.answer": "Aceptamos las criptomonedas Bitcoin, Ethereum y Bitcoin Cash.",
    
    "faq.entry.5.question": "¿Cómo puedo retirar?",
    "faq.entry.5.answer": "Inicia sesión en tu cuenta usando tu nombre de usuario y contraseña y revisa la sección de Retiro.",
    
    "faq.entry.6.question": "¿Cuánto tiempo tarda en reflejarse mi depósito en mi cuenta?",
    "faq.entry.6.answer": "Todos los retiros se procesan de inmediato.",
    
    "faq.entry.7.question": "¿Cómo puedo cambiar mi dirección de correo o contraseña?",
    "faq.entry.7.answer": "Inicia sesión en tu cuenta fundhivecorps.com y haz clic en 'Información de la cuenta'. Allí puedes cambiar tu correo y contraseña.",
    
    "faq.entry.8.question": "¿Qué pasa si no puedo iniciar sesión porque olvidé mi contraseña?",
    "faq.entry.8.answer": "Haz clic en el enlace de 'olvidé mi contraseña', ingresa tu nombre de usuario o correo y recibirás la información de tu cuenta.",
    
    "faq.entry.9.question": "¿Cómo calculan el interés en mi cuenta?",
    "faq.entry.9.answer": "Dependiendo de tu plan elegido. El interés se adquiere diariamente y se acredita al final de cada día.",
    
    "faq.entry.10.question": "¿Puedo hacer un depósito directo desde el saldo de mi cuenta?",
    "faq.entry.10.answer": "¡Sí! Para depositar desde tu saldo, inicia sesión en tu área de miembros, haz clic en 'Realizar Depósito' y selecciona 'Depósito desde Saldo'.",
    
    "faq.entry.11.question": "¿Puedo hacer un depósito adicional una vez que mi cuenta está abierta?",
    "faq.entry.11.answer": "Sí, pero todas las transacciones se manejan por separado.",
    
    "faq.entry.12.question": "Después de solicitar un retiro, ¿cuándo estarán disponibles los fondos en mi cuenta de e-currency?",
    "faq.entry.12.answer": "Los fondos suelen estar disponibles inmediatamente, dependiendo de la red Blockchain.",
    
    "faq.entry.13.question": "¿Cómo puedo cambiar mi contraseña?",
    "faq.entry.13.answer": "Puedes cambiar tu contraseña directamente desde tu área de miembros editándola en tu perfil personal.",
    
    "faq.entry.14.question": "¿Cómo puedo consultar los saldos de mi cuenta?",
    "faq.entry.14.answer": "Puedes acceder a la información de tu cuenta en cualquier momento.",
    
    "faq.entry.15.question": "¿Quién gestiona los fondos?",
    "faq.entry.15.answer": "Los fondos son gestionados por nuestro equipo de profesionales de inversión.",
    
    "faq.entry.16.question": "¿Ofrecen comisión por afiliación?",
    "faq.entry.16.answer": "Sí, ofrecemos una comisión del 10% por cada referido directo que realices.",


    // Terms & Conditions page translations in Spanish
    "terms.header.title": "Términos y Condiciones",
    "terms.breadcrumb.home": "Inicio",
    "terms.breadcrumb.terms": "Términos",
    "terms.section.header": "Términos y Condiciones",
    "terms.section.intro": "Por favor, lea lo siguiente detenidamente antes de iniciar sesión.",
    "terms.section.p1": "Al utilizar nuestro sitio web y comunicarse con nosotros por correo electrónico u otros mensajes electrónicos (colectivamente, 'Presencia Digital'), usted acepta: (1) la recopilación, uso y almacenamiento de su información personal y no personal, y (2) los Términos y Condiciones de Uso a continuación, que incluyen nuestra Declaración de Privacidad y Seguridad. Podemos modificar estos Términos y Condiciones ocasionalmente; de ser así, publicaremos los cambios en esta página en un plazo razonable después de la modificación.",
    "terms.section.p2": "Dependiendo de su interacción con Fundhive Corporate, pueden aplicarse otras políticas de privacidad además de estos Términos y Condiciones.",
    "terms.section.trademarks": "* Marcas Registradas y Derechos de Autor",
    "terms.section.trademarks.desc": "Los materiales en esta Presencia Digital están protegidos por leyes de derechos de autor a nivel mundial y por tratados internacionales. Cualquier uso no autorizado puede violar estas leyes.",
    "terms.section.noWarranties": "* Sin Garantías",
    "terms.section.noWarranties.desc": "Aunque se ha hecho todo lo posible por proporcionar información precisa, el anfitrión de la Presencia Digital no asume ninguna responsabilidad por la exactitud de dicha información. No se ofrecen garantías expresas o implícitas respecto a los productos o servicios.",
    "terms.section.limitation": "* Limitación de Responsabilidad",
    "terms.section.limitation.desc": "El anfitrión de la Presencia Digital rechaza cualquier responsabilidad por daños directos, indirectos, incidentales, consecuentes o especiales que surjan del uso de este sitio.",
    "terms.section.content": "* Contenido de los Materiales",
    "terms.section.content.desc": "Los materiales en esta Presencia Digital están protegidos y no pueden ser copiados, reproducidos, modificados o distribuidos sin el permiso previo por escrito.",
    "terms.section.links": "* Enlaces a Otros Sitios",
    "terms.section.links.desc": "Este sitio contiene enlaces a otros sitios afiliados, cada uno sujeto a sus propios Términos y Condiciones. Fundhive Corporate no se hace responsable del contenido o de las prácticas de privacidad de estos sitios externos.",
    "terms.section.privacy": "* Declaración de Privacidad y Seguridad",
    "terms.section.privacy.desc": "El anfitrión de la Presencia Digital se compromete a proteger su privacidad y detalla cómo se recopila y utiliza su información.",
    "terms.section.personal": "* Información Personal y Privacidad",
    "terms.section.personal.desc": "Cada vez que visita nuestro sitio, nuestro servidor web recopila automáticamente información no personal identificable, como la dirección IP, el navegador, el sistema operativo, las páginas visitadas y la duración de la visita. Esta información no se vincula a datos personales identificables.",
    "terms.section.cookies": "* Cookies",
    "terms.section.cookies.desc": "Algunas funciones de este sitio requieren el uso de cookies, que almacenan información en su disco duro. No se almacena información personal identificable en estas cookies.",
    "terms.section.thirdParty": "* Enlaces de Terceros",
    "terms.section.thirdParty.desc": "Este sitio contiene enlaces a otros sitios web. Fundhive Corporate no se hace responsable del contenido o de las prácticas de privacidad de estos sitios externos.",
    // "terms.affiliate.desc": "Ofrecemos una comisión directa por cada referido invertido que realice.",
    // "terms.contact.button": "Contáctanos para saber más",


    // Contact page translations in Spanish
    "contact.header.title": "Contáctanos",
    "contact.header.desc": "Envíanos un mensaje y te responderemos a la brevedad.",
    "contact.form.name.label": "Nombre",
    "contact.form.name.placeholder": "Tu Nombre",
    "contact.form.email.label": "Correo",
    "contact.form.email.placeholder": "Tu Correo",
    "contact.form.message.label": "Mensaje",
    "contact.form.message.placeholder": "Tu Mensaje",
    "contact.form.submit": "Enviar",
    "contact.modal.close": "Cerrar",
    "contact.get": "Ponte en Contacto",

    // Login
    "log.login": "Iniciar sesión",
    "log.email": "Correo electrónico",
    "log.password": "Contraseña",
    "log.show": "Mostrar contraseña",
    "log.forgot": "¿Olvidaste tu contraseña?",
    "log.bottom1": "¿No tienes una cuenta?",
    "log.bottom2": "Crear cuenta"

  },

  fr: {
    "investment.plan": "Plans d’investissement",
    "plan" : "Plans",
    //  Navbar
  
    "home": "Accueil",
    "about": "À propos de nous",
    "offers": "Offres",
    "faq": "FAQ",
    "terms": "Conditions",
    "contact": "Nous contacter",
    "login": "Connexion",
    "register": "S'inscrire",


    "sec1.title": "Services de Gestion <br /> d'Investissement Durable.",
    "sec1.desc": "Fund Hive Company offre des services d'investissement de classe mondiale, <br /> la gestion d'actifs institutionnels et des conseils financiers <br /> sous une bannière distinguée. Nous opérons avec une innovation réfléchie <br /> à travers des classes d'actifs et des marchés mondiaux.",
    "sec1.desc2": "Fund Hive Company offre des services d'investissement de classe mondiale, la gestion d'actifs institutionnels et des conseils financiers sous une bannière distinguée. Nous opérons avec une innovation réfléchie à travers des classes d'actifs et des marchés mondiaux.",
    "sec1.committed": "Engagés à ajouter de la valeur",
    "sec1.resultsTitle": "Atteindre des Résultats",
    "sec1.resultsDesc": "Notre approche pour obtenir des résultats repose sur notre conviction que <br /> l’investissement patient, conservateur et discipliné est la voie privilégiée <br /> vers une croissance durable, offrant la plus grande valeur <br /> à tous nos investisseurs sur le long terme.",
    "sec1.resultsDesc2": "Notre approche pour atteindre des résultats repose sur notre conviction que l'investissement patient, conservateur et discipliné est la voie privilégiée vers une croissance durable, offrant la plus grande valeur à long terme à tous nos investisseurs.",
    "sec1.beliefsTitle": "Nos Convictions",
    "sec1.beliefsDesc": "Chez Fund Hive Company, nous apprécions la stabilité de nos clients, de nos employés et de nos ressources financières. Mettre les besoins de nos clients en premier a conduit à des relations durables. Une base de clients en croissance nous a permis d'embaucher constamment les meilleurs et les plus brillants. Et cette combinaison de clients satisfaits et d'une équipe exceptionnelle nous permettra de maintenir notre force financière significative pour les décennies à venir.",
    "sec1.learnMore": "EN SAVOIR PLUS",

    "sec2.header.prefix": "NOS",
    "sec2.header.title": "Plans d'Investissement",
    "sec2.goldPlan.name": "Plan Or",
    "sec2.goldPlan.rate": "36,9% Quotidien",
    "sec2.goldPlan.duration": "Pour 1 Jour",
    "sec2.goldPlan.features": "Profit Stable\nMontant Minimum - $100\nMontant Maximum - $20,000\nService Support 24/7",
    "sec2.goldPlan.button": "Investir Maintenant",
    "sec2.diamondPlan.badge": "CHAUD !",
    "sec2.diamondPlan.name": "Plan Diamant",
    "sec2.diamondPlan.rate": "40% Quotidien",
    "sec2.diamondPlan.duration": "Pour 2 Jours",
    "sec2.diamondPlan.features": "Profit Stable\nMontant Minimum - $25,000\nMontant Maximum - $40,000\nService Support 24/7",
    "sec2.diamondPlan.button": "Investir Maintenant",
    "sec2.zonalPlan.name": "Représentant Zonal",
    "sec2.zonalPlan.rate": "60% Quotidien",
    "sec2.zonalPlan.duration": "Pour 3 Jours",
    "sec2.zonalPlan.features": "Profit Stable\nMontant Minimum - $50,000\nMontant Maximum - $1,000,000\nService Support 24/7",
    "sec2.zonalPlan.button": "Investir Maintenant",
    "sec2.ambassadorPlan.name": "Plan Ambassadeur",
    "sec2.ambassadorPlan.button": "Contacter le Support",
    "sec2.savingsPlan.name": "Plan d'Épargne/Dépôts Fixes <br />",
    "sec2.savingsPlan.button": "Contacter le Support",

    // Sec3 texts in French
    "sec3.header.prefix": "Conçu pour Vous",
    "sec3.header.title": "Nos Fonctionnalités",
    "sec3.card1.title": "Gestion des Risques",
    "sec3.card1.desc": "Nous avons mis en place un cadre rigoureux de gestion des risques avec des équipes dédiées à l'investissement et aux risques opérationnels qui œuvrent pour protéger les actifs des clients.",
    "sec3.card2.title": "Axé sur le But",
    "sec3.card2.desc": "Nous comprenons que pour nombre de nos clients, l'impact de leur portefeuille est un critère important en parallèle des performances d'investissement.",
    "sec3.card3.title": "Large Portée",
    "sec3.card3.desc": "Nous sommes une entreprise d'investissement indépendante et passionnée, unie par notre engagement en faveur de solutions d'investissement fondées sur la recherche et d'un excellent service client.",
    "sec3.card4.title": "Stabilité",
    "sec3.card4.desc": "Notre capacité à offrir des rendements ajustés au risque sur le long terme témoigne de l'expertise de nos professionnels de l'investissement.",
    "sec3.card5.title": "Diversité",
    "sec3.card5.desc": "Nos gestionnaires de portefeuilles sont des penseurs indépendants et critiques qui bénéficient d'appartenir à une organisation d'investissement globale et diversifiée.",
    "sec3.card6.title": "Expérimenté",
    "sec3.card6.desc": "Nos clients bénéficient de la sagesse de nos professionnels expérimentés, et nous cherchons toujours à renforcer leurs équipes avec de nouveaux talents.",
    "sec3.affiliate.title": "Commission d'Affiliation",
    "sec3.affiliate.desc": "Nous offrons une commission directe sur chaque référence investie que vous inscrivez avec votre lien.",
    "sec3.affiliate.button": "Contactez-nous pour en savoir plus",
    "sec3.stats.referralLabel": "Commission de Référence",
    "sec3.stats.instantLabel": "Paiement",
    "sec3.stats.referralValue": "10%",
    "sec3.stats.instantValue": "Instantané",

    // Footer
    "footer.logoDescription": "Fund Hive Company offre des services d'investissement de classe mondiale, la gestion d'actifs institutionnels et des conseils financiers.",
    "footer.company.title": "Entreprise",
    "footer.company.home": "Accueil",
    "footer.company.about": "À propos",
    "footer.company.offers": "Offres",
    "footer.company.faq": "Questions Fréquentes",
    "footer.getInTouch.title": "Contactez-nous",
    "footer.getInTouch.terms": "Conditions",
    "footer.getInTouch.contact": "Contactez-nous",
    "footer.getInTouch.login": "Connexion",
    "footer.getInTouch.register": "Inscription",
    "footer.reachUs.title": "Nous Joindre",
    // Leave these untranslated:
    "footer.reachUs.headOffice": "Riddargatan 13A, 114 51 Stockholm, Sweden",
    "footer.reachUs.email": "fundhivecorps@gmail.com",
   "footer.bottom": "© All Rights Reserved 2024 fundhivecorps.com",

   //  About page
    "about.header.title": "À propos",
    "about.breadcrumb.home": "Accueil",
    "about.breadcrumb.about": "À propos",
    "about.section1.title": "Conçu pour Vous",
    "about.section1.desc": "FundHive Corporate offre des services d'investissement de classe mondiale, la gestion d'actifs institutionnels et des conseils financiers sous une bannière distinguée. Nous opérons avec une innovation réfléchie à travers des classes d'actifs et des marchés mondiaux. Grâce à notre expertise et à notre dévouement, nous transformons les projets des individus, familles et institutions les plus performants du monde en action pour aider nos clients à atteindre leurs objectifs les plus ambitieux. Sur des décennies et des générations, notre longévité découle de la reconnaissance que nous sommes bien plus qu'une institution financière. Nous sommes légaux et enregistrés, découvrez-en plus en cliquant sur le lien ci-dessous.",
    "about.contact.button": "CONTACTEZ-NOUS",
    "about.section2.title": "Notre Vision",
    "about.section2.desc": "FundHive Corporate s'engage à créer un service d'investissement et de conseil financier mondial, innovant et dynamique qui permet aux individus, aux familles et aux institutions d'atteindre leurs objectifs financiers. Nous nous efforçons de créer une base solide pour nos clients, leur permettant de prendre le contrôle de leurs finances et de réaliser leurs rêves.",


    // Faq page
    "faq.header.title": "Questions Fréquentes",
    "faq.breadcrumb.home": "Accueil",
    "faq.breadcrumb.faq": "FAQ's",
    "faq.section.title": "Questions Fréquentes",
    "faq.entry.1.question": "Comment puis-je investir avec fundhivecorps.com ?",
    "faq.entry.1.answer": "Pour investir, vous devez d'abord devenir un investisseur enregistré. Une fois inscrit, vous pouvez effectuer votre premier dépôt.",
    
    "faq.entry.2.question": "Je souhaite investir avec vous, mais je n'ai pas de compte de e-devise. Que dois-je faire ?",
    "faq.entry.2.answer": "Vous pouvez ouvrir un compte PM gratuit ici : blockchain.com",
    
    "faq.entry.3.question": "Comment ouvrir mon compte ?",
    "faq.entry.3.answer": "C'est très simple et pratique. Suivez ce lien, remplissez le formulaire d'inscription, puis appuyez sur 'S'inscrire'.",
    
    "faq.entry.4.question": "Quelles e-devises acceptez-vous ?",
    "faq.entry.4.answer": "Nous acceptons Bitcoin, Ethereum et Bitcoin Cash.",
    
    "faq.entry.5.question": "Comment puis-je effectuer un retrait ?",
    "faq.entry.5.answer": "Connectez-vous à votre compte avec votre nom d'utilisateur et mot de passe, puis consultez la section Retrait.",
    
    "faq.entry.6.question": "Combien de temps faut-il pour que mon dépôt soit ajouté à mon compte ?",
    "faq.entry.6.answer": "Tous les retraits sont traités immédiatement.",
    
    "faq.entry.7.question": "Comment puis-je changer mon adresse e-mail ou mon mot de passe ?",
    "faq.entry.7.answer": "Connectez-vous à votre compte sur fundhivecorps.com et cliquez sur 'Informations du compte'. Vous pouvez y modifier votre e-mail et mot de passe.",
    
    "faq.entry.8.question": "Que faire si je n'arrive pas à me connecter parce que j'ai oublié mon mot de passe ?",
    "faq.entry.8.answer": "Cliquez sur le lien 'mot de passe oublié', saisissez votre nom d'utilisateur ou e-mail et vous recevrez les informations de votre compte.",
    
    "faq.entry.9.question": "Comment calculez-vous les intérêts sur mon compte ?",
    "faq.entry.9.answer": "Cela dépend de votre plan choisi. Les intérêts sont acquis quotidiennement et crédités à la fin de chaque journée.",
    
    "faq.entry.10.question": "Puis-je faire un dépôt direct à partir du solde de mon compte ?",
    "faq.entry.10.answer": "Oui ! Pour déposer à partir de votre solde, connectez-vous à votre espace membre, cliquez sur 'Faire un dépôt' et sélectionnez 'Dépôt depuis le solde'.",
    
    "faq.entry.11.question": "Puis-je effectuer un dépôt supplémentaire une fois mon compte ouvert ?",
    "faq.entry.11.answer": "Oui, mais toutes les transactions sont traitées séparément.",
    
    "faq.entry.12.question": "Après avoir fait une demande de retrait, quand les fonds seront-ils disponibles sur mon compte e-devise ?",
    "faq.entry.12.answer": "Les fonds sont généralement disponibles immédiatement, selon le réseau Blockchain.",
    
    "faq.entry.13.question": "Comment puis-je changer mon mot de passe ?",
    "faq.entry.13.answer": "Vous pouvez changer votre mot de passe directement dans votre espace membre en le modifiant dans votre profil personnel.",
    
    "faq.entry.14.question": "Comment puis-je vérifier le solde de mon compte ?",
    "faq.entry.14.answer": "Vous pouvez accéder aux informations de votre compte à tout moment.",
    
    "faq.entry.15.question": "Qui gère les fonds ?",
    "faq.entry.15.answer": "Ces fonds sont gérés par notre équipe de professionnels de l'investissement.",
    
    "faq.entry.16.question": "Offrez-vous une commission d'affiliation ?",
    "faq.entry.16.answer": "Oui, nous offrons une commission de 10% sur chaque référence directe que vous effectuez.",


    // Terms & Conditions page translations in French
    "terms.header.title": "Conditions Générales",
    "terms.breadcrumb.home": "Accueil",
    "terms.breadcrumb.terms": "Conditions",
    "terms.section.header": "Conditions Générales",
    "terms.section.intro": "Veuillez lire attentivement ce qui suit avant de vous connecter.",
    "terms.section.p1": "En utilisant notre site et en communiquant avec nous par e-mail ou d'autres messages électroniques (collectivement, 'Présence Digitale'), vous consentez à : (1) la collecte, l'utilisation et le stockage de vos informations personnelles et non personnelles, et (2) aux Conditions Générales d'Utilisation ci-dessous, incluant notre Déclaration de Confidentialité et de Sécurité. Nous pouvons modifier ces conditions de temps à autre ; si des modifications sont apportées, nous les publierons sur cette page dans un délai raisonnable.",
    "terms.section.p2": "Selon votre interaction avec Fundhive Corporate, d'autres politiques de confidentialité peuvent s'appliquer en complément de ces conditions.",
    "terms.section.trademarks": "* Marques et Droits d'Auteur",
    "terms.section.trademarks.desc": "Les matériaux sur cette Présence Digitale sont protégés par des lois internationales sur le droit d'auteur et des traités. Toute utilisation non autorisée peut constituer une violation de ces lois.",
    "terms.section.noWarranties": "* Aucune Garantie",
    "terms.section.noWarranties.desc": "Bien que nous nous efforçons de fournir des informations précises, l'opérateur de la Présence Digitale ne garantit pas l'exactitude des informations fournies. Aucune garantie expresse ou implicite n'est accordée concernant les produits ou services.",
    "terms.section.limitation": "* Limitation de Responsabilité",
    "terms.section.limitation.desc": "L'opérateur de la Présence Digitale décline toute responsabilité pour tout dommage direct, indirect, accidentel, consécutif ou spécial découlant de l'utilisation de ce site.",
    "terms.section.content": "* Contenu des Matériaux",
    "terms.section.content.desc": "Les matériaux de cette Présence Digitale sont protégés et ne peuvent être copiés, reproduits, modifiés ou distribués sans autorisation écrite préalable.",
    "terms.section.links": "* Liens vers d'autres sites",
    "terms.section.links.desc": "Ce site contient des liens vers d'autres sites affiliés, chacun étant régi par ses propres conditions. Fundhive Corporate n'est pas responsable du contenu ou des pratiques de confidentialité de ces sites externes.",
    "terms.section.privacy": "* Déclaration de Confidentialité et de Sécurité",
    "terms.section.privacy.desc": "L'opérateur de la Présence Digitale s'engage à protéger votre vie privée et décrit comment vos informations sont collectées et utilisées.",
    "terms.section.personal": "* Informations Personnelles et Confidentialité",
    "terms.section.personal.desc": "Chaque fois que vous visitez notre site, notre serveur web recueille automatiquement des informations non identifiables personnellement, telles que votre adresse IP, votre navigateur, votre système d'exploitation, les pages consultées et la durée de votre visite. Ces informations ne sont pas associées à des données personnelles identifiables.",
    "terms.section.cookies": "* Cookies",
    "terms.section.cookies.desc": "Certaines fonctionnalités de ce site nécessitent l'utilisation de cookies, qui stockent des informations sur votre disque dur. Aucune donnée personnelle identifiable n'est stockée dans ces cookies.",
    "terms.section.thirdParty": "* Liens de Tiers",
    "terms.section.thirdParty.desc": "Ce site contient des liens vers d'autres sites web. Fundhive Corporate n'est pas responsable du contenu ou des politiques de confidentialité de ces sites externes.",
    // "terms.affiliate.desc": "Nous offrons une commission d'affiliation directe sur chaque référence investie que vous effectuez.",
    // "terms.contact.button": "Contactez-nous pour en savoir plus",


    // New keys for Contact page in French
    "contact.header.title": "Contactez-nous",
    "contact.header.desc": "Envoyez-nous un message, nous vous répondrons assurément.",
    "contact.form.name.label": "Nom",
    "contact.form.name.placeholder": "Votre Nom",
    "contact.form.email.label": "E-mail",
    "contact.form.email.placeholder": "Votre E-mail",
    "contact.form.message.label": "Message",
    "contact.form.message.placeholder": "Votre Message",
    "contact.form.submit": "Envoyer",
    "contact.modal.close": "Fermer",
    "contact.get": "Entrer en Contact",


    // Login
    "log.login": "Se connecter",
    "log.email": "E-mail",
    "log.password": "Mot de passe",
    "log.show": "Afficher le mot de passe",
    "log.forgot": "Mot de passe oublié ?",
    "log.bottom1": "Vous n'avez pas de compte ?",
    "log.bottom2": "Créer un compte"

  },

  de: {
    "investment.plan": "Investitionspläne",
    "plan" : "Pläne",
    // Navbar
  
    "home": "Startseite",
    "about": "Über uns",
    "offers": "Angebote",
    "faq": "FAQ",
    "terms": "Bedingungen",
    "contact": "Kontakt",
    "login": "Anmelden",
    "register": "Registrieren",


    "sec1.title": "Nachhaltige <br /> Investment-Management-Dienstleistungen.",
    "sec1.desc": "Fund Hive Company bietet Investmentdienstleistungen auf Weltklasseniveau, <br /> institutionelles Asset Management und Finanzberatung <br /> unter einem herausragenden Banner. Wir setzen auf durchdachte Innovationen <br /> in verschiedenen Anlageklassen und globalen Märkten.",
    "sec1.desc2": "Fund Hive Company bietet Investmentdienstleistungen auf Weltklasseniveau, institutionelles Asset Management und Finanzberatung unter einem herausragenden Banner. Wir setzen auf durchdachte Innovationen in verschiedenen Anlageklassen und globalen Märkten.",
    "sec1.committed": "Engagiert, Mehrwert zu schaffen",
    "sec1.resultsTitle": "Ergebnisse Erzielen",
    "sec1.resultsDesc": "Unser Ansatz zur Erzielung von Ergebnissen basiert auf unserer Überzeugung, dass <br /> geduldiges, konservatives und diszipliniertes Investieren der bevorzugte Weg <br /> zu nachhaltigem Wachstum ist, der langfristig den größten Wert <br /> für alle unsere Investoren bietet.",
    "sec1.resultsDesc2": "Unser Ansatz zur Erzielung von Ergebnissen basiert auf unserem Glauben, dass geduldige, konservative und disziplinierte Investitionen der bevorzugte Weg zu nachhaltigem Wachstum sind, der langfristig den größten Wert für alle unsere Investoren bietet.",
    "sec1.beliefsTitle": "Unsere Überzeugungen",
    "sec1.beliefsDesc": "Bei Fund Hive Company schätzen wir die Stabilität unserer Kunden, unserer Mitarbeiter und unserer finanziellen Ressourcen. Das Stellen der Bedürfnisse unserer Kunden an erste Stelle hat zu langanhaltenden Beziehungen geführt. Eine wachsende Kundenbasis hat es uns ermöglicht, kontinuierlich die Besten und Klügsten einzustellen. Diese Kombination aus zufriedenen Kunden und einem herausragenden Team wird es uns ermöglichen, unsere bedeutende finanzielle Stärke in den kommenden Jahrzehnten aufrechtzuerhalten.",
    "sec1.learnMore": "MEHR ERFAHREN",

    "sec2.header.prefix": "UNSERE",
    "sec2.header.title": "Investitionspläne",
    "sec2.goldPlan.name": "Goldplan",
    "sec2.goldPlan.rate": "36,9% Täglich",
    "sec2.goldPlan.duration": "Für 1 Tag",
    "sec2.goldPlan.features": "Stabiler Gewinn\nMindestbetrag - $100\nHöchstbetrag - $20,000\n24/7 Support Service",
    "sec2.goldPlan.button": "Jetzt investieren",
    "sec2.diamondPlan.badge": "HOT!",
    "sec2.diamondPlan.name": "Diamantplan",
    "sec2.diamondPlan.rate": "40% Täglich",
    "sec2.diamondPlan.duration": "Für 2 Tage",
    "sec2.diamondPlan.features": "Stabiler Gewinn\nMindestbetrag - $25,000\nHöchstbetrag - $40,000\n24/7 Support Service",
    "sec2.diamondPlan.button": "Jetzt investieren",
    "sec2.zonalPlan.name": "Zonaler Vertreter",
    "sec2.zonalPlan.rate": "60% Täglich",
    "sec2.zonalPlan.duration": "Für 3 Tage",
    "sec2.zonalPlan.features": "Stabiler Gewinn\nMindestbetrag - $50,000\nHöchstbetrag - $1,000,000\n24/7 Support Service",
    "sec2.zonalPlan.button": "Jetzt investieren",
    "sec2.ambassadorPlan.name": "Botschafterplan",
    "sec2.ambassadorPlan.button": "Support kontaktieren",
    "sec2.savingsPlan.name": "Spar-/Festgeldplan <br />",
    "sec2.savingsPlan.button": "Support kontaktieren",

    // Sec3 texts in German
    "sec3.header.prefix": "Für Sie gestaltet",
    "sec3.header.title": "Unsere Funktionen",
    "sec3.card1.title": "Risikomanagement",
    "sec3.card1.desc": "Wir haben ein strenges Risikomanagement-System etabliert, mit dedizierten Teams für Investitions- und operationelle Risiken, die daran arbeiten, die Vermögenswerte der Kunden zu schützen.",
    "sec3.card2.title": "Zweckorientiert",
    "sec3.card2.desc": "Wir verstehen, dass für viele unserer Kunden die Wirkung ihres Portfolios neben der Investitionsleistung eine wichtige Rolle spielt.",
    "sec3.card3.title": "Umfangreich",
    "sec3.card3.desc": "Wir sind ein leidenschaftliches, unabhängiges Investmentunternehmen, das sich der forschungsbasierten Investitionslösung und dem Kundenservice verschrieben hat.",
    "sec3.card4.title": "Stabilität",
    "sec3.card4.desc": "Unsere Fähigkeit, über die Zeit risikoadjustierte Renditen zu erzielen, ist ein Beweis für die Kompetenz unserer Investmentprofis.",
    "sec3.card5.title": "Vielfalt",
    "sec3.card5.desc": "Unsere Portfoliomanager sind kritische, unabhängige Denker, die davon profitieren, Teil einer globalen, vielfältigen Investmentorganisation zu sein.",
    "sec3.card6.title": "Erfahren",
    "sec3.card6.desc": "Unsere Kunden profitieren von der Weisheit unserer erfahrenen Fachleute, und wir suchen stets nach Nachwuchstalenten, um unser Team zu ergänzen.",
    "sec3.affiliate.title": "Affiliate Commission",
    "sec3.affiliate.desc": "Wir bieten eine direkte Empfehlungsprovision für jede investierte Empfehlung, die über Ihren Link registriert wird.",
    "sec3.affiliate.button": "Contact Us To Learn More",
    "sec3.stats.referralLabel": "Referral Commission",
    "sec3.stats.instantLabel": "Payment",
    "sec3.stats.referralValue": "10%",
    "sec3.stats.instantValue": "Instant",

    // Footer
    "footer.logoDescription": "Fund Hive Company bietet Investmentdienstleistungen auf Weltklasseniveau, institutionelles Asset Management und Finanzberatung.",
    "footer.company.title": "Unternehmen",
    "footer.company.home": "Startseite",
    "footer.company.about": "Über Uns",
    "footer.company.offers": "Angebote",
    "footer.company.faq": "Häufig Gestellte Fragen",
    "footer.getInTouch.title": "Kontakt",
    "footer.getInTouch.terms": "AGB",
    "footer.getInTouch.contact": "Kontaktieren Sie uns",
    "footer.getInTouch.login": "Login",
    "footer.getInTouch.register": "Registrieren",
    "footer.reachUs.title": "Erreichen Sie uns",
    // Leave these untranslated:
    "footer.reachUs.headOffice": " Riddargatan 13A, 114 51 Stockholm, Sweden",
    "footer.reachUs.email": "fundhivecorps@gmail.com",
    "footer.bottom": "© All Rights Reserved 2024 fundhivecorps.com",

    // About page
    "about.header.title": "Über Uns",
    "about.breadcrumb.home": "Startseite",
    "about.breadcrumb.about": "Über uns",
    "about.section1.title": "Für Sie gemacht",
    "about.section1.desc": "FundHive Corporate bietet Investmentdienstleistungen auf Weltklasseniveau, institutionelles Asset Management und Finanzberatung unter einem herausragenden Banner. Wir setzen auf durchdachte Innovationen in verschiedenen Anlageklassen und globalen Märkten. Durch unsere Expertise und unser Engagement setzen wir die Pläne der erfolgreichsten Personen, Familien und Institutionen in Taten um, um unseren Kunden zu helfen, ihre ambitioniertesten Ziele zu erreichen. Über Jahrzehnte und Generationen hinweg beruht unsere Beständigkeit auf der Erkenntnis, dass wir mehr als nur ein Finanzinstitut sind. Wir sind legal und registriert – erfahren Sie mehr, indem Sie auf den untenstehenden Link klicken.",
    "about.contact.button": "KONTAKTIEREN SIE UNS",
    "about.section2.title": "Unsere Vision",
    "about.section2.desc": "FundHive Corporate setzt sich dafür ein, einen globalen, innovativen und dynamischen Investment- und Finanzberatungsservice zu schaffen, der Einzelpersonen, Familien und Institutionen befähigt, ihre finanziellen Ziele zu erreichen. Wir streben danach, eine starke Basis für unsere Kunden zu schaffen, damit sie die Kontrolle über ihre Finanzen übernehmen und ihre Träume verwirklichen können.",


    // Faq page
    "faq.header.title": "Häufig gestellte Fragen",
    "faq.breadcrumb.home": "Startseite",
    "faq.breadcrumb.faq": "FAQ's",
    "faq.section.title": "Häufig gestellte Fragen",
    "faq.entry.1.question": "Wie kann ich bei fundhivecorps.com investieren?",
    "faq.entry.1.answer": "Um zu investieren, müssen Sie zunächst ein registrierter Investor werden. Sobald Sie angemeldet sind, können Sie Ihre erste Einzahlung tätigen.",
    
    "faq.entry.2.question": "Ich möchte bei Ihnen investieren, habe aber kein e-Währungskonto. Was soll ich tun?",
    "faq.entry.2.answer": "Sie können hier ein kostenloses PM-Konto eröffnen: blockchain.com",
    
    "faq.entry.3.question": "Wie eröffne ich mein Konto?",
    "faq.entry.3.answer": "Es ist ganz einfach und bequem. Folgen Sie diesem Link, füllen Sie das Registrierungsformular aus und klicken Sie dann auf 'Registrieren'.",
    
    "faq.entry.4.question": "Welche e-Währungen akzeptieren Sie?",
    "faq.entry.4.answer": "Wir akzeptieren Bitcoin, Ethereum und Bitcoin Cash.",
    
    "faq.entry.5.question": "Wie kann ich abheben?",
    "faq.entry.5.answer": "Loggen Sie sich mit Ihrem Benutzernamen und Passwort in Ihr Konto ein und prüfen Sie den Bereich 'Abheben'.",
    
    "faq.entry.6.question": "Wie lange dauert es, bis meine Einzahlung meinem Konto gutgeschrieben wird?",
    "faq.entry.6.answer": "Alle Auszahlungen werden sofort bearbeitet.",
    
    "faq.entry.7.question": "Wie kann ich meine E-Mail-Adresse oder mein Passwort ändern?",
    "faq.entry.7.answer": "Melden Sie sich in Ihrem fundhivecorps.com-Konto an und klicken Sie auf 'Kontoinformationen'. Dort können Sie Ihre E-Mail und Ihr Passwort ändern.",
    
    "faq.entry.8.question": "Was, wenn ich mich nicht anmelden kann, weil ich mein Passwort vergessen habe?",
    "faq.entry.8.answer": "Klicken Sie auf den Link 'Passwort vergessen', geben Sie Ihren Benutzernamen oder Ihre E-Mail ein und Sie erhalten Ihre Kontoinformationen.",
    
    "faq.entry.9.question": "Wie berechnen Sie die Zinsen auf meinem Konto?",
    "faq.entry.9.answer": "Je nach gewähltem Plan. Die Zinsen werden täglich erworben und am Ende jedes Tages Ihrem verfügbaren Saldo gutgeschrieben.",
    
    "faq.entry.10.question": "Kann ich direkt von meinem Kontosaldo einzahlen?",
    "faq.entry.10.answer": "Ja! Um von Ihrem Kontosaldo einzuzahlen, loggen Sie sich einfach in Ihren Mitgliederbereich ein, klicken Sie auf 'Einzahlung tätigen' und wählen Sie 'Einzahlung vom Kontosaldo'.",
    
    "faq.entry.11.question": "Kann ich nach der Kontoeröffnung eine zusätzliche Einzahlung tätigen?",
    "faq.entry.11.answer": "Ja, aber alle Transaktionen werden separat bearbeitet.",
    
    "faq.entry.12.question": "Wann sind die Mittel nach einer Auszahlungsanforderung auf meinem e-Währungskonto verfügbar?",
    "faq.entry.12.answer": "Die Mittel sind in der Regel sofort verfügbar, abhängig vom Blockchain-Netzwerk.",
    
    "faq.entry.13.question": "Wie kann ich mein Passwort ändern?",
    "faq.entry.13.answer": "Sie können Ihr Passwort direkt in Ihrem Mitgliederbereich ändern, indem Sie es in Ihrem persönlichen Profil bearbeiten.",
    
    "faq.entry.14.question": "Wie kann ich meinen Kontostand überprüfen?",
    "faq.entry.14.answer": "Sie können jederzeit auf Ihre Kontoinformationen zugreifen.",
    
    "faq.entry.15.question": "Wer verwaltet die Gelder?",
    "faq.entry.15.answer": "Diese Gelder werden von unserem Team von Investmentprofis verwaltet.",
    
    "faq.entry.16.question": "Bieten Sie eine Affiliate-Provision an?",
    "faq.entry.16.answer": "Ja, wir bieten eine 10%ige Empfehlungsprovision für jede direkte Empfehlung, die Sie tätigen.",


    // Terms & Conditions page translations in German
    "terms.header.title": "Geschäftsbedingungen",
    "terms.breadcrumb.home": "Startseite",
    "terms.breadcrumb.terms": "Bedingungen",
    "terms.section.header": "Geschäftsbedingungen",
    "terms.section.intro": "Bitte lesen Sie die folgenden Bedingungen sorgfältig, bevor Sie sich anmelden.",
    "terms.section.p1": "Durch die Nutzung unserer Website und die Kommunikation mit uns per E-Mail oder anderen elektronischen Nachrichten (zusammen 'Digitale Präsenz') stimmen Sie zu: (1) der Erfassung, Nutzung und Speicherung Ihrer persönlichen und nicht persönlichen Informationen und (2) den folgenden Geschäftsbedingungen, die unsere Datenschutz- und Sicherheitsrichtlinie beinhalten. Wir können diese Bedingungen von Zeit zu Zeit ändern; sollten Änderungen vorgenommen werden, werden diese in einem angemessenen Zeitraum auf dieser Seite veröffentlicht.",
    "terms.section.p2": "Abhängig von Ihrer Interaktion mit Fundhive Corporate können neben diesen Bedingungen weitere Datenschutzrichtlinien gelten.",
    "terms.section.trademarks": "* Marken und Urheberrechte",
    "terms.section.trademarks.desc": "Die Materialien auf dieser Digitalen Präsenz sind urheberrechtlich geschützt und unterliegen weltweiten Urheberrechtsgesetzen und -verträgen. Jede unbefugte Nutzung dieser Materialien kann gegen diese Gesetze verstoßen.",
    "terms.section.noWarranties": "* Keine Garantien",
    "terms.section.noWarranties.desc": "Obwohl versucht wird, genaue Informationen bereitzustellen, übernimmt der Betreiber der Digitalen Präsenz keine Haftung für deren Richtigkeit. Es werden keine ausdrücklichen oder stillschweigenden Garantien hinsichtlich der angebotenen Produkte oder Dienstleistungen abgegeben.",
    "terms.section.limitation": "* Haftungsbeschränkung",
    "terms.section.limitation.desc": "Der Betreiber der Digitalen Präsenz lehnt jegliche Haftung für direkte, indirekte, zufällige, Folgeschäden oder sonstige Schäden ab, die aus der Nutzung dieser Website entstehen.",
    "terms.section.content": "* Inhalt der Materialien",
    "terms.section.content.desc": "Die Materialien dieser Digitalen Präsenz sind geschützt und dürfen ohne vorherige schriftliche Genehmigung nicht kopiert, reproduziert, verändert oder verteilt werden.",
    "terms.section.links": "* Links zu anderen Websites",
    "terms.section.links.desc": "Diese Website enthält Links zu anderen verbundenen Websites, die jeweils ihren eigenen Bedingungen unterliegen. Fundhive Corporate übernimmt keine Verantwortung für den Inhalt oder die Datenschutzpraktiken dieser externen Websites.",
    "terms.section.privacy": "* Datenschutz- und Sicherheitsrichtlinie",
    "terms.section.privacy.desc": "Der Betreiber der Digitalen Präsenz verpflichtet sich, Ihre Privatsphäre zu schützen, und erläutert, wie Ihre Informationen gesammelt und verwendet werden.",
    "terms.section.personal": "* Persönliche Informationen und Datenschutz",
    "terms.section.personal.desc": "Jedes Mal, wenn Sie unsere Website besuchen, sammelt unser Webserver automatisch nicht-personenbezogene Informationen wie Ihre IP-Adresse, Ihren Browser, Ihr Betriebssystem, die besuchten Seiten und die Besuchsdauer. Diese Informationen sind nicht mit personenbezogenen Daten verknüpft.",
    "terms.section.cookies": "* Cookies",
    "terms.section.cookies.desc": "Einige Funktionen dieser Website erfordern die Verwendung von Cookies, die Informationen auf Ihrer Festplatte speichern. In diesen Cookies werden keine personenbezogenen Daten gespeichert.",
    "terms.section.thirdParty": "* Drittanbieter-Links",
    "terms.section.thirdParty.desc": "Diese Website enthält Links zu anderen Websites. Fundhive Corporate ist nicht verantwortlich für den Inhalt oder die Datenschutzpraktiken dieser externen Websites.",
    // "terms.affiliate.desc": "Wir bieten eine direkte Affiliate-Provision für jede investierte Empfehlung, die Sie tätigen.",
    // "terms.contact.button": "Kontaktieren Sie uns, um mehr zu erfahren"


    // Contact page translations in German
    "contact.header.title": "Kontakt",
    "contact.header.desc": "Senden Sie uns eine Nachricht, wir melden uns umgehend bei Ihnen.",
    "contact.form.name.label": "Name",
    "contact.form.name.placeholder": "Ihr Name",
    "contact.form.email.label": "E-Mail",
    "contact.form.email.placeholder": "Ihre E-Mail",
    "contact.form.message.label": "Nachricht",
    "contact.form.message.placeholder": "Ihre Nachricht",
    "contact.form.submit": "Absenden",
    "contact.modal.close": "Schließen",
    "contact.get": "In Kontakt treten",


    // Login
    "log.login": "Anmelden",
    "log.email": "E-Mail",
    "log.password": "Passwort",
    "log.show": "Passwort anzeigen",
    "log.forgot": "Passwort vergessen?",
    "log.bottom1": "Sie haben kein Konto?",
    "log.bottom2": "Konto erstellen"
  },
};

// Translation helper function.
export function t(lang: LanguageCode, key: string): string {
  return translations[lang][key] || key;
}
