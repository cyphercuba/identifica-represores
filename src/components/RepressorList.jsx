import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ChevronRight, UserCircle, ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { getTagById } from '@/data/dummyData';

    const getStatusVisuals = (status) => {
      switch (status) {
        case 'verificado':
          return { icon: <ShieldCheck className="h-3 w-3 mr-1 text-green-400" />, text: 'Verificado', color: 'bg-green-500/20 text-green-300 border-green-500/30' };
        case 'en_revision':
          return { icon: <ShieldAlert className="h-3 w-3 mr-1 text-yellow-400" />, text: 'En Revisión', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
        default:
          return { icon: <ShieldQuestion className="h-3 w-3 mr-1 text-red-400" />, text: 'Poca Evidencia', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
      }
    };

    const RepressorList = ({ repressors }) => {
      if (!repressors || repressors.length === 0) {
        return <p className="text-soft-lavender dark:text-white/70 text-center py-6">No hay represores para mostrar en esta selección.</p>;
      }
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {repressors.map((repressor, index) => {
            const statusVisuals = getStatusVisuals(repressor.status);
            return (
              <motion.div 
                key={repressor.id || index} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3, delay: index * 0.05 }} 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 glassmorphism h-full flex flex-col bg-midnight-blue/20 dark:bg-smoke-purple/40 border-dark-red dark:border-soft-lavender/80">
                  <CardHeader className="bg-royal-purple/10 dark:bg-royal-purple/20 p-4">
                    <div className="h-32 sm:h-40 w-full bg-midnight-blue/30 dark:bg-smoke-purple/50 rounded-md mb-3 flex items-center justify-center overflow-hidden border border-dark-red/20 dark:border-soft-lavender/20">
                      {repressor.photos && repressor.photos.length > 0 && repressor.photos[0].url ? (
                         <img  src={repressor.photos[0].url} alt={`Foto de ${repressor.name}`} className="w-full h-full object-cover" />
                      ) : (
                         <img  alt={`Silueta de ${repressor.name}`} className="w-16 h-16 text-soft-lavender/50 dark:text-white/50 opacity-50" src="https://images.unsplash.com/photo-1646554623898-db678ceff98e" />
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-base sm:text-lg text-royal-purple dark:text-glacial-blue truncate card-title-text" title={repressor.name}>
                            {repressor.name}
                        </CardTitle>
                        <Badge className={`text-xs py-0.5 px-1.5 ${statusVisuals.color}`}>
                            {statusVisuals.icon} {statusVisuals.text}
                        </Badge>
                    </div>
                    <CardDescription className="text-xs sm:text-sm truncate text-soft-lavender dark:text-white/80 card-description-text">
                      {repressor.rank || 'Rango no especificado'} – {repressor.province}
                      {repressor.alias && <span className="block text-xs italic">Alias: {repressor.alias}</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <p className="text-xs sm:text-sm text-soft-lavender dark:text-white/90 line-clamp-2 card-content-text">
                      {repressor.history && repressor.history.length > 0 
                        ? repressor.history[0].event 
                        : (repressor.testimonies && repressor.testimonies.length > 0 ? repressor.testimonies[0].text : "Información limitada o pendiente de revisión.")
                      }
                    </p>
                    {repressor.tags && repressor.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {repressor.tags.slice(0, 3).map(tagId => {
                                const tagInfo = getTagById(tagId);
                                if (!tagInfo) return null;
                                return <Badge key={tagId} variant="outline" className={`text-xs py-0.5 px-1 ${tagInfo.color || 'border-gray-400 text-gray-500'}`}>{tagInfo.label}</Badge>
                            })}
                        </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 bg-midnight-blue/10 dark:bg-smoke-purple/30 border-t border-dark-red/30 dark:border-soft-lavender/50">
                    <Button asChild variant="link" size="sm" className="text-royal-purple dark:text-glacial-blue hover:text-crimson-red dark:hover:text-crimson-red font-semibold w-full justify-start text-xs sm:text-sm">
                      <Link to={`/repressor/${repressor.id}`}>
                        Ver Perfil Completo <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      );
    };

    export default RepressorList;