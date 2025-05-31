import React from 'react';
    import { Link, useSearchParams, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Filter, Search as SearchIcon, XCircle, Tag as TagIcon } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { initialRepressors, provincesOfCuba, tagTypes, getAllTags } from '@/data/dummyData';
    import RepressorList from '@/components/RepressorList';
    import { Badge } from '@/components/ui/badge';


    const AdvancedSearchPage = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const navigate = useNavigate();
      const { toast } = useToast();

      const allAvailableTags = getAllTags();

      const [filters, setFilters] = React.useState({
        query: searchParams.get('query') || '',
        province: searchParams.get('province') || '',
        municipality: searchParams.get('municipality') || '',
        institution: searchParams.get('institution') || '',
        sortBy: searchParams.get('sortBy') || 'relevance',
        tags: searchParams.getAll('tag') || [],
      });
      const [results, setResults] = React.useState([]);
      const [allRepressors, setAllRepressors] = React.useState([]);

      React.useEffect(() => {
        const storedRepressors = JSON.parse(localStorage.getItem('repressors')) || initialRepressors;
        const augmentedRepressors = storedRepressors.map(r => ({
            ...r,
            institution: r.institution || (r.rank && r.rank.toLowerCase().includes('pcc') ? 'PCC' : (r.rank && r.rank.toLowerCase().includes('far') ? 'FAR' : 'MININT')) || 'MININT',
            tags: r.tags || []
        }));
        setAllRepressors(augmentedRepressors);
        performSearch(filters, augmentedRepressors);
      }, []); 

      const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
      };

      const handleTagToggle = (tagId) => {
        setFilters(prev => {
            const newTags = prev.tags.includes(tagId)
                ? prev.tags.filter(t => t !== tagId)
                : [...prev.tags, tagId];
            return { ...prev, tags: newTags };
        });
      };

      const performSearch = (currentFilters, dataToSearch) => {
        let filteredData = dataToSearch.filter(repressor => {
          const queryMatch = currentFilters.query
            ? repressor.name.toLowerCase().includes(currentFilters.query.toLowerCase()) ||
              (repressor.alias && repressor.alias.toLowerCase().includes(currentFilters.query.toLowerCase()))
            : true;
          const provinceMatch = currentFilters.province ? repressor.province === currentFilters.province : true;
          const municipalityMatch = currentFilters.municipality
            ? repressor.municipality && repressor.municipality.toLowerCase().includes(currentFilters.municipality.toLowerCase())
            : true;
          const institutionMatch = currentFilters.institution 
            ? (repressor.institution && repressor.institution.toLowerCase().includes(currentFilters.institution.toLowerCase())) || (repressor.rank && repressor.rank.toLowerCase().includes(currentFilters.institution.toLowerCase()))
            : true;
          const tagsMatch = currentFilters.tags.length > 0 
            ? currentFilters.tags.every(tag => repressor.tags.includes(tag))
            : true;
          
          return queryMatch && provinceMatch && municipalityMatch && institutionMatch && tagsMatch;
        });

        if (currentFilters.sortBy === 'date_recent') {
          filteredData.sort((a, b) => (b.history && b.history[0]?.date || '').localeCompare(a.history && a.history[0]?.date || ''));
        } else if (currentFilters.sortBy === 'date_oldest') {
          filteredData.sort((a, b) => (a.history && a.history[0]?.date || '').localeCompare(b.history && b.history[0]?.date || ''));
        } else if (currentFilters.sortBy === 'name_asc') {
          filteredData.sort((a,b) => a.name.localeCompare(b.name));
        } else if (currentFilters.sortBy === 'name_desc') {
          filteredData.sort((a,b) => b.name.localeCompare(a.name));
        }
        
        setResults(filteredData);
        if (filteredData.length === 0 && (currentFilters.query || currentFilters.province || currentFilters.municipality || currentFilters.institution || currentFilters.tags.length > 0)) {
          toast({ title: "Sin Resultados", description: "No se encontraron represores con los filtros aplicados.", className: "bg-glacial-blue text-midnight-blue dark:bg-glacial-blue dark:text-midnight-blue" });
        }
      };
      
      const handleSearchSubmit = (e) => {
        e.preventDefault();
        performSearch(filters, allRepressors);
        const newSearchParams = new URLSearchParams();
        if (filters.query) newSearchParams.set('query', filters.query);
        if (filters.province) newSearchParams.set('province', filters.province);
        if (filters.municipality) newSearchParams.set('municipality', filters.municipality);
        if (filters.institution) newSearchParams.set('institution', filters.institution);
        if (filters.sortBy) newSearchParams.set('sortBy', filters.sortBy);
        filters.tags.forEach(tag => newSearchParams.append('tag', tag));
        setSearchParams(newSearchParams);
      };

      const clearFilters = () => {
        const clearedFilters = { query: '', province: '', municipality: '', institution: '', sortBy: 'relevance', tags: [] };
        setFilters(clearedFilters);
        setResults(allRepressors); 
        setSearchParams(new URLSearchParams());
        toast({ title: "Filtros Limpiados", description: "Mostrando todos los resultados.", className: "bg-glacial-blue text-midnight-blue dark:bg-glacial-blue dark:text-midnight-blue"});
      };

      const institutions = ['MININT', 'FAR', 'PCC', 'DSE', 'PNR', 'CDR', 'Fiscalía', 'Otro'];


      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-royal-purple dark:text-glacial-blue">Búsqueda Avanzada de Represores</h1>
          <Card className="p-4 sm:p-6 md:p-8 shadow-xl mb-8 glassmorphism bg-midnight-blue/10 dark:bg-smoke-purple/20 border-dark-red/30 dark:border-soft-lavender/30">
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="searchQuery" className="font-medium text-soft-lavender dark:text-white/90">Nombre o Alias</Label>
                  <Input id="searchQuery" value={filters.query} onChange={(e) => handleFilterChange('query', e.target.value)} placeholder="Ej: Juan Pérez, El Martillo..." className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white placeholder:text-soft-lavender/70 dark:placeholder:text-white/70" />
                </div>
                <div>
                  <Label htmlFor="searchProvince" className="font-medium text-soft-lavender dark:text-white/90">Provincia</Label>
                   <Select value={filters.province} onValueChange={(value) => handleFilterChange('province', value)}>
                    <SelectTrigger id="searchProvince" className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white"><SelectValue placeholder="Todas las provincias" className="select-trigger-text" /></SelectTrigger>
                    <SelectContent className="bg-soft-lavender dark:bg-smoke-purple border-dark-red dark:border-soft-lavender text-midnight-blue dark:text-white">
                      <SelectItem value="" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Todas las provincias</SelectItem>
                      {provincesOfCuba.map(p => <SelectItem key={p} value={p} className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="searchMunicipality" className="font-medium text-soft-lavender dark:text-white/90">Municipio</Label>
                  <Input id="searchMunicipality" value={filters.municipality} onChange={(e) => handleFilterChange('municipality', e.target.value)} placeholder="Ej: Plaza, Santiago..." className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white placeholder:text-soft-lavender/70 dark:placeholder:text-white/70" />
                </div>
                <div>
                  <Label htmlFor="searchInstitution" className="font-medium text-soft-lavender dark:text-white/90">Institución</Label>
                  <Select value={filters.institution} onValueChange={(value) => handleFilterChange('institution', value)}>
                    <SelectTrigger id="searchInstitution" className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white"><SelectValue placeholder="Cualquier institución" className="select-trigger-text" /></SelectTrigger>
                    <SelectContent className="bg-soft-lavender dark:bg-smoke-purple border-dark-red dark:border-soft-lavender text-midnight-blue dark:text-white">
                      <SelectItem value="" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Cualquier institución</SelectItem>
                      {institutions.map(i => <SelectItem key={i} value={i.toLowerCase()} className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="searchSortBy" className="font-medium text-soft-lavender dark:text-white/90">Ordenar Por</Label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger id="searchSortBy" className="mt-1 bg-soft-lavender/20 dark:bg-smoke-purple/40 border-dark-red/50 dark:border-soft-lavender/50 text-soft-lavender dark:text-white"><SelectValue className="select-trigger-text" /></SelectTrigger>
                    <SelectContent className="bg-soft-lavender dark:bg-smoke-purple border-dark-red dark:border-soft-lavender text-midnight-blue dark:text-white">
                      <SelectItem value="relevance" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Relevancia</SelectItem>
                      <SelectItem value="date_recent" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Fecha (Más Recientes)</SelectItem>
                      <SelectItem value="date_oldest" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Fecha (Más Antiguos)</SelectItem>
                      <SelectItem value="name_asc" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Nombre (A-Z)</SelectItem>
                      <SelectItem value="name_desc" className="select-item-text hover:!bg-royal-purple/20 focus:!bg-royal-purple/20">Nombre (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2">
                <Label className="font-medium text-soft-lavender dark:text-white/90">Filtrar por Etiquetas</Label>
                <div className="mt-2 flex flex-wrap gap-2 p-3 rounded-md border border-dark-red/50 dark:border-soft-lavender/50 bg-midnight-blue/5 dark:bg-smoke-purple/20">
                    {allAvailableTags.map(tag => (
                        <Button
                            type="button"
                            key={tag.id}
                            variant={filters.tags.includes(tag.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleTagToggle(tag.id)}
                            className={`text-xs ${filters.tags.includes(tag.id) ? `${tag.color} text-white dark:text-white` : `border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-300 hover:bg-gray-500/20 dark:hover:bg-gray-700/30`} ${tag.color && !filters.tags.includes(tag.id) ? tag.color.replace(/bg-\w+-\d+\/\d+/, 'border-' + tag.color.match(/(\w+)-\d+/)[1] + '-500/50').replace(/text-\w+-\d+/, 'text-' + tag.color.match(/(\w+)-\d+/)[1] + '-700 dark:text-' + tag.color.match(/(\w+)-\d+/)[1] + '-400') : ''}`}
                        >
                           <TagIcon className="mr-1.5 h-3.5 w-3.5" /> {tag.label}
                        </Button>
                    ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={clearFilters} className="w-full sm:w-auto border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white dark:border-glacial-blue dark:text-glacial-blue dark:hover:bg-glacial-blue dark:hover:text-midnight-blue">
                    <XCircle className="mr-2 h-5 w-5" /> Limpiar Filtros
                </Button>
                <Button type="submit" size="lg" className="w-full sm:w-auto bg-royal-purple text-white hover:bg-crimson-red btn-primary-hover">
                  <Filter className="mr-2 h-5 w-5" /> Aplicar Filtros y Buscar
                </Button>
              </div>
            </form>
          </Card>

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-royal-purple dark:text-glacial-blue">Resultados de la Búsqueda ({results.length})</h2>
          {results.length > 0 ? (
            <RepressorList repressors={results} />
          ) : (
            <div className="text-center py-10 px-6 border-2 border-dashed border-dark-red/50 dark:border-soft-lavender/50 rounded-lg glassmorphism bg-midnight-blue/10 dark:bg-smoke-purple/20">
                <SearchIcon className="h-16 w-16 text-royal-purple dark:text-glacial-blue mx-auto mb-4" />
                <p className="text-soft-lavender dark:text-white text-lg">No se encontraron represores que coincidan con tus criterios de búsqueda.</p>
                <p className="text-sm text-soft-lavender/80 dark:text-white/80 mt-2">Intenta ajustar tus filtros o revisa la ortografía.</p>
            </div>
          )}
        </motion.div>
      );
    };

    export default AdvancedSearchPage;