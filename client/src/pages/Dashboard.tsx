import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Home,
  FileText,
  Star,
  Trash2,
  Settings,
  FolderPlus,
  Upload,
  Grid3X3,
  List,
  Search,
  Folder,
  File,
  MoreVertical,
  Download,
  X,
  AlertCircle,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { File as FileType, Folder as FolderType } from "@shared/schema";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Link } from "wouter";

type ViewMode = "grid" | "list";
type NavSection = "home" | "files" | "favorites" | "trash" | "settings";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeSection, setActiveSection] = useState<NavSection>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadFileSize, setUploadFileSize] = useState("");

  // PrivateRoute handles authentication, so user is guaranteed to be authenticated here

  // Fetch folders
  const { data: folders = [] } = useQuery<FolderType[]>({
    queryKey: ["/api/folders"],
    enabled: !!user,
  });

  // Fetch files
  const { data: files = [] } = useQuery<FileType[]>({
    queryKey: ["/api/files"],
    enabled: !!user,
  });

  // Create folder mutation
  const createFolderMutation = useMutation({
    mutationFn: async (folderName: string) => {
      await apiRequest("POST", "/api/folders", {
        folderName,
        parentFolderId: null,
        isDeleted: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/folders"] });
      toast({
        title: "Carpeta creada",
        description: "La carpeta se creó exitosamente.",
      });
      setNewFolderName("");
      setIsCreateFolderOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: isUnauthorizedError(error) ? "Tu sesión expiró. Por favor recarga la página." : "No se pudo crear la carpeta.",
        variant: "destructive",
      });
    },
  });

  // Upload file mutation (simulated)
  const uploadFileMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/files", {
        filename: uploadFileName,
        size: parseInt(uploadFileSize) || 1024,
        type: "application/octet-stream",
        pathOrUrl: null,
        folderId: null,
        isFavorite: false,
        isDeleted: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "Archivo subido",
        description: "El archivo se subió exitosamente.",
      });
      setUploadFileName("");
      setUploadFileSize("");
      setIsUploadFileOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: isUnauthorizedError(error) ? "Tu sesión expiró. Por favor recarga la página." : "No se pudo subir el archivo.",
        variant: "destructive",
      });
    },
  });

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (file: FileType) => {
      await apiRequest("PATCH", `/api/files/${file.id}`, {
        isFavorite: !file.isFavorite,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Error",
          description: "Tu sesión expiró. Por favor recarga la página.",
          variant: "destructive",
        });
      }
    },
  });

  // Delete file mutation (soft delete)
  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      await apiRequest("PATCH", `/api/files/${fileId}`, {
        isDeleted: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "Archivo eliminado",
        description: "El archivo se movió a la papelera.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Error",
          description: "Tu sesión expiró. Por favor recarga la página.",
          variant: "destructive",
        });
      }
    },
  });

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  const isPlanActive = user.planType === "user_basic";
  const filteredFiles = files.filter((file) => {
    const matchesSection =
      activeSection === "home"
        ? !file.isDeleted
        : activeSection === "favorites"
        ? file.isFavorite && !file.isDeleted
        : activeSection === "trash"
        ? file.isDeleted
        : !file.isDeleted;

    const matchesSearch =
      searchQuery === "" ||
      file.filename.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSection && matchesSearch;
  });

  const filteredFolders = folders.filter((folder) => {
    const matchesSection = activeSection !== "trash" && !folder.isDeleted;
    const matchesSearch =
      searchQuery === "" ||
      folder.folderName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSection && matchesSearch;
  });

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="TecDrive" className="h-8 w-8" />
            <span className="text-lg font-semibold">TecDrive</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Button
            variant={activeSection === "home" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("home")}
            data-testid="nav-home"
          >
            <Home className="h-4 w-4 mr-2" />
            Inicio
          </Button>
          <Button
            variant={activeSection === "files" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("files")}
            data-testid="nav-files"
          >
            <FileText className="h-4 w-4 mr-2" />
            Mis archivos
          </Button>
          <Button
            variant={activeSection === "favorites" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("favorites")}
            data-testid="nav-favorites"
          >
            <Star className="h-4 w-4 mr-2" />
            Favoritos
          </Button>
          <Button
            variant={activeSection === "trash" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("trash")}
            data-testid="nav-trash"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Papelera
          </Button>
          <Button
            variant={activeSection === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("settings")}
            data-testid="nav-settings"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </nav>

        {!isPlanActive && (
          <div className="p-4 border-t">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <span>Plan Gratuito</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Actualiza al Plan Básico para acceso completo
                </p>
                <Button asChild size="sm" className="w-full" data-testid="button-upgrade">
                  <Link href="/upgrade">Mejorar plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar archivos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImageUrl || undefined} />
                    <AvatarFallback>
                      {user.firstName?.[0] || user.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{user.firstName || "Usuario"}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-primary mt-1">
                    {isPlanActive ? "Plan Básico" : "Plan Gratuito"}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveSection("settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/api/logout" data-testid="button-logout">
                    Cerrar sesión
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {activeSection === "settings" ? (
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold">Configuración</h1>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Información de la cuenta</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Nombre:</span>{" "}
                        {user.firstName || "No especificado"}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span> {user.email}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Plan:</span>{" "}
                        {isPlanActive ? "Plan Básico (S/ 35/mes)" : "Plan Gratuito"}
                      </p>
                    </div>
                  </div>
                  {!isPlanActive && (
                    <div className="pt-4 border-t">
                      <Button asChild data-testid="button-upgrade-settings">
                        <Link href="/upgrade">Actualizar a Plan Básico</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <>
            {/* Action Bar */}
            <div className="border-b bg-background p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsCreateFolderOpen(true)}
                  disabled={!isPlanActive}
                  data-testid="button-create-folder"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Crear carpeta
                </Button>
                <Button
                  onClick={() => setIsUploadFileOpen(true)}
                  disabled={!isPlanActive}
                  data-testid="button-upload-file"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir archivo
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* File/Folder Display */}
            <div className="flex-1 overflow-auto p-6">
              {!isPlanActive && activeSection !== "home" && (
                <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Funcionalidad limitada</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Actualiza al Plan Básico para acceder a todas las funciones de TecDrive.
                  </p>
                </div>
              )}

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredFolders.map((folder) => (
                    <Card
                      key={folder.id}
                      className="hover-elevate cursor-pointer group"
                      data-testid={`folder-${folder.id}`}
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Folder className="h-10 w-10 text-primary" />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Renombrar</DropdownMenuItem>
                              <DropdownMenuItem>Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm font-medium truncate">{folder.folderName}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredFiles.map((file) => (
                    <Card
                      key={file.id}
                      className="hover-elevate cursor-pointer group"
                      onClick={() => setSelectedFile(file)}
                      data-testid={`file-${file.id}`}
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <File className="h-10 w-10 text-muted-foreground" />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavoriteMutation.mutate(file);
                                }}
                              >
                                <Star className="h-4 w-4 mr-2" />
                                {file.isFavorite ? "Quitar de favoritos" : "Marcar favorito"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteFileMutation.mutate(file.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm font-medium truncate">{file.filename}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredFolders.map((folder) => (
                    <div
                      key={folder.id}
                      className="flex items-center gap-3 p-3 hover-elevate rounded-lg cursor-pointer"
                      data-testid={`folder-list-${folder.id}`}
                    >
                      <Folder className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="flex-1 font-medium">{folder.folderName}</span>
                      <span className="text-sm text-muted-foreground">Carpeta</span>
                    </div>
                  ))}

                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 hover-elevate rounded-lg cursor-pointer"
                      onClick={() => setSelectedFile(file)}
                      data-testid={`file-list-${file.id}`}
                    >
                      <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span className="flex-1 font-medium">{file.filename}</span>
                      <span className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                      {file.isFavorite && <Star className="h-4 w-4 text-primary" />}
                    </div>
                  ))}
                </div>
              )}

              {filteredFiles.length === 0 && filteredFolders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay archivos para mostrar</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Create Folder Dialog */}
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent data-testid="dialog-create-folder">
          <DialogHeader>
            <DialogTitle>Crear nueva carpeta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Nombre de la carpeta</Label>
              <Input
                id="folder-name"
                placeholder="Mi carpeta"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                data-testid="input-folder-name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateFolderOpen(false)}
              data-testid="button-cancel-folder"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => createFolderMutation.mutate(newFolderName)}
              disabled={!newFolderName || createFolderMutation.isPending}
              data-testid="button-confirm-folder"
            >
              {createFolderMutation.isPending ? "Creando..." : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload File Dialog */}
      <Dialog open={isUploadFileOpen} onOpenChange={setIsUploadFileOpen}>
        <DialogContent data-testid="dialog-upload-file">
          <DialogHeader>
            <DialogTitle>Subir archivo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file-name">Nombre del archivo</Label>
              <Input
                id="file-name"
                placeholder="documento.pdf"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
                data-testid="input-file-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-size">Tamaño (KB)</Label>
              <Input
                id="file-size"
                type="number"
                placeholder="1024"
                value={uploadFileSize}
                onChange={(e) => setUploadFileSize(e.target.value)}
                data-testid="input-file-size"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Nota: Esta es una simulación. En producción, se subirían archivos reales.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadFileOpen(false)}
              data-testid="button-cancel-upload"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => uploadFileMutation.mutate()}
              disabled={!uploadFileName || uploadFileMutation.isPending}
              data-testid="button-confirm-upload"
            >
              {uploadFileMutation.isPending ? "Subiendo..." : "Subir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Details Panel */}
      {selectedFile && (
        <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent data-testid="dialog-file-details">
            <DialogHeader>
              <DialogTitle>Detalles del archivo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                <File className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Nombre:</span>{" "}
                  <span className="font-medium">{selectedFile.filename}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Tamaño:</span>{" "}
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Tipo:</span> {selectedFile.type}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Creado:</span>{" "}
                  {new Date(selectedFile.createdAt!).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toggleFavoriteMutation.mutate(selectedFile)}
                >
                  <Star
                    className={`h-4 w-4 mr-2 ${
                      selectedFile.isFavorite ? "fill-current" : ""
                    }`}
                  />
                  {selectedFile.isFavorite ? "Quitar favorito" : "Marcar favorito"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    deleteFileMutation.mutate(selectedFile.id);
                    setSelectedFile(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
