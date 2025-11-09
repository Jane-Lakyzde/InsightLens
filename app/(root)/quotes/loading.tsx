export default function Loading() {
    return (
        <div className="min-h-screen">
            <div className="mb-5">
                <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-6">
                <section className="w-full lg:w-3/4">
                    <div className="h-[calc(100vh-160px)] bg-gray-900 border border-gray-800 rounded-lg animate-pulse" />
                </section>
                <div className="hidden lg:block w-full lg:w-1/4">
                    <div className="h-[calc(100vh-160px)] bg-gray-900 border border-gray-800 rounded-lg animate-pulse" />
                </div>
            </div>
        </div>
    );
}


