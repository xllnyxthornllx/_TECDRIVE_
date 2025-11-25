import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/ThemeToggle";

const faqs = [
  {
    category: "Uso de TecDrive",
    questions: [
      {
        q: "¿Cómo empiezo a usar TecDrive?",
        a: "Simplemente haz clic en 'Comenzar ahora' y crea tu cuenta usando tu email o mediante Google/GitHub. Una vez registrado, tendrás acceso inmediato a tu dashboard.",
      },
      {
        q: "¿Puedo acceder a mis archivos desde cualquier dispositivo?",
        a: "Sí, TecDrive es completamente multi-plataforma. Puedes acceder a tus archivos desde cualquier navegador web en computadoras, tablets o smartphones.",
      },
      {
        q: "¿Cómo organizo mis archivos en carpetas?",
        a: "En el dashboard, usa el botón 'Crear carpeta' para organizar tus archivos. Puedes crear subcarpetas ilimitadas y mover archivos entre ellas fácilmente.",
      },
    ],
  },
  {
    category: "Seguridad y Privacidad",
    questions: [
      {
        q: "¿Qué tan seguros están mis datos?",
        a: "Utilizamos cifrado de extremo a extremo y almacenamiento seguro en la nube. Tus archivos están protegidos con los mismos estándares de seguridad que usan las grandes instituciones financieras.",
      },
      {
        q: "¿Quién puede ver mis archivos?",
        a: "Solo tú tienes acceso a tus archivos. TecDrive está diseñado con privacidad como prioridad, y no compartimos ni accedemos a tu contenido sin tu autorización explícita.",
      },
      {
        q: "¿Hacen copias de seguridad de mis archivos?",
        a: "Sí, realizamos copias de seguridad automáticas regularmente para garantizar que tus datos estén siempre disponibles, incluso en caso de fallos técnicos.",
      },
    ],
  },
  {
    category: "Planes y Pagos",
    questions: [
      {
        q: "¿Cuánto cuesta el Plan Básico?",
        a: "El Plan Básico cuesta S/ 35 al mes e incluye 5 GB de almacenamiento, acceso completo al dashboard, y todas las funciones principales de TecDrive.",
      },
      {
        q: "¿Puedo cambiar o cancelar mi plan?",
        a: "Sí, puedes actualizar, cambiar o cancelar tu plan en cualquier momento desde la configuración de tu cuenta. No hay penalizaciones por cancelación.",
      },
      {
        q: "¿Hay cargos ocultos?",
        a: "No. El precio que ves es el precio que pagas. Somos completamente transparentes con nuestros costos y no hay sorpresas en tu factura.",
      },
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito principales, así como transferencias bancarias y métodos de pago locales.",
      },
    ],
  },
  {
    category: "Soporte Técnico",
    questions: [
      {
        q: "¿Cómo puedo contactar al soporte?",
        a: "Puedes contactarnos a través de nuestro formulario de contacto, por email, o mediante el chat en vivo disponible 24/7 para usuarios con plan activo.",
      },
      {
        q: "¿Qué hago si olvidé mi contraseña?",
        a: "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?' y sigue las instrucciones para restablecerla de forma segura.",
      },
      {
        q: "¿Tienen tutoriales o documentación?",
        a: "Sí, contamos con una biblioteca completa de tutoriales en video y documentación escrita para ayudarte a aprovechar al máximo TecDrive.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
              <img src="/logo.png" alt="TecDrive" className="h-8 w-8" />
              <span className="text-xl font-semibold">TecDrive</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm hover-elevate px-3 py-2 rounded-md" data-testid="link-home">
                Inicio
              </Link>
              <Link href="/about" className="text-sm hover-elevate px-3 py-2 rounded-md" data-testid="link-about">
                Nosotros
              </Link>
              <Link href="/pricing" className="text-sm hover-elevate px-3 py-2 rounded-md" data-testid="link-pricing">
                Planes
              </Link>
              <Link href="/faq" className="text-sm hover-elevate px-3 py-2 rounded-md" data-testid="link-faq">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm hover-elevate px-3 py-2 rounded-md" data-testid="link-contact">
                Contacto
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm" data-testid="button-login">
                <a href="/api/login">Iniciar sesión</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-faq-title">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-muted-foreground">
              Encuentra respuestas rápidas a las preguntas más comunes sobre TecDrive
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h2 className="text-2xl font-semibold" data-testid={`text-category-${categoryIndex}`}>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg px-4 bg-card"
                      data-testid={`accordion-item-${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="hover:no-underline py-4" data-testid={`accordion-trigger-${categoryIndex}-${faqIndex}`}>
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4" data-testid={`accordion-content-${categoryIndex}-${faqIndex}`}>
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="max-w-3xl mx-auto mt-16 text-center space-y-4 p-8 bg-card rounded-lg border">
            <h3 className="text-xl font-semibold">¿No encontraste lo que buscabas?</h3>
            <p className="text-muted-foreground">
              Nuestro equipo está listo para ayudarte. Contáctanos y resolveremos todas tus dudas.
            </p>
            <Link href="/contact">
              <a>
                <Button size="lg" data-testid="button-contact-cta">
                  Contactar soporte
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="TecDrive" className="h-6 w-6" />
                <span className="font-semibold">TecDrive</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu nube privada y segura
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/pricing" className="hover-elevate inline-block px-1 py-0.5">Planes</Link></li>
                <li><Link href="/about" className="hover-elevate inline-block px-1 py-0.5">Nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/faq" className="hover-elevate inline-block px-1 py-0.5">FAQ</Link></li>
                <li><Link href="/contact" className="hover-elevate inline-block px-1 py-0.5">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover-elevate inline-block px-1 py-0.5">Privacidad</a></li>
                <li><a href="#" className="hover-elevate inline-block px-1 py-0.5">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} TecDrive. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
