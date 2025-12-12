import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Lock, Shield, Smartphone, Users, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="TecDrive" width={32} height={32} />
              <span className="text-xl font-semibold">TecDrive</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm hover-elevate px-3 py-2 rounded-md">
                Inicio
              </Link>
              <Link href="/about" className="text-sm hover-elevate px-3 py-2 rounded-md">
                Nosotros
              </Link>
              <Link href="/pricing" className="text-sm hover-elevate px-3 py-2 rounded-md">
                Planes
              </Link>
              <Link href="/faq" className="text-sm hover-elevate px-3 py-2 rounded-md">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm hover-elevate px-3 py-2 rounded-md">
                Contacto
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm">
                <Link href="/api/auth/signin">Iniciar sesión</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/api/auth/signin">Comenzar ahora</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <Image src="/logo.png" alt="TecDrive" width={80} height={80} className="mx-auto mb-6" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              TecDrive – Tu nube privada y segura
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Almacena, organiza y accede a tus archivos desde cualquier lugar con total control y privacidad
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/api/auth/signin">Comenzar ahora</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/pricing">Ver planes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">
                ¿Qué es TecDrive?
              </h2>
              <p className="text-lg text-muted-foreground">
                TecDrive es un servicio de almacenamiento en la nube privada que te permite guardar, organizar y acceder a tus archivos desde cualquier lugar, pero con el control total en tus manos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-elevate">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">¿Por qué lo creamos?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Shield className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span>Preocupación por la privacidad en servicios de nube tradicionales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span>Costos mensuales que suben sin control en otras plataformas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span>Necesidad de una alternativa propia, segura y accesible</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">¿Cuál es nuestra intención?</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Cloud className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span>Dar a personas y equipos una nube que puedan sentir "suya"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Smartphone className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span>Ofrecer experiencia tipo Google Drive con foco en privacidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <span>Pensada para estudiantes, profesionales y pequeñas empresas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 md:p-8 border border-primary/10">
              <h3 className="text-xl font-semibold mb-4">¿Para quién es TecDrive?</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Usuarios comunes</p>
                  <p>Que necesitan más control sobre sus datos personales</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Profesionales</p>
                  <p>Estudiantes y trabajadores que manejan muchos archivos</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Equipos</p>
                  <p>Pequeños equipos de trabajo y emprendimientos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Características principales</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tus archivos de forma segura y eficiente
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Seguridad y cifrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tus archivos están protegidos con cifrado de nivel empresarial
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Control total de datos</h3>
                <p className="text-sm text-muted-foreground">
                  Tú decides qué compartir y con quién, sin sorpresas
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Acceso multi-dispositivo</h3>
                <p className="text-sm text-muted-foreground">
                  Accede a tus archivos desde cualquier dispositivo, en cualquier momento
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Interfaz sencilla</h3>
                <p className="text-sm text-muted-foreground">
                  Diseño intuitivo tipo Google Drive, fácil de usar desde el primer día
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Empieza a usar TecDrive hoy mismo
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya confían en TecDrive para sus archivos
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href="/api/auth/signin">Crear cuenta gratis</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="TecDrive" width={24} height={24} />
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
                <li><Link href="#" className="hover-elevate inline-block px-1 py-0.5">Privacidad</Link></li>
                <li><Link href="#" className="hover-elevate inline-block px-1 py-0.5">Términos</Link></li>
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
