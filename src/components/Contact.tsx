import { Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="w-full max-w-7xl py-32 flex flex-col gap-8 md:gap-16 pt-24 border-t border-white/10 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">{t.contact.title}</h2>
          <p className="text-secondary text-lg max-w-xl">
            {t.contact.desc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Email */}
        <a 
          href="mailto:ilya234405@gmail.com"
          className="group flex flex-col justify-between p-8 rounded-[2rem] bg-surface border border-white/5 hover:bg-white/[0.03] transition-colors h-[240px]"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
          </div>
          <div>
            <p className="text-secondary mb-1">Email</p>
            <h3 className="text-xl text-white font-medium break-all">ilya234405@gmail.com</h3>
          </div>
        </a>

        {/* Telegram */}
        <a 
          href="https://t.me/Proxzy_00s"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between p-8 rounded-[2rem] bg-surface border border-white/5 hover:bg-[#229ED9]/10 transition-colors h-[240px] hover:border-[#229ED9]/30"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform group-hover:bg-[#229ED9] group-hover:border-[#229ED9]">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#229ED9] transition-colors" />
          </div>
          <div>
            <p className="text-secondary mb-1">Telegram</p>
            <h3 className="text-xl text-white font-medium">@Proxzy_00s</h3>
          </div>
        </a>

        {/* Discord */}
        <div className="group flex flex-col justify-between p-8 rounded-[2rem] bg-surface border border-white/5 hover:bg-[#5865F2]/10 transition-colors h-[240px] hover:border-[#5865F2]/30">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform group-hover:bg-[#5865F2] group-hover:border-[#5865F2]">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
              </svg>
            </div>
          </div>
          <div>
            <p className="text-secondary mb-3">Discord</p>
            <a 
              href="https://discord.com/users/1045397133660008458"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#5865F2] text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
            >
              {t.contact.addFriend} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
