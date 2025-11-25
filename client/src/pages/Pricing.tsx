import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Pricing() {
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
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-pricing-title">
              Planes simples y transparentes
            </h1>
            <p className="text-lg text-muted-foreground">
              Elige el plan que mejor se adapte a tus necesidades. Sin sorpresas, sin costos ocultos.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-primary shadow-lg hover-elevate" data-testid="card-plan-basic">
              <CardHeader className="text-center space-y-2 pb-8">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
                  Más popular
                </div>
                <h3 className="text-2xl font-bold" data-testid="text-plan-name">
                  Plan Básico
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">S/</span>
                  <span className="text-5xl font-bold" data-testid="text-plan-price">35</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm" data-testid="text-feature-storage">
                      5 GB de almacenamiento
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm" data-testid="text-feature-dashboard">
                      Acceso completo al dashboard
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm" data-testid="text-feature-upload">
                      Subida de archivos ilimitada
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm" data-testid="text-feature-folders">
                      Gestión de carpetas y favoritos
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm" data-testid="text-feature-support">
                      Soporte técnico básico
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm" data-testid="text-feature-security">
                      Cifrado de extremo a extremo
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full text-base" data-testid="button-contract-plan">
                  <Link href="/upgrade">Contratar plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="max-w-2xl mx-auto mt-12 space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">¿Por qué elegir TecDrive?</h3>
              <p className="text-muted-foreground">
                A diferencia de otros servicios, TecDrive te ofrece un precio fijo y transparente. 
                No hay aumentos sorpresa ni cargos ocultos. Tu privacidad y seguridad son nuestra prioridad.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime garantizado</div>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Costos ocultos</div>
              </div>
              <div className="p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">¿Tienes preguntas?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visita nuestra sección de preguntas frecuentes o contáctanos directamente
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/faq">
              <a>
                <Button variant="outline" size="lg" data-testid="button-faq">
                  Ver FAQ
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button size="lg" data-testid="button-contact">
                  Contactar
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
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
