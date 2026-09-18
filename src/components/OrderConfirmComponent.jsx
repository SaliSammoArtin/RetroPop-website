import { Link } from "react-router";
import logo from "../assets/retro-pop-logo-transparent-400.png";

export default function Hero() {
  return (
    <section className="my-6 mx-4 sm:mx-8 md:mx-auto max-w-5xl p-6 md:p-8 border-4 border-retro-yellow-highlight bg-retro-green-text rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        <div className="shrink-0">
          <img
            className="w-36 sm:w-44 md:w-52 drop-shadow-md transition-transform duration-300 hover:scale-105 hover:animate-bounce "
            src={logo}
            alt="Retro Pop logo"
          />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-retro-cream-bg tracking-wide">
            Thank you for choosing RETRO POP!
          </h1>

          <p className="text-sm sm:text-base text-retro-cream-bg/90 leading-relaxed font-medium max-w-xl">
            We will proudly take care of your order and send it to you as soon
            as possible.
          </p>

          <Link
            to="/products"
            className="mt-1 inline-block px-6 py-2.5 rounded-xl bg-retro-orange-bg text-retro-cream-bg font-bold text-base shadow-md transition-all duration-200 hover:bg-retro-yellow-highlight hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-retro-yellow-highlight/50">
            Back to shopping!
          </Link>
        </div>
      </div>
    </section>
  );
}
