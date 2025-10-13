/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_STORAGE_THEME_SECRET_KEY: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
