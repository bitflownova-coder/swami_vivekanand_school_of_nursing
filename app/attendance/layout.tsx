// Isolated layout for attendance pages — suppresses global Navigation and Footer
export default function AttendanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
