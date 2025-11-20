export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-3 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              📸
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Loading gallery...
          </h2>
          <p className="text-zinc-600">
            Preparing some beautiful shots for you
          </p>
        </div>
      </div>
    </div>
  );
}

