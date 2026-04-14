import { IconType } from "react-icons";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
//   SiCss3,
  SiExpress,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiGit,
//   SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiDocker,
  SiRedux,
  SiFirebase,
//   SiAmazonaws,
} from "react-icons/si";

import { FaNodeJs, FaGithub, FaFigma } from "react-icons/fa";

export const iconMap: Record<string, IconType> = {
  // Frontend
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
//   SiCss3,
  SiRedux,

  // Backend
  FaNodeJs,
  SiExpress,
  SiPython,
  SiFirebase,

  // Database
  SiMongodb,
  SiPostgresql,
  SiMysql,

  // Tools
  SiGit,
  FaGithub,
//   SiVisualstudiocode,
  FaFigma,
  SiPostman,

  // Deployment
  SiVercel,
  SiNetlify,
  SiDocker,
//   SiAmazonaws,
};
