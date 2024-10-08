import { PageDto, PagePaymentOutDto } from 'app/types/api/apiTypes';
import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { request } from 'shared/lib/request/request';

const logger = createLogger('fetchLatestPurchases');

const fetchLatestPurchases = async (pageParameters: PageDto) => {
    try {
        return await request<PagePaymentOutDto>({
            url: '/admin/purchase/latest',
            params: { ...pageParameters }
        });
    } catch (error) {
        const message = `fetchLatestPurchases: failed to fetch. ${error.message}`;
        Sentry.captureMessage(message);
        logger.error(message);
    }
};

export default fetchLatestPurchases;
