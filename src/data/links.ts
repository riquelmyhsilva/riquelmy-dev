/**
 * Diretório pessoal de arquivos e pastas (Google Drive e arquivos locais em `public/links/`).
 *
 * Como adicionar um novo item do Google Drive:
 * 1. Compartilhe o arquivo/pasta no Google Drive como "Qualquer pessoa com o link (Leitor)".
 * 2. Copie o ID da URL (`https://drive.google.com/file/d/<FILE_ID>/view`) ou a URL completa.
 * 3. Adicione um objeto ao array `DRIVE_LINKS` abaixo e execute `npm run build`.
 *
 * Como adicionar um arquivo hospedado direto no site (ex.: HTML interativo):
 * 1. Coloque o arquivo em `public/links/<nome-do-arquivo>.html`.
 * 2. Defina `viewUrl` e `downloadUrl` como `'/links/<nome-do-arquivo>.html'` e opcionalmente `downloadFilename`.
 */

export interface DriveItem {
  /** ID do arquivo no Google Drive (ou URL completa / identificador único para arquivos locais). */
  id: string;
  /** Nome amigável exibido no card. */
  title: string;
  /** Descrição curta ou contexto do arquivo. */
  description: string;
  /** Categoria usada no badge e nos botões de filtro rápido. */
  category: string;
  /** Tipo de arquivo exibido como badge (ex.: "PDF", "HTML", "ZIP", "Pasta"). */
  fileType?: string;
  /** URL explícita de visualização (absoluta ou caminho local `/links/...`); se omitida, é gerada a partir de `id`. */
  viewUrl?: string;
  /** URL explícita de download (absoluta ou caminho local `/links/...`); se omitida em arquivos padrão do Drive, usa `uc?export=download`. */
  downloadUrl?: string;
  /** Nome sugerido ao baixar arquivos hospedados localmente no próprio site. */
  downloadFilename?: string;
  /** Quando `true`, oculta o botão de download direto e exibe apenas abrir/visualizar. */
  isFolder?: boolean;
}

export interface ResolvedDriveItem extends DriveItem {
  resolvedViewUrl: string | null;
  resolvedDownloadUrl: string | null;
  isFolderItem: boolean;
  isExternalView: boolean;
  isExternalDownload: boolean;
}

const PURE_DRIVE_ID_RE = /^[a-zA-Z0-9_-]+$/;
const DRIVE_FILE_PATH_RE = /\/file\/d\/([a-zA-Z0-9_-]+)/;
const DRIVE_FOLDER_PATH_RE = /\/folders\/([a-zA-Z0-9_-]+)/;

function isSafeRelativePath(value: string): boolean {
  return value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\');
}

function isSafeHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function isSafeTargetUrl(value: string): boolean {
  return isSafeRelativePath(value) || isSafeHttpUrl(value);
}

/**
 * Indica se a URL resolvida aponta para uma origem externa (`http://` ou `https://`).
 */
export function isExternalUrl(value: string): boolean {
  return isSafeHttpUrl(value.trim());
}

function parseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

/**
 * Verifica se a string fornecida representa uma URL de pasta do Google Drive.
 */
export function isDriveFolderUrl(idOrUrl: string): boolean {
  const parsed = parseUrl(idOrUrl.trim());
  if (!parsed) return false;
  return parsed.hostname === 'drive.google.com' && DRIVE_FOLDER_PATH_RE.test(parsed.pathname);
}

/**
 * Extrai o ID de arquivo padrão do Google Drive a partir de um ID puro ou URL
 * (`/file/d/<ID>/view`, `/open?id=<ID>`, `/uc?id=<ID>`).
 * Retorna `null` para pastas ou URLs sem ID de arquivo padrão.
 */
export function extractDriveFileId(idOrUrl: string): string | null {
  const trimmed = idOrUrl.trim();
  if (!trimmed) return null;

  if (PURE_DRIVE_ID_RE.test(trimmed)) {
    return trimmed;
  }

  const parsed = parseUrl(trimmed);
  if (!parsed || parsed.hostname !== 'drive.google.com') {
    return null;
  }

  const pathMatch = parsed.pathname.match(DRIVE_FILE_PATH_RE);
  if (pathMatch?.[1]) {
    return pathMatch[1];
  }

  if (parsed.pathname === '/open' || parsed.pathname === '/uc') {
    const queryId = parsed.searchParams.get('id')?.trim();
    if (queryId && PURE_DRIVE_ID_RE.test(queryId)) {
      return queryId;
    }
  }

  return null;
}

/**
 * Resolve a URL de visualização/abertura a partir de um ID puro ou URL completa do Drive.
 */
export function buildDriveViewUrl(idOrUrl: string, isFolder = false): string | null {
  const trimmed = idOrUrl.trim();
  if (!trimmed) return null;

  if (isFolder || isDriveFolderUrl(trimmed)) {
    if (isSafeHttpUrl(trimmed)) return trimmed;
    if (PURE_DRIVE_ID_RE.test(trimmed)) {
      return `https://drive.google.com/drive/folders/${trimmed}`;
    }
    return null;
  }

  const fileId = extractDriveFileId(trimmed);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }

  return isSafeHttpUrl(trimmed) ? trimmed : null;
}

/**
 * Resolve a URL de download direto a partir de um ID puro ou URL de arquivo padrão do Drive.
 * Retorna `null` para pastas ou recursos que não suportam download direto automático.
 */
export function buildDriveDownloadUrl(idOrUrl: string, isFolder = false): string | null {
  const trimmed = idOrUrl.trim();
  if (!trimmed || isFolder || isDriveFolderUrl(trimmed)) {
    return null;
  }

  const fileId = extractDriveFileId(trimmed);
  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Resolve `viewUrl` considerando override explícito no item ou derivação por `id`.
 */
export function resolveViewUrl(item: Pick<DriveItem, 'id' | 'viewUrl' | 'isFolder'>): string | null {
  const override = item.viewUrl?.trim();
  if (override && isSafeTargetUrl(override)) {
    return override;
  }
  return buildDriveViewUrl(item.id, Boolean(item.isFolder));
}

/**
 * Resolve `downloadUrl` considerando `isFolder`, override explícito ou derivação por `id`.
 */
export function resolveDownloadUrl(item: Pick<DriveItem, 'id' | 'downloadUrl' | 'isFolder'>): string | null {
  if (item.isFolder || isDriveFolderUrl(item.id)) {
    return null;
  }
  const override = item.downloadUrl?.trim();
  if (override && isSafeTargetUrl(override)) {
    return override;
  }
  return buildDriveDownloadUrl(item.id, false);
}

/**
 * Normaliza um `DriveItem` com suas URLs resolvidas para renderização.
 */
export function resolveDriveItem(item: DriveItem): ResolvedDriveItem {
  const isFolderItem = Boolean(item.isFolder) || isDriveFolderUrl(item.id);
  const resolvedViewUrl = resolveViewUrl(item);
  const resolvedDownloadUrl = resolveDownloadUrl(item);
  return {
    ...item,
    isFolderItem,
    resolvedViewUrl,
    resolvedDownloadUrl,
    isExternalView: resolvedViewUrl ? isExternalUrl(resolvedViewUrl) : false,
    isExternalDownload: resolvedDownloadUrl ? isExternalUrl(resolvedDownloadUrl) : false,
  };
}

/**
 * Lista principal de arquivos/pastas exibidos na rota oculta `/links`.
 */
export const DRIVE_LINKS: DriveItem[] = [
  {
    id: 'https://drive.google.com/file/d/1FiebL9T5onWLPuBuHD0h8jPBYUXFjWkB/view?usp=drivesdk',
    title: 'Biometria em Campos de Futebol (PDF)',
    description: 'Apresentação em PDF sobre reconhecimento facial em estádios, LGPD, Lei Geral do Esporte e riscos éticos.',
    category: 'Apresentações',
    fileType: 'PDF',
  },
  {
    id: 'biometria-em-campos-de-futebol-html',
    title: 'Biometria em Campos de Futebol (Slides HTML)',
    description: 'Apresentação interativa em HTML (14 slides) com abertura direta no site e opção de download.',
    category: 'Apresentações',
    fileType: 'HTML',
    viewUrl: '/links/biometria-em-campos-de-futebol.html',
    downloadUrl: '/links/biometria-em-campos-de-futebol.html',
    downloadFilename: 'Biometria em Campos de Futebol.html',
  },
];
