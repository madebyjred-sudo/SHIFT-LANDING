import { Trophy, Target, TrendingUp, Users } from 'lucide-react';

export interface ProjectMetric {
    icon: 'Trophy' | 'Target' | 'TrendingUp' | 'Users';
    label: string;
    value: string;
}

export interface Project {
    id: number;
    title: string;
    cat: string;
    client: string;
    year: string;
    services: string[];
    img: string;
    videoUrl?: string;
    fullVideoUrl?: string;
    gallery: string[];
    story: {
        challenge: string;
        shift: string;
        impact: string;
        metrics?: ProjectMetric[];
    };
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Welcome to the Group",
        cat: "Estrategia Móvil y Política",
        client: "Nosotras Women Connecting",
        img: "/webps/welcome-to-the-group.webp",
        videoUrl: 'https://shiftvideos.b-cdn.net/Welcome%20to%20the%20group%20-%20SHIFT_PHD.mp4',
        fullVideoUrl: 'https://www.youtube.com/embed/nDPLQdqdYLE',
        gallery: [
            "/webps/welcome-to-the-group.webp",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1600&auto=format&fit=crop"
        ],
        year: "2023",
        services: ["Estrategia Móvil", "Lobby Directo", "Redes Sociales"],
        story: {
            challenge: "La Ley de Justicia Menstrual era ignorada por un congreso mayoritariamente masculino. El lobby tradicional no funcionaba.",
            shift: "Hackeamos el lobby político. Agregamos a todos los legisladores a un grupo de WhatsApp donde jóvenes enviaron videos directos exigiendo justicia menstrual.",
            impact: "5 días después de crear el grupo, la ley fue votada y aprobada por unanimidad. Ganador de Cannes Lions.",
            metrics: [
                { icon: 'Trophy', label: "Cannes Lions", value: "Gold" },
                { icon: 'Target', label: "Leyes Aprobadas", value: "1" },
                { icon: 'TrendingUp', label: "Engagement", value: "High" },
                { icon: 'Users', label: "Votación", value: "100%" }
            ]
        }
    },
    {
        id: 2,
        title: "Justice by Her Type",
        cat: "Data y Activismo",
        client: "NGO Impacto Social",
        img: "/webps/justice-by-her-type.webp",
        videoUrl: 'https://shiftvideos.b-cdn.net/GFSF%20-%20Justice%20by%20her%20type.mp4',
        fullVideoUrl: 'https://www.youtube.com/embed/W_-UgnjJBRc',
        gallery: [
            "/webps/justice-by-her-type.webp",
            "https://images.unsplash.com/photo-1555443681-304724838662?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1600&auto=format&fit=crop"
        ],
        year: "2023",
        services: ["Visualización de Datos", "Diseño Tipográfico", "Lobby Legislativo"],
        story: {
            challenge: "La violencia de género aumentaba, pero las leyes estaban estancadas. Necesitábamos que los diputados 'leyeran' la realidad.",
            shift: "Creamos 'Letras de Lucha'. Una tipografía creada a partir de las cartas manuscritas de víctimas de femicidio para reescribir las leyes.",
            impact: "3 Nuevas Leyes aprobadas por el Congreso. 15 Millones de personas alcanzadas. Top Global SABRE Awards.",
            metrics: [
                { icon: 'Trophy', label: "SABRE Awards", value: "Top Global" },
                { icon: 'Target', label: "Nuevas Leyes", value: "3" },
                { icon: 'TrendingUp', label: "Prensa", value: "+15M" },
                { icon: 'Users', label: "Conciencia", value: "Total" }
            ]
        }
    },
    {
        id: 3,
        title: "Costa Rica del Bit Centenario",
        cat: "Tecnología Creativa / Metaverso",
        client: "Microsoft",
        img: "/webps/bit-centenario.webp",
        videoUrl: 'https://shiftvideos.b-cdn.net/Caso_BITCentenario_Microsoft.mp4',
        fullVideoUrl: 'https://www.youtube.com/embed/qJWU7dfDRog',
        gallery: [
            "/webps/bit-centenario.webp",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1600&auto=format&fit=crop"
        ],
        year: "2022",
        services: ["Estrategia Metaverso", "Compromiso Juvenil", "Asuntos Públicos"],
        story: {
            challenge: "Conectar con la Generación Z en un contexto de apatía electoral. Microsoft buscaba inspirar a los jóvenes a imaginar los próximos 200 años.",
            shift: "Convertimos el Bicentenario en el 'Bit Centenario'. Usamos Minecraft como plataforma de activismo cívico, permitiendo a los jóvenes construir soluciones reales.",
            impact: "+4,000 propuestas creadas en Minecraft. 166% más participación de la esperada. Presentado ante el Congreso como visión de futuro.",
            metrics: [
                { icon: 'Trophy', label: "Innovación", value: "Tech" },
                { icon: 'Target', label: "Propuestas", value: "4,000+" },
                { icon: 'TrendingUp', label: "Participación", value: "166%" },
                { icon: 'Users', label: "Alcance GenZ", value: "Masivo" }
            ]
        }
    },
    {
        id: 4,
        title: "Héroes Turísticos",
        cat: "Storytelling de Marca",
        client: "Instituto Costarricense de Turismo",
        img: "/webps/heroes-turisticos.webp",
        videoUrl: 'https://shiftvideos.b-cdn.net/Reel_He%CC%81roesTuri%CC%81sticos_ICT.m4v',
        fullVideoUrl: 'https://www.youtube.com/embed/koi8bZP_-0E',
        gallery: [
            "/webps/heroes-turisticos.webp",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1600&auto=format&fit=crop"
        ],
        year: "2022",
        services: ["Producción de Contenido", "Relaciones con Medios", "Recuperación de Crisis"],
        story: {
            challenge: "Reactivar el turismo post-pandemia sin presupuesto para pauta masiva, enfocándose en el valor humano detrás del destino.",
            shift: "Creamos una miniserie documental destacando a los verdaderos héroes: las personas que mantienen vivo el turismo. Gestión de PR 100% orgánica.",
            impact: "$4.5 Millones en Earned Media. 87 Millones de Media Impressions. Impacto directo en la recuperación de 200,000 empleos.",
            metrics: [
                { icon: 'Trophy', label: "Earned Media", value: "$4.5M" },
                { icon: 'Target', label: "Impressions", value: "87M" },
                { icon: 'TrendingUp', label: "Recuperación", value: "200k Jobs" },
                { icon: 'Users', label: "Impacto Local", value: "Total" }
            ]
        }
    }
];
