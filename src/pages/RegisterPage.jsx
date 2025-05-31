import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { UserPlus, ShieldCheck } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const RegisterPage = () => {
      const { toast } = useToast();
      const navigate = useNavigate();
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [confirmPassword, setConfirmPassword] = React.useState('');
      const [nombre, setNombre] = React.useState('');
      const [apellido, setApellido] = React.useState(''); // Added apellido state
      const [isLoading, setIsLoading] = React.useState(false);

      const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast({ title: "Error de Registro", description: "Las contraseñas no coinciden.", variant: "destructive" });
          return;
        }
        if (!nombre.trim() || !apellido.trim()) { // Added apellido check
          toast({ title: "Error de Registro", description: "Por favor, ingresa tu nombre y apellido.", variant: "destructive" });
          return;
        }
        setIsLoading(true);
        
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              nombre: nombre,
              apellido: apellido, // Pass apellido to metadata
              // provincia and foto_perfil can be added later by the user or through another form
            }
          }
        });

        if (error) {
          toast({ title: "Error de Registro", description: error.message || "No se pudo crear la cuenta.", variant: "destructive" });
        } else if (data.user) {
          // The trigger 'handle_new_user_profile' will now create an entry in 'perfil_usuarios'
          toast({ title: "Registro Exitoso", description: "Tu cuenta ha sido creada. Revisa tu correo para confirmar. Luego podrás iniciar sesión." });
          navigate("/login");
        } else {
           // This case might occur if email confirmation is pending but user object is not immediately returned by signUp
           toast({ title: "Registro Pendiente", description: "Revisa tu correo electrónico para verificar tu cuenta antes de iniciar sesión.", variant: "default" });
           navigate("/login");
        }
        setIsLoading(false);
      };

      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto mt-8 sm:mt-12">
          <Card className="shadow-xl glassmorphism overflow-hidden">
            <CardHeader className="text-center bg-primary/5 dark:bg-secondary/20 p-6">
              <UserPlus className="h-12 w-12 text-primary dark:text-accent mx-auto mb-3" />
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary dark:text-accent">Crear Cuenta</CardTitle>
              <CardDescription className="text-muted-foreground">Únete para contribuir y acceder a más funcionalidades.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre (*)</Label>
                    <Input 
                      id="nombre" 
                      type="text" 
                      placeholder="Tu nombre" 
                      value={nombre} 
                      onChange={e => setNombre(e.target.value)} 
                      required 
                      className="mt-1"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="apellido">Apellido (*)</Label>
                    <Input 
                      id="apellido" 
                      type="text" 
                      placeholder="Tu apellido" 
                      value={apellido} 
                      onChange={e => setApellido(e.target.value)} 
                      required 
                      className="mt-1"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Correo Electrónico (*)</Label>
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
                  <Label htmlFor="password">Contraseña (*)</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Mínimo 8 caracteres" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    minLength={8}
                    className="mt-1"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Contraseña (*)</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Repite tu contraseña" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
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
                      <UserPlus className="mr-2 h-5 w-5" /> Registrarse
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm p-6 bg-muted/10 dark:bg-secondary/10 border-t dark:border-border/20">
              <p className="text-muted-foreground">
                ¿Ya tienes una cuenta? <Link to="/login" className="font-semibold text-primary dark:text-accent hover:underline">Inicia Sesión aquí</Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };
    export default RegisterPage;