import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-sm text-slate-300 sm:px-6 lg:flex-row lg:px-8">
        <div className="text-center lg:text-left">
          <p className="text-slate-200">© {new Date().getFullYear()} Alex Carter.</p>
          <p className="mt-1">Built with passion and modern web technologies.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
        <div className="flex gap-3">
          <a href="mailto:alex@example.com" className="hover:text-white">
            <Mail size={18} />
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-white">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-white">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
