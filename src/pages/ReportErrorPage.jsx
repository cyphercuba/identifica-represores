import React from 'react';
    import { motion } from 'framer-motion';
    import { AlertTriangle, Send, Shield } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { Link } from 'react-router-dom';

    const ReportErrorPage = () => {
      const { toast } = useToast();
      const [formData, setFormData] = React.useState({
        repressorName: '',
        urlPage: '',
        errorDescription: '',
        evidence: '',
        contactEmail: ''
      });
      const [isLoading, setIsLoading] = React.useState(false);

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Reporte de error enviado:", formData); 
        
        toast({
          title: "Reporte Enviado",
          description: "Gracias por tu reporte. Lo revisaremos a la brevedad.",
        });
        setFormData({ repressorName: '', urlPage: '', errorDescription: '', evidence: '', contactEmail: '' });
        setIsLoading(false);
      };

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-10 sm:mb-12">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-accent">Reportar Error o Contenido Falso</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-xl mx-auto">
              Ayúdanos a mantener la precisión e integridad de la información. Si encuentras un error, información incorrecta o contenido que consideras falso, por favor, repórtalo aquí.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl glassmorphism">
            <CardHeader>
              <CardTitle className="text-2xl text-primary dark:text-accent">Detalles del Reporte</CardTitle>
              <CardDescription>Proporciona la mayor cantidad de detalles posible para que podamos investigar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="repressorName">Nombre del Represor o Caso (si aplica)</Label>
                  <Input id="repressorName" value={formData.repressorName} onChange={handleChange} placeholder="Ej: Juan Pérez" className="mt-1" disabled={isLoading}/>
                </div>
                <div>
                  <Label htmlFor="urlPage">URL de la Página con el Error (si aplica)</Label>
                  <Input id="urlPage" type="url" value={formData.urlPage} onChange={handleChange} placeholder="https://ejemplo.com/perfil/..." className="mt-1" disabled={isLoading}/>
                </div>
                <div>
                  <Label htmlFor="errorDescription">Descripción del Error o Contenido Falso (*)</Label>
                  <Textarea 
                    id="errorDescription" 
                    value={formData.errorDescription} 
                    onChange={handleChange} 
                    placeholder="Describe detalladamente el error, qué información es incorrecta, por qué consideras que es falso, etc." 
                    required 
                    rows={5} 
                    className="mt-1" 
                    disabled={isLoading}
                  />
                </div>
                 <div>
                  <Label htmlFor="evidence">Evidencia o Fuentes que Soportan tu Reporte (opcional)</Label>
                  <Textarea 
                    id="evidence" 
                    value={formData.evidence} 
                    onChange={handleChange} 
                    placeholder="Incluye enlaces a documentos, artículos, u otra evidencia que respalde tu corrección o reporte." 
                    rows={3} 
                    className="mt-1" 
                    disabled={isLoading}
                  />
                </div>
                 <div>
                  <Label htmlFor="contactEmail">Tu Correo Electrónico (opcional, para seguimiento)</Label>
                  <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} placeholder="tu@email.com (si deseas que te contactemos)" className="mt-1" disabled={isLoading}/>
                </div>
                <div className="pt-2">
                    <p className="text-xs text-muted-foreground flex items-start">
                        <Shield className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Tu identidad se mantendrá confidencial si así lo deseas. Si proporcionas un correo, solo se usará para aclarar dudas sobre tu reporte. Consulta nuestra <Link to="/privacy" className="underline hover:text-accent">Política de Privacidad</Link>.</span>
                    </p>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-destructive to-red-700 hover:from-destructive/90 hover:to-red-700/90 text-white" disabled={isLoading}>
                   {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                    ) : (
                        <>
                         <Send className="mr-2 h-5 w-5" /> Enviar Reporte
                        </>
                    )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default ReportErrorPage;