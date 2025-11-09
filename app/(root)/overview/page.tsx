import dynamic from "next/dynamic";
import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";

const TradingViewWidget = dynamic(() => import("@/components/TradingViewWidget"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center text-gray-500">
            加载图表…
        </div>
    ),
});

const AIChat = dynamic(() => import("@/components/AIChat"), {
    ssr: false,
    loading: () => (
        <div className="bg-gray-900 border border-gray-800 rounded-lg h-[calc(100vh-160px)] p-4 text-gray-500">
            加载助手…
        </div>
    ),
});

const OverviewPage = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js`;

    return (
        <div className="min-h-screen">
            <div className="mb-5">
                <h3 className="font-semibold text-2xl text-gray-100">市场概览</h3>
            </div>
            <div className="flex gap-6">
                <section className="w-full lg:w-3/4">
                    <div className="h-[calc(100vh-160px)] bg-gray-900 border border-gray-800 rounded-lg">
                        <TradingViewWidget
                            scriptUrl={scriptUrl}
                            config={MARKET_OVERVIEW_WIDGET_CONFIG}
                            className="custom-chart h-full"
                            height={'100%'}
                        />
                    </div>
                </section>
                <div className="hidden lg:block w-full lg:w-1/4">
                    <AIChat />
                </div>
            </div>
        </div>
    )
}

export default OverviewPage;

