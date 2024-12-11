'use client';
import { PagesTopLoader } from 'nextjs-toploader/pages';

export default function LoadingBar() {
  return <PagesTopLoader color="#6fdebf" height={3} showSpinner={false} />;
}
