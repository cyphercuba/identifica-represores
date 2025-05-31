import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, MessageSquare, ShieldCheck, HelpCircle } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { Link } from 'react-router-dom';

    const FeatureCard = ({ icon, title, description, linkTo, linkText }) => (
      <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/30 border-dark-red/30 dark:border-soft-lavender/30 text-center">
        <CardHeader className="pb-3">
          {icon}
          <CardTitle className="text-xl mt-3 text-royal-purple dark:text-glacial-blue">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-soft-lavender dark:text-white/80 mb-4">{description}</p>
          {linkTo && (
            <Button asChild variant="outline" className="w-full border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue dark:hover:text-midnight-blue">
              <Link to={linkTo}>{linkText}</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    );

    const CommunityPage = () => {
      const features = [
        {
          icon: <MessageSquare className="h-10 w-10 text-accent mx-auto" />,
          title: 'Comentarios en Perfiles',
          description: 'Participa en la discusión directamente en los perfiles de los represores. Comparte información adicional o tu perspectiva (todos los comentarios son moderados).',
          linkTo: '/search',
          linkText: 'Explorar Perfiles',
        },
        {
          icon: <Users className="h-10 w-10 text-accent mx-auto" />,
          title: 'Foros de Discusión (Próximamente)',
          description: 'Espacios dedicados para discutir por provincia, tipo de represión o temas específicos. Colabora con otros y organiza iniciativas.',
          linkText: 'Próximamente',
        },
        {
          icon: <ShieldCheck className="h-10 w-10 text-accent mx-auto" />,
          title: 'Sistema de Votos y Verificación',
          description: 'Ayuda a validar la credibilidad de los testimonios y evidencias. Tu participación es clave para mantener la calidad de la información.',
          linkTo: '/search',
          linkText: 'Ver Testimonios',
        },
        {
          icon: <HelpCircle className="h-10 w-10 text-accent mx-auto" />,
          title: 'Reglas de la Comunidad',
          description: 'Revisa nuestras directrices para asegurar un ambiente respetuoso y constructivo. La moderación se encarga de mantener la integridad del sitio.',
          linkTo: '/terms',
          linkText: 'Leer Directrices',
        },
      ];

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <section className="text-center py-12 md:py-16 bg-gradient-to-br from-royal-purple/10 via-glacial-blue/5 to-midnight-blue/10 dark:from-royal-purple/20 dark:via-glacial-blue/10 dark:to-smoke-purple/20 rounded-xl shadow-2xl glassmorphism mb-12 border border-dark-red/30">
            <div className="container mx-auto px-4">
              <Users className="h-16 w-16 text-royal-purple dark:text-glacial-blue mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-royal-purple dark:text-soft-lavender">Comunidad y Colaboración</h1>
              <p className="text-lg md:text-xl text-soft-lavender dark:text-smoke-purple mb-8 max-w-3xl mx-auto">
                Este espacio es para que los usuarios interactúen, colaboren y mantengan vivo el proyecto. Tu participación activa es esencial, siempre dentro de un marco de respeto y seguridad.
              </p>
            </div>
          </section>

          <section className="mb-12 py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-royal-purple dark:text-soft-lavender">Funciones Comunitarias</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
              </div>
            </div>
          </section>

          <section className="py-8 bg-soft-lavender/10 dark:bg-smoke-purple/20 rounded-lg glassmorphism border border-dark-red/20">
            <div className="container mx-auto px-4 text-center">
              <ShieldCheck className="h-12 w-12 text-crimson-red mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-crimson-red">Moderación y Seguridad</h2>
              <p className="text-lg text-soft-lavender dark:text-white/80 mb-6 max-w-2xl mx-auto">
                Un equipo de moderadores se encarga de revisar el contenido para evitar información falsa, comentarios tóxicos y cualquier intento de desacreditar a las víctimas. La seguridad de nuestros usuarios y la integridad de los datos son nuestra máxima prioridad.
              </p>
              <Button asChild variant="outline" className="border-crimson-red text-crimson-red hover:bg-crimson-red hover:text-white">
                <Link to="/report-content">Reportar Contenido Inapropiado</Link>
              </Button>
            </div>
          </section>
        </motion.div>
      );
    };

    export default CommunityPage;