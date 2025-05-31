import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  extraStyle?: string;
};

const SectionContainer = ({ children, extraStyle }: SectionContainerProps) => {
  return (
    <section
      id="action-section"
      className={
        "w-full flex flex-col border  border-gray-200 text-xl bg-white rounded-xl   mt-14  p-6 gap-6 shadow-xl " +
        (extraStyle || "")
      }
    >
      {children}
    </section>
  );
};

export default SectionContainer;

