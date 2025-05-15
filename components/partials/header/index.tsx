import Link from "next/link";
import { menus } from "./constant";
import { Hamberger } from "@/components/icons";

const Header = () => {
  return (
    <header
      className={`relative py-10 max-w-[1460px] mx-auto px-8 flex justify-between items-center max-h-[104px] h-full`}
    >
      {/* left */}
      <div className="flex items-center gap-8">
        {menus.map((menu) => (
          <Link
            href={menu.href}
            key={menu.id}
            className="text-xl font-semibold text-slate-950"
          >
            {menu.name}
          </Link>
        ))}
      </div>

      {/* logo */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-3xl font-black text-slate-950 "
      >
        Habit Tracker
      </Link>

      {/* right */}
      <div className="flex items-center rounded-xl bg-slate-950/15 p-3 cursor-pointer">
        <Hamberger className="w-8 h-8 text-white" />
      </div>
    </header>
  );
};

export default Header;
