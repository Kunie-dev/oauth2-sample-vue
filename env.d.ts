/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_API_TIMEOUT: string;
  readonly VITE_APP_AUTHORIZATION_SERVER_HOST: string;
  readonly VITE_APP_OAUTH2_CLIENT_ADMIN_GC_CLIENT_ID: string;
  readonly VITE_APP_OAUTH2_CLIENT_ADMIN_GC_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
