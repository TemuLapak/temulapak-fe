import { ActionButton } from '@/components/ui/actionbutton';
import { APP_ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="tl-wrap py-24 text-center">
      <div className="tl-card-shadow border-2 border-[#1F2937] p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold mb-2">404 — Lapak Kosong</h2>
        <p className="text-[#4B5563] mb-6">
          Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
        </p>
        <ActionButton href={APP_ROUTES.HOME} variant="teal">
          Kembali ke Beranda
        </ActionButton>
      </div>
    </div>
  );
}