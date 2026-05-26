import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProgramDetailClient from "./ProgramDetailClient";
import { getRoutineBySlug, getRoutines } from "@/lib/data-service";

export async function generateStaticParams() {
  const routines = await getRoutines();
  return routines.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getRoutineBySlug(slug);
  if (!program) return {};
  return {
    title: `${program.name} | Nahuel Coach`,
    description: program.subtitle,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getRoutineBySlug(slug);
  if (!program) notFound();
  return <ProgramDetailClient program={program} />;
}
