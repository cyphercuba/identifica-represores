import React from 'react';
    import { motion } from 'framer-motion';
    import { FileText, Lock } from 'lucide-react';

    const PrivacyPage = () => (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-8 sm:py-12 px-4"
      >
        <div className="flex items-center mb-8">
          <Lock className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-accent">Política de Privacidad</h1>
        </div>
        
        <div className="prose dark:prose-invert max-w-none text-foreground/90 dark:text-gray-300 space-y-6 text-justify">
          <p>
            En IdentificaRepresores.com (en adelante, "el Sitio"), nos tomamos muy en serio la privacidad y seguridad de nuestros usuarios y colaboradores. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">1. Información que Recopilamos</h2>
          <p>
            Podemos recopilar los siguientes tipos de información:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Información de Registro:</strong> Si creas una cuenta, podemos solicitar tu dirección de correo electrónico y una contraseña. Te recomendamos usar un correo electrónico anónimo si deseas mantener un mayor grado de privacidad.</li>
            <li><strong>Contenido Enviado:</strong> Cualquier información, fotos, videos, testimonios o documentos que decidas subir al Sitio, incluyendo metadatos asociados a dichos archivos. Eres responsable de anonimizar cualquier información sensible en el contenido que subes si así lo deseas.</li>
            <li><strong>Información de Contacto:</strong> Si te comunicas con nosotros para soporte o consultas, recopilaremos la información que nos proporciones (ej. correo electrónico, nombre).</li>
            <li><strong>Datos de Uso (Anónimos):</strong> Podemos recopilar información anónima sobre cómo interactúas con el Sitio, como páginas visitadas, tiempo de permanencia, y tipo de navegador/dispositivo. Estos datos se utilizan para mejorar el Sitio y no están vinculados a tu identidad personal a menos que hayas iniciado sesión.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">2. Cómo Usamos tu Información</h2>
          <p>
            Utilizamos la información recopilada para:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Operar y mantener el Sitio, incluyendo la moderación y publicación de contenido.</li>
            <li>Permitir el registro de usuarios y la gestión de cuentas.</li>
            <li>Procesar y verificar la información enviada sobre represores.</li>
            <li>Comunicarnos contigo sobre tu cuenta, envíos o consultas.</li>
            <li>Mejorar la funcionalidad y experiencia de usuario del Sitio.</li>
            <li>Cumplir con obligaciones legales y proteger la seguridad del Sitio y sus usuarios.</li>
            <li>Ofrecer contenido exclusivo a suscriptores (si aplica).</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">3. Protección de Datos y Seguridad</h2>
          <p>
            Nos comprometemos a proteger tu información. Implementamos medidas de seguridad técnicas y organizativas para prevenir el acceso no autorizado, la alteración, divulgación o destrucción de tus datos. Sin embargo, ningún sistema es 100% seguro, y no podemos garantizar la seguridad absoluta de la información transmitida o almacenada en el Sitio.
          </p>
          <p>
            Recomendamos encarecidamente a los usuarios que deseen mantener el anonimato que utilicen herramientas como VPNs, navegadores TOR y correos electrónicos anónimos al interactuar con el Sitio. No compartas información personal que no desees que sea pública.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">4. Compartir Información</h2>
          <p>
            No vendemos, alquilamos ni compartimos tu información personal con terceros con fines de marketing. Podemos compartir información en las siguientes circunstancias limitadas:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Contenido Público:</strong> La información sobre represores (nombres, cargos, hechos, fotos, etc.) que se publica en el Sitio es, por su naturaleza, pública.</li>
            <li><strong>Obligaciones Legales:</strong> Si estamos legalmente obligados a hacerlo, o si creemos de buena fe que es necesario para proteger nuestros derechos, la seguridad de otros usuarios o para investigar fraudes o violaciones de seguridad. En tales casos, evaluaremos cuidadosamente cada solicitud.</li>
            <li><strong>Proveedores de Servicios:</strong> Podemos utilizar proveedores de servicios externos (ej. hosting, análisis) que pueden tener acceso limitado a cierta información para realizar tareas en nuestro nombre, bajo estrictas obligaciones de confidencialidad.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">5. Tus Derechos y Opciones</h2>
          <p>
            Tienes derecho a acceder, corregir o solicitar la eliminación de tu información personal que hayamos recopilado, sujeto a ciertas limitaciones. Si has creado una cuenta, puedes tener opciones para gestionar tu perfil. Para cualquier solicitud relacionada con tus datos, contáctanos a través de la sección de "Contacto".
          </p>
          <p>
            Si deseas que se elimine contenido que has subido, o si crees que alguna información publicada es incorrecta, por favor utiliza los mecanismos de reporte o contacto disponibles en el Sitio.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">6. Cookies y Tecnologías Similares</h2>
          <p>
             El Sitio puede utilizar cookies esenciales para su funcionamiento (ej. gestión de sesiones). No utilizamos cookies de seguimiento invasivas con fines publicitarios. Podemos utilizar cookies de análisis anónimas para entender cómo se usa el Sitio.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">7. Cambios a esta Política</h2>
          <p>
            Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con una fecha de actualización. Te recomendamos revisarla periódicamente.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">8. Contacto</h2>
          <p>
            Si tienes preguntas o preocupaciones sobre esta Política de Privacidad, por favor <a href="/contact" className="text-accent hover:underline">contáctanos</a>.
          </p>
          
          <p className="text-sm pt-4">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </motion.div>
    );
    export default PrivacyPage;