import { TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";
import { ClientTradingViewWidget as TradingViewWidget } from "@/components/client/ClientWidgets";

const NewsPage = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-timeline.js`;

    return (
        <div className="min-h-screen">
            <div className="mb-5">
                <h3 className="font-semibold text-2xl text-gray-100">资讯时间线</h3>
            </div>
            <div className="h-[calc(100vh-160px)] bg-gray-900 border border-gray-800 rounded-lg">
                <TradingViewWidget
                    scriptUrl={scriptUrl}
                    config={TOP_STORIES_WIDGET_CONFIG}
                    className="h-full"
                    height={'100%'}
                />
            </div>
        </div>
    )
}

export default NewsPage;

