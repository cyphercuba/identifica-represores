import React from 'react';
    import { Link, useSearchParams } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { MapPin, ChevronDown, ChevronRight, AlertTriangle, Database, Users } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { initialRepressors, provincesOfCuba, getMunicipalitiesForProvince } from '@/data/dummyData';
    import RepressorList from '@/components/RepressorList';
    import { Badge } from '@/components/ui/badge';

    const Disclosure = ({ title, children, defaultOpen = false, repressorCount = 0, municipalityDenuncias = 0 }) => {
      const [isOpen, setIsOpen] = React.useState(defaultOpen);
      const hasContent = repressorCount > 0 || municipalityDenuncias > 0;

      return (
        <Card className="mb-4 shadow-md glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/30 border-dark-red/30 dark:border-soft-lavender/30">
          <CardHeader 
            className="flex flex-row items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-royal-purple/10 dark:hover:bg-royal-purple/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <div className="flex flex-col sm:flex-row sm:items-center">
                <CardTitle className="text-md sm:text-lg text-royal-purple dark:text-glacial-blue">{title}</CardTitle>
                {hasContent && (
                    <div className="flex space-x-2 mt-1 sm:mt-0 sm:ml-3">
                        {repressorCount > 0 && <Badge variant="secondary" className="text-xs bg-glacial-blue/20 text-glacial-blue dark:bg-glacial-blue/30 dark:text-glacial-blue border-glacial-blue/30"><Users className="h-3 w-3 mr-1"/> {repressorCount} Represores</Badge>}
                        {municipalityDenuncias > 0 && <Badge variant="destructive" className="text-xs bg-crimson-red/20 text-crimson-red dark:bg-crimson-red/30 dark:text-crimson-red border-crimson-red/30"><AlertTriangle className="h-3 w-3 mr-1"/> {municipalityDenuncias} Denuncias</Badge>}
                    </div>
                )}
            </div>
            {isOpen ? <ChevronDown className="h-5 w-5 text-soft-lavender dark:text-white" /> : <ChevronRight className="h-5 w-5 text-soft-lavender dark:text-white" />}
          </CardHeader>
          {isOpen && (
            <CardContent className="p-3 sm:p-4 border-t border-dark-red/50 dark:border-soft-lavender/50">
              {children}
            </CardContent>
          )}
        </Card>
      );
    };

    const ProvincesPage = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const provinceFromUrl = searchParams.get('prov');

      const [selectedProvince, setSelectedProvince] = React.useState(provinceFromUrl || null);
      const [municipalities, setMunicipalities] = React.useState([]); 
      const [allRepressorsData, setAllRepressorsData] = React.useState([]);
      const { toast } = useToast();

      React.useEffect(() => {
        const storedRepressors = JSON.parse(localStorage.getItem('repressors')) || initialRepressors;
        setAllRepressorsData(storedRepressors);
        if (selectedProvince) {
            const fetchedMunicipalities = getMunicipalitiesForProvince(selectedProvince);
            setMunicipalities(fetchedMunicipalities);
        } else {
            setMunicipalities([]); 
        }
      }, [selectedProvince]);

      const handleProvinceSelect = (province) => {
        setSelectedProvince(province);
        setSearchParams({ prov: province });
        toast({ title: "Provincia Seleccionada", description: `Has seleccionado ${province}. Mostrando sus municipios.`, className: "bg-glacial-blue text-midnight-blue dark:bg-glacial-blue dark:text-midnight-blue" });
      };

      const getRepressorsByMunicipality = (municipality) => {
        return allRepressorsData.filter(r => r.province === selectedProvince && r.municipality === municipality);
      };
      
      const getDenunciasCountForProvince = (provinceName) => {
        return allRepressorsData.filter(r => r.province === provinceName).reduce((sum, r) => sum + (r.denunciasCount || 0), 0);
      };

      const getDenunciasCountForMunicipality = (provinceName, municipalityName) => {
        return allRepressorsData.filter(r => r.province === provinceName && r.municipality === municipalityName).reduce((sum, r) => sum + (r.denunciasCount || 0), 0);
      };
      
      const getRepressorCountForProvince = (provinceName) => {
        return allRepressorsData.filter(r => r.province === provinceName).length;
      };

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-royal-purple dark:text-glacial-blue">Explorar por Provincias y Municipios</h1>
          
          <Card className="mb-8 p-4 sm:p-6 shadow-xl glassmorphism bg-midnight-blue/10 dark:bg-smoke-purple/20 border-dark-red/30 dark:border-soft-lavender/30">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-soft-lavender dark:text-white">Selecciona una Provincia</h2>
            <p className="text-xs sm:text-sm text-soft-lavender/80 dark:text-white/80 mt-2 text-center">Haz clic en una provincia en la lista de abajo para explorarla.</p>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-soft-lavender dark:text-white">Provincias de Cuba</h2>
              <div className="space-y-2">
                {provincesOfCuba.map(province => {
                  const denunciasCount = getDenunciasCountForProvince(province);
                  const repressorCount = getRepressorCountForProvince(province);
                  return (
                    <Button 
                      key={province} 
                      variant={selectedProvince === province ? "default" : "outline"}
                      className={`w-full justify-between text-left py-2.5 px-3 h-auto ${selectedProvince === province ? 'bg-royal-purple text-white dark:bg-royal-purple dark:text-white' : 'border-royal-purple/50 text-royal-purple dark:text-soft-lavender dark:border-soft-lavender/50 hover:bg-royal-purple/20 dark:hover:bg-soft-lavender/20 hover:text-white dark:hover:text-midnight-blue'}`}
                      onClick={() => handleProvinceSelect(province)}
                    >
                      <span className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> {province}</span>
                      <div className="flex items-center space-x-2">
                        {repressorCount > 0 && <Badge variant="secondary" className="text-xs py-0.5 px-1.5 bg-glacial-blue/20 text-glacial-blue dark:bg-glacial-blue/30 dark:text-glacial-blue border-glacial-blue/30"><Users className="h-3 w-3 mr-1"/>{repressorCount}</Badge>}
                        {denunciasCount > 0 && <Badge variant="destructive" className="text-xs py-0.5 px-1.5 bg-crimson-red/20 text-crimson-red dark:bg-crimson-red/30 dark:text-crimson-red border-crimson-red/30"><AlertTriangle className="h-3 w-3 mr-1"/>{denunciasCount}</Badge>}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="md:col-span-2">
              {selectedProvince ? (
                <>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-soft-lavender dark:text-white">Municipios de {selectedProvince}</h2>
                  {municipalities.length > 0 ? (
                    municipalities.map(municipality => {
                      const repressorsInMunicipality = getRepressorsByMunicipality(municipality);
                      const denunciasInMunicipality = getDenunciasCountForMunicipality(selectedProvince, municipality);
                      return (
                        <Disclosure 
                            key={municipality} 
                            title={municipality} 
                            defaultOpen={municipalities.length === 1 || repressorsInMunicipality.length > 0}
                            repressorCount={repressorsInMunicipality.length}
                            municipalityDenuncias={denunciasInMunicipality}
                        >
                          <RepressorList repressors={repressorsInMunicipality} />
                          {repressorsInMunicipality.length === 0 && <p className="text-soft-lavender/70 dark:text-white/70 text-sm">No hay represores registrados para este municipio.</p>}
                        </Disclosure>
                      );
                    })
                  ) : (
                    <Card className="p-4 sm:p-6 border-2 border-dashed border-dark-red/50 dark:border-soft-lavender/50 rounded-lg glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/20">
                        <div className="flex flex-col items-center justify-center text-center">
                            <Database className="h-12 w-12 text-royal-purple dark:text-glacial-blue mb-3" />
                            <p className="text-md sm:text-lg text-soft-lavender dark:text-white">No hay municipios listados para {selectedProvince} o no hay datos de represores en esta área.</p>
                            <p className="text-xs sm:text-sm text-soft-lavender/80 dark:text-white/80 mt-1">Esto podría deberse a que no se han reportado casos o la información aún está siendo procesada.</p>
                        </div>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="flex flex-col items-center justify-center h-full p-6 sm:p-8 border-2 border-dashed border-dark-red/50 dark:border-soft-lavender/50 rounded-lg glassmorphism bg-midnight-blue/5 dark:bg-smoke-purple/20">
                  <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-royal-purple dark:text-glacial-blue mb-4" />
                  <p className="text-md sm:text-xl text-soft-lavender dark:text-white text-center">Selecciona una provincia de la lista para ver sus municipios y los represores asociados.</p>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      );
    };

    export default ProvincesPage;