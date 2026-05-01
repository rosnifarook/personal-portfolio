import { SkillsOrbit } from "../components/SkillsOrbit";

export default function Testimonial() {
  return (
    <section className="items-start mt-20 md:mt-30 c-space">
      <h2 className="text-heading">Skills</h2>
      <div className="relative w-full mt-12 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1025] to-[#050816] p-8 md:p-10">
        <p className="mb-6 text-sm text-white/60 md:text-base">
          Technologies I use to design, build, and ship reliable web applications.
        </p>
        <div className="relative mx-auto w-full max-w-3xl">
          <SkillsOrbit />
        </div>
        <div className="mt-5 flex justify-center">
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 md:text-sm">
            Drag to explore skills universe
          </span>
        </div>
      </div>
    </section>
  );
}
