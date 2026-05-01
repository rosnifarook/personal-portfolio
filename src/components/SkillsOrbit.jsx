import { OrbitingCircles } from "./OrbitingCircles";
import { useEffect, useRef, useState } from "react";
import {
  FaDatabase,
  FaGitAlt,
  FaJava,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiFigma,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiPostman,
  SiSpringboot,
  SiTailwindcss,
} from "react-icons/si";

const coreSkills = [
  { name: "React", Icon: FaReact, color: "#61DBFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", Icon: FaJava, color: "#F89820" },
  { name: "Node.js", Icon: FaNodeJs, color: "#83CD29" },
  { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
];

const tools = [
  { name: "Git", Icon: FaGitAlt, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  { name: "SQL", Icon: FaDatabase, color: "#7C83FF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "Figma", Icon: SiFigma, color: "#A259FF" },
];

const SkillIcon = ({ name, Icon, color }) => (
  <span
    className="flex items-center justify-center rounded-full size-12 bg-white/5 ring-1 ring-white/10 hover:scale-110 transition-transform"
    title={name}
    aria-label={name}
  >
    <Icon className="text-2xl" style={{ color }} />
  </span>
);

export function SkillsOrbit() {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[18rem] w-full flex-col items-center justify-center"
    >
      <OrbitingCircles iconSize={52} radius={130} paused={!isActive}>
        {coreSkills.map((skill) => (
          <SkillIcon key={skill.name} {...skill} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles
        iconSize={44}
        radius={80}
        reverse
        speed={1.6}
        paused={!isActive}
      >
        {tools.map((skill) => (
          <SkillIcon key={skill.name} {...skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
