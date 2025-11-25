import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, FolderOpen, Star } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-welcome">
              Bienvenido, {user?.firstName || "Usuario"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Aquí está un resumen de tu cuenta TecDrive
            </p>
          </div>
          <Link href="/dashboard">
            <a>
              <Button data-testid="button-go-dashboard">
                Ir al Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-2xl">0</h3>
                <p className="text-sm text-muted-foreground">Archivos totales</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-2xl">0</h3>
                <p className="text-sm text-muted-foreground">Carpetas</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-2xl">0</h3>
                <p className="text-sm text-muted-foreground">Favoritos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Accesos rápidos</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/dashboard">
                <a>
                  <Button variant="outline" className="w-full justify-start" data-testid="button-quick-files">
                    <FileText className="h-4 w-4 mr-2" />
                    Mis archivos
                  </Button>
                </a>
              </Link>
              <Link href="/pricing">
                <a>
                  <Button variant="outline" className="w-full justify-start" data-testid="button-quick-pricing">
                    <Star className="h-4 w-4 mr-2" />
                    Ver planes
                  </Button>
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>

        {user?.planType === "user_free" && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Actualiza tu plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Obtén 5 GB de almacenamiento y acceso completo a todas las funciones por solo S/ 35/mes
                  </p>
                </div>
                <Link href="/pricing">
                  <a>
                    <Button data-testid="button-upgrade-home">Mejorar ahora</Button>
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
