import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ArrowRight, Globe, Phone } from 'lucide-react';
import { SlideId } from '../../types';
import { MobileSectionHeader } from '../MobileSectionHeader';

interface Office {
    id: string;
    country: string;
    city: string;
    suffix: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    coords: string;
    gradientColor: string;
    mapQuery: string; // Query for Google Maps
}

const offices: Office[] = [
    {
        id: "cri",
        country: "Costa Rica",
        city: "San José",
        suffix: "CR",
        role: "Hub Centroamérica",
        address: "Centro Empresarial Vía Lindora, 3er Piso",
        phone: "+506 4110-6000",
        email: "gpiedra@shiftpn.co.cr",
        coords: "9.928° N / 84.090° W",
        gradientColor: "rgba(37, 99, 235, 0.15)",
        mapQuery: "Centro Empresarial Vía Lindora, San Jose, Costa Rica"
    },
    {
        id: "gtm",
        country: "Guatemala",
        city: "Ciudad de Guatemala",
        suffix: "GT",
        role: "Oficina",
        address: "5 avenida 5-55 zona 14, Edificio Europlaza, Torre 2, Nivel 10, Oficina 1001",
        phone: "+502 2388-5100",
        email: "andreagan@shiftpn.gt",
        coords: "14.634° N / 90.506° W",
        gradientColor: "rgba(16, 185, 129, 0.15)",
        mapQuery: "Edificio Europlaza, Guatemala"
    },
    {
        id: "slv",
        country: "El Salvador",
        city: "San Salvador",
        suffix: "SV",
        role: "Oficina",
        address: "85 Avenida Nte., #619 San Salvador",
        phone: "+503 7069-0896",
        email: "cferreiro@shiftpn.sv",
        coords: "13.692° N / 89.218° W",
        gradientColor: "rgba(245, 158, 11, 0.15)",
        mapQuery: "85 Avenida Norte #619, San Salvador, El Salvador"
    },
    {
        id: "hnd",
        country: "Honduras",
        city: "Tegucigalpa",
        suffix: "HN",
        role: "Oficina",
        address: "Blvd. Suyapa, Torre Metropolis II, piso 23",
        phone: "+504 9453-8228",
        email: "maria.calvo@shift-pn.hn",
        coords: "14.072° N / 87.167° W",
        gradientColor: "rgba(239, 68, 68, 0.15)",
        mapQuery: "Torre Metropolis, Boulevard Suyapa, Tegucigalpa, Honduras"
    },
    {
        id: "nic",
        country: "Nicaragua",
        city: "Managua",
        suffix: "NI",
        role: "Oficina",
        address: "Ofiplaza El Retiro Edificio 6, Piso 1, Suite 614, Managua",
        phone: "+505 2254-7627",
        email: "rmontenegro@shiftpn.com.ni",
        coords: "12.114° N / 86.236° W",
        gradientColor: "rgba(168, 85, 247, 0.15)",
        mapQuery: "Ofiplaza El Retiro, Managua, Nicaragua"
    },
    {
        id: "dom",
        country: "Rep. Dominicana",
        city: "Santo Domingo",
        suffix: "DO",
        role: "Hub Caribe",
        address: "Av. Abraham Lincoln 1061, Piantini. Santo Domingo, República Dominicana",
        phone: "809-274-6813",
        email: "andrea.ramirez@caribbeanpn.com",
        coords: "18.486° N / 69.931° W",
        gradientColor: "rgba(236, 72, 153, 0.15)",
        mapQuery: "Av. Abraham Lincoln 1061, Santo Domingo, Dominican Republic"
    },
    {
        id: "ecu",
        country: "Ecuador",
        city: "Quito",
        suffix: "EC",
        role: "Oficina",
        address: "Italia n32118 Avenida Mariana de Jesús",
        phone: "+593 995373108",
        email: "angelica.moreno@shiftpn.ec",
        coords: "-0.180° S / 78.467° W",
        gradientColor: "rgba(14, 165, 233, 0.15)",
        mapQuery: "Avenida Mariana de Jesús & Italia, Quito, Ecuador"
    },
    {
        id: "col",
        country: "Colombia",
        city: "Bogotá",
        suffix: "CO",
        role: "HQ Andino",
        address: "CRA 15 # 88- 21 Of. 403",
        phone: "+57 3014360416",
        email: "gonzalo.pineros@shiftpn.co",
        coords: "4.711° N / 74.072° W",
        gradientColor: "rgba(251, 191, 36, 0.15)",
        mapQuery: "Carrera 15 #88-21, Bogotá, Colombia"
    }
];

export const ContactSlide: React.FC = () => {
    const [selectedOffice, setSelectedOffice] = useState<string>(offices[0].id);

    return (
        <div className="h-full w-full relative flex flex-col bg-surface-light dark:bg-black overflow-hidden pt-20 md:pt-0">
            {/* Mobile Header */}
            <div className="md:hidden">
                <MobileSectionHeader
                    title="Red LATAM"
                    subtitle="Nuestras Oficinas"
                />
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex px-12 mb-6 justify-between items-end border-b border-tertiary/10 dark:border-white/10 pb-6 shrink-0 z-20 bg-white dark:bg-[#050505] transition-colors duration-500 pt-24">
                <div>
                    <h5 className="text-primary font-display font-bold uppercase tracking-widest text-xs mb-2">05 — Red LATAM</h5>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-tertiary dark:text-white">Shift Porter Novelli</h2>
                </div>
                <div className="text-right">
                    <div className="text-xs font-mono text-tertiary/60 dark:text-white/60 mb-1">NETWORK REACH</div>
                    <div className="text-xl font-display font-bold text-tertiary dark:text-white">8 LATAM Hubs</div>
                </div>
            </div>

            {/* === DESKTOP ACCORDION (hover to expand) === */}
            <div className="hidden md:flex flex-1 w-full flex-row overflow-x-auto no-scrollbar relative z-10">
                {offices.map((office) => {
                    const isSelected = selectedOffice === office.id;

                    return (
                        <motion.div
                            key={office.id}
                            layout
                            onMouseEnter={() => setSelectedOffice(office.id)}
                            className={`
                                relative border-r border-tertiary/10 dark:border-white/10 last:border-r-0
                                transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group overflow-hidden
                                ${isSelected
                                    ? 'flex-[3.5] min-w-[500px] bg-tertiary/[0.03] dark:bg-white/[0.03]' // Wide enough for new layout
                                    : 'flex-[1] min-w-[70px] hover:bg-tertiary/[0.02] dark:hover:bg-white/[0.02] bg-transparent'}
                            `}
                        >
                            {/* Background Gradient */}
                            <div
                                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: `linear-gradient(135deg, ${office.gradientColor}, transparent 70%)`,
                                    opacity: isSelected ? 1 : 0
                                }}
                            />

                            {/* Collapsed: Vertical country name */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isSelected ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <h3 className="transform -rotate-90 whitespace-nowrap text-xl font-display font-bold tracking-widest text-tertiary/30 dark:text-white/30 group-hover:text-primary/70 transition-colors uppercase">
                                    {office.country} <span className="text-primary">.</span>
                                </h3>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                        className="w-full h-full flex flex-col p-8 relative z-10"
                                    >
                                        {/* Top Info Section - Natural Height */}
                                        <div className="flex-shrink-0 flex flex-col">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 flex items-center justify-center shrink-0">
                                                    <span className="font-display font-bold text-xl text-primary">{office.suffix}</span>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80 mb-1">{office.role}</div>
                                                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-tertiary dark:text-white leading-none">
                                                        {office.country}
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-xs font-mono uppercase tracking-widest text-tertiary/40 dark:text-white/40 mb-2">
                                                    {office.city}
                                                </p>
                                            </div>

                                            <div className="space-y-3 max-w-md">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0 opacity-70" />
                                                    <p className="font-body text-sm text-tertiary/70 dark:text-white/70 leading-relaxed">
                                                        {office.address}
                                                    </p>
                                                </div>

                                                <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 group/link w-fit">
                                                    <Phone className="w-4 h-4 text-primary shrink-0 opacity-70" />
                                                    <span className="font-body text-sm font-medium text-tertiary dark:text-white group-hover/link:text-primary transition-colors">
                                                        {office.phone}
                                                    </span>
                                                </a>

                                                <a href={`mailto:${office.email}`} className="flex items-center gap-3 group/link w-fit">
                                                    <Mail className="w-4 h-4 text-primary shrink-0 opacity-70" />
                                                    <span className="font-body text-sm font-medium text-tertiary dark:text-white group-hover/link:text-primary transition-colors break-all">
                                                        {office.email}
                                                    </span>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Bottom Map Section (Fills remaining space) */}
                                        <div className="mt-6 flex-1 w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 relative bg-white/5 grayscale hover:grayscale-0 transition-all duration-700 min-h-[150px]">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                                allowFullScreen
                                                src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=m&z=15&output=embed&iwloc=near`}
                                                className="w-full h-full dark:invert-[0.9] dark:hue-rotate-180 mix-blend-multiply dark:mix-blend-normal"
                                            ></iframe>
                                            {/* Mask to prevent interaction interfering with scroll unless focused */}
                                            <div className="absolute inset-0 bg-transparent pointer-events-none border-inner"></div>
                                        </div>

                                        {/* Coordinates Footer */}
                                        <div className="mt-3 flex-shrink-0 flex items-center justify-between text-[10px] font-mono opacity-40 tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-3.5 h-3.5" />
                                                <span>{office.coords}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* === MOBILE LIST (tap to expand) === */}
            <div className="md:hidden flex-1 overflow-y-auto pb-32">
                {offices.map((office) => {
                    const isSelected = selectedOffice === office.id;

                    return (
                        <div
                            key={office.id}
                            onClick={() => setSelectedOffice(isSelected ? '' : office.id)}
                            className="border-b border-tertiary/10 dark:border-white/10 cursor-pointer"
                        >
                            {/* Row header */}
                            <div className="flex items-center justify-between px-6 py-5">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono font-bold text-primary tracking-wider w-6">{office.suffix}</span>
                                    <h3 className={`text-lg font-display font-bold transition-colors ${isSelected ? 'text-primary' : 'text-tertiary dark:text-white'}`}>
                                        {office.country}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: isSelected ? 90 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowRight className="w-4 h-4 text-tertiary/40 dark:text-white/40" />
                                </motion.div>
                            </div>

                            {/* Expandable details */}
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className="px-6 pb-6 pt-1 ml-9 space-y-4"
                                            style={{
                                                background: `linear-gradient(135deg, ${office.gradientColor}, transparent 70%)`
                                            }}
                                        >
                                            <p className="text-xs font-mono uppercase tracking-widest text-tertiary/40 dark:text-white/40">
                                                {office.city} · {office.role}
                                            </p>

                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0 opacity-70" />
                                                <p className="font-body text-sm text-tertiary/70 dark:text-white/70 leading-relaxed">
                                                    {office.address}
                                                </p>
                                            </div>

                                            <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3">
                                                <Phone className="w-4 h-4 text-primary shrink-0 opacity-70" />
                                                <span className="font-body text-sm text-tertiary dark:text-white">
                                                    {office.phone}
                                                </span>
                                            </a>

                                            <a href={`mailto:${office.email}`} className="flex items-center gap-3">
                                                <Mail className="w-4 h-4 text-primary shrink-0 opacity-70" />
                                                <span className="font-body text-sm text-tertiary dark:text-white break-all">
                                                    {office.email}
                                                </span>
                                            </a>

                                            {/* Map for Mobile (Bottom) */}
                                            <div className="w-full aspect-[2/1] rounded-lg overflow-hidden border border-black/10 dark:border-white/10 mt-4 bg-white/5 relative">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=m&z=15&output=embed&iwloc=near`}
                                                    className="w-full h-full dark:invert-[0.9] dark:hue-rotate-180"
                                                ></iframe>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
