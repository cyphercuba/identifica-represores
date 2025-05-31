import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Search, ShieldCheck, UploadCloud, MapPin, ChevronRight, ListChecks, FileText, Users, MessageSquare } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { provincesOfCuba } from '@/data/dummyData'; // Keep for province list for now
    import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

    const HomePage = () => {
      const [searchTerm, setSearchTerm] = React.useState('');
      const [latestRepressors, setLatestRepressors] = React.useState([]);
      const [loadingRepressors, setLoadingRepressors] = React.useState(true);
      const navigate = useNavigate();
      const { toast } = useToast();

      React.useEffect(() => {
        const fetchLatestRepressors = async () => {
          setLoadingRepressors(true);
          // Fetch from 'represores' table, order by created_at, limit 3
          // Also fetch related 'denuncias' count and one 'denuncia' text for preview
          const { data, error } = await supabase
            .from('represores')
            .select(`
              id,
              nombre,
              apellido,
              provincia,
              descripcion, 
              created_at,
              denuncias (
                id,
                testimonio
              )
            `)
            .order('created_at', { ascending: false })
            .limit(3);

          if (error) {
            console.error("Error fetching latest repressors:", error);
            toast({ title: "Error al Cargar Casos", description: "No se pudieron cargar los últimos casos.", variant: "destructive" });
            setLatestRepressors([]); // Set to empty array on error
          } else {
            const formattedData = data.map(r => ({
              id: r.id,
              name: `${r.nombre} ${r.apellido}`, // Combine nombre and apellido
              alias: '', // Alias would need to be in 'represores' or a related table
              institution: r.descripcion ? r.descripcion.split(' ')[0] : 'MININT', // Simplified institution from descripcion
              province: r.provincia,
              history: r.denuncias && r.denuncias.length > 0 ? [{ event: r.denuncias[0].testimonio.substring(0,100) + "..." }] : [{event: "Sin historial documentado aún."}], // Use first denuncia as preview
              denunciasCount: r.denuncias ? r.denuncias.length : 0,
              // Assuming a default image or logic to get one
              photoUrl: "https://images.unsplash.com/photo-1515381881585-7bd8e76ebf92" 
            }));
            setLatestRepressors(formattedData);
          }
          setLoadingRepressors(false);
        };

        fetchLatestRepressors();
      }, [toast]);

      const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
          toast({ title: "Error de Búsqueda", description: "Por favor, ingrese un término para buscar.", variant: "destructive", className: "bg-crimson-red text-white" });
          return;
        }
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      };

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <section className="text-center py-12 md:py-16 bg-gradient-to-r from-royal-purple/10 to-crimson-red/10 dark:from-royal-purple/20 dark:to-crimson-red/20 rounded-xl shadow-2xl glassmorphism mb-12 border border-dark-red/30">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-royal-purple dark:text-soft-lavender">Exponiendo a los Represores del Régimen Cubano</h1>
              <p className="text-lg md:text-xl text-soft-lavender dark:text-smoke-purple mb-8 max-w-3xl mx-auto">
                Este sitio expone a represores políticos y militares del régimen cubano. Nuestra misión es visibilizar a quienes han violado derechos humanos, brindando a las víctimas un espacio seguro para denunciar y documentar.
              </p>
              <div className="mb-8 w-full max-w-2xl mx-auto aspect-video bg-soft-lavender/30 dark:bg-smoke-purple/50 rounded-lg flex items-center justify-center border border-dark-red/20">
                <img  alt="Video simbólico sobre lucha y memoria en Cuba" className="object-cover w-full h-full rounded-lg" src="https://images.unsplash.com/photo-1697229472850-a947c15315de" />
              </div>
            </div>
          </section>

          <section className="mb-12 py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-royal-purple dark:text-soft-lavender">Encuentra Información</h2>
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                <Input 
                  type="text" 
                  placeholder="🔍 Buscar represor por nombre, provincia o institución..." 
                  className="flex-grow text-base sm:text-lg p-4 rounded-lg border-2 border-royal-purple/50 focus:border-crimson-red bg-soft-lavender/20 dark:bg-smoke-purple/30 text-midnight-blue dark:text-soft-lavender placeholder:text-midnight-blue/70 dark:placeholder:text-soft-lavender/70"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Buscar represor"
                />
                <Button type="submit" size="lg" className="bg-royal-purple text-white hover:bg-crimson-red focus:ring-glacial-blue text-base sm:text-lg w-full sm:w-auto btn-primary-hover">
                  <Search className="mr-2 h-5 w-5" /> Buscar
                </Button>
              </form>
            </div>
          </section>

          <section className="mb-12 py-8 bg-soft-lavender/10 dark:bg-smoke-purple/20 rounded-lg glassmorphism border border-dark-red/20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-royal-purple dark:text-soft-lavender">Explora por Provincia</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {provincesOfCuba.slice(0,10).map(province => (
                  <Button key={province} variant="outline" asChild className="text-left justify-start border-royal-purple/50 text-royal-purple dark:text-soft-lavender dark:border-soft-lavender/50 hover:bg-royal-purple/20 dark:hover:bg-soft-lavender/20 hover:text-white dark:hover:text-midnight-blue">
                    <Link to={`/provinces?prov=${encodeURIComponent(province)}`}>
                      <MapPin className="mr-2 h-4 w-4 opacity-70" /> {province}
                    </Link>
                  </Button>
                ))}
                <Button variant="default" asChild className="col-span-full sm:col-span-1 md:col-span-2 lg:col-span-5 bg-royal-purple text-white hover:bg-crimson-red btn-primary-hover">
                    <Link to="/provinces">
                      Ver Todas las Provincias <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="mb-12 py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center text-royal-purple dark:text-soft-lavender">Últimos Casos Añadidos</h2>
              {loadingRepressors ? (
                <div className="text-center text-soft-lavender dark:text-white">Cargando últimos casos...</div>
              ) : latestRepressors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {latestRepressors.map(repressor => (
                    <motion.div key={repressor.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 glassmorphism card-repressor-profile flex flex-col h-full bg-soft-lavender dark:bg-smoke-purple border-dark-red">
                        <CardHeader className="bg-royal-purple/10 dark:bg-royal-purple/20 p-4">
                          <img  alt={`Foto de ${repressor.name}`} className="w-full h-40 object-cover rounded-md mb-3 bg-soft-lavender/50 dark:bg-smoke-purple/70" src={repressor.photoUrl} />
                          <CardTitle className="text-lg sm:text-xl text-royal-purple dark:text-glacial-blue">{repressor.name} {repressor.alias && <span className="text-xs sm:text-sm text-midnight-blue/80 dark:text-soft-lavender/80">({repressor.alias})</span>}</CardTitle>
                          <CardDescription className="text-xs sm:text-sm text-midnight-blue/70 dark:text-soft-lavender/70">{repressor.institution} – {repressor.province}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                          <p className="text-sm text-midnight-blue dark:text-soft-lavender line-clamp-3">
                            {repressor.history.length > 0 ? repressor.history[0].event : "Sin historial documentado aún."}
                          </p>
                        </CardContent>
                        <CardFooter className="p-4 bg-royal-purple/5 dark:bg-royal-purple/10 border-t border-dark-red/50">
                          <Button asChild variant="link" size="sm" className="text-royal-purple dark:text-glacial-blue hover:text-crimson-red dark:hover:text-crimson-red font-semibold">
                            <Link to={`/repressor/${repressor.id}`}>Ver Perfil Completo <ChevronRight className="ml-1 h-4 w-4" /></Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-soft-lavender dark:text-white">No hay casos recientes para mostrar.</p>
              )}
              { latestRepressors.length >=3 && 
                <div className="mt-8 text-center">
                    <Button asChild size="lg" variant="outline" className="border-royal-purple text-royal-purple hover:bg-royal-purple/20 hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue/20 dark:hover:text-midnight-blue">
                        <Link to="/search">Ver Más Casos <ChevronRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
              }
            </div>
          </section>

          <section className="mb-12 py-10 bg-gradient-to-r from-crimson-red to-dark-red dark:from-crimson-red/90 dark:to-dark-red/90 text-white rounded-xl shadow-2xl glassmorphism">
            <div className="container mx-auto px-4 text-center">
              <UploadCloud className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl font-bold mb-3">¿Tienes Pruebas o Testimonios?</h2>
              <p className="text-lg mb-6 max-w-xl mx-auto">
                Ayuda a exponer a los represores. Tu denuncia puede cambiar la historia. Sube fotos, videos o tu testimonio de forma segura.
              </p>
              <Button asChild size="lg" variant="outline" className="bg-soft-lavender/20 hover:bg-soft-lavender/30 border-white text-white hover:text-royal-purple text-lg font-semibold">
                <Link to="/upload">
                  🧾 Subir Evidencia
                </Link>
              </Button>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container mx-auto px-4 text-center">
              <ShieldCheck className="h-16 w-16 text-royal-purple dark:text-glacial-blue mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-royal-purple dark:text-soft-lavender">Contenido Exclusivo para Suscriptores</h2>
              <p className="text-lg text-midnight-blue dark:text-soft-lavender/80 mb-8 max-w-2xl mx-auto">
                Apoya nuestra misión y obtén acceso a dossiers especiales, entrevistas a víctimas, documentos filtrados y acceso anticipado a denuncias verificadas.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <Card className="glassmorphism p-5 bg-soft-lavender dark:bg-smoke-purple border-dark-red">
                  <FileText className="h-10 w-10 text-royal-purple dark:text-glacial-blue mb-3" />
                  <h3 className="text-xl font-semibold mb-1 text-royal-purple dark:text-soft-lavender">Dossiers Especiales</h3>
                  <p className="text-sm text-midnight-blue dark:text-soft-lavender/80">Investigaciones profundas sobre casos clave.</p>
                </Card>
                <Card className="glassmorphism p-5 bg-soft-lavender dark:bg-smoke-purple border-dark-red">
                  <Users className="h-10 w-10 text-royal-purple dark:text-glacial-blue mb-3" />
                  <h3 className="text-xl font-semibold mb-1 text-royal-purple dark:text-soft-lavender">Entrevistas y Análisis</h3>
                  <p className="text-sm text-midnight-blue dark:text-soft-lavender/80">Testimonios directos y perspectivas de expertos.</p>
                </Card>
                <Card className="glassmorphism p-5 bg-soft-lavender dark:bg-smoke-purple border-dark-red">
                  <ListChecks className="h-10 w-10 text-royal-purple dark:text-glacial-blue mb-3" />
                  <h3 className="text-xl font-semibold mb-1 text-royal-purple dark:text-soft-lavender">Acceso Anticipado</h3>
                  <p className="text-sm text-midnight-blue dark:text-soft-lavender/80">Información verificada antes de su publicación general.</p>
                </Card>
              </div>
              <Button asChild size="lg" className="bg-royal-purple text-white hover:bg-crimson-red btn-primary-hover">
                <Link to="/subscribers">
                  Suscribirse / Ver Planes
                </Link>
              </Button>
            </div>
          </section>
        </motion.div>
      );
    };

    export default HomePage;