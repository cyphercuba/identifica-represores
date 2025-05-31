export const provincesOfCuba = [
    "Pinar del Río", "Artemisa", "La Habana", "Mayabeque", "Matanzas", 
    "Cienfuegos", "Villa Clara", "Sancti Spíritus", "Ciego de Ávila", 
    "Camagüey", "Las Tunas", "Granma", "Holguín", "Santiago de Cuba", 
    "Guantánamo", "Isla de la Juventud"
  ];

  export const tagTypes = {
    repression: [
      { id: 'detencion_arbitraria', label: 'Detención Arbitraria', color: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30' },
      { id: 'espionaje', label: 'Espionaje', color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30' },
      { id: 'golpiza', label: 'Golpiza', color: 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30' },
      { id: 'acoso', label: 'Acoso', color: 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30' },
      { id: 'amenazas', label: 'Amenazas', color: 'bg-pink-500/20 text-pink-700 dark:text-pink-400 border-pink-500/30' },
      { id: 'tortura', label: 'Tortura', color: 'bg-black text-white border-gray-700' },
      { id: 'represion_manifestacion', label: 'Represión en Manifestación', color: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30' },
      { id: 'vigilancia', label: 'Vigilancia', color: 'bg-teal-500/20 text-teal-700 dark:text-teal-400 border-teal-500/30' },
      { id: 'prision_politica', label: 'Prisión Política', color: 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30' },
    ],
    institution: [
      { id: 'minint', label: 'MININT', color: 'bg-sky-600/20 text-sky-700 dark:text-sky-400 border-sky-600/30' },
      { id: 'far', label: 'FAR', color: 'bg-green-600/20 text-green-700 dark:text-green-400 border-green-600/30' },
      { id: 'dse', label: 'DSE', color: 'bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 border-indigo-600/30' },
      { id: 'pcc', label: 'PCC', color: 'bg-rose-600/20 text-rose-700 dark:text-rose-400 border-rose-600/30' },
      { id: 'pnr', label: 'PNR', color: 'bg-cyan-600/20 text-cyan-700 dark:text-cyan-400 border-cyan-600/30' },
      { id: 'cdr', label: 'CDR', color: 'bg-lime-600/20 text-lime-700 dark:text-lime-400 border-lime-600/30' },
      { id: 'fiscalia', label: 'Fiscalía', color: 'bg-amber-600/20 text-amber-700 dark:text-amber-400 border-amber-600/30' },
    ],
    cargo: [
      { id: 'capitan', label: 'Capitán', color: 'bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30' },
      { id: 'instructor', label: 'Instructor', color: 'bg-neutral-500/20 text-neutral-600 dark:text-neutral-400 border-neutral-500/30' },
      { id: 'oficial', label: 'Oficial', color: 'bg-stone-500/20 text-stone-600 dark:text-stone-400 border-stone-500/30' },
      { id: 'comisario', label: 'Comisario', color: 'bg-zinc-500/20 text-zinc-600 dark:text-zinc-400 border-zinc-500/30' },
      { id: 'fiscal', label: 'Fiscal', color: 'bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30' },
      { id: 'presidente_cdr', label: 'Presidente CDR', color: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
      { id: 'teniente_coronel', label: 'Teniente Coronel', color: 'bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30' },
      { id: 'mayor', label: 'Mayor', color: 'bg-true-gray-500/20 text-true-gray-600 dark:text-true-gray-400 border-true-gray-500/30' },
    ]
  };
  
  export const initialRepressors = [
    { 
      id: '1', 
      nombre: 'Juan Alberto', 
      apellido: 'Pérez González',
      alias: 'El Martillo de Alamar', 
      rank: 'Capitán', // Este campo podría mapearse a 'descripcion' o una tabla de cargos
      institution: 'MININT', // Este campo podría mapearse a 'descripcion' o una tabla de instituciones
      provincia: 'La Habana', 
      municipio: 'Habana del Este', 
      descripcion: 'Conocido por su brutalidad en Alamar. Cargo: Capitán. Institución: MININT.',
      created_at: '2023-01-15T10:00:00Z',
      // Los siguientes campos se simularán como si vinieran de tablas relacionadas
      denuncias: [
        {
          id: 'd1',
          usuario_id: 'u1', // Simulado
          testimonio: 'Testimonio de víctima A sobre Juan Pérez. Detalla su participación en la represión de la manifestación del 11J en Alamar, ordenando golpizas.',
          fecha_denuncia: '2023-07-11T14:30:00Z',
          // Campos adicionales para la UI que no están en el SQL pero son útiles
          abuseType: 'golpiza', 
          verification: 'verificado',
          votes: { credible: 18, dubious: 1 },
          archivos: [
            { id: 'a1', url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", tipo: 'imagen', uploaded_at: '2023-07-11T15:00:00Z', caption: "Juan Pérez en un evento oficial." },
            { id: 'a2', url: "https://images.unsplash.com/photo-1690264695884-f62022341c8f", tipo: 'imagen', uploaded_at: '2023-07-12T09:00:00Z', caption: "Captura de redes sociales." }
          ]
        },
        {
          id: 'd2',
          usuario_id: 'u2',
          testimonio: 'Otro testimonio que corrobora la brutalidad de Pérez durante interrogatorios en la estación de policía de Alamar.',
          fecha_denuncia: '2023-08-01T11:00:00Z',
          abuseType: 'tortura',
          verification: 'en_revision',
          votes: { credible: 12, dubious: 3 },
          archivos: []
        }
      ],
      // 'history' y 'comments' no están en el SQL, pero los mantenemos para la UI por ahora.
      // Se podrían modelar como tipos de 'denuncias' o una tabla 'eventos_represor'.
      history: [ 
        {date: '2021-07-11', event: 'Lideró pelotón de represión violenta contra manifestantes pacíficos en Alamar.', source: 'Reporte Ciudadano Verificado', location: 'Alamar, La Habana'},
        {date: '2022-03-05', event: 'Implicado en detenciones arbitrarias de activistas juveniles.', source: 'Informe ONG Derechos Humanos Cuba', location: 'Estación de Policía, Alamar'}
      ], 
      comments: [{id: 'c1', user: 'TestigoX', text: 'Confirmo su participación, yo estuve allí.', date: '2024-02-10T10:00:00Z'}],
      tags: ['golpiza', 'minint', 'capitan', 'represion_manifestacion'], // Se mantendría una tabla de 'tags' y una tabla de unión 'represor_tags'
      status: 'verificado', // Este sería un campo en la tabla 'represores' o derivado
      denunciasCount: 2, // Esto se calcularía con un COUNT(*) de la tabla 'denuncias'
      // Para la UI, mantenemos 'photos' y 'videos' como un acceso directo a los archivos de tipo imagen/video
      photos: [{url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", caption: "Juan Pérez en un evento oficial."}],
      videos: [],
    },
    { 
      id: '2', 
      nombre: 'Maria Elena', 
      apellido: 'Rodríguez López',
      alias: 'La Fiscal de Hierro', 
      rank: 'Fiscal Provincial', 
      institution: 'Fiscalía General',
      provincia: 'Santiago de Cuba', 
      municipio: 'Santiago de Cuba', 
      descripcion: 'Fiscal conocida por fabricar cargos. Cargo: Fiscal Provincial. Institución: Fiscalía General.',
      created_at: '2023-02-20T09:00:00Z',
      denuncias: [
        {
          id: 'd3',
          usuario_id: 'u3',
          testimonio: 'Fue la fiscal que fabricó cargos contra mi hermano por protestar pacíficamente. Pidió la pena máxima sin pruebas.',
          fecha_denuncia: '2024-01-20T16:00:00Z',
          abuseType: 'prision_politica',
          verification: 'verificado',
          votes: { credible: 25, dubious: 0 },
          archivos: []
        }
      ],
      history: [
        {date: '2022-01-15', event: 'Condujo procesos judiciales sumarios contra manifestantes del 11J, solicitando altas condenas.', source: 'Artículo de Periodismo Independiente', location: 'Tribunal Provincial, Santiago de Cuba'},
        {date: '2023-10-02', event: 'Conocida por su retórica agresiva contra opositores en juicios televisados.', source: 'Observatorio Cubano de DDHH', location: 'Televisión Nacional'}
      ], 
      comments: [],
      tags: ['prision_politica', 'fiscalia', 'fiscal'],
      status: 'verificado',
      denunciasCount: 1,
      photos: [], 
      videos: [], 
    },
    { 
      id: '3', 
      nombre: 'Carlos Manuel', 
      apellido: 'López Fernández',
      alias: 'El Verdugo de Camagüey', 
      rank: 'Teniente Coronel DSE', 
      institution: 'DSE',
      provincia: 'Camagüey', 
      municipio: 'Camagüey', 
      descripcion: 'Jefe de la DSE en Camagüey. Cargo: Teniente Coronel. Institución: DSE.',
      created_at: '2022-11-05T12:00:00Z',
      denuncias: [
        {
          id: 'd4',
          usuario_id: 'u4',
          testimonio: 'Dirigió operativo de intimidación contra Damas de Blanco en Camagüey.',
          fecha_denuncia: '2020-05-20T10:00:00Z',
          abuseType: 'acoso',
          verification: 'en_revision',
          votes: { credible: 5, dubious: 1 },
          archivos: [{ id: 'a3', url: "https://images.unsplash.com/photo-1600299007748-5000bad44379?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNvbGRpZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", tipo: 'imagen', uploaded_at: '2020-05-20T10:05:00Z', caption: "Carlos López en uniforme." }]
        }
      ],
      history: [
        {date: '2020-05-20', event: 'Dirigió operativo de intimidación contra Damas de Blanco en Camagüey.', source: 'Testimonio Directo (Archivado)', location: 'Sede Damas de Blanco, Camagüey'},
        {date: '2021-11-15', event: 'Responsable de la vigilancia y acoso a periodistas independientes en la provincia.', source: 'Artículo de Reporteros Sin Fronteras', location: 'Varios domicilios, Camagüey'}
      ], 
      comments: [],
      tags: ['acoso', 'vigilancia', 'dse', 'teniente_coronel'],
      status: 'en_revision',
      denunciasCount: 1,
      photos: [{url: "https://images.unsplash.com/photo-1600299007748-5000bad44379?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNvbGRpZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", caption: "Carlos López en uniforme."}], 
      videos: [],
    },
     { 
      id: '4', 
      nombre: 'Luisa María', 
      apellido: 'González Pérez',
      alias: 'La Chivatona', 
      rank: 'Presidenta CDR Zona 5', 
      institution: 'CDR',
      provincia: 'Villa Clara', 
      municipio: 'Santa Clara', 
      descripcion: 'Presidenta de CDR conocida por vigilar a vecinos. Cargo: Presidenta CDR. Institución: CDR.',
      created_at: '2023-03-10T08:00:00Z',
      denuncias: [{
        id: 't4', 
        usuario_id: 'u5',
        testimonio: 'Esta señora se dedica a vigilar a los vecinos y reportar cualquier cosa que no le guste al DSE.', 
        fecha_denuncia: '2023-05-10T14:00:00Z',
        abuseType: 'espionaje', 
        verification: 'sin_evidencia_suficiente',
        votes: { credible: 2, dubious: 4 },
        archivos: []
      }], 
      history: [{date: '2022-07-01', event: 'Organizó actos de repudio contra activistas en su barrio.', source: 'Video en Redes Sociales', location: 'Barrio X, Santa Clara'}], 
      comments: [],
      tags: ['espionaje', 'cdr', 'presidente_cdr'],
      status: 'sin_evidencia_suficiente',
      denunciasCount: 1,
      photos: [], 
      videos: [],
    },
    { 
      id: '5', 
      nombre: 'Pedro Antonio', 
      apellido: 'Valdés Roca',
      alias: 'El Torturador de Villa Marista', 
      rank: 'Mayor (Retirado)', 
      institution: 'MININT (Ex-DSE)',
      provincia: 'La Habana', 
      municipio: 'Diez de Octubre', 
      descripcion: 'Ex-Mayor de la DSE, conocido por torturas en Villa Marista. Cargo: Mayor (Retirado). Institución: MININT (Ex-DSE).',
      created_at: '2022-10-01T17:00:00Z',
      denuncias: [{
        id: 'd5',
        usuario_id: 'u6',
        testimonio: 'Conocido por aplicar métodos de tortura física y psicológica a presos políticos en Villa Marista durante los años 90 y 2000.',
        fecha_denuncia: '2022-10-05T10:00:00Z',
        abuseType: 'tortura',
        verification: 'verificado',
        votes: { credible: 30, dubious: 0 },
        archivos: []
      }], 
      history: [{date: '1995-2010', event: 'Conocido por aplicar métodos de tortura física y psicológica a presos políticos en Villa Marista.', source: 'Libro "Memorias del Presidio Político"', location: 'Villa Marista, La Habana'}], 
      comments: [],
      tags: ['tortura', 'minint', 'dse', 'mayor'],
      status: 'verificado',
      denunciasCount: 1,
      photos: [], 
      videos: [],
    }
  ];

  const municipalitiesData = {
    "Pinar del Río": ["Consolación del Sur", "Guane", "La Palma", "Los Palacios", "Mantua", "Minas de Matahambre", "Pinar del Río", "San Juan y Martínez", "San Luis", "Sandino", "Viñales"],
    "Artemisa": ["Alquízar", "Artemisa", "Bahía Honda", "Bauta", "Caimito", "Guanajay", "Güira de Melena", "Mariel", "San Antonio de los Baños", "San Cristóbal"],
    "La Habana": ["Arroyo Naranjo", "Boyeros", "Centro Habana", "Cerro", "Cotorro", "Diez de Octubre", "Guanabacoa", "Habana del Este", "Habana Vieja", "La Lisa", "Marianao", "Playa", "Plaza de la Revolución", "Regla", "San Miguel del Padrón"],
    "Mayabeque": ["Batabanó", "Bejucal", "Güines", "Jaruco", "Madruga", "Melena del Sur", "Nueva Paz", "Quivicán", "San José de las Lajas", "San Nicolás de Bari", "Santa Cruz del Norte"],
    "Matanzas": ["Calimete", "Cárdenas", "Ciénaga de Zapata", "Colón", "Jagüey Grande", "Jovellanos", "Limonar", "Los Arabos", "Martí", "Matanzas", "Pedro Betancourt", "Perico", "Unión de Reyes"],
    "Cienfuegos": ["Abreus", "Aguada de Pasajeros", "Cienfuegos", "Cruces", "Cumanayagua", "Lajas", "Palmira", "Rodas"],
    "Villa Clara": ["Caibarién", "Camajuaní", "Cifuentes", "Corralillo", "Encrucijada", "Manicaragua", "Placetas", "Quemado de Güines", "Ranchuelo", "Remedios", "Sagua la Grande", "Santa Clara", "Santo Domingo"],
    "Sancti Spíritus": ["Cabaiguán", "Fomento", "Jatibonico", "La Sierpe", "Sancti Spíritus", "Taguasco", "Trinidad", "Yaguajay"],
    "Ciego de Ávila": ["Baraguá", "Bolivia", "Chambas", "Ciego de Ávila", "Ciro Redondo", "Florencia", "Majagua", "Morón", "Primero de Enero", "Venezuela"],
    "Camagüey": ["Camagüey", "Carlos Manuel de Céspedes", "Esmeralda", "Florida", "Guáimaro", "Jimaguayú", "Minas", "Najasa", "Nuevitas", "Santa Cruz del Sur", "Sibanicú", "Sierra de Cubitas", "Vertientes"],
    "Las Tunas": ["Amancio", "Colombia", "Jesús Menéndez", "Jobabo", "Las Tunas", "Majibacoa", "Manatí", "Puerto Padre"],
    "Granma": ["Bartolomé Masó", "Bayamo", "Buey Arriba", "Campechuela", "Cauto Cristo", "Guisa", "Jiguaní", "Manzanillo", "Media Luna", "Niquero", "Pilón", "Río Cauto", "Yara"],
    "Holguín": ["Antilla", "Báguanos", "Banes", "Cacocum", "Calixto García", "Cueto", "Frank País", "Gibara", "Holguín", "Mayarí", "Moa", "Rafael Freyre", "Sagua de Tánamo", "Urbano Noris"],
    "Santiago de Cuba": ["Contramaestre", "Guamá", "Mella", "Palma Soriano", "San Luis", "Santiago de Cuba", "Segundo Frente", "Songo-La Maya", "Tercer Frente"],
    "Guantánamo": ["Baracoa", "Caimanera", "El Salvador", "Guantánamo", "Imías", "Maisí", "Manuel Tames", "Niceto Pérez", "San Antonio del Sur", "Yateras"],
    "Isla de la Juventud": ["Isla de la Juventud"]
  };
  
  export const getMunicipalitiesForProvince = (provinceName) => {
    return municipalitiesData[provinceName] || [];
  };

  export const getAllTags = () => {
    const all = [];
    Object.values(tagTypes).forEach(typeArray => {
      all.push(...typeArray);
    });
    return all;
  };

  export const getTagById = (tagId) => {
    const all = getAllTags();
    return all.find(tag => tag.id === tagId);
  };
