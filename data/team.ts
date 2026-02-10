export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    socials?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    }
}

export const team: TeamMember[] = [
    {
        id: 1,
        name: "Rodrigo Castro",
        role: "CEO & Founder",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
        bio: "Liderando la revolución de la comunicación estratégica en la región con más de 15 años de experiencia.",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        id: 2,
        name: "Ana María López",
        role: "Chief Creative Officer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
        bio: "Visionaria creativa transformando datos en historias que mueven montañas y cambian leyes.",
        socials: {
            linkedin: "#",
            instagram: "#"
        }
    },
    {
        id: 3,
        name: "Carlos Méndez",
        role: "Head of Strategy",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        bio: "Estratega nato, experto en navegación de crisis y construcción de reputación corporativa.",
        socials: {
            linkedin: "#"
        }
    },
    {
        id: 4,
        name: "Sofia Ramírez",
        role: "Digital Innovation Lead",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
        bio: "Pionera en el uso de nuevas tecnologías y metaverso para conectar marcas con audiencias jóvenes.",
        socials: {
            linkedin: "#",
            instagram: "#"
        }
    }
];
