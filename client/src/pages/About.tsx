import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const teamMembers = [
  {
    name: "Rodrigo Aldair Tapia Mamani",
    role: "CEO & Fundador",
    description: "Visionario tecnológico con más de 10 años de experiencia en soluciones cloud empresariales.",
  },
  {
    name: "Joel Alexis Puma Murillo",
    role: "CTO",
    description: "Experto en arquitectura de sistemas distribuidos y seguridad de datos en la nube.",
  },
  {
    name: "Jose Carlos Talavera Pezo",
    role: "Director de Producto",
    description: "Especialista en UX/UI con pasión por crear experiencias intuitivas y elegantes.",
  },
  {
    name: "Andree Xavi Canaza Viza",
    role: "Lead Developer",
    description: "Ingeniero full-stack enfocado en performance y escalabilidad de aplicaciones.",
  },
  {
    name: "Uriel Aron Torres Salazar",
    role: "Head of Security",
    description: "Experto en ciberseguridad dedicado a proteger la privacidad de nuestros usuarios.",
  },
];

export default function About() {
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
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-about-title">
              Sobre TecDrive
            </h1>
            <p className="text-lg text-muted-foreground">
              Somos un equipo apasionado por la privacidad y la tecnología, dedicados a ofrecer la mejor experiencia de almacenamiento en la nube con control total para nuestros usuarios.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Misión</h3>
                <p className="text-muted-foreground">
                  Proporcionar soluciones de almacenamiento en la nube seguras, accesibles y centradas en la privacidad del usuario, empoderando a personas y equipos a tener control total sobre sus datos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Visión</h3>
                <p className="text-muted-foreground">
                  Ser la plataforma líder en almacenamiento privado, reconocida por nuestra transparencia, seguridad y compromiso con los derechos digitales de nuestros usuarios.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Valores</h3>
                <p className="text-muted-foreground">
                  Privacidad primero, transparencia total, innovación constante y compromiso inquebrantable con la seguridad y satisfacción de nuestros usuarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Nuestro equipo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce a las personas detrás de TecDrive que trabajan día a día para mejorar tu experiencia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="hover-elevate group transition-all duration-300"
                data-testid={`card-team-${index}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary mx-auto">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold" data-testid={`text-member-name-${index}`}>
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium" data-testid={`text-member-role-${index}`}>
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            ¿Listo para unirte a TecDrive?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empieza a disfrutar de tu nube privada hoy mismo
          </p>
          <Button asChild size="lg" className="text-base" data-testid="button-cta-start">
            <a href="/api/login">Comenzar ahora</a>
          </Button>
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
