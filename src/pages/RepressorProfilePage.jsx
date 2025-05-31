import React from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { 
      FileText as FileTextIcon, Users as UsersIcon, MessageSquare as MessageSquareIcon, 
      ShieldCheck, ShieldAlert, ShieldQuestion, UploadCloud, Share2, MessageCircle, 
      Image as ImageIcon, Video as VideoIcon, File as FileIcon, CalendarDays, MapPin as MapPinIcon, 
      AlertCircle, Info, Tag as TagIcon, ThumbsUp, ThumbsDown, Eye as EyeIcon, Edit3
    } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { useToast } from '@/components/ui/use-toast';
    import { tagTypes, getTagById } from '@/data/dummyData'; 
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';

    const getCaseStatusVisuals = (status) => {
      const baseClasses = "mr-2 h-4 w-4";
      switch (status) {
        case 'verificado': return { text: 'Verificado', icon: <ShieldCheck className={`${baseClasses} text-green-400`} />, badgeClass: 'bg-green-500/30 text-green-300 border-green-500/50 dark:bg-green-500/40 dark:text-green-200 dark:border-green-500/60', textColor: 'text-green-300 dark:text-green-200' };
        case 'en_revision': return { text: 'En Revisión', icon: <ShieldAlert className={`${baseClasses} text-yellow-400`} />, badgeClass: 'bg-yellow-500/30 text-yellow-300 border-yellow-500/50 dark:bg-yellow-500/40 dark:text-yellow-200 dark:border-yellow-500/60', textColor: 'text-yellow-300 dark:text-yellow-200' };
        default: return { text: 'Sin Evidencia Suficiente', icon: <ShieldQuestion className={`${baseClasses} text-red-400`} />, badgeClass: 'bg-red-600/30 text-red-300 border-red-600/50 dark:bg-red-600/40 dark:text-red-200 dark:border-red-600/60 alert-critical', textColor: 'text-red-300 dark:text-red-200' };
      }
    };
    
    const abuseTypes = tagTypes.repression; 

    const RepressorProfilePage = () => {
      const { id } = useParams();
      const [repressorProfile, setRepressorProfile] = React.useState(null);
      const [denuncias, setDenuncias] = React.useState([]);
      // Removed 'archivos' state as it's now nested under denuncias or directly fetched from denuncia.fotos/videos
      const [comment, setComment] = React.useState('');
      const [loading, setLoading] = React.useState(true);
      const { toast } = useToast();
      const navigate = useNavigate();
      const { user } = useAuth();

      React.useEffect(() => {
        const fetchProfileData = async () => {
          setLoading(true);
          
          const { data: fetchedRepressorData, error: fetchedRepressorError } = await supabase
            .from('represores')
            .select('*')
            .eq('id', id)
            .single();

          if (fetchedRepressorError || !fetchedRepressorData) {
            toast({ title: "Error", description: "Represor no encontrado o error al cargar.", variant: "destructive" });
            navigate("/search");
            setLoading(false);
            return;
          }
          
          const { data: denunciasData, error: denunciasError } = await supabase
            .from('denuncias')
            .select(`
              *,
              perfil_usuarios ( id, nombre, apellido, foto_perfil ), 
              archivos ( id, url, tipo, nombre_archivo, uploaded_at )
            `)
            .eq('represor_id', id)
            .order('fecha_testimonio', { ascending: false }); // Changed from fecha_denuncia

          if (denunciasError) {
            console.error("Error fetching denuncias:", denunciasError);
            toast({ title: "Error al Cargar Denuncias", description: denunciasError.message, variant: "destructive" });
          }

          const formattedRepressor = {
            ...fetchedRepressorData,
            name: `${fetchedRepressorData.nombre} ${fetchedRepressorData.apellido}`,
            alias: fetchedRepressorData.alias || '', 
            rank: fetchedRepressorData.descripcion ? fetchedRepressorData.descripcion.split(' ')[0] : '', 
            institution: fetchedRepressorData.descripcion ? fetchedRepressorData.descripcion.split(' ').slice(1).join(' ') : '', 
            status: 'verificado', 
            denunciasCount: denunciasData ? denunciasData.length : 0,
            tags: [], 
            comments: [], 
            history: denunciasData ? denunciasData.map(d => ({ 
                date: d.fecha_testimonio, // Changed from fecha_denuncia
                event: d.testimonio.substring(0, 150) + "...",
                source: d.perfil_usuarios ? `Denuncia de ${d.perfil_usuarios.nombre || 'Usuario'} ${d.perfil_usuarios.apellido || ''}`.trim() : 'Denuncia de usuario',
                location: fetchedRepressorData.municipio || fetchedRepressorData.provincia
            })) : [],
          };
          
          // Use denuncia.fotos and denuncia.videos directly if they are arrays of URLs
          // If 'archivos' table is the source, process it as before
          // For this example, let's assume 'archivos' table is the primary source for media files
          const allArchivosFromDenuncias = denunciasData ? denunciasData.flatMap(d => d.archivos || []) : [];
          formattedRepressor.consolidatedPhotos = allArchivosFromDenuncias.filter(a => a.tipo === 'imagen' || a.tipo?.startsWith('image/')).map(a => ({url: a.url, caption: a.nombre_archivo || `Evidencia ${a.id}`}));
          formattedRepressor.consolidatedVideos = allArchivosFromDenuncias.filter(a => a.tipo === 'video' || a.tipo?.startsWith('video/')).map(a => ({url: a.url, caption: a.nombre_archivo || `Evidencia ${a.id}`}));
          formattedRepressor.otherDocuments = allArchivosFromDenuncias.filter(a => a.tipo !== 'imagen' && a.tipo !== 'video' && !a.tipo?.startsWith('image/') && !a.tipo?.startsWith('video/'));


          setRepressorProfile(formattedRepressor);
          setDenuncias(denunciasData || []);
          setLoading(false);
        };

        if (id) {
          fetchProfileData();
        }
      }, [id, toast, navigate]);

      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim() || !user) {
          toast({ title: "Error", description: "Debes iniciar sesión y escribir un comentario.", variant: "destructive" });
          return;
        }
        // This would be an insert into a 'comentarios' table related to 'represores' or 'denuncias'
        console.log("Simulating comment submission:", { represor_id: id, usuario_id: user.id, texto: comment });
        toast({ title: "Comentario Enviado (Simulado)", description: "Tu comentario ha sido enviado para moderación.", className: "bg-glacial-blue text-midnight-blue" });
        setComment('');
      };
      
      const handleShare = () => {
        if (navigator.share && repressorProfile) {
            navigator.share({
                title: `Perfil de ${repressorProfile.name} - Identifica Represores`,
                text: `Mira el perfil de ${repressorProfile.name} en Identifica Represores.`,
                url: window.location.href,
            })
            .then(() => toast({title: "Contenido Compartido", description: "El perfil ha sido compartido."}))
            .catch((error) => toast({title: "Error al Compartir", description: `No se pudo compartir: ${error}`, variant: "destructive"}));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast({title: "Enlace Copiado", description: "El enlace al perfil ha sido copiado al portapapeles."});
        }
      };

      if (loading) {
        return <div className="text-center py-10 text-xl text-soft-lavender dark:text-white">Cargando perfil...</div>;
      }
      if (!repressorProfile) {
        return <div className="text-center py-10 text-xl text-soft-lavender dark:text-white">Represor no encontrado.</div>;
      }

      const caseStatus = getCaseStatusVisuals(repressorProfile.status);
      const fullName = repressorProfile.name;

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="shadow-2xl overflow-hidden glassmorphism bg-midnight-blue/20 dark:bg-smoke-purple/40 border-dark-red dark:border-soft-lavender/80">
            <CardHeader className="p-0">
              <div className="relative">
                <div className="w-full h-48 sm:h-64 bg-gradient-to-tr from-royal-purple via-crimson-red to-dark-red">
                  <img  alt={`Fondo abstracto para perfil de ${fullName}`} className="w-full h-full object-cover opacity-20 mix-blend-luminosity" src="https://images.unsplash.com/photo-1623141629340-4686d65d60bc" />
                </div>
                <div className="absolute inset-0 bg-midnight-blue/60 dark:bg-smoke-purple/70"></div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-end sm:items-center gap-4">
                   <img  alt={`Foto principal de ${fullName}`} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-soft-lavender dark:border-glacial-blue shadow-lg bg-midnight-blue/30" src={(repressorProfile.consolidatedPhotos && repressorProfile.consolidatedPhotos.length > 0) ? repressorProfile.consolidatedPhotos[0].url : "https://images.unsplash.com/photo-1573411618102-374e4a009a52"} />
                  <div className="flex-grow">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-white shadow-sm underline decoration-crimson-red decoration-2 underline-offset-4">{fullName}</h1>
                    {repressorProfile.alias && <p className="text-md sm:text-lg text-glacial-blue dark:text-glacial-blue font-medium">Alias: {repressorProfile.alias}</p>}
                    <div className="mt-1 text-xs sm:text-sm text-soft-lavender dark:text-white/90 space-x-2">
                        <span>{repressorProfile.rank || 'Rango no especificado'}</span>
                        <span>•</span>
                        <span>{repressorProfile.institution || 'Institución no especificada'}</span>
                    </div>
                     <div className="mt-1 text-xs sm:text-sm text-soft-lavender dark:text-white/90">
                        <span>{repressorProfile.provincia || 'Provincia no especificada'}</span>
                        {repressorProfile.municipio && <span>, {repressorProfile.municipio}</span>}
                    </div>
                    <p className={`mt-1 text-xs sm:text-sm font-semibold ${caseStatus.textColor}`}>Denuncias: {repressorProfile.denunciasCount || 0}</p>
                  </div>
                   <Badge variant="outline" className={`mt-2 sm:mt-0 text-xs sm:text-sm py-1.5 px-3 ${caseStatus.badgeClass} border font-semibold self-start sm:self-center shadow-md`}>
                    {caseStatus.icon} {caseStatus.text}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <Tabs defaultValue="evidence" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 h-auto p-1 bg-midnight-blue/10 dark:bg-smoke-purple/50 rounded-none border-b-2 border-dark-red dark:border-soft-lavender/70">
                {['Evidencias', 'Testimonios', 'Cronología', 'Etiquetas', 'Comentarios'].map(tab => (
                    <TabsTrigger 
                        key={tab.toLowerCase().replace(' ', '_')} 
                        value={tab.toLowerCase().replace(' ', '_')} 
                        className="py-2.5 text-xs sm:text-sm data-[state=active]:bg-royal-purple data-[state=active]:text-white dark:data-[state=active]:bg-royal-purple dark:data-[state=active]:text-white text-soft-lavender dark:text-white hover:bg-royal-purple/20 dark:hover:bg-royal-purple/30"
                    >
                        {tab}
                    </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="evidence" className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-royal-purple dark:text-glacial-blue flex items-center"><FileTextIcon className="mr-2 h-6 w-6" />Evidencias Recopiladas</h2>
                <section>
                  <h3 className="text-lg sm:text-xl font-medium mb-3 text-soft-lavender dark:text-white/90">Galería de Fotos y Videos</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {(repressorProfile.consolidatedPhotos && repressorProfile.consolidatedPhotos.length > 0) ? repressorProfile.consolidatedPhotos.map((photo, index) => (
                       <img  key={`photo-${index}`} alt={photo.caption || `Evidencia fotográfica ${index + 1} de ${fullName}`} className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer bg-midnight-blue/10 dark:bg-smoke-purple/40 border border-dark-red/30 dark:border-soft-lavender/30" src={photo.url.startsWith('http') ? photo.url : "https://images.unsplash.com/photo-1555117389-402de1d1470b"} />
                    )) : <p className="col-span-full text-soft-lavender/70 dark:text-white/70 text-sm">No hay fotos disponibles.</p>}
                    {(repressorProfile.consolidatedVideos && repressorProfile.consolidatedVideos.length > 0) ? repressorProfile.consolidatedVideos.map((video, index) => (
                      <div key={`video-${index}`} className="w-full h-32 sm:h-40 bg-midnight-blue/20 dark:bg-smoke-purple/50 rounded-lg shadow-md flex items-center justify-center text-soft-lavender/70 dark:text-white/70 text-xs sm:text-sm p-2 text-center hover:bg-midnight-blue/30 dark:hover:bg-smoke-purple/60 transition-colors cursor-pointer border border-dark-red/30 dark:border-soft-lavender/30">
                        <VideoIcon className="h-8 w-8 mr-2 text-glacial-blue" /> {video.caption || `Video ${index + 1}`} (No reproducible aquí)
                      </div>
                    )) : <p className="col-span-full text-soft-lavender/70 dark:text-white/70 text-sm">No hay videos disponibles.</p>}
                  </div>
                </section>
                <section className="mt-6">
                    <h3 className="text-lg sm:text-xl font-medium mb-3 text-soft-lavender dark:text-white/90">Otros Documentos y Archivos</h3>
                     <div className="space-y-2">
                        {repressorProfile.otherDocuments && repressorProfile.otherDocuments.length > 0 ? 
                          repressorProfile.otherDocuments.map((archivo, index) => (
                            <div key={`doc-${index}`} className="flex items-center p-3 border border-dark-red/40 dark:border-soft-lavender/40 rounded-md bg-midnight-blue/5 dark:bg-smoke-purple/20 hover:bg-midnight-blue/10 dark:hover:bg-smoke-purple/30 transition-colors">
                                <FileIcon className="h-5 w-5 mr-3 text-royal-purple dark:text-glacial-blue" />
                                <span className="text-sm text-soft-lavender dark:text-white">{archivo.nombre_archivo || `documento_${index + 1}.${archivo.tipo || 'pdf'}`}</span>
                                <a href={archivo.url} target="_blank" rel="noopener noreferrer" className="ml-auto">
                                  <Button variant="ghost" size="sm" className="text-xs text-royal-purple dark:text-glacial-blue hover:bg-royal-purple/20 dark:hover:bg-glacial-blue/20">Descargar</Button>
                                </a>
                            </div>
                          )) :
                          <p className="text-soft-lavender/70 dark:text-white/70 text-sm">No hay otros documentos disponibles.</p>
                        }
                     </div>
                </section>
                <div className="mt-8 text-center">
                    <Button asChild variant="outline" className="border-crimson-red text-crimson-red hover:bg-crimson-red hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue dark:hover:text-midnight-blue">
                        <Link to={`/upload?repressorId=${repressorProfile.id}&repressorName=${encodeURIComponent(fullName)}`}>
                            <UploadCloud className="mr-2 h-4 w-4" /> Subir Nueva Evidencia para este Caso
                        </Link>
                    </Button>
                </div>
              </TabsContent>

              <TabsContent value="testimonies" className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-royal-purple dark:text-glacial-blue flex items-center"><MessageSquareIcon className="mr-2 h-6 w-6" />Testimonios de Víctimas y Testigos</h2>
                <div className="mb-4">
                    <Label htmlFor="abuseTypeFilter" className="text-sm font-medium text-soft-lavender dark:text-white/90">Filtrar por tipo de abuso:</Label>
                    <Select>
                        <SelectTrigger id="abuseTypeFilter" className="w-full sm:w-[250px] mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white">
                            <SelectValue placeholder="Todos los tipos" className="select-trigger-text" />
                        </SelectTrigger>
                        <SelectContent className="bg-soft-lavender dark:bg-smoke-purple border-dark-red dark:border-soft-lavender text-midnight-blue dark:text-white">
                            <SelectItem value="all" className="hover:!bg-royal-purple/20 focus:!bg-royal-purple/20 select-item-text">Todos los tipos</SelectItem>
                            {abuseTypes.map(type => (
                                <SelectItem key={type.id} value={type.id} className="hover:!bg-royal-purple/20 focus:!bg-royal-purple/20 select-item-text">
                                    <span className="flex items-center">{type.icon || <Info className="mr-1 h-3 w-3"/>} {type.label}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {denuncias && denuncias.length > 0 ? (
                  <div className="space-y-4">
                    {denuncias.map(denuncia => {
                      const abuseTypeInfo = abuseTypes.find(at => at.id === denuncia.abuseType) || {label: 'No clasificado', icon: <Info className="mr-1 h-3 w-3"/>};
                      const testimonyStatus = getCaseStatusVisuals(denuncia.verification_status || 'en_revision'); 
                      const denuncianteNombre = denuncia.perfil_usuarios ? `${denuncia.perfil_usuarios.nombre || 'Usuario'} ${denuncia.perfil_usuarios.apellido || ''}`.trim() : 'Usuario Anónimo';
                      return (
                        <Card key={denuncia.id} className="bg-midnight-blue/5 dark:bg-smoke-purple/30 shadow-sm hover:shadow-md transition-shadow border border-dark-red/30 dark:border-soft-lavender/30">
                          <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                <CardDescription className="text-xs text-soft-lavender/70 dark:text-white/70 mb-1 sm:mb-0">
                                    {denuncia.fecha_testimonio ? new Date(denuncia.fecha_testimonio).toLocaleDateString() : 'Fecha no especificada'}
                                    {<span className="ml-2">por: {denuncianteNombre}</span>}
                                </CardDescription>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary" className={`text-xs py-0.5 px-2 flex items-center ${abuseTypeInfo.color || 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30'}`}>
                                        {abuseTypeInfo.icon || <Info className="mr-1 h-3 w-3"/>} {abuseTypeInfo.label}
                                    </Badge>
                                    <Badge variant="outline" className={`text-xs py-0.5 px-2 ${testimonyStatus.badgeClass}`}>
                                        {testimonyStatus.icon} {testimonyStatus.text}
                                    </Badge>
                                </div>
                            </div>
                          </CardHeader>
                          <CardContent className="text-sm sm:text-base px-4 pb-3 text-soft-lavender dark:text-white card-content-text">
                            <p className="italic">"{denuncia.testimonio}"</p>
                          </CardContent>
                          <CardFooter className="pt-2 pb-3 px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div className="flex space-x-2 mb-2 sm:mb-0">
                                <Button variant="ghost" size="sm" className="text-xs p-1 h-auto text-green-400 hover:bg-green-500/20"><ThumbsUp className="h-4 w-4 mr-1"/> Creíble ({denuncia.votes?.credible || 0})</Button>
                                <Button variant="ghost" size="sm" className="text-xs p-1 h-auto text-red-400 hover:bg-red-500/20"><ThumbsDown className="h-4 w-4 mr-1"/> Dudoso ({denuncia.votes?.dubious || 0})</Button>
                            </div>
                            <Button variant="link" size="sm" className="text-xs p-0 h-auto text-crimson-red dark:text-crimson-red hover:underline">Añadir comentario o prueba</Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                ) : <p className="text-soft-lavender/70 dark:text-white/70 text-sm sm:text-base">No hay testimonios registrados para este individuo.</p>}
              </TabsContent>

              <TabsContent value="chronology" className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-royal-purple dark:text-glacial-blue flex items-center"><CalendarDays className="mr-2 h-6 w-6" />Cronología de Abusos y Actividades</h2>
                {repressorProfile.history && repressorProfile.history.length > 0 ? (
                  <div className="relative pl-6 border-l-2 border-royal-purple/50 dark:border-glacial-blue/60 space-y-8">
                    {repressorProfile.history.sort((a,b) => new Date(b.date) - new Date(a.date)).map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-royal-purple dark:bg-glacial-blue rounded-full border-4 border-soft-lavender dark:border-smoke-purple"></div>
                        <Card className="ml-4 shadow-md hover:shadow-lg transition-shadow glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/30 border border-dark-red/30 dark:border-soft-lavender/30">
                          <CardHeader className="pb-3 pt-4 px-4">
                            <CardTitle className="text-lg sm:text-xl text-royal-purple dark:text-glacial-blue card-title-text">{new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
                            {item.location && <CardDescription className="text-xs sm:text-sm flex items-center text-soft-lavender/70 dark:text-white/70 card-description-text"><MapPinIcon className="h-3 w-3 mr-1 text-crimson-red"/> {item.location}</CardDescription>}
                          </CardHeader>
                          <CardContent className="text-sm sm:text-base px-4 pb-4 text-soft-lavender dark:text-white card-content-text">
                            <p className="font-medium">Hecho: <span className="font-normal">{item.event}</span></p>
                            {item.victims && <p className="font-medium">Víctimas: <span className="font-normal">{item.victims}</span></p>}
                            <p className="font-medium">Fuente: <span className="font-normal italic">{item.source}</span></p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : <p className="text-soft-lavender/70 dark:text-white/70 text-sm sm:text-base">No hay un historial cronológico detallado para este individuo.</p>}
              </TabsContent>

              <TabsContent value="etiquetas" className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-royal-purple dark:text-glacial-blue flex items-center"><TagIcon className="mr-2 h-6 w-6" />Etiquetas Asociadas</h2>
                {repressorProfile.tags && repressorProfile.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {repressorProfile.tags.map(tagId => {
                            const tagInfo = getTagById(tagId);
                            if (!tagInfo) return null;
                            return (
                                <Badge key={tagId} className={`text-xs sm:text-sm py-1 px-2.5 ${tagInfo.color || 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30'}`}>
                                    {tagInfo.label}
                                </Badge>
                            );
                        })}
                    </div>
                ) : <p className="text-soft-lavender/70 dark:text-white/70 text-sm">No hay etiquetas asociadas a este perfil (funcionalidad en desarrollo).</p>}
              </TabsContent>

              <TabsContent value="comments" className="p-4 sm:p-6 md:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-royal-purple dark:text-glacial-blue flex items-center"><MessageCircle className="mr-2 h-6 w-6" />Comentarios de la Comunidad</h2>
                <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
                  <Label htmlFor="commentText" className="font-medium text-soft-lavender dark:text-white/90">Añadir un comentario (será moderado):</Label>
                  <Textarea id="commentText" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Escribe tu comentario aquí..." rows={3} className="bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white placeholder:text-soft-lavender/60 dark:placeholder:text-white/60" />
                  <Button type="submit" size="sm" className="bg-royal-purple text-white hover:bg-crimson-red btn-primary-hover" disabled={!user}>Enviar Comentario</Button>
                </form>
                <div className="space-y-4">
                  {repressorProfile.comments && repressorProfile.comments.length > 0 ? (
                    repressorProfile.comments.map(c => (
                      <Card key={c.id} className="bg-midnight-blue/5 dark:bg-smoke-purple/30 shadow-sm border border-dark-red/20 dark:border-soft-lavender/20">
                        <CardHeader className="pb-2 pt-3 px-4">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-royal-purple dark:text-glacial-blue">{c.user}</p>
                            <p className="text-xs text-soft-lavender/60 dark:text-white/60">{new Date(c.date).toLocaleString()}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                          <p className="text-sm text-soft-lavender dark:text-white card-content-text">{c.text}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : <p className="text-soft-lavender/70 dark:text-white/70 text-sm">No hay comentarios aún. ¡Sé el primero! (Funcionalidad en desarrollo)</p>}
                </div>
              </TabsContent>
            </Tabs>

            <CardFooter className="p-4 sm:p-6 md:p-8 bg-midnight-blue/10 dark:bg-smoke-purple/20 border-t-2 border-dark-red dark:border-soft-lavender/70 flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
              <Button variant="outline" size="sm" asChild className="flex-grow sm:flex-grow-0 border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue dark:hover:text-midnight-blue">
                <Link to={`/upload?repressorId=${repressorProfile.id}&repressorName=${encodeURIComponent(fullName)}`}>
                  <UploadCloud className="mr-2 h-4 w-4" /> Subir Evidencia
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="flex-grow sm:flex-grow-0 border-crimson-red text-crimson-red hover:bg-crimson-red hover:text-white dark:border-crimson-red dark:text-crimson-red dark:hover:bg-crimson-red dark:hover:text-white">
                <Link to={`/report-content?profileId=${repressorProfile.id}&profileName=${encodeURIComponent(fullName)}`}>
                  <AlertCircle className="mr-2 h-4 w-4" /> Reportar Contenido
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="flex-grow sm:flex-grow-0 border-glacial-blue text-glacial-blue hover:bg-glacial-blue hover:text-midnight-blue dark:border-royal-purple dark:text-royal-purple dark:hover:bg-royal-purple dark:hover:text-white">
                <Share2 className="mr-2 h-4 w-4" /> Compartir Perfil
              </Button>
               <Button variant="outline" size="sm" asChild className="flex-grow sm:flex-grow-0 border-soft-lavender text-soft-lavender hover:bg-soft-lavender hover:text-midnight-blue dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-midnight-blue">
                <Link to={`/search?tag=${repressorProfile.tags ? repressorProfile.tags[0] : ''}`}>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver Casos Relacionados
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default RepressorProfilePage;