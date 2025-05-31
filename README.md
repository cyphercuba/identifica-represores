
# 🛡️ Identifica los Represores

Este proyecto es una plataforma web para denunciar actos represivos en Cuba. Desarrollado con **React**, **Vite**, **TailwindCSS** y **Supabase**, permite subir testimonios, gestionar contenido y realizar donaciones internacionales o desde Cuba.

---

## 🚀 Características

- Registro y reporte de represores.
- Sistema de login para administrador.
- Panel de administración seguro.
- Soporte de pagos internacionales con **Stripe**.
- Opción de pagos nacionales con **Lemon**.
- Despliegue automático con **Vercel**.

---

## 📦 Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/identifica-represores.git
cd identifica-represores
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con:

```env
VITE_ADMIN_USER=admin
VITE_ADMIN_PASS=superseguro123
```

4. Inicia el proyecto:

```bash
npm run dev
```

---

## 💳 Pagos con Stripe (modo test)

Para que funcione el pago debes:

- Tener un backend en `/api/create-checkout-session.js`
- Añadir en Vercel (o tu hosting):

```env
STRIPE_SECRET_KEY=sk_test_tu_clave
```

---

## 🧠 Tecnologías usadas

- React + Vite
- Tailwind CSS
- Supabase
- Stripe API
- Vercel Functions (serverless)

---

## 🧑‍💼 Acceso Administrador

Accede a `/admin-login` con:

- Usuario: `admin`
- Contraseña: `superseguro123`

---

## 🧾 Licencia

Este proyecto es de uso libre para fines educativos y sociales.

---

## ✊ Contribuye

Si deseas colaborar o mejorar el sistema, haz un fork y envía tu pull request. Cada aporte ayuda a construir justicia.
