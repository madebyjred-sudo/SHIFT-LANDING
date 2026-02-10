import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { team, TeamMember } from '../../data/team';

export const TeamSlide: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row text-tertiary dark:text-white">
      {/* Left Title Panel */}
      <div className="w-full md:w-1/3 h-1/4 md:h-full p-8 md:p-24 border-b md:border-b-0 md:border-r border-tertiary/10 dark:border-white/10 flex flex-col justify-end md:justify-center bg-surface dark:bg-transparent z-10">
        <h3 className="text-secondary font-display font-bold mb-4 text-xs tracking-widest uppercase">05 — Equipo</h3>
        <h2 className="font-display font-black text-5xl md:text-7xl uppercase leading-none text-tertiary dark:text-white">
          Mentes <br/><span className="text-secondary">Maestras</span>
        </h2>
      </div>

      {/* Right Grid Panel */}
      <div className="w-full md:w-2/3 h-3/4 md:h-full p-8 md:p-12 overflow-y-auto no-scrollbar relative flex flex-col justify-center">
        {/* Background Gradient */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-shift-secondary/5 to-transparent dark:from-shift-secondary/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-5xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {team.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              isHovered={hoveredMember === member.id}
              onHover={() => setHoveredMember(member.id)}
              onLeave={() => setHoveredMember(null)}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

interface TeamCardProps {
  member: TeamMember;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  variants: any;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, isHovered, onHover, onLeave, variants }) => {
  return (
    <motion.div 
      variants={variants}
      className="relative group h-[400px] md:h-[350px] w-full overflow-hidden rounded-2xl cursor-pointer shadow-lg"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => isHovered ? onLeave() : onHover()} // Toggle for mobile/touch
    >
      {/* Background Image */}
      <motion.img 
        src={member.image} 
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        animate={{ scale: isHovered ? 1.1 : 1 }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          initial={false}
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-display font-bold text-2xl text-white uppercase mb-1">{member.name}</h3>
          <p className="font-body text-sm text-secondary font-bold tracking-wider uppercase mb-3">{member.role}</p>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="text-white/80 text-sm leading-relaxed mb-4 border-t border-white/20 pt-3">
                  {member.bio}
                </p>
                
                <div className="flex gap-4">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors" aria-label="Twitter">
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Border Effect */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-secondary/50 transition-colors duration-300" />
    </motion.div>
  );
};
