import { Users, Map, Lightbulb, Monitor, Star, Search, TrendingUp, Video, Cpu } from 'lucide-react';

export const translations = {
    es: {
        nav: {
            home: 'Inicio',
            philosophy: 'Filosofía',
            portfolio: 'Portafolio',
            services: 'Servicios',
            contact: 'Contacto',
        },
        hero: {
            prefix: 'Somos',
            highlight: 'Imparables',
            description: {
                line1: 'Comunicación',
                line1Bold: 'estratégica',
                line1Suffix: ', inteligencia de datos y tecnología',
                line1Bold2: 'creativa',
                line1End: '.',
                line2: 'Transformamos',
                line2Bold1: 'marcas',
                line2Middle: ', moldeamos',
                line2Bold2: 'mercados',
                line2End: 'y movemos',
                line2Bold3: 'políticas',
                line2Suffix: 'en Latinoamérica.'
            },
            cta: 'Descubre Nuestro Impacto'
        },
        manifesto: {
            subtitle: '02 — El Poder de Shift',
            phrase: "Fundada en el '82, evolucionando para el 2030. Combinamos más de 40 años de experiencia con la agilidad disruptiva de una startup.",
            cardTitle: 'Alcance Global, Raíces Latinas',
            cardBody: 'Parte del Grupo Garnier y la red global Porter Novelli. Con presencia en toda Latinoamérica y nuestro hub en Costa Rica, no solo gestionamos reputación — moldeamos cultura.',
            cta: 'Explora nuestros servicios'
        },
        services: {
            title: 'Nuestro Ecosistema.',
            subtitle: 'Evolucionamos de agencia a consultora de crecimiento phydigital en Latinoamérica. Una suite integral de servicios diseñada para un mercado donde la atención no se compra — se conquista.',
            cta: 'Iniciar Proyecto',
            items: [
                {
                    id: 'relaciones-publicas',
                    title: 'Relaciones Públicas',
                    subtitle: 'Reputación',
                    description: 'Potenciados por la tecnología de Porter Novelli, colocamos la inteligencia basada en datos al centro de la gestión reputacional de marcas y líderes. Cada reto de nuestros clientes comienza con un diagnóstico preciso que guía la estrategia.',
                    features: [
                        'Public Affairs',
                        'Stakeholder Mapping',
                        'Main sources: Gestión legislativa',
                        'Construcción de marca personal',
                        'Gestión de la reputación online',
                        'Auditoría de medios',
                        'Planning de Sostenibilidad',
                        'Proceso de transformación hacia esencia de sostenibilidad',
                        'Medición de ejes de sostenibilidad'
                    ],
                    icon: Users,
                    isSpecial: false
                },
                {
                    id: 'planning',
                    title: 'Planning',
                    subtitle: 'Brand Marketing y Estrategia',
                    description: 'Planificación del consumer journey, integración de datos, ejecución de reputación de marca, campañas de captación de alto valor, desarrollo de personas. Trabajamos con nuestros socios para desarrollar nuevas estrategias de crecimiento, diseñadas en torno a su propósito de marca.',
                    features: [
                        'Planning de marca',
                        'Planning de categorías',
                        'Construcción buyer personas',
                        'Construcción Consumer Journey',
                        'Construcción de Customer Experience',
                        'Construcción de marca',
                        'Estrategia de contenido',
                        'Inbound Marketing',
                        'Trends de marca, categoría y consumo',
                        'Investigación de marca a la medida'
                    ],
                    icon: Map,
                    isSpecial: false
                },
                {
                    id: 'creatividad-y-contenido',
                    title: 'Creatividad y Contenido',
                    subtitle: 'Rendimiento creativo',
                    description: 'Ideación y planificación, estrategia de contenidos, narración de historias. Concebimos conceptos creativos que se cuentan como historias para audiencias de hoy, satisfaciendo necesidades locales, regionales y globales. Nos tomamos la creatividad estratégica como pilar del desarrollo de gestión corporativa y reputación digital en Latinoamérica.',
                    features: [
                        'Estrategia creativa',
                        'Pilares de contenido',
                        'Estructuras de contacto para audiencias',
                        'Ideación de tácticas de engagement para cada canal de marca',
                        'Desarrollo de macro contenidos (ideas y conceptos)',
                        'Creatividad cross-marketing',
                        'Innovación creativa para marcas',
                        'Asesoría Creativa',
                        'Construcción de narrativa de marca, spokeperson y canales'
                    ],
                    icon: Lightbulb,
                    isSpecial: false
                },
                {
                    id: 'digital',
                    title: 'Digital',
                    subtitle: 'Marketing y Phydigital',
                    description: 'A través de la estrategia de SHIFT PN, hemos reimaginado el camino de la comunicación y el marketing digital, para ayudar a las marcas y a las empresas a tener éxito en un mundo phydigital, en el que la atención no se puede comprar ni exigir, y la confianza es la clave para desbloquear el crecimiento.',
                    features: [
                        'Detección cualitativa de insights',
                        'Activación de oportunidades para inteligencia de negocio y corporativa',
                        'Atributos de medición de experiencia de consumidor y audiencias',
                        'Recopilación de atributos de audiencia',
                        'Protocolos de engagement personalizados',
                        'Detección cualitativa de detractores y fans bajo modelo de Brand Safety',
                        'Publicación de contenidos automatizada',
                        'Reporte Cualitativo de interacción y atención'
                    ],
                    icon: Monitor,
                    isSpecial: true
                },
                {
                    id: 'influencia',
                    title: 'Influencia',
                    subtitle: 'Marketing de influencia',
                    description: 'Enfoque único para la estrategia de influencers y content creators ofrece resultados superiores a nuestros clientes. Nuestra estrategia, basada en los datos, centrada en las ganancias y en el diseño de las redes sociales, se adapta a cada uno de nuestros clientes de mostrar que el marketing de influencia sí genera resultados.',
                    features: [
                        'Detección de influenciadores con herramientas propietarias',
                        'Estrategia de influencia: corto, mediano y largo plazo',
                        'Negociación y contratos formales',
                        'Medición',
                        'Reportes de campaña en tiempo real',
                        'Dirección Creativa para los creadores de contenido',
                        'Producción de contenido',
                        'Diseño de experiencia con influenciadores'
                    ],
                    icon: Star,
                    isSpecial: false
                },
                {
                    id: 'data-e-investigacion',
                    title: 'Data e Investigación',
                    subtitle: 'Knowledge & Insights',
                    description: 'Utilizamos los datos y la inteligencia para ayudar a las empresas y organizaciones a construir relaciones de confianza con las personas: haciendo que las comunicaciones sean más auténticas, el compromiso más emocionante y las conexiones más significativas.',
                    features: [
                        'Análisis de audiencias',
                        'Patrones de audiencia',
                        'Contextos temáticos',
                        'Social Listening (Dashboards)',
                        'Insights temáticos',
                        'Estudios de consumidor y medios',
                        'Análisis de bases de datos',
                        'Predicción de Crisis',
                        'Manejo de data transaccional',
                        'Gestión de datos y clusterización'
                    ],
                    icon: Search,
                    isSpecial: false
                },
                {
                    id: 'performance-marketing',
                    title: 'Performance Marketing',
                    subtitle: 'Paid Media y Resultados',
                    description: 'Adoptamos un enfoque integral del marketing de resultados para los clientes, lo que significa una integración perfecta de la estrategia y la planificación, la compra de medios, la búsqueda, la automatización y la tecnología propias y los análisis, todo junto a un equipo de planificación y compra de medios que ha impulsado mejoras de tres dígitos en el rendimiento frente a las mayores agencias y plataformas programáticas.',
                    features: [
                        'Compra de medios digitales',
                        'Performance marketing',
                        'Auditoria de medios digitales',
                        'Automatización',
                        'Compra programática',
                        'Somos Google Partner',
                        'Somos Meta Partner',
                        'Somos Huawei Mobile Ads Agency Partner',
                        'Reportes en dashboard a la medida',
                        'SEO & SEM'
                    ],
                    icon: TrendingUp,
                    isSpecial: false
                },
                {
                    id: 'produccion',
                    title: 'Producción',
                    subtitle: 'Creación de Contenido',
                    description: 'Producción de audio, contenido de comercio electrónico, contenido en vivo, fotografía, contenido social, vídeo y gráficos en movimiento. Trabajamos en función de los objetivos empresariales, el presupuesto y la escala, reunimos a los creadores de contenidos perfectos.',
                    features: [
                        'Audiovisual',
                        'Gráfica',
                        'Experiencias Interactivas',
                        'Gaming',
                        'TikTok Factory (Modelo Propietario)',
                        'Podcast a la medida',
                        'Fotografía',
                        'Food Styling',
                        'Producción en todo LATAM',
                        'Branding',
                        'Media Kits'
                    ],
                    icon: Video,
                    isSpecial: false
                },
                {
                    id: 'tecnologias',
                    title: 'Tecnologías',
                    subtitle: 'Producción a la medida',
                    description: 'Desarrollamos soluciones tecnológicas a la medida que potencian la presencia digital de las marcas. Desde sitios web y e-commerce hasta aplicaciones móviles, blockchain y automatización, construimos la infraestructura digital que impulsa el crecimiento de nuestros clientes en Latinoamérica.',
                    features: [
                        'Sitios web',
                        'E-Commerce',
                        'Apps',
                        'NFTS (BRANDS)',
                        'Blockchain',
                        'Bases de datos',
                        'Data Lakes',
                        'Automatización',
                        'Gaming Development'
                    ],
                    icon: Cpu,
                    isSpecial: false
                }
            ]
        },
        locations: {
            title: '05 — Red Global',
            subtitle: 'Nuestras Oficinas',
            networkReach: 'Alcance de la Red',
            hubs: '10 Hubs + USA',
        },
        seo: {
            title: 'Shift Porter Novelli | Comunicación Estratégica, Inteligencia de Datos e Innovación en América Latina',
            description: 'Agencia de comunicaciones estratégicas galardonada, especializada en inteligencia de datos y tecnología creativa en América Latina. Red global con oficinas desde Miami hasta Santiago.',
            keywords: 'Agencia PR LATAM, comunicación estratégica América Latina, inteligencia de datos, marketing digital, marketing de influencers, Cannes Lions, SABRE Awards, agencia creativa América Latina, relaciones públicas, reputación corporativa, Porter Novelli'
        }
    },
    en: {
        nav: {
            home: 'Home',
            philosophy: 'Philosophy',
            portfolio: 'Portfolio',
            services: 'Services',
            contact: 'Contact',
        },
        hero: {
            prefix: 'We Are',
            highlight: 'Unstoppable',
            description: {
                line1: '',
                line1Bold: 'Strategic',
                line1Suffix: ' communications, data intelligence, and',
                line1Bold2: 'creative',
                line1End: ' technology.',
                line2: 'We transform',
                line2Bold1: 'brands',
                line2Middle: ', shape',
                line2Bold2: 'markets',
                line2End: ', and move',
                line2Bold3: 'policy',
                line2Suffix: 'across Latin America.'
            },
            cta: 'Discover Our Impact'
        },
        manifesto: {
            subtitle: '02 — The Power of Shift',
            phrase: "Founded in '82, evolving for 2030. We combine over 40 years of experience with the disruptive agility of a startup.",
            cardTitle: 'Global Reach, Latin Roots',
            cardBody: 'Part of the Garnier Group and the global Porter Novelli network. With a presence across all of Latin America and our hub in Costa Rica, we don\'t just manage reputation — we shape culture.',
            cta: 'Explore our services'
        },
        services: {
            title: 'Our Ecosystem.',
            subtitle: 'We evolved from an agency to a phydigital growth consultancy in Latin America. A comprehensive suite of services designed for a market where attention cannot be bought — it must be earned.',
            cta: 'Start Project',
            items: [
                {
                    id: 'public-relations',
                    title: 'Public Relations',
                    subtitle: 'Reputation',
                    description: 'Powered by Porter Novelli technology, we place data-driven intelligence at the center of reputation management for brands and leaders. Every challenge begins with a precise diagnosis that guides the strategy.',
                    features: [
                        'Public Affairs',
                        'Stakeholder Mapping',
                        'Legislative Management',
                        'Personal Brand Building',
                        'Online Reputation Management',
                        'Media Audit',
                        'Sustainability Planning',
                        'Transformation process towards sustainability essence',
                        'Sustainability metrics measurement'
                    ],
                    icon: Users,
                    isSpecial: false
                },
                {
                    id: 'planning',
                    title: 'Planning',
                    subtitle: 'Brand Marketing & Strategy',
                    description: 'Consumer journey planning, data integration, brand reputation execution, high-value acquisition campaigns, persona development. We work with our partners to develop new growth strategies designed around their brand purpose.',
                    features: [
                        'Brand Planning',
                        'Category Planning',
                        'Buyer Persona Building',
                        'Consumer Journey Mapping',
                        'Customer Experience Building',
                        'Brand Building',
                        'Content Strategy',
                        'Inbound Marketing',
                        'Brand, Category & Consumer Trends',
                        'Custom Brand Research'
                    ],
                    icon: Map,
                    isSpecial: false
                },
                {
                    id: 'creativity-content',
                    title: 'Creativity & Content',
                    subtitle: 'Creative Performance',
                    description: 'Ideation and planning, content strategy, storytelling. We conceive creative concepts that are told as stories for today\'s audiences, satisfying local, regional, and global needs. We take strategic creativity as a pillar of corporate management development and digital reputation in Latin America.',
                    features: [
                        'Creative Strategy',
                        'Content Pillars',
                        'Audience Contact Structures',
                        'Engagement Tactics Ideation',
                        'Macro Content Development (Ideas & Concepts)',
                        'Cross-marketing Creativity',
                        'Creative Innovation for Brands',
                        'Creative Consultancy',
                        'Brand Narrative, Spokesperson & Channel Building'
                    ],
                    icon: Lightbulb,
                    isSpecial: false
                },
                {
                    id: 'digital',
                    title: 'Digital',
                    subtitle: 'Marketing & Phydigital',
                    description: 'Through SHIFT PN\'s strategy, we have reimagined the path of communication and digital marketing to help brands and companies succeed in a phydigital world, where attention cannot be bought or demanded, and trust is the key to unlocking growth.',
                    features: [
                        'Qualitative Insight Detection',
                        'Business & Corporate Intelligence Opportunity Activation',
                        'Consumer & Audience Experience Measurement Attributes',
                        'Audience Attribute Collection',
                        'Customized Engagement Protocols',
                        'Qualitative Detractor & Fan Detection under Brand Safety Model',
                        'Automated Content Publishing',
                        'Qualitative Interaction & Attention Reporting'
                    ],
                    icon: Monitor,
                    isSpecial: true
                },
                {
                    id: 'influence',
                    title: 'Influence',
                    subtitle: 'Influencer Marketing',
                    description: 'Unique approach to influencer and content creator strategy offering superior results for our clients. Our data-driven, profit-focused, social media design strategy adapts to each client to prove that influencer marketing does generate results.',
                    features: [
                        'Influencer Detection with Proprietary Tools',
                        'Influence Strategy: Short, Medium & Long Term',
                        'Negotiation & Formal Contracts',
                        'Measurement',
                        'Real-time Campaign Reports',
                        'Creative Direction for Content Creators',
                        'Content Production',
                        'Influencer Experience Design'
                    ],
                    icon: Star,
                    isSpecial: false
                },
                {
                    id: 'data-research',
                    title: 'Data & Research',
                    subtitle: 'Knowledge & Insights',
                    description: 'We use data and intelligence to help companies and organizations build trusted relationships with people: making communications more authentic, engagement more exciting, and connections more meaningful.',
                    features: [
                        'Audience Analysis',
                        'Audience Patterns',
                        'Thematic Contexts',
                        'Social Listening (Dashboards)',
                        'Thematic Insights',
                        'Consumer & Media Studies',
                        'Database Analysis',
                        'Crisis Prediction',
                        'Transactional Data Management',
                        'Data Management & Clustering'
                    ],
                    icon: Search,
                    isSpecial: false
                },
                {
                    id: 'performance-marketing',
                    title: 'Performance Marketing',
                    subtitle: 'Paid Media & Results',
                    description: 'We adopt a comprehensive performance marketing approach for clients, meaning seamless integration of strategy and planning, media buying, search, automation, proprietary technology, and analytics, all alongside a planning and media buying team that has driven triple-digit performance improvements against major agencies and programmatic platforms.',
                    features: [
                        'Digital Media Buying',
                        'Performance Marketing',
                        'Digital Media Audit',
                        'Automation',
                        'Programmatic Buying',
                        'Google Partner',
                        'Meta Partner',
                        'Huawei Mobile Ads Agency Partner',
                        'Custom Dashboard Reporting',
                        'SEO & SEM'
                    ],
                    icon: TrendingUp,
                    isSpecial: false
                },
                {
                    id: 'production',
                    title: 'Production',
                    subtitle: 'Content Creation',
                    description: 'Audio production, e-commerce content, live content, photography, social content, video, and motion graphics. We work based on business objectives, budget, and scale, gathering the perfect content creators.',
                    features: [
                        'Audiovisual',
                        'Graphic Design',
                        'Interactive Experiences',
                        'Gaming',
                        'TikTok Factory (Proprietary Model)',
                        'Custom Podcasts',
                        'Photography',
                        'Food Styling',
                        'Production across LATAM',
                        'Branding',
                        'Media Kits'
                    ],
                    icon: Video,
                    isSpecial: false
                },
                {
                    id: 'technologies',
                    title: 'Technologies',
                    subtitle: 'Custom Development',
                    description: 'We develop custom technological solutions that enhance brands\' digital presence. From websites and e-commerce to mobile apps, blockchain, and automation, we build the digital infrastructure that drives our clients\' growth in Latin America.',
                    features: [
                        'Websites',
                        'E-Commerce',
                        'Apps',
                        'NFTS (BRANDS)',
                        'Blockchain',
                        'Databases',
                        'Data Lakes',
                        'Automation',
                        'Gaming Development'
                    ],
                    icon: Cpu,
                    isSpecial: false
                }
            ]
        },
        locations: {
            title: '05 — Global Network',
            subtitle: 'Our Offices',
            networkReach: 'NETWORK REACH',
            hubs: '10 Hubs + USA',
        },
        seo: {
            title: 'Shift Porter Novelli | Strategic Communications, Data Intelligence & Innovation',
            description: 'Award-winning strategic communications firm specializing in data intelligence and creative technology. Global network with offices from Miami to Santiago.',
            keywords: 'PR agency, strategic communications, data intelligence, digital marketing, influencer marketing, Cannes Lions, SABRE Awards, creative agency, public relations, corporate reputation, Porter Novelli, Miami PR, LATAM PR'
        }
    }
};
