import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [tier, setTier] = useState<'digital' | 'print'>('digital');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md rounded-lg border border-stone-200 bg-[#FBF9F5] p-6 sm:p-7 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close subscription modal"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100 hover:text-stone-900"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-xs font-medium tracking-wider text-[#9A3412]">
          Reader Membership
        </p>
        <h2
          id="subscribe-modal-title"
          className="mt-1 font-serif text-2xl font-semibold text-stone-900"
        >
          Subscribe to The Meridian
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Support independent field reporting, documentary photo essays, and full access to our civic infrastructure archive.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setTier('digital')}
                className={`rounded-md border p-3 text-left transition-colors ${
                  tier === 'digital'
                    ? 'border-[#1E3A8A] bg-[#F3EFE6]'
                    : 'border-stone-200 bg-[#FBF9F5] hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-semibold text-stone-900">Digital Edition</div>
                <div className="mt-1 font-mono text-sm font-semibold text-[#1E3A8A] tabular-nums">
                  $8 / month
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTier('print')}
                className={`rounded-md border p-3 text-left transition-colors ${
                  tier === 'print'
                    ? 'border-[#1E3A8A] bg-[#F3EFE6]'
                    : 'border-stone-200 bg-[#FBF9F5] hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-semibold text-stone-900">Print &amp; Archive</div>
                <div className="mt-1 font-mono text-sm font-semibold text-[#1E3A8A] tabular-nums">
                  $14 / month
                </div>
              </button>
            </div>

            <div>
              <label htmlFor="sub-email" className="block text-xs font-medium text-stone-700">
                Email address
              </label>
              <input
                id="sub-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-[#1E3A8A] focus:outline-none min-h-[42px]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#172554] min-h-[42px]"
            >
              Continue with {tier === 'digital' ? 'Digital ($8/mo)' : 'Print & Archive ($14/mo)'}
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-md border border-stone-200 bg-[#F3EFE6] p-4">
            <div className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1E3A8A]" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Confirmation link dispatched
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  We have prepared your {tier === 'digital' ? 'Digital Edition' : 'Print & Archive'} pass for <span className="font-medium text-stone-900">{email}</span>.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                onClose();
              }}
              className="mt-4 w-full rounded-md border border-stone-300 bg-[#FBF9F5] px-4 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-100 min-h-[40px]"
            >
              Return to Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
