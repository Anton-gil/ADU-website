import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_DATA } from '@/data/siteData';

interface WorkPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SITE_DATA.nav.work.map((project) => ({
    slug: project.slug,
  }));
}

export default function WorkProjectPage({ params }: WorkPageProps) {
  const project = SITE_DATA.nav.work.find((item) => item.slug === params.slug);
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-8 md:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-heading text-adu-gold text-xs uppercase tracking-[0.35em] opacity-80">
              {project.category}
            </span>
            <h1 className="mt-4 text-5xl font-orbitron font-bold uppercase tracking-[0.12em] text-white">
              {project.name}
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex rounded-full border border-adu-gold bg-adu-gold/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-adu-gold transition hover:bg-adu-gold hover:text-adu-black"
          >
            Back to home
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">
          <section className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8">
              <h2 className="text-3xl font-orbitron font-bold uppercase tracking-[0.1em] text-white">
                Project overview
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/70">
                {project.description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8">
              <h3 className="text-xl font-orbitron font-semibold uppercase tracking-[0.14em] text-white">
                Creative direction
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                A full-service digital build designed to align brand tone with premium aesthetics, engaging product storytelling and polished presentation.
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8">
              <h3 className="text-sm uppercase tracking-[0.3em] text-adu-gold opacity-80">
                Selected details
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-white/70">
                <li>Custom visual identity</li>
                <li>Responsive interface system</li>
                <li>Brand-led interaction design</li>
                <li>Motion-driven content hierarchy</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[#111111]/90 p-8">
              <h3 className="text-sm uppercase tracking-[0.3em] text-adu-gold opacity-80">
                Next steps
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Reach out to start a project brief, build a premium design system, and launch a high-end digital experience.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
