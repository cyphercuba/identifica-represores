import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { LogIn, ShieldCheck } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const LoginPage = () => {
      const { toast } = useToast();
      const navigate = useNavigate();
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [isLoading, setIsLoading] = React.useState(false);

      const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          toast({ title: "Error de Inicio de Sesión", description: error.message || "Credenciales incorrectas. Por favor, inténtalo de nuevo.", variant: "destructive" });
        } else if (data.user) {
          toast({ title: "Inicio de Sesión Exitoso", description: "Bienvenido de nuevo. Redirigiendo..." });
          
          // Check for admin role (example, you might have a 'roles' table or custom claims)
          // For now, we'll keep the email check for admin for simplicity, but ideally this would be a Supabase role.
          if (data.user.email === "admin@example.com") {
             localStorage.setItem('isAdmin', 'true'); // This is a temporary client-side flag
             navigate("/admin");
          } else {
            localStorage.removeItem('isAdmin');
            navigate("/"); 
          }
        }
        setIsLoading(false);
      };

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto mt-8 sm:mt-12">
          <Card className="shadow-xl glassmorphism overflow-hidden">
            <CardHeader className="text-center bg-primary/5 dark:bg-secondary/20 p-6">
              <ShieldCheck className="h-12 w-12 text-primary dark:text-accent mx-auto mb-3" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary dark:text-accent">Iniciar Sesión</CardTitle>
              <CardDescription className="text-muted-foreground">Accede a tu cuenta para continuar documentando y explorando.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="mt-1" 
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="mt-1"
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 dark:from-accent dark:to-orange-600 dark:hover:from-accent/90 dark:hover:to-orange-600/90" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" /> Entrar
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm p-6 bg-muted/10 dark:bg-secondary/10 border-t dark:border-border/20">
              <p className="text-muted-foreground">
                ¿No tienes una cuenta? <Link to="/register" className="font-semibold text-primary dark:text-accent hover:underline">Regístrate aquí</Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default LoginPage;