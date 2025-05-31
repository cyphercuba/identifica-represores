import React from 'react';
    import { motion } from 'framer-motion';
    import { ShieldCheck, Users, FileText, Settings, BarChart3, LogOut } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { useNavigate } from 'react-router-dom';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

    const AdminPage = () => {
        const navigate = useNavigate();
        const { toast } = useToast(); 
        const { isAdmin, user, signOut, loading } = useAuth(); // Get isAdmin and signOut from context
        
        React.useEffect(() => {
            if (!loading && !isAdmin) { // Check isAdmin from context
                toast({
                    title: "Acceso Denegado",
                    description: "Debes ser administrador para acceder a esta página.",
                    variant: "destructive"
                });
                navigate('/login'); 
            }
        }, [navigate, toast, isAdmin, loading]);

        const handleAdminSignOut = async () => {
            await signOut();
            localStorage.removeItem('isAdmin'); // Ensure client-side flag is also cleared
            toast({title: "Sesión de Administrador Cerrada", description: "Has cerrado sesión como administrador."});
            navigate('/');
        };

        if (loading) {
            return <div className="text-center py-10 text-xl text-royal-purple dark:text-glacial-blue">Verificando acceso de administrador...</div>;
        }
        
        if (!isAdmin) {
             // This is a fallback, useEffect should redirect already
            return <div className="text-center py-10 text-xl text-red-500">Acceso Denegado.</div>;
        }


        return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-12">
                <ShieldCheck className="h-16 w-16 text-primary dark:text-accent mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-primary dark:text-accent">Panel de Administración</h1>
                <p className="text-lg text-muted-foreground">Gestión de contenido, usuarios y estadísticas del sitio. Bienvenido, {user?.email}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium text-primary dark:text-gray-200">Moderar Contenido</CardTitle>
                        <FileText className="h-6 w-6 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Revisar y aprobar/rechazar nuevas denuncias, testimonios y archivos subidos por los usuarios.</p>
                        <Button variant="outline" className="w-full" disabled>Acceder a Moderación</Button>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium text-primary dark:text-gray-200">Gestionar Usuarios</CardTitle>
                        <Users className="h-6 w-6 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Ver lista de usuarios registrados, roles, y administrar cuentas (suspender, eliminar, etc.).</p>
                        <Button variant="outline" className="w-full" disabled>Administrar Usuarios</Button>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium text-primary dark:text-gray-200">Verificar Pruebas</CardTitle>
                        <ShieldCheck className="h-6 w-6 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Proceso de verificación de la autenticidad de testimonios y pruebas antes de su publicación.</p>
                        <Button variant="outline" className="w-full" disabled>Panel de Verificación</Button>
                    </CardContent>
                </Card>
                
                <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium text-primary dark:text-gray-200">Estadísticas</CardTitle>
                        <BarChart3 className="h-6 w-6 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Visualizar datos de uso del sitio, número de denuncias, contribuciones, y más.</p>
                        <Button variant="outline" className="w-full" disabled>Ver Estadísticas</Button>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow glassmorphism md:col-span-2 lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-medium text-primary dark:text-gray-200">Configuración del Sitio</CardTitle>
                        <Settings className="h-6 w-6 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Ajustes generales del sitio, categorías, etiquetas, y otros parámetros de configuración.</p>
                        <Button variant="destructive" className="w-full sm:w-auto" disabled>Ajustes Avanzados</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-12 text-center">
                <Button onClick={handleAdminSignOut} variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                   <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión de Administrador
                </Button>
            </div>
        </motion.div>
        );
    };
    export default AdminPage;