import { motion } from "motion/react";
import {
  FaCode,
  FaCloud,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaRocket,
  FaServer,
  FaWindows,
  FaWordpress,
} from "react-icons/fa";
import {
  SiAuth0,
  SiBlazor,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiJsonwebtokens,
  SiMongodb,
  SiOpenid,
  SiRedux,
  SiSqlite,
  SiStripe,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

const tagIconMap = {
  react: FaReact,
  node: FaNodeJs,
  express: SiExpress,
  mongodb: SiMongodb,
  api: FaServer,
  firebase: SiFirebase,
  tailwind: SiTailwindcss,
  auth0: SiAuth0,
  sqlite: SiSqlite,
  blazor: SiBlazor,
  dotnet: SiDotnet,
  cplusplus: FaCode,
  csharp: FaCode,
  git: FaGitAlt,
  microsoft: FaWindows,
  wordpress: FaWordpress,
  html5: FaHtml5,
  css3: FaCss3Alt,
  vite: SiVite,
  azure: FaCloud,
  stripe: SiStripe,
  sql: FaDatabase,
  redux: SiRedux,
  jwt: SiJsonwebtokens,
  asgardeo: SiOpenid,
  choreo: FaRocket,
};

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm"
      onClick={closeModal}
    >
      <motion.div
        className="relative max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="/assets/close.svg" alt="Close modal" className="w-6 h-6" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-3 max-w-md">
              {tags.map((tag) => {
                const Icon = tag.icon ? tagIconMap[tag.icon] : null;

                if (Icon) {
                  return (
                    <span
                      key={tag.id}
                      className="flex items-center justify-center rounded-lg size-10 hover-animation bg-white/5"
                      title={tag.name}
                      aria-label={tag.name}
                    >
                      <Icon className="text-2xl text-white" />
                    </span>
                  );
                }

                if (tag.path) {
                  return (
                    <img
                      key={tag.id}
                      src={tag.path}
                      alt={tag.name}
                      className="rounded-lg size-10 hover-animation"
                    />
                  );
                }

                return null;
              })}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
            >
              View Project{" "}
              <img src="/assets/arrow-up.svg" alt="Open project link" className="size-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
