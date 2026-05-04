export default function AdminFooter() {
  return (
    <footer className="p-4 border-t border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>© 2026 GearBazar. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
