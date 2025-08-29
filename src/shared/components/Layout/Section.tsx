import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Section = ({ children, title, className }: SectionProps) => {
  return (
    <section className={`${styles.section} ${className || ''}`}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      {children}
    </section>
  );
};

export default Section;
