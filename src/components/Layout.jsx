import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { ShieldCheck, Eye, LogIn, LogOut as LogOutIcon, Globe, HelpCircle, ListChecks, UserPlus, Search as SearchIcon, UploadCloud as UploadCloudIcon, Map as MapIcon, Moon, Sun, Users as UsersIconNav, Heart as HeartIcon, AlertTriangle as AlertTriangleIcon, User as UserIcon } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Toaster } from '@/components/ui/toaster';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';

    const NavLink = ({ to, children, className }) => (
      <Link to={to} className={`text-foreground hover:text-primary dark:hover:text-royal-purple transition-colors duration-300 font-medium ${className}`}>
        {children}
      </Link>
    );

    const Layout = ({ children }) => {
      const [darkMode, setDarkMode] = React.useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
      });
      const { session, user, signOut, isAdmin } = useAuth();
      const navigate = useNavigate();
      const { toast } = useToast();

      React.useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }, [darkMode]);

      const toggleDarkMode = () => setDarkMode(!darkMode);

      const handleSignOut = async () => {
        await signOut();
        localStorage.removeItem('isAdmin'); // Clear admin flag on sign out
        toast({ title: "Sesión Cerrada", description: "Has cerrado sesión exitosamente." });
        navigate('/');
      };

      return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <header className="sticky top-0 z-50 shadow-lg glassmorphism bg-midnight-blue/80 dark:bg-midnight-blue/90">
            <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-soft-lavender dark:text-royal-purple flex items-center">
                <ShieldCheck className="mr-2 h-7 w-7 sm:h-8 sm:w-8 text-glacial-blue" />
                <span className="hidden sm:inline">Identifica Represores</span>
                <span className="sm:hidden">ID Rep</span>
              </Link>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <NavLink to="/provinces" className="hidden md:inline-flex items-center px-2 py-1 text-soft-lavender hover:text-glacial-blue"><MapIcon className="mr-1 h-4 w-4" />Provincias</NavLink>
                <NavLink to="/upload" className="hidden md:inline-flex items-center px-2 py-1 text-soft-lavender hover:text-glacial-blue"><UploadCloudIcon className="mr-1 h-4 w-4" />Subir Evidencia</NavLink>
                <NavLink to="/search" className="hidden md:inline-flex items-center px-2 py-1 text-soft-lavender hover:text-glacial-blue"><SearchIcon className="mr-1 h-4 w-4" />Buscar</NavLink>
                <NavLink to="/subscribers" className="hidden lg:inline-flex items-center px-2 py-1 text-soft-lavender hover:text-glacial-blue"><ListChecks className="mr-1 h-4 w-4" />Suscripción</NavLink>
                <NavLink to="/donations" className="hidden lg:inline-flex items-center px-2 py-1 text-soft-lavender hover:text-glacial-blue"><HeartIcon className="mr-1 h-4 w-4" />Donar</NavLink>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden text-soft-lavender hover:text-glacial-blue">
                      <ListChecks className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-midnight-blue border-dark-red text-soft-lavender">
                    <DropdownMenuItem asChild><NavLink to="/provinces" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><MapIcon className="mr-2 h-4 w-4" />Provincias</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/upload" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><UploadCloudIcon className="mr-2 h-4 w-4" />Subir Evidencia</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/search" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><SearchIcon className="mr-2 h-4 w-4" />Buscar</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/subscribers" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><ListChecks className="mr-2 h-4 w-4" />Suscripción</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/donations" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><HeartIcon className="mr-2 h-4 w-4" />Donar</NavLink></DropdownMenuItem>
                     <DropdownMenuSeparator className="bg-dark-red/50" />
                    <DropdownMenuItem asChild><NavLink to="/community" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><UsersIconNav className="mr-2 h-4 w-4" />Comunidad</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/report-content" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><AlertTriangleIcon className="mr-2 h-4 w-4" />Reportar Contenido</NavLink></DropdownMenuItem>
                    <DropdownMenuItem asChild><NavLink to="/contact" className="w-full justify-start flex items-center text-soft-lavender hover:!text-glacial-blue"><HelpCircle className="mr-2 h-4 w-4" />Contacto</NavLink></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-soft-lavender hover:text-glacial-blue">
                      <Globe className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-midnight-blue border-dark-red text-soft-lavender">
                    <DropdownMenuItem className="hover:!bg-royal-purple/50 focus:!bg-royal-purple/50">Español</DropdownMenuItem>
                    <DropdownMenuItem disabled className="opacity-50">English (Próximamente)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="text-soft-lavender hover:text-glacial-blue">
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                
                {session ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-soft-lavender hover:text-glacial-blue rounded-full">
                                <UserIcon className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-midnight-blue border-dark-red text-soft-lavender">
                            <DropdownMenuLabel className="text-xs text-glacial-blue">{user?.email}</DropdownMenuLabel>
                            {isAdmin && (
                                <DropdownMenuItem asChild className="hover:!bg-royal-purple/50 focus:!bg-royal-purple/50">
                                    <Link to="/admin" className="flex items-center w-full text-soft-lavender hover:!text-white">
                                        <ShieldCheck className="mr-2 h-4 w-4" /> Panel Admin
                                    </Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-dark-red/50" />
                            <DropdownMenuItem onClick={handleSignOut} className="hover:!bg-crimson-red/50 focus:!bg-crimson-red/50 text-soft-lavender hover:!text-white cursor-pointer">
                                <LogOutIcon className="mr-2 h-4 w-4" /> Cerrar Sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="px-2 sm:px-3 bg-royal-purple text-white hover:bg-crimson-red border-royal-purple hover:border-crimson-red btn-primary-hover">
                                <LogIn className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Acceder</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-midnight-blue border-dark-red text-soft-lavender">
                            <DropdownMenuItem asChild className="hover:!bg-royal-purple/50 focus:!bg-royal-purple/50">
                                <Link to="/login" className="flex items-center w-full text-soft-lavender hover:!text-white">
                                    <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="hover:!bg-royal-purple/50 focus:!bg-royal-purple/50">
                                <Link to="/register" className="flex items-center w-full text-soft-lavender hover:!text-white">
                                    <UserPlus className="mr-2 h-4 w-4" /> Registrarse
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          <footer className="py-8 text-center bg-midnight-blue/90 dark:bg-smoke-purple/80 glassmorphism mt-12 border-t-2 border-dark-red">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="font-semibold text-soft-lavender dark:text-royal-purple mb-1">Información Legal</p>
                  <NavLink to="/privacy" className="block text-muted-foreground hover:text-glacial-blue">Política de Privacidad</NavLink>
                  <NavLink to="/terms" className="block text-muted-foreground hover:text-glacial-blue">Términos de Uso</NavLink>
                </div>
                 <div>
                  <p className="font-semibold text-soft-lavender dark:text-royal-purple mb-1">Navegación</p>
                  <NavLink to="/community" className="block text-muted-foreground hover:text-glacial-blue">Comunidad</NavLink>
                  <NavLink to="/donations" className="block text-muted-foreground hover:text-glacial-blue">Donaciones y Transparencia</NavLink>
                </div>
                <div>
                  <p className="font-semibold text-soft-lavender dark:text-royal-purple mb-1">Soporte y Colaboración</p>
                  <NavLink to="/contact" className="block text-muted-foreground hover:text-glacial-blue">Contacto</NavLink>
                  <NavLink to="/report-content" className="block text-muted-foreground hover:text-glacial-blue">Reportar Contenido</NavLink>
                  <NavLink to="/report-error" className="block text-muted-foreground hover:text-glacial-blue">Reportar Error Técnico</NavLink>
                </div>
                <div>
                  <p className="font-semibold text-soft-lavender dark:text-royal-purple mb-1">Créditos</p>
                  <span className="block text-muted-foreground">Colaboradores anónimos</span>
                  <span className="block text-muted-foreground">Investigadores independientes</span>
                </div>
              </div>
              <div className="border-t border-dark-red/50 pt-4">
                <p className="text-muted-foreground">&copy; {new Date().getFullYear()} IdentificaRepresores. Todos los derechos reservados.</p>
                <p className="text-xs text-muted-foreground mt-1">Construido con ❤️ por la justicia y la memoria.</p>
              </div>
            </div>
          </footer>
          <Toaster />
        </div>
      );
    };
    
    export default Layout;