import { EmptyState } from '../components/EmptyState/EmptyState';

export function NotFoundPage() {
  return (
    <div className="container">
      <EmptyState
        title="صفحه پیدا نشد"
        description="لینکی که دنبال آن بودید وجود ندارد یا جابه‌جا شده است."
        actionLabel="بازگشت به خانه"
        actionTo="/"
      />
    </div>
  );
}
