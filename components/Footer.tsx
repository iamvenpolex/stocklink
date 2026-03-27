export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} StockLink. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
