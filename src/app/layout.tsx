import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pipocando Festas e Eventos - Sistema de Gerenciamento",
  description: "Sistema completo de gerenciamento para festas e eventos - clientes, eventos, equipe, materiais e financeiro",
  keywords: ["festas", "eventos", "gerenciamento", "crianças", "animação", "pipocando", "rio de janeiro"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}