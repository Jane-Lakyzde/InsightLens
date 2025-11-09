import Header from "@/components/Header";
import ScriptPrefetcher from "@/components/client/ScriptPrefetcher";
import { ClientAIChat as AIChat } from "@/components/client/ClientWidgets";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    return (
        <main className="min-h-screen text-gray-400">
            <Header />
            <ScriptPrefetcher />

            <div className="container py-10">
                <div className="flex gap-6">
                    <div className="w-full lg:w-3/4">
                        {children}
                    </div>
                    <div className="hidden lg:block w-full lg:w-1/4">
                        <AIChat />
                    </div>
                </div>
            </div>

        </main>
    )
}
export default Layout