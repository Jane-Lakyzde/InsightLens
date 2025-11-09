import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";
import { ClientTradingViewWidget as TradingViewWidget } from "@/components/client/ClientWidgets";

const OverviewPage = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js`;

    return (
        <div className="min-h-screen">
            <div className="mb-5">
                <h3 className="font-semibold text-2xl text-gray-100">市场概览</h3>
            </div>
            <div className="h-[calc(100vh-160px)] bg-gray-900 border border-gray-800 rounded-lg">
                <TradingViewWidget
                    scriptUrl={scriptUrl}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    className="custom-chart h-full"
                    height={'100%'}
                />
            </div>
        </div>
    )
}

export default OverviewPage;

