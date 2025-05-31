import React from 'react';
    import { motion } from 'framer-motion';
    import { FileText, AlertTriangle } from 'lucide-react';

    const TermsPage = () => (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-8 sm:py-12 px-4"
      >
        <div className="flex items-center mb-8">
          <FileText className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-accent">Términos y Condiciones de Uso</h1>
        </div>

        <div className="prose dark:prose-invert max-w-none text-foreground/90 dark:text-gray-300 space-y-6 text-justify">
          <p>
            Bienvenido a IdentificaRepresores.com (en adelante, "el Sitio"). Al acceder y utilizar este Sitio, aceptas cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, por favor, no utilices el Sitio.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">1. Propósito del Sitio</h2>
          <p>
            El Sitio tiene como objetivo documentar y exponer a individuos presuntamente involucrados en actos de represión y violaciones de derechos humanos en Cuba. La información presentada se basa en testimonios, evidencias fotográficas, videográficas y documentales proporcionadas por usuarios, colaboradores, fuentes públicas y investigaciones propias.
          </p>
          <p>
            <AlertTriangle className="inline-block h-5 w-5 mr-1 text-destructive" /> <strong>Importante:</strong> La información publicada en este Sitio se presenta con fines informativos y de denuncia. No constituye una acusación legal formal ni una sentencia judicial. La presunción de inocencia se mantiene hasta que un tribunal competente determine lo contrario.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">2. Responsabilidad del Usuario</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Eres responsable de la veracidad y exactitud de cualquier información, testimonio o evidencia que subas al Sitio.</li>
            <li>No debes subir contenido falso, difamatorio, malicioso, que incite al odio, o que viole derechos de terceros (incluyendo derechos de autor y privacidad sin consentimiento, a menos que sea de interés público y legalmente justificable).</li>
            <li>Al subir contenido, otorgas al Sitio una licencia no exclusiva, mundial, libre de regalías para usar, reproducir, modificar (para fines de formato o claridad), publicar y distribuir dicho contenido en el contexto del propósito del Sitio.</li>
            <li>Eres responsable de proteger tus credenciales de acceso (si te registras) y de cualquier actividad que ocurra bajo tu cuenta.</li>
            <li>Comprendes que el contenido del Sitio puede ser sensible y potencialmente perturbador. Procede con discreción.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">3. Moderación y Contenido</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nos reservamos el derecho de moderar, editar, rechazar o eliminar cualquier contenido subido por los usuarios que consideremos inapropiado, falso, no verificado, o que viole estos términos, sin previo aviso.</li>
            <li>El proceso de verificación de la información es fundamental para nosotros, pero no podemos garantizar la exactitud absoluta de todo el contenido en todo momento. Fomentamos la revisión comunitaria y la denuncia de errores.</li>
            <li>El Sitio no se hace responsable por las opiniones o declaraciones expresadas por los usuarios en comentarios o foros (si los hubiere).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">4. Limitación de Responsabilidad</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>El uso del Sitio es bajo tu propio riesgo. El Sitio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo, expresas o implícitas.</li>
            <li>No seremos responsables por ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de uso del Sitio, o de la confianza en la información presentada.</li>
            <li>No garantizamos que el Sitio esté libre de errores, virus u otros componentes dañinos, ni que el acceso sea ininterrumpido.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">5. Propiedad Intelectual</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>El logo, diseño, y contenido original creado por el equipo del Sitio están protegidos por derechos de autor y otras leyes de propiedad intelectual.</li>
            <li>El contenido subido por los usuarios pertenece a sus respectivos autores, sujeto a la licencia otorgada al Sitio como se describe en la sección 2.</li>
            <li>Si crees que algún contenido en el Sitio infringe tus derechos de autor, por favor contáctanos con la información pertinente.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">6. Enlaces a Terceros</h2>
          <p>
            El Sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o las prácticas de privacidad de estos sitios y no somos responsables por ellos.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">7. Modificaciones a los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será publicado en esta página con una fecha de actualización. El uso continuado del Sitio después de la publicación de los cambios constituye tu aceptación de los nuevos términos.
          </p>

          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">8. Ley Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde se encuentre el servidor principal del Sitio, sin tener en cuenta sus disposiciones sobre conflicto de leyes. Sin embargo, dada la naturaleza internacional de internet y el propósito del sitio, buscamos adherirnos a principios éticos y de derechos humanos universalmente reconocidos.
          </p>
          
          <h2 className="text-2xl font-semibold text-primary dark:text-accent pt-4">9. Contacto</h2>
          <p>
            Si tienes preguntas o inquietudes sobre estos Términos y Condiciones, por favor <a href="/contact" className="text-accent hover:underline">contáctanos</a>.
          </p>

          <p className="text-sm pt-4">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </motion.div>
    );
    export default TermsPage;