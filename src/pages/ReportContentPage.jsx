import React from 'react';
    import { motion } from 'framer-motion';
    import { AlertTriangle, Send } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Input } from '@/components/ui/input';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { useNavigate, useSearchParams } from 'react-router-dom';

    const ReportContentPage = () => {
      const [searchParams] = useSearchParams();
      const profileId = searchParams.get('profileId');
      const profileName = searchParams.get('profileName');
      const contentUrl = searchParams.get('url');

      const [reportCategory, setReportCategory] = React.useState('');
      const [reportDetails, setReportDetails] = React.useState('');
      const [contactEmail, setContactEmail] = React.useState(''); 
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!reportCategory || !reportDetails) {
          toast({ title: "Campos Incompletos", description: "Por favor, selecciona una categoría y describe el problema.", variant: "destructive" });
          return;
        }

        console.log({
          profileId,
          profileName,
          contentUrl,
          reportCategory,
          reportDetails,
          contactEmail,
        });

        toast({ title: "Reporte Enviado", description: "Gracias por tu reporte. Lo revisaremos a la brevedad." });
        navigate(-1); 
      };

      const reportCategories = [
        "Información errónea o falsa",
        "Suplantación de identidad",
        "Contenido gráfico sin advertencia / Ofensivo",
        "Contenido duplicado",
        "Violación de derechos de autor",
        "Amenazas o incitación al odio",
        "Spam o publicidad no deseada",
        "Otro (especificar en detalles)"
      ];

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="max-w-2xl mx-auto shadow-2xl glassmorphism">
            <CardHeader className="text-center bg-crimson-red/10 dark:bg-crimson-red/20 p-6">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-crimson-red" />
              <CardTitle className="text-3xl font-bold text-crimson-red">Reportar Contenido</CardTitle>
              <CardDescription className="text-lg text-soft-lavender dark:text-white/80 mt-2">
                Ayúdanos a mantener la integridad y seguridad del sitio. Si encuentras contenido problemático, por favor, infórmanos.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {(profileName || contentUrl) && (
                    <div className="p-3 bg-soft-lavender/10 dark:bg-smoke-purple/20 rounded-md border border-dark-red/20 dark:border-soft-lavender/20">
                        <p className="text-sm text-royal-purple dark:text-glacial-blue font-semibold">Contenido a reportar:</p>
                        {profileName && <p className="text-xs text-soft-lavender dark:text-white/90">Perfil: {decodeURIComponent(profileName)} (ID: {profileId})</p>}
                        {contentUrl && <p className="text-xs text-soft-lavender dark:text-white/90">URL: {decodeURIComponent(contentUrl)}</p>}
                    </div>
                )}

                <div>
                  <Label htmlFor="reportCategory" className="font-medium text-soft-lavender dark:text-white/90">Categoría del Reporte (*)</Label>
                  <Select value={reportCategory} onValueChange={setReportCategory} required>
                    <SelectTrigger id="reportCategory" className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white">
                      <SelectValue placeholder="Selecciona una categoría" className="select-trigger-text" />
                    </SelectTrigger>
                    <SelectContent className="bg-soft-lavender dark:bg-smoke-purple border-dark-red dark:border-soft-lavender text-midnight-blue dark:text-white">
                      {reportCategories.map(cat => <SelectItem key={cat} value={cat} className="hover:!bg-royal-purple/20 focus:!bg-royal-purple/20 select-item-text">{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reportDetails" className="font-medium text-soft-lavender dark:text-white/90">Descripción Detallada del Problema (*)</Label>
                  <Textarea 
                    id="reportDetails" 
                    value={reportDetails} 
                    onChange={(e) => setReportDetails(e.target.value)} 
                    placeholder="Proporciona todos los detalles relevantes, incluyendo por qué consideras que el contenido es problemático y, si es posible, enlaces a evidencia o contexto adicional." 
                    required 
                    rows={5} 
                    className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white placeholder:text-soft-lavender/70 dark:placeholder:text-white/70" 
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail" className="font-medium text-soft-lavender dark:text-white/90">Tu Correo Electrónico (Opcional)</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                    placeholder="Para que podamos contactarte si necesitamos más información." 
                    className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white placeholder:text-soft-lavender/70 dark:placeholder:text-white/70" 
                  />
                   <p className="text-xs text-soft-lavender/70 dark:text-white/70 mt-1">Tu email no será compartido públicamente.</p>
                </div>
                
                <CardFooter className="p-0 pt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue dark:hover:text-midnight-blue">Cancelar</Button>
                    <Button type="submit" size="lg" className="w-full sm:w-auto bg-crimson-red text-white hover:bg-crimson-red/80">
                        <Send className="mr-2 h-5 w-5" /> Enviar Reporte
                    </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default ReportContentPage;