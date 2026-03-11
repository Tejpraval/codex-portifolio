export function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="mb-10 md:mb-14">
      <span className="chip">{eyebrow}</span>
      <h2 className="section-title mt-5">{title}</h2>
      <p className="section-copy mt-4">{copy}</p>
      <div className="section-divider mt-8">
        <span className="section-divider-line" />
      </div>
    </div>
  );
}
