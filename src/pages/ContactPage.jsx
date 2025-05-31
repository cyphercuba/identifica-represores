import React from 'react';
    import { motion } from 'framer-motion';
    import { Mail, Shield, Send } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';

    const ContactPage = () => {
      const { toast } = useToast();
      const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      const [isLoading, setIsLoading] = React.useState(false);

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulación de envío de correo
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Formulario de contacto enviado:", formData); // En una app real, enviarías esto a un backend/servicio de email
        
        toast({
          title: "Mensaje Enviado",
          description: "Gracias por contactarnos. Te responderemos lo antes posible.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsLoading(false);
      };

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-10 sm:mb-12">
            <Mail className="h-16 w-16 text-primary dark:text-accent mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-accent">Contacto y Soporte</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-xl mx-auto">
              ¿Tienes preguntas, sugerencias, necesitas reportar un error o quieres colaborar? Contáctanos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <Card className="shadow-xl glassmorphism">
              <CardHeader>
                <CardTitle className="text-2xl text-primary dark:text-accent">Envíanos un Mensaje</CardTitle>
                <CardDescription>Utiliza el formulario para comunicarte con nuestro equipo.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Nombre Completo (Opcional)</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre" className="mt-1" disabled={isLoading} />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico de Contacto (*)</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com (para respuesta)" required className="mt-1" disabled={isLoading} />
                  </div>
                  <div>
                    <Label htmlFor="subject">Asunto (*)</Label>
                    <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="Motivo de tu contacto" required className="mt-1" disabled={isLoading} />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensaje (*)</Label>
                    <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Escribe tu mensaje detallado aquí..." required rows={5} className="mt-1" disabled={isLoading} />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 dark:from-accent dark:to-orange-600 dark:hover:from-accent/90 dark:hover:to-orange-600/90" disabled={isLoading}>
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                    ) : (
                        <>
                         <Send className="mr-2 h-5 w-5" /> Enviar Mensaje
                        </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-lg glassmorphism">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-primary dark:text-accent"><Shield className="mr-2 h-6 w-6 text-green-500" /> Comunicación Segura</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Para comunicaciones sensibles o si deseas mantener un mayor grado de anonimato, te recomendamos utilizar:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                    <li><strong>Correo electrónico anónimo:</strong> Considera servicios como ProtonMail o Tutanota.</li>
                    <li><strong>VPN:</strong> Una Red Privada Virtual puede ayudar a ocultar tu dirección IP.</li>
                    <li><strong>Navegador Tor:</strong> Para una navegación más anónima.</li>
                  </ul>
                  <p className="text-muted-foreground text-sm mt-3">
                    <strong>Nota:</strong> Aunque este formulario es seguro (HTTPS), para información altamente sensible, considera los métodos anteriores. No solicites ni envíes información extremadamente confidencial a través de este formulario general.
                  </p>
                </CardContent>
              </Card>
               <Card className="shadow-lg glassmorphism">
                <CardHeader>
                  <CardTitle className="text-xl text-primary dark:text-accent">Otras Formas de Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Actualmente, el formulario es el principal medio de contacto. Próximamente podríamos habilitar otros canales seguros.
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    <strong>Redes Sociales (informativas):</strong>
                  </p>
                  <div className="flex space-x-3 mt-2">
                     <Button variant="outline" size="sm" disabled>Twitter (Próximamente)</Button>
                     <Button variant="outline" size="sm" disabled>Telegram (Próximamente)</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      );
    };

    export default ContactPage;