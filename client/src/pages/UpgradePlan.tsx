import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useLocation } from "wouter";

export default function UpgradePlan() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const upgradeMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/upgrade-plan", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "¡Plan actualizado!",
        description: "Ahora tienes acceso completo al Plan Básico de TecDrive.",
      });
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1500);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: isUnauthorizedError(error) ? "Tu sesión expiró. Por favor recarga la página." : "No se pudo actualizar el plan. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return null;
  }

  if (user.planType === "user_basic") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">¡Ya tienes el Plan Básico!</h2>
            <p className="text-muted-foreground">
              Disfruta de todas las funciones de TecDrive.
            </p>
            <Button onClick={() => setLocation("/dashboard")}>
              Ir al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="max-w-md border-2 border-primary">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2">
            Actualizar Plan
          </div>
          <h3 className="text-2xl font-bold">Plan Básico</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm text-muted-foreground">S/</span>
            <span className="text-5xl font-bold">35</span>
            <span className="text-muted-foreground">/mes</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">5 GB de almacenamiento</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">Acceso completo al dashboard</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">Subida de archivos ilimitada</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">Gestión de carpetas y favoritos</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">Soporte técnico básico</span>
            </li>
          </ul>
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Nota: Esta es una simulación de pago. En producción se integraría con un procesador de pagos real.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            onClick={() => upgradeMutation.mutate()}
            disabled={upgradeMutation.isPending}
            data-testid="button-simulate-payment"
          >
            {upgradeMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              "Simular pago y activar plan"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
