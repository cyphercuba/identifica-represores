import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ShieldCheck, FileText, Users, MessageSquare, Star, Zap, Download, Map, Lock } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';

    const PlanCard = ({ title, price, features, primary = false, onChoosePlan }) => (
      <Card className={`shadow-xl hover:shadow-2xl transition-shadow duration-300 glassmorphism flex flex-col ${primary ? 'border-2 border-royal-purple dark:border-glacial-blue bg-royal-purple/5 dark:bg-glacial-blue/10' : 'bg-midnight-blue/5 dark:bg-smoke-purple/30 border-dark-red/30 dark:border-soft-lavender/30'}`}>
        <CardHeader className="text-center pb-4">
          <CardTitle className={`text-2xl font-bold ${primary ? 'text-royal-purple dark:text-glacial-blue' : 'text-primary dark:text-soft-lavender'}`}>{title}</CardTitle>
          <CardDescription className={`text-3xl font-extrabold ${primary ? 'text-crimson-red' : 'text-accent'}`}>
            {price} <span className="text-sm font-normal text-muted-foreground">/mes</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2 text-sm text-soft-lavender dark:text-white/90">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <ShieldCheck className={`h-4 w-4 mr-2 ${primary ? 'text-royal-purple dark:text-glacial-blue' : 'text-accent'}`} /> {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pt-4">
          <Button 
            size="lg" 
            className={`w-full ${primary ? 'bg-royal-purple text-white hover:bg-crimson-red btn-primary-hover' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
            onClick={() => onChoosePlan(title)}
          >
            {primary ? 'Elegir Plan Popular' : 'Seleccionar Plan'}
          </Button>
        </CardFooter>
      </Card>
    );

    const SubscribersPage = () => {
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleChoosePlan = (planTitle) => {
        
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            toast({
                title: "Inicio de Sesión Requerido",
                description: "Por favor, inicia sesión o regístrate para suscribirte.",
                variant: "destructive",
                action: <Button onClick={() => navigate('/login')} variant="outline" size="sm">Iniciar Sesión</Button>
            });
            return;
        }

        toast({
          title: `Plan ${planTitle} Seleccionado`,
          description: "Serás redirigido para completar el pago (Simulación).",
          className: "bg-glacial-blue text-midnight-blue dark:bg-glacial-blue dark:text-midnight-blue"
        });
        
      };
      
      const exclusiveContent = [
        { icon: <FileText className="h-8 w-8 text-royal-purple dark:text-glacial-blue mb-2" />, title: "Testimonios Detallados", description: "Acceso a las versiones completas y sensibles de testimonios, con transcripciones y análisis." },
        { icon: <Download className="h-8 w-8 text-royal-purple dark:text-glacial-blue mb-2" />, title: "Informes Descargables (PDF)", description: "Reportes consolidados por provincia, represor o tipo de abuso, listos para descargar." },
        { icon: <Map className="h-8 w-8 text-royal-purple dark:text-glacial-blue mb-2" />, title: "Mapas de Vínculos", description: "Visualizaciones interactivas de redes de conexión entre represores y sus colaboradores." },
        { icon: <Users className="h-8 w-8 text-royal-purple dark:text-glacial-blue mb-2" />, title: "Perfiles Extendidos", description: "Información adicional como historial detallado, direcciones conocidas (verificadas), redes sociales, etc." },
        { icon: <Zap className="h-8 w-8 text-royal-purple dark:text-glacial-blue mb-2" />, title: "Podcasts y Entrevistas Exclusivas", description: "Audios y videos con análisis profundos, entrevistas a víctimas y expertos." },
        { icon: <Lock className="h-8 w-8 text-royal-purple dark:text-glacial-blue mb-2" />, title: "Acceso Anticipado a Denuncias", description: "Visualiza denuncias y perfiles verificados antes de que sean públicos." },
      ];

      const plans = [
        {
          title: "Colaborador Básico",
          price: "€5",
          features: [
            "Acceso a artículos de análisis",
            "Newsletter mensual exclusiva",
            "Participación en encuestas",
            "Mención (opcional) en agradecimientos",
          ]
        },
        {
          title: "Investigador Plus",
          price: "€15",
          primary: true,
          features: [
            "Todo lo del plan Colaborador Básico",
            "Acceso a Testimonios Detallados",
            "Informes Provinciales Descargables (PDF)",
            "Acceso anticipado a denuncias (seleccionadas)",
            "Foros de comunidad exclusivos (lectura)",
          ]
        },
        {
          title: "Defensor Premium",
          price: "€30",
          features: [
            "Todo lo del plan Investigador Plus",
            "Acceso completo a Perfiles Extendidos",
            "Mapas de Vínculos Interactivos",
            "Descarga de todos los Documentos y Multimedia",
            "Podcasts y Entrevistas Exclusivas",
            "Participación activa en Foros (escritura)",
            "Soporte prioritario",
          ]
        }
      ];


      return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10">
        <div className="text-center mb-12">
          <Star className="h-20 w-20 sm:h-24 sm:w-24 text-royal-purple dark:text-accent mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-royal-purple dark:text-accent">Contenido Exclusivo y Apoyo Vital</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Tu suscripción nos permite continuar nuestra labor de investigación, verificación y difusión. Obtén acceso a material valioso y apoya la lucha por la justicia y la memoria en Cuba.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary dark:text-soft-lavender">¿Qué Obtienes como Suscriptor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {exclusiveContent.map(item => (
              <Card key={item.title} className="glassmorphism shadow-lg hover:shadow-xl transition-shadow p-5 text-center bg-midnight-blue/5 dark:bg-smoke-purple/30 border-dark-red/30 dark:border-soft-lavender/30">
                {item.icon}
                <CardTitle className="text-xl font-semibold mt-2 mb-1 text-royal-purple dark:text-glacial-blue">{item.title}</CardTitle>
                <CardDescription className="text-sm text-soft-lavender dark:text-white/80">{item.description}</CardDescription>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary dark:text-soft-lavender">Elige tu Nivel de Apoyo</h2>
           <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {plans.map(plan => <PlanCard key={plan.title} {...plan} onChoosePlan={handleChoosePlan} />)}
          </div>
           <p className="text-center mt-8 text-sm text-muted-foreground">
            Los pagos son procesados de forma segura. Puedes cancelar tu suscripción en cualquier momento.
            Por ahora, la integración de pagos con Stripe no está activa. Te guiaremos cuando esté lista.
          </p>
        </section>

        <div className="text-center mt-10">
             <p className="text-md text-muted-foreground">
                Si tienes preguntas sobre los planes o necesitas ayuda, <Link to="/contact" className="text-accent hover:underline font-semibold">contáctanos</Link>.
            </p>
        </div>
      </motion.div>
    );
    }
    export default SubscribersPage;