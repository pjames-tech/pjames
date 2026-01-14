/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly OPENAI_API_KEY: string;
  readonly OPENAI_MODEL?: string;
  readonly SMTP_HOST: string;
  readonly SMTP_PORT?: string;
  readonly SMTP_SECURE?: string;
  readonly SMTP_USER: string;
  readonly SMTP_PASS: string;
  readonly LEAD_TO_EMAIL: string;
  readonly FROM_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
