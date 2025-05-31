import React from 'react';
    import { Link, useNavigate, useSearchParams } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { UploadCloud, ShieldAlert, Info } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { provincesOfCuba } from '@/data/dummyData';
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';

    const UploadPage = () => {
      const [searchParams] = useSearchParams();
      const initialRepressorIdFromUrl = searchParams.get('repressorId'); 
      const initialRepressorNameFromUrl = searchParams.get('repressorName'); 

      const [nombreRepresor, setNombreRepresor] = React.useState(''); // Changed from 'nombre' to avoid conflict
      const [apellidoRepresor, setApellidoRepresor] = React.useState(''); // Changed from 'apellido'
      const [alias, setAlias] = React.useState('');
      const [rank, setRank] = React.useState(''); 
      const [institution, setInstitution] = React.useState(''); 
      const [provinciaRepresor, setProvinciaRepresor] = React.useState(''); // Changed from 'provincia'
      const [municipio, setMunicipality] = React.useState('');
      const [descripcionRepresor, setDescripcionRepresor] = React.useState(''); 
      
      const [files, setFiles] = React.useState([]);
      const [testimonioContent, setTestimonyContent] = React.useState(''); 
      const [fechaTestimonio, setFechaTestimonio] = React.useState(new Date().toISOString().split('T')[0]); // Changed from fechaDenuncia
      
      const [isLoading, setIsLoading] = React.useState(false);

      const { toast } = useToast();
      const navigate = useNavigate();
      const { user, loading: authLoading } = useAuth();

      React.useEffect(() => {
        if (initialRepressorNameFromUrl) { 
            const nameParts = initialRepressorNameFromUrl.split(' ');
            if (nameParts.length > 1) {
                setNombreRepresor(nameParts.slice(0, -1).join(' '));
                setApellidoRepresor(nameParts.slice(-1)[0]);
            } else {
                setNombreRepresor(initialRepressorNameFromUrl);
            }
        }
      }, [initialRepressorNameFromUrl]);


      if (authLoading) {
        return <div className="text-center py-10 text-xl text-royal-purple dark:text-glacial-blue">Cargando...</div>;
      }

      if (!user) {
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
             <Card className="max-w-lg mx-auto p-8 shadow-xl glassmorphism">
                <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4 text-destructive">Acceso Denegado</h1>
                <p className="text-lg text-muted-foreground mb-6">Debes iniciar sesión para subir contenido y ayudar a documentar los casos.</p>
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 dark:from-accent dark:to-orange-600 dark:hover:from-accent/90 dark:hover:to-orange-600/90">
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
            </Card>
          </motion.div>
        );
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombreRepresor || !apellidoRepresor || !provinciaRepresor || !testimonioContent) { 
          toast({ title: "Campos Incompletos", description: "Por favor, completa Nombre del Represor, Apellido del Represor, Provincia del Represor y Testimonio (*).", variant: "destructive" });
          return;
        }
        setIsLoading(true);

        try {
            let currentRepressorId = initialRepressorIdFromUrl; 

            if (!currentRepressorId) {
                const { data: represorData, error: represorError } = await supabase
                    .from('represores')
                    .insert([{ 
                        nombre: nombreRepresor, 
                        apellido: apellidoRepresor, 
                        provincia: provinciaRepresor, 
                        municipio: municipio || null, 
                        descripcion: `${rank || ''} ${institution || ''} ${descripcionRepresor || ''}`.trim() || null,
                        alias: alias || null,
                    }])
                    .select('id')
                    .single();

                if (represorError) throw represorError;
                currentRepressorId = represorData.id;
            }
            
            const fotosUrls = []; // Placeholder for actual Supabase Storage URLs
            const videosUrls = []; // Placeholder

            const { data: denunciaData, error: denunciaError } = await supabase
                .from('denuncias')
                .insert([{
                    represor_id: currentRepressorId, 
                    usuario_id: user.id,
                    testimonio: testimonioContent, 
                    fecha_testimonio: fechaTestimonio ? new Date(fechaTestimonio).toISOString() : new Date().toISOString(),
                    fotos: fotosUrls, // Store array of photo URLs
                    videos: videosUrls, // Store array of video URLs
                }])
                .select('id')
                .single();

            if (denunciaError) throw denunciaError;
            const denunciaId = denunciaData.id;

            // Handle file uploads to Supabase Storage and then insert into 'archivos' table
            if (files.length > 0) {
                for (const file of files) {
                    const fileName = `${user.id}/${denunciaId}/${Date.now()}_${file.name}`;
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('evidencias') // Assuming you have a bucket named 'evidencias'
                        .upload(fileName, file);

                    if (uploadError) {
                        console.error("Error uploading file:", uploadError);
                        toast({ title: "Error al Subir Archivo", description: `No se pudo subir ${file.name}. ${uploadError.message}`, variant: "destructive" });
                        continue; // Skip inserting this file's record if upload failed
                    }
                    
                    // Construct public URL
                    const { data: publicUrlData } = supabase.storage.from('evidencias').getPublicUrl(fileName);
                    const publicUrl = publicUrlData.publicUrl;

                    await supabase.from('archivos').insert([{ 
                        denuncia_id: denunciaId, 
                        url: publicUrl, 
                        tipo: file.type.split('/')[0] || 'desconocido',
                        nombre_archivo: file.name,
                        tamaño_archivo: file.size
                    }]);

                    // Update denuncias.fotos or denuncias.videos arrays
                    if (file.type.startsWith('image/')) {
                        fotosUrls.push(publicUrl);
                    } else if (file.type.startsWith('video/')) {
                        videosUrls.push(publicUrl);
                    }
                }
                // After all files processed, update the denuncia record with the photo/video URLs
                if (fotosUrls.length > 0 || videosUrls.length > 0) {
                    await supabase.from('denuncias').update({ fotos: fotosUrls, videos: videosUrls }).eq('id', denunciaId);
                }
            }

            toast({ title: "Envío Exitoso", description: "Contenido enviado. Gracias por tu valiosa contribución." });
            navigate(`/repressor/${currentRepressorId}`); 

        } catch (error) {
            console.error("Error submitting evidence:", error);
            toast({ title: "Error en el Envío", description: error.message || "No se pudo enviar la evidencia. Inténtalo de nuevo.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
      };

      const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
      };

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-3xl mx-auto shadow-2xl glassmorphism">
            <CardHeader className="text-center bg-primary/5 dark:bg-secondary/20 p-6">
              <UploadCloud className="h-12 w-12 mx-auto mb-4 text-primary dark:text-accent" />
              <CardTitle className="text-3xl font-bold text-primary dark:text-accent">Subir Evidencia de Represión</CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                Tu contribución es vital. Sube fotos, videos o testimonios para ayudar a documentar. Todo el contenido será revisado antes de publicarse. Los campos con (*) son obligatorios.
              </CardDescription>
              {initialRepressorNameFromUrl && ( 
                <div className="mt-3 p-2 bg-glacial-blue/20 dark:bg-royal-purple/20 rounded-md text-sm text-glacial-blue dark:text-soft-lavender flex items-center justify-center">
                    <Info className="h-4 w-4 mr-2"/> Estás añadiendo evidencia para: <strong>{initialRepressorNameFromUrl}</strong>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <section className="space-y-4 p-4 border rounded-lg border-border dark:border-secondary/40">
                    <h3 className="text-xl font-semibold text-primary dark:text-accent mb-3">Información del Represor</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="nombreRepresor" className="font-medium">Nombre(s) del Represor (*)</Label>
                            <Input id="nombreRepresor" value={nombreRepresor} onChange={(e) => setNombreRepresor(e.target.value)} placeholder="Ej: Juan Alberto" required className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                        <div>
                            <Label htmlFor="apellidoRepresor" className="font-medium">Apellido(s) del Represor (*)</Label>
                            <Input id="apellidoRepresor" value={apellidoRepresor} onChange={(e) => setApellidoRepresor(e.target.value)} placeholder="Ej: Pérez González" required className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="alias" className="font-medium">Alias (si se conoce)</Label>
                            <Input id="alias" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Ej: El Martillo" className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                         <div>
                            <Label htmlFor="rank" className="font-medium">Rango o Cargo</Label>
                            <Input id="rank" value={rank} onChange={(e) => setRank(e.target.value)} placeholder="Ej: Capitán, Director Provincial" className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="institution" className="font-medium">Institución</Label>
                            <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Ej: MININT, DSE, PCC, FAR" className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                        <div>
                            <Label htmlFor="provinciaRepresor" className="font-medium">Provincia de Actuación del Represor (*)</Label>
                            <Select value={provinciaRepresor} onValueChange={setProvinciaRepresor} required disabled={!!initialRepressorIdFromUrl}>
                                <SelectTrigger id="provinciaRepresor" className="mt-1"><SelectValue placeholder="Selecciona una provincia" /></SelectTrigger>
                                <SelectContent>{provincesOfCuba.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="municipality" className="font-medium">Municipio de Actuación</Label>
                            <Input id="municipality" value={municipio} onChange={(e) => setMunicipality(e.target.value)} placeholder="Ej: Plaza de la Revolución" className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                        <div>
                            <Label htmlFor="descripcionRepresor" className="font-medium">Descripción Adicional del Represor</Label>
                            <Textarea id="descripcionRepresor" value={descripcionRepresor} onChange={(e) => setDescripcionRepresor(e.target.value)} placeholder="Otros detalles relevantes sobre el represor." rows={2} className="mt-1" disabled={!!initialRepressorIdFromUrl} />
                        </div>
                    </div>
                </section>

                <section className="space-y-4 p-4 border rounded-lg border-border dark:border-secondary/40">
                    <h3 className="text-xl font-semibold text-primary dark:text-accent mb-3">Tu Denuncia / Testimonio</h3>
                     <div>
                        <Label htmlFor="testimonyContent" className="font-medium">Testimonio Detallado (*)</Label>
                        <Textarea id="testimonyContent" value={testimonioContent} onChange={(e) => setTestimonyContent(e.target.value)} placeholder="Describe detalladamente el acto de represión, qué ocurrió, quiénes estuvieron involucrados, fechas, lugares, etc. Si fuiste víctima o testigo, describe tu experiencia. Cualquier detalle es importante." required rows={5} className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="fechaTestimonio" className="font-medium">Fecha del Testimonio (*)</Label>
                        <Input id="fechaTestimonio" type="date" value={fechaTestimonio} onChange={(e) => setFechaTestimonio(e.target.value)} required className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="files" className="font-medium">Archivos de Evidencia (Fotos, Videos, Documentos)</Label>
                        <Input id="files" type="file" multiple onChange={handleFileChange} className="mt-1 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border file:border-input file:text-sm file:font-medium file:bg-muted/50 hover:file:bg-muted" />
                        {files.length > 0 && (
                        <ul className="mt-2 text-xs text-muted-foreground list-disc pl-5">
                            {files.map(file => <li key={file.name}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>)}
                        </ul>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Sube fotos, videos o documentos. Los archivos se guardarán de forma segura.</p>
                    </div>
                </section>
                
                <CardFooter className="p-0 pt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto" disabled={isLoading}>Cancelar</Button>
                    <Button type="submit" size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 dark:from-accent dark:to-orange-600 dark:hover:from-accent/90 dark:hover:to-orange-600/90" disabled={isLoading}>
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                    ) : (
                        <UploadCloud className="mr-2 h-5 w-5" />
                    )}
                     Enviar Denuncia
                    </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default UploadPage;