import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, CreditCard } from 'lucide-react';

interface PackageSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
  onChooseDiscuss: () => void;
  onChoosePayment: () => void;
}

export const PackageSelectionDialog = ({
  isOpen,
  onClose,
  packageName,
  packagePrice,
  onChooseDiscuss,
  onChoosePayment
}: PackageSelectionDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-black border border-white/20 max-w-2xl w-full relative">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="mb-8 pb-6 border-b border-white/10">
                  <h3 className="text-xs text-white/60 mb-2 tracking-widest uppercase">
                    Formule sélectionnée
                  </h3>
                  <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-2">
                    {packageName}
                  </h2>
                  <p className="text-2xl text-white/70">{packagePrice}</p>
                </div>

                {/* Description */}
                <p className="text-white/60 mb-8 leading-relaxed">
                  Comment souhaitez-vous procéder ?
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Discuter */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onChooseDiscuss}
                    className="group relative border border-white/20 hover:border-white/40 p-6 transition-all duration-300 text-left"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:border-white/40 transition-colors">
                        <MessageCircle className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                      </div>
                      
                      <h3 className="text-white text-lg mb-2 tracking-wide">
                        Discuter d'abord
                      </h3>
                      
                      <p className="text-white/50 text-sm leading-relaxed">
                        Échangeons sur votre projet avant de commencer. Réponse sous 24h.
                      </p>
                    </div>
                  </motion.button>

                  {/* Option 2: Payer directement */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onChoosePayment}
                    className="group relative border border-white/30 hover:border-white/50 p-6 transition-all duration-300 text-left bg-white/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 group-hover:border-white/50 transition-colors">
                        <CreditCard className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                      </div>
                      
                      <h3 className="text-white text-lg mb-2 tracking-wide">
                        Commencer maintenant
                      </h3>
                      
                      <p className="text-white/60 text-sm leading-relaxed">
                        Décrivez votre projet et réglez l'acompte. Je démarre dès réception.
                      </p>
                    </div>
                  </motion.button>
                </div>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/40 text-xs leading-relaxed">
                    Paiement en deux fois : 30% d'acompte maintenant, 70% à la livraison du site.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
