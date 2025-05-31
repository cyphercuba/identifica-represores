import React from 'react';
    import { motion } from 'framer-motion';
    import { Heart, Coins, HeartHandshake as Handshake, BarChart2, Info } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Link } from 'react-router-dom';

    const DonationChannelCard = ({ icon, title, description, comingSoon = false }) => (
      <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/30 border-dark-red/30 dark:border-soft-lavender/30 text-center">
        <CardHeader className="pb-3">
          {icon}
          <CardTitle className="text-xl mt-3 text-royal-purple dark:text-glacial-blue">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-soft-lavender dark:text-white/80 mb-4">{description}</p>
          <Button variant="outline" className="w-full border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue dark:hover:text-midnight-blue" disabled={comingSoon}>
            {comingSoon ? 'Próximamente' : `Donar vía ${title}`}
          </Button>
        </CardContent>
      </Card>
    );

    const TransparencyItem = ({ title, value, icon }) => (
      <div className="flex items-start p-3 bg-soft-lavender/10 dark:bg-smoke-purple/20 rounded-lg border border-dark-red/20 dark:border-soft-lavender/20">
        {icon}
        <div>
          <p className="font-semibold text-royal-purple dark:text-glacial-blue">{title}</p>
          <p className="text-sm text-soft-lavender dark:text-white/90">{value}</p>
        </div>
      </div>
    );

    const DonationsPage = () => {
      const donationChannels = [
        { icon: <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal Logo" className="h-10 mx-auto" />, title: 'PayPal', description: 'Dona de forma segura a través de PayPal.' },
        { icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Patreon_logo.svg/200px-Patreon_logo.svg.png" alt="Patreon Logo" className="h-8 mx-auto" />, title: 'Patreon', description: 'Apoya mensualmente y accede a beneficios exclusivos.', comingSoon: true },
        { icon: <Coins className="h-10 w-10 text-accent mx-auto" />, title: 'Criptomonedas', description: 'Aceptamos donaciones en Bitcoin, Ethereum, y Monero.', comingSoon: true },
        { icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/200px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe Logo" className="h-8 mx-auto" />, title: 'Stripe', description: 'Dona con tarjeta de crédito de forma segura.', comingSoon: true },
      ];

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <section className="text-center py-12 md:py-16 bg-gradient-to-b from-royal-purple/10 via-crimson-red/5 to-midnight-blue/10 dark:from-royal-purple/20 dark:via-crimson-red/10 dark:to-smoke-purple/20 rounded-xl shadow-2xl glassmorphism mb-12 border border-dark-red/30">
            <div className="container mx-auto px-4">
              <Heart className="h-16 w-16 text-crimson-red mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-royal-purple dark:text-soft-lavender">Apoya Nuestra Causa: Dona Hoy</h1>
              <p className="text-lg md:text-xl text-soft-lavender dark:text-smoke-purple mb-8 max-w-3xl mx-auto">
                Tu contribución es fundamental para mantener este proyecto activo, seguro e independiente. Con tu ayuda, podemos seguir investigando, verificando información y dando voz a las víctimas.
              </p>
            </div>
          </section>

          <section className="mb-12 py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-royal-purple dark:text-soft-lavender">Canales de Donación</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {donationChannels.map(channel => <DonationChannelCard key={channel.title} {...channel} />)}
              </div>
            </div>
          </section>

          <section className="mb-12 py-8 bg-soft-lavender/10 dark:bg-smoke-purple/20 rounded-lg glassmorphism border border-dark-red/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-royal-purple dark:text-soft-lavender">Transparencia y Rendición de Cuentas</h2>
              <p className="text-center text-soft-lavender dark:text-white/80 mb-6 max-w-2xl mx-auto">
                Creemos en la total transparencia sobre cómo se utilizan los fondos. Aquí detallamos nuestros gastos y objetivos.
              </p>
              <Card className="p-4 sm:p-6 glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/30 border-dark-red/30 dark:border-soft-lavender/30">
                <CardContent className="space-y-4">
                  <TransparencyItem icon={<BarChart2 className="h-6 w-6 text-accent mr-3 mt-1" />} title="Objetivo Mensual de Gastos" value="€500 (Estimado para cubrir hosting, seguridad, herramientas de verificación, etc.)" />
                  <TransparencyItem icon={<Coins className="h-6 w-6 text-accent mr-3 mt-1" />} title="Ingresos Recibidos (Último Mes)" value="€0 (Aún no hemos iniciado la recolección de fondos)" />
                  <TransparencyItem icon={<Info className="h-6 w-6 text-accent mr-3 mt-1" />} title="Uso de los Fondos" value="Los fondos se destinarán prioritariamente a: 1. Mantenimiento y seguridad del servidor. 2. Herramientas de investigación y verificación. 3. Soporte técnico y legal. 4. Campañas de difusión y concienciación." />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4 text-center">
              <Handshake className="h-12 w-12 text-royal-purple dark:text-glacial-blue mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-royal-purple dark:text-soft-lavender">Incentivos para Donantes</h2>
              <p className="text-lg text-soft-lavender dark:text-white/80 mb-6 max-w-2xl mx-auto">
                Como agradecimiento por tu apoyo, ofrecemos algunos incentivos (opcionales y sujetos a tu nivel de donación):
              </p>
              <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1 text-soft-lavender dark:text-white/90">
                <li>Agradecimientos públicos (si lo deseas).</li>
                <li>Acceso a un newsletter privado con informes y novedades exclusivas.</li>
                <li>Posibilidad de participar en foros cerrados con el equipo y otros colaboradores (para donaciones recurrentes).</li>
                <li>Acceso anticipado a ciertos contenidos verificados.</li>
              </ul>
              <p className="mt-8 text-soft-lavender dark:text-white/80">
                Para más detalles sobre los incentivos o si tienes alguna pregunta sobre las donaciones, por favor <Link to="/contact" className="text-royal-purple dark:text-glacial-blue hover:underline font-semibold">contáctanos</Link>.
              </p>
            </div>
          </section>
        </motion.div>
      );
    };

    export default DonationsPage;