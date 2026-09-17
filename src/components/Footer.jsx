import { Link } from "react-router";

export default function Footer() {
  return (
    <div>
      <p className="text-retro-cream-bg flex items-center gap-4 p-4 text-4xl bg-retro-green-text border-t-4 border-retro-yellow-highlight font-black">
        Retro<span className="text-retro-orange-bg">Pop</span>

        <Link
          to="/inventory"
          className="ml-auto mr-4 text-xs font-normal text-retro-cream-bg opacity-30 hover:opacity-70 transition-opacity"
        >
          Admin
        </Link>
      </p>
    </div>
  );
}
