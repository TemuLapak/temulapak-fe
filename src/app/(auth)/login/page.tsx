import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex-1" />}>
      <LoginForm />
    </Suspense>
  );
}