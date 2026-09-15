import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin configuración especial: el sitio es estático salvo por la interacción
  // del diagnóstico, que vive del lado del cliente.
  reactStrictMode: true,
};

export default nextConfig;
